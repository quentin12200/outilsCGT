import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TabNav from '../Modules/Demarche/TabNav';
import styles from './VueEnsemblePage.module.css';
import DashboardGrid from '../Dashboard/DashboardGrid';
import StatisticsPanel from '../Dashboard/StatisticsPanel';
import CategoryFilter from '../Dashboard/CategoryFilter';
import { tools, categories, defaultStats } from '../../data/toolsData';
import { themesRevendicatifs, themeParId } from '../../data/themesRevendicatifs';
import storageService from '../services/storageService';
import useSyncTempsReel from '../../hooks/useSyncTempsReel';

// Statuts du cahier revendicatif (mêmes identifiants que l'outil)
const STATUTS_CAHIER = [
  { id: 'a-discuter', label: 'À discuter', couleur: '#d97706' },
  { id: 'validee', label: 'Validées en AG', couleur: '#15803d' },
  { id: 'deposee', label: 'Déposées', couleur: '#1d4ed8' },
  { id: 'gagnee', label: 'Gagnées', couleur: '#b71c1c' }
];

function VueEnsemblePage() {
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('vue-ensemble');
  // État pour la catégorie active
  const [activeCategory, setActiveCategory] = useState(null);
  // Données réelles des outils
  const [reponses, setReponses] = useState([]);
  const [cahier, setCahier] = useState({ revendications: [] });

  // Liste d'onglets pour la page
  const tabs = [
    { id: 'vue-ensemble', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'besoins', label: 'Besoins', color: 'bg-yellow-600' },
    { id: 'revendications', label: 'Revendications', color: 'bg-green-600' }
  ];

  // Chargement des données du questionnaire et du cahier (local puis partagé)
  useEffect(() => {
    const charger = async () => {
      const questionnaireLocal = storageService.loadFromLocal('questionnaireReponses');
      if (questionnaireLocal?.reponses) setReponses(questionnaireLocal.reponses);
      const cahierLocal = storageService.loadFromLocal('cahierRevendicatif');
      if (cahierLocal) setCahier(cahierLocal);

      const questionnairePartage = await storageService.loadFromServer('questionnaireReponses');
      if (questionnairePartage?.reponses) setReponses(questionnairePartage.reponses);
      const cahierPartage = await storageService.loadFromServer('cahierRevendicatif');
      if (cahierPartage) setCahier(cahierPartage);
    };
    charger();
  }, []);

  // Temps réel : la vue d'ensemble reflète l'activité des camarades en direct
  useSyncTempsReel('questionnaireReponses', (donnees) => {
    if (donnees?.reponses) setReponses(donnees.reponses);
  });
  useSyncTempsReel('cahierRevendicatif', (donnees) => {
    if (donnees) setCahier(donnees);
  });

  // --- Synthèse des besoins (questionnaire) ---
  const compteParTheme = {};
  reponses.forEach((r) => (r.priorites || []).forEach((p) => {
    compteParTheme[p] = (compteParTheme[p] || 0) + 1;
  }));
  const classement = themesRevendicatifs
    .map((t) => ({ theme: t, votes: compteParTheme[t.id] || 0 }))
    .filter((c) => c.votes > 0)
    .sort((a, b) => b.votes - a.votes);
  const maxVotes = classement.length ? classement[0].votes : 1;
  const pretsAG = reponses.filter((r) => r.pretAG === 'oui').length;
  const dernieresParoles = [...reponses]
    .reverse()
    .flatMap((r) => [r.attentes, r.revendication].filter((t) => t && t.trim()).map((t) => ({ texte: t.trim(), service: r.service })))
    .slice(0, 3);

  // --- Synthèse des revendications (cahier) ---
  const revendications = cahier.revendications || [];
  const compteStatut = (id) => revendications.filter((r) => r.statut === id).length;
  const dernieresRevendications = [...revendications]
    .sort((a, b) => (b.creeLe || '').localeCompare(a.creeLe || ''))
    .slice(0, 5);

  return (
    <div className={styles.pageContainer}>
      {/* Barre d'onglets */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Contenu en fonction de l'onglet */}
      {activeTab === 'vue-ensemble' && (
        <div className={styles.dashboardContainer}>
          <h1 className={styles.pageTitle}>Tableau de bord syndical</h1>

          {/* Panneau de statistiques */}
          <section className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Statistiques clés</h2>
            <StatisticsPanel stats={defaultStats} />
          </section>

          {/* Filtres de catégories */}
          <section className={styles.toolsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Boîte à outils</h2>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Grille d'outils */}
            <DashboardGrid tools={tools} category={activeCategory} />
          </section>
        </div>
      )}

      {activeTab === 'besoins' && (
        <div className={styles.dashboardContainer}>
          <h1 className={styles.pageTitle}>Les besoins exprimés par les salariés</h1>
          <p className={styles.pageDescription}>
            Synthèse en direct du questionnaire des besoins.
          </p>

          {reponses.length === 0 ? (
            <div className={styles.carteVide}>
              <p>Aucune réponse recueillie pour l'instant.</p>
              <Link to="/questionnaire" className={styles.boutonAction}>
                Lancer le questionnaire des besoins
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.chiffresLigne}>
                <div className={styles.chiffre}><strong>{reponses.length}</strong> réponse{reponses.length > 1 ? 's' : ''}</div>
                <div className={styles.chiffre}><strong>{pretsAG}</strong> prêt·es pour une AG</div>
                <div className={styles.chiffre}><strong>{classement.length}</strong> thème{classement.length > 1 ? 's' : ''} de préoccupation</div>
              </div>

              <section className={styles.carte}>
                <h2 className={styles.sectionTitle}>Priorités exprimées</h2>
                {classement.slice(0, 5).map(({ theme, votes }) => (
                  <div key={theme.id} className={styles.ligneBarre}>
                    <span className={styles.barreLabel}>{theme.icone} {theme.label}</span>
                    <div className={styles.barreFond}>
                      <div
                        className={styles.barreValeur}
                        style={{ width: `${(votes / maxVotes) * 100}%`, backgroundColor: theme.couleur }}
                      />
                    </div>
                    <span className={styles.barreVotes}>{votes}</span>
                  </div>
                ))}
              </section>

              {dernieresParoles.length > 0 && (
                <section className={styles.carte}>
                  <h2 className={styles.sectionTitle}>Dernières paroles de salariés</h2>
                  {dernieresParoles.map((parole, index) => (
                    <blockquote key={index} className={styles.parole}>
                      « {parole.texte} »
                      <footer>{parole.service || 'service non précisé'}</footer>
                    </blockquote>
                  ))}
                </section>
              )}

              <div className={styles.actionsLigne}>
                <Link to="/questionnaire" className={styles.boutonAction}>
                  Recueillir d'autres réponses
                </Link>
                <Link to="/cahier-revendicatif" className={styles.boutonSecondaire}>
                  Transformer en revendications →
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'revendications' && (
        <div className={styles.dashboardContainer}>
          <h1 className={styles.pageTitle}>L'état du cahier revendicatif</h1>
          <p className={styles.pageDescription}>
            Suivi en direct des revendications du syndicat{cahier.entreprise ? ` — ${cahier.entreprise}` : ''}.
          </p>

          {revendications.length === 0 ? (
            <div className={styles.carteVide}>
              <p>Le cahier revendicatif est vide pour l'instant.</p>
              <Link to="/cahier-revendicatif" className={styles.boutonAction}>
                Ouvrir le cahier revendicatif
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.chiffresLigne}>
                <div className={styles.chiffre}><strong>{revendications.length}</strong> au total</div>
                {STATUTS_CAHIER.map((statut) => (
                  <div key={statut.id} className={styles.chiffre} style={{ borderLeft: `4px solid ${statut.couleur}` }}>
                    <strong>{compteStatut(statut.id)}</strong> {statut.label.toLowerCase()}
                  </div>
                ))}
              </div>

              <section className={styles.carte}>
                <h2 className={styles.sectionTitle}>Dernières revendications</h2>
                <ul className={styles.listeRevendications}>
                  {dernieresRevendications.map((rev) => {
                    const theme = themeParId(rev.themeId);
                    const statut = STATUTS_CAHIER.find((s) => s.id === rev.statut) || STATUTS_CAHIER[0];
                    return (
                      <li key={rev.id} className={styles.revendication} style={{ borderLeftColor: theme.couleur }}>
                        <span className={styles.revendicationTitre}>{theme.icone} {rev.titre}</span>
                        <span className={styles.badgeStatut} style={{ backgroundColor: statut.couleur }}>
                          {statut.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <div className={styles.actionsLigne}>
                <Link to="/cahier-revendicatif" className={styles.boutonAction}>
                  Ouvrir le cahier revendicatif
                </Link>
                <Link to="/questionnaire" className={styles.boutonSecondaire}>
                  ← Retour aux besoins
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VueEnsemblePage;
