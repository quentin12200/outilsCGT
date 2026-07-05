// src/components/pages/ParcoursPage.js
// Le « chemin du syndicat » : un parcours guidé qui suit la démarche CGT,
// étape par étape, avec pour chaque étape les actions à mener et le lien
// vers l'outil correspondant. La progression est sauvegardée localement
// et partagée avec le syndicat quand Firebase est configuré.

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import storageService from '../services/storageService';
import { useAuth } from '../../context/AuthContext';
import styles from './ParcoursPage.module.css';

const PARCOURS_KEY = 'parcoursSyndicat';

// Les étapes de la démarche CGT, dans l'ordre.
// Chaque tâche a un identifiant stable : ne pas les renuméroter,
// sinon la progression déjà enregistrée serait perdue.
export const etapes = [
  {
    id: 'organisation',
    numero: 1,
    titre: 'Connaître ses forces',
    phase: 'Avant',
    couleur: '#b71c1c',
    description:
      "Partir de l'état réel du syndicat : cartographier les services, mesurer la syndicalisation, identifier les zones prioritaires.",
    outil: { label: 'Ouvrir la cartographie', path: '/carto-syndicalisation?tab=cartographie' },
    taches: [
      { id: 'org-services', label: 'Lister les services / établissements et leurs effectifs' },
      { id: 'org-syndiques', label: 'Renseigner le nombre de syndiqués par service' },
      { id: 'org-priorites', label: 'Identifier les services prioritaires (faible taux, gros effectifs)' },
      { id: 'org-objectifs', label: 'Fixer des objectifs de syndicalisation chiffrés' }
    ]
  },
  {
    id: 'besoins',
    numero: 2,
    titre: 'Recueillir les besoins',
    phase: 'Avant',
    couleur: '#d97706',
    description:
      "Écouter les salariés : construire et diffuser un questionnaire, organiser la tournée des services, noter toutes les attentes exprimées.",
    outil: { label: 'Ouvrir le questionnaire', path: '/questionnaire' },
    taches: [
      { id: 'bes-ag', label: 'Réunir les syndiqués pour lancer la démarche (AG de lancement)' },
      { id: 'bes-questionnaire', label: 'Construire le questionnaire de recueil des besoins' },
      { id: 'bes-diffusion', label: 'Diffuser le questionnaire dans tous les services' },
      { id: 'bes-synthese', label: 'Faire la synthèse des besoins exprimés' }
    ]
  },
  {
    id: 'revendications',
    numero: 3,
    titre: 'Construire les revendications',
    phase: 'Avant',
    couleur: '#15803d',
    description:
      "Transformer les besoins en revendications précises et légitimes, rassemblées dans le cahier revendicatif validé démocratiquement.",
    outil: { label: 'Ouvrir le cahier revendicatif', path: '/cahier-revendicatif' },
    taches: [
      { id: 'rev-redaction', label: 'Rédiger le cahier revendicatif à partir des besoins' },
      { id: 'rev-reperes', label: 'Confronter aux repères revendicatifs CGT' },
      { id: 'rev-validation', label: 'Valider le cahier en AG des syndiqués' },
      { id: 'rev-depot', label: "Remettre le cahier revendicatif à l'employeur" }
    ]
  },
  {
    id: 'mobilisation',
    numero: 4,
    titre: 'Mobiliser les salariés',
    phase: 'Pendant',
    couleur: '#1d4ed8',
    description:
      "Faire vivre la démocratie syndicale : assemblées générales, communication, construction du rapport de force autour des revendications.",
    outil: { label: 'Préparer les assemblées', path: '/assemblees' },
    taches: [
      { id: 'mob-plan', label: 'Établir le plan de communication (tracts, réunions, affichage)' },
      { id: 'mob-ag', label: 'Organiser les AG de salariés sur les revendications' },
      { id: 'mob-retro', label: 'Caler le rétro-planning des actions', lien: '/retro-planning' },
      { id: 'mob-action', label: "Mener l'action décidée collectivement (négociation, lutte...)" }
    ]
  },
  {
    id: 'elections',
    numero: 5,
    titre: 'Gagner les élections',
    phase: 'Pendant',
    couleur: '#7c3aed',
    description:
      "Préparer les élections CSE : protocole d'accord préélectoral, constitution des listes, campagne auprès des salariés.",
    outil: { label: 'Ouvrir les outils élections CSE', path: '/elections-cse' },
    taches: [
      { id: 'ele-pap', label: "Négocier le protocole d'accord préélectoral (PAP)" },
      { id: 'ele-listes', label: 'Constituer des listes représentatives (parité, services)' },
      { id: 'ele-campagne', label: 'Mener la campagne électorale', lien: '/campagne-elections' },
      { id: 'ele-scrutin', label: 'Organiser le suivi du scrutin et des résultats' }
    ]
  },
  {
    id: 'bilan',
    numero: 6,
    titre: 'Faire le bilan et recommencer',
    phase: 'Après',
    couleur: '#0f766e',
    description:
      "Analyser les résultats, rendre compte aux salariés, mesurer les progrès de syndicalisation... et relancer la démarche : c'est un cycle.",
    outil: { label: 'Analyser les résultats', path: '/resultats' },
    taches: [
      { id: 'bil-resultats', label: 'Saisir et analyser les résultats électoraux' },
      { id: 'bil-compte-rendu', label: 'Rendre compte aux syndiqués et aux salariés' },
      { id: 'bil-syndicalisation', label: 'Mettre à jour la cartographie et mesurer les progrès', lien: '/carto-syndicalisation?tab=syndicalisation' },
      { id: 'bil-relance', label: 'Décider collectivement des prochaines priorités' }
    ]
  }
];

// Lit l'état réel des outils (local, puis version partagée du syndicat)
// pour afficher dans chaque étape ce qui a déjà été fait.
async function chargerDonneesOutils() {
  const lire = async (cle) => {
    const partage = await storageService.loadFromServer(cle);
    return partage ?? storageService.loadFromLocal(cle);
  };
  const [carto, cartoSimple, questionnaire, cahier, resultats, retro, assemblees] = await Promise.all([
    lire('cartographieAvancee'),
    lire('cartographieSimple'),
    lire('questionnaireReponses'),
    lire('cahierRevendicatif'),
    lire('resultats'),
    lire('retroplanning'),
    lire('assemblees')
  ]);
  return { carto, cartoSimple, questionnaire, cahier, resultats, retro, assemblees };
}

// Indicateurs affichés par étape à partir des données des outils
function indicateursEtape(etapeId, outils) {
  const servicesAvances = Array.isArray(outils.carto) ? outils.carto.length : 0;
  const servicesSimples = (outils.cartoSimple?.services || []).filter((s) => s.name?.trim()).length;
  const services = Math.max(servicesAvances, servicesSimples);
  const reponses = outils.questionnaire?.reponses?.length || 0;
  const revendications = outils.cahier?.revendications || [];
  const validees = revendications.filter((r) => r.statut === 'validee' || r.statut === 'deposee' || r.statut === 'gagnee').length;
  const resultatsSaisis = (outils.resultats?.totalVotes || 0) > 0;
  const nbAG = outils.assemblees?.assemblees?.length || 0;
  const dateEvenement = outils.retro?.dateEvenement;

  switch (etapeId) {
    case 'organisation':
      return services > 0
        ? [`🗺️ ${services} service${services > 1 ? 's' : ''} cartographié${services > 1 ? 's' : ''}`]
        : [];
    case 'besoins':
      return reponses > 0
        ? [`🗣️ ${reponses} réponse${reponses > 1 ? 's' : ''} au questionnaire`]
        : [];
    case 'revendications':
      return revendications.length > 0
        ? [`📖 ${revendications.length} revendication${revendications.length > 1 ? 's' : ''} au cahier${validees > 0 ? ` dont ${validees} validée${validees > 1 ? 's' : ''}` : ''}`]
        : [];
    case 'mobilisation': {
      const indicateurs = [];
      if (nbAG > 0) indicateurs.push(`👥 ${nbAG} AG enregistrée${nbAG > 1 ? 's' : ''}`);
      if (dateEvenement) indicateurs.push(`📅 Échéance fixée au ${new Date(dateEvenement).toLocaleDateString('fr-FR')}`);
      return indicateurs;
    }
    case 'elections': {
      const indicateurs = [];
      if (dateEvenement) indicateurs.push(`📅 Scrutin prévu le ${new Date(dateEvenement).toLocaleDateString('fr-FR')}`);
      if (resultatsSaisis) indicateurs.push('📊 Résultats électoraux saisis');
      return indicateurs;
    }
    case 'bilan':
      return resultatsSaisis ? ['📊 Résultats électoraux saisis'] : [];
    default:
      return [];
  }
}

function ParcoursPage() {
  const { firebaseEnabled, user, syndicat } = useAuth();
  // tachesFaites : { 'org-services': true, ... }
  const [tachesFaites, setTachesFaites] = useState({});
  const [etapeOuverte, setEtapeOuverte] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [donneesOutils, setDonneesOutils] = useState({});
  const chargeRef = useRef(false);

  // Chargement : local d'abord, puis version partagée du syndicat si disponible
  useEffect(() => {
    const charger = async () => {
      const local = storageService.loadFromLocal(PARCOURS_KEY);
      if (local?.tachesFaites) setTachesFaites(local.tachesFaites);
      const partage = await storageService.loadFromServer(PARCOURS_KEY);
      if (partage?.tachesFaites) setTachesFaites(partage.tachesFaites);
      chargeRef.current = true;
      setChargement(false);
      setDonneesOutils(await chargerDonneesOutils());
    };
    charger();
  }, [syndicat?.id]);

  // Sauvegarde à chaque changement (locale toujours, partagée si possible)
  const sauvegarder = useCallback((nouvellesTaches) => {
    const donnees = { tachesFaites: nouvellesTaches, majLe: new Date().toISOString() };
    storageService.saveLocally(PARCOURS_KEY, donnees);
    storageService.saveToServer(PARCOURS_KEY, donnees);
  }, []);

  const basculerTache = (tacheId) => {
    setTachesFaites((precedent) => {
      const suivant = { ...precedent, [tacheId]: !precedent[tacheId] };
      if (chargeRef.current) sauvegarder(suivant);
      return suivant;
    });
  };

  const progressionEtape = (etape) =>
    etape.taches.filter((t) => tachesFaites[t.id]).length;

  const totalTaches = etapes.reduce((somme, e) => somme + e.taches.length, 0);
  const totalFaites = etapes.reduce((somme, e) => somme + progressionEtape(e), 0);
  const pourcentage = Math.round((totalFaites / totalTaches) * 100);

  // L'étape « courante » est la première non terminée
  const etapeCourante = etapes.find((e) => progressionEtape(e) < e.taches.length);

  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <h1 className={styles.titre}>Le chemin du syndicat</h1>
        <p className={styles.sousTitre}>
          La démarche CGT étape par étape : partir de nos forces, écouter les salariés,
          construire les revendications, mobiliser, gagner — puis recommencer.
        </p>

        <div className={styles.progressionGlobale}>
          <div className={styles.progressionTexte}>
            <strong>{totalFaites}</strong> action{totalFaites > 1 ? 's' : ''} sur {totalTaches} — {pourcentage}%
          </div>
          <div className={styles.barre} role="progressbar" aria-valuenow={pourcentage} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.barreRemplie} style={{ width: `${pourcentage}%` }} />
          </div>
          {etapeCourante && (
            <p className={styles.prochaineEtape}>
              Prochaine étape : <strong>{etapeCourante.numero}. {etapeCourante.titre}</strong>
            </p>
          )}
          {!etapeCourante && (
            <p className={styles.prochaineEtape}>
              🎉 Cycle terminé ! La démarche est un processus vivant : faites le bilan et relancez un cycle.
            </p>
          )}
        </div>

        <div className={styles.modeSauvegarde}>
          {firebaseEnabled && user && syndicat ? (
            <span className={styles.modePartage}>
              ✅ Progression partagée avec le syndicat « {syndicat.nom} »
            </span>
          ) : firebaseEnabled && user ? (
            <span className={styles.modeLocal}>
              💾 Progression enregistrée sur cet appareil — <Link to="/compte">rejoignez un espace syndicat</Link> pour la partager
            </span>
          ) : firebaseEnabled ? (
            <span className={styles.modeLocal}>
              💾 Progression enregistrée sur cet appareil — <Link to="/compte">connectez-vous</Link> pour la partager avec votre syndicat
            </span>
          ) : (
            <span className={styles.modeLocal}>
              💾 Progression enregistrée sur cet appareil uniquement
            </span>
          )}
        </div>
      </header>

      {chargement ? (
        <p className={styles.chargement}>Chargement du parcours...</p>
      ) : (
        <ol className={styles.listeEtapes}>
          {etapes.map((etape) => {
            const faites = progressionEtape(etape);
            const total = etape.taches.length;
            const terminee = faites === total;
            const courante = etapeCourante?.id === etape.id;
            const ouverte = etapeOuverte === etape.id || (etapeOuverte === null && courante);

            return (
              <li
                key={etape.id}
                className={`${styles.etape} ${terminee ? styles.etapeTerminee : ''} ${courante ? styles.etapeCourante : ''}`}
                style={{ '--couleur-etape': etape.couleur }}
              >
                <button
                  type="button"
                  className={styles.etapeEntete}
                  onClick={() => setEtapeOuverte(ouverte ? 'aucune' : etape.id)}
                  aria-expanded={ouverte}
                >
                  <span className={styles.pastille}>
                    {terminee ? '✓' : etape.numero}
                  </span>
                  <span className={styles.etapeTitres}>
                    <span className={styles.etapePhase}>{etape.phase}</span>
                    <span className={styles.etapeTitre}>{etape.titre}</span>
                  </span>
                  <span className={styles.etapeCompteur}>{faites}/{total}</span>
                </button>

                {ouverte && (
                  <div className={styles.etapeContenu}>
                    <p className={styles.etapeDescription}>{etape.description}</p>
                    {indicateursEtape(etape.id, donneesOutils).map((indicateur) => (
                      <p key={indicateur} className={styles.indicateurOutil}>{indicateur}</p>
                    ))}
                    <ul className={styles.listeTaches}>
                      {etape.taches.map((tache) => (
                        <li key={tache.id} className={styles.tache}>
                          <label className={styles.tacheLabel}>
                            <input
                              type="checkbox"
                              checked={Boolean(tachesFaites[tache.id])}
                              onChange={() => basculerTache(tache.id)}
                            />
                            <span className={tachesFaites[tache.id] ? styles.tacheFaite : ''}>
                              {tache.label}
                            </span>
                          </label>
                          {tache.lien && (
                            <Link to={tache.lien} className={styles.tacheLien}>outil →</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Link to={etape.outil.path} className={styles.boutonOutil}>
                      {etape.outil.label}
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default ParcoursPage;
