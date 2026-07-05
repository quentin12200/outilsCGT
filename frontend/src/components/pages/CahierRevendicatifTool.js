// src/components/pages/CahierRevendicatifTool.js
// Le cahier revendicatif du syndicat : gestion complète des revendications
// (ajout, modification, suivi du statut), organisées par thème, avec export
// PDF prêt à remettre en AG ou à l'employeur.
//
// Les besoins envoyés depuis le questionnaire arrivent ici en brouillon
// « à discuter ». Sauvegarde locale + partagée (clé 'cahierRevendicatif').

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import storageService from '../services/storageService';
import { useAuth } from '../../context/AuthContext';
import { themesRevendicatifs, themeParId } from '../../data/themesRevendicatifs';
import styles from './CahierRevendicatifTool.module.css';

const CAHIER_KEY = 'cahierRevendicatif';

export const STATUTS = [
  { id: 'a-discuter', label: 'À discuter', couleur: '#d97706' },
  { id: 'validee', label: 'Validée en AG', couleur: '#15803d' },
  { id: 'deposee', label: "Déposée à l'employeur", couleur: '#1d4ed8' },
  { id: 'gagnee', label: 'Gagnée', couleur: '#b71c1c' }
];

const PRIORITES = [
  { id: 'haute', label: '🔴 Haute' },
  { id: 'moyenne', label: '🟠 Moyenne' },
  { id: 'basse', label: '🟡 Basse' }
];

const revendicationVide = {
  titre: '',
  themeId: 'salaires',
  service: '',
  priorite: 'moyenne',
  statut: 'a-discuter',
  constat: '',
  argumentaire: ''
};

function statutParId(id) {
  return STATUTS.find((s) => s.id === id) || STATUTS[0];
}

function CahierRevendicatifTool() {
  const { firebaseEnabled, user, syndicat } = useAuth();
  const [entreprise, setEntreprise] = useState('');
  const [revendications, setRevendications] = useState([]);
  const [formulaire, setFormulaire] = useState(null); // null | {..revendication en édition}
  const [filtreTheme, setFiltreTheme] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('');
  const [nbReponsesQuestionnaire, setNbReponsesQuestionnaire] = useState(0);
  const chargeRef = useRef(false);

  useEffect(() => {
    const charger = async () => {
      const local = storageService.loadFromLocal(CAHIER_KEY);
      if (local) {
        setEntreprise(local.entreprise || '');
        setRevendications(local.revendications || []);
      }
      const partage = await storageService.loadFromServer(CAHIER_KEY);
      if (partage) {
        setEntreprise(partage.entreprise || '');
        setRevendications(partage.revendications || []);
      }
      const questionnaire = storageService.loadFromLocal('questionnaireReponses');
      setNbReponsesQuestionnaire(questionnaire?.reponses?.length || 0);
      chargeRef.current = true;
    };
    charger();
  }, [syndicat?.id]);

  const sauvegarder = useCallback((liste, nomEntreprise) => {
    const donnees = {
      entreprise: nomEntreprise,
      revendications: liste,
      majLe: new Date().toISOString()
    };
    storageService.saveLocally(CAHIER_KEY, donnees);
    storageService.saveToServer(CAHIER_KEY, donnees);
  }, []);

  const majEntreprise = (valeur) => {
    setEntreprise(valeur);
    if (chargeRef.current) sauvegarder(revendications, valeur);
  };

  const majListe = (liste) => {
    setRevendications(liste);
    if (chargeRef.current) sauvegarder(liste, entreprise);
  };

  // ---- Formulaire ajout / édition ----

  const champ = (nom) => (e) => setFormulaire((f) => ({ ...f, [nom]: e.target.value }));

  const enregistrerFormulaire = (e) => {
    e.preventDefault();
    if (!formulaire.titre.trim()) return;
    if (formulaire.id) {
      majListe(revendications.map((r) => (r.id === formulaire.id ? formulaire : r)));
    } else {
      majListe([
        ...revendications,
        {
          ...formulaire,
          id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          creeLe: new Date().toISOString()
        }
      ]);
    }
    setFormulaire(null);
  };

  const supprimer = (rev) => {
    if (window.confirm(`Supprimer la revendication « ${rev.titre} » ?`)) {
      majListe(revendications.filter((r) => r.id !== rev.id));
    }
  };

  const changerStatut = (rev, statut) => {
    majListe(revendications.map((r) => (r.id === rev.id ? { ...r, statut } : r)));
  };

  // ---- Filtres et regroupement ----

  const filtrees = useMemo(
    () =>
      revendications.filter(
        (r) =>
          (!filtreTheme || r.themeId === filtreTheme) &&
          (!filtreStatut || r.statut === filtreStatut)
      ),
    [revendications, filtreTheme, filtreStatut]
  );

  const parTheme = useMemo(() => {
    return themesRevendicatifs
      .map((theme) => ({
        theme,
        liste: filtrees.filter((r) => r.themeId === theme.id)
      }))
      .filter((g) => g.liste.length > 0);
  }, [filtrees]);

  const compteStatut = (id) => revendications.filter((r) => r.statut === id).length;

  // ---- Export PDF ----

  const exporterPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(20);
    doc.setTextColor(183, 28, 28);
    doc.text('Cahier revendicatif CGT', 105, 20, { align: 'center' });
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    if (entreprise.trim()) doc.text(entreprise.trim(), 105, 29, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Établi le ${new Date().toLocaleDateString('fr-FR')} — ${revendications.length} revendication(s)`, 105, 36, { align: 'center' });
    doc.setDrawColor(183, 28, 28);
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    let y = 48;
    themesRevendicatifs.forEach((theme) => {
      const liste = revendications.filter((r) => r.themeId === theme.id);
      if (liste.length === 0) return;
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFontSize(13);
      doc.setTextColor(183, 28, 28);
      doc.text(theme.label.toUpperCase(), 20, y);
      y += 3;
      autoTable(doc, {
        startY: y,
        head: [['Revendication', 'Service', 'Priorité', 'Statut']],
        body: liste.map((r) => [
          r.argumentaire.trim() || r.constat.trim()
            ? `${r.titre}\n${(r.constat.trim() ? `Constat : ${r.constat.trim()}` : '')}${r.constat.trim() && r.argumentaire.trim() ? '\n' : ''}${(r.argumentaire.trim() ? `Argumentaire : ${r.argumentaire.trim()}` : '')}`
            : r.titre,
          r.service || '—',
          PRIORITES.find((p) => p.id === r.priorite)?.label.replace(/^\S+\s/, '') || r.priorite,
          statutParId(r.statut).label
        ]),
        styles: { fontSize: 9, cellPadding: 2 },
        headStyles: { fillColor: [183, 28, 28] },
        columnStyles: { 0: { cellWidth: 95 }, 1: { cellWidth: 30 }, 2: { cellWidth: 22 }, 3: { cellWidth: 28 } },
        margin: { left: 20, right: 20 }
      });
      y = doc.lastAutoTable.finalY + 10;
    });

    doc.save(`cahier-revendicatif${entreprise.trim() ? `-${entreprise.trim().toLowerCase().replace(/\s+/g, '-')}` : ''}.pdf`);
  };

  const modeSauvegarde = firebaseEnabled && user && syndicat
    ? `✅ Cahier partagé avec « ${syndicat.nom} »`
    : '💾 Cahier enregistré sur cet appareil';

  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <h1 className={styles.titre}>📖 Cahier revendicatif</h1>
        <p className={styles.sousTitre}>
          Des besoins aux revendications : construisez, faites valider en AG,
          déposez à l'employeur et suivez ce qui est gagné.
        </p>
        <p className={styles.modeSauvegarde}>{modeSauvegarde}</p>
      </header>

      <div className={styles.barreHaut}>
        <input
          type="text"
          className={styles.entrepriseInput}
          placeholder="Entreprise / établissement"
          value={entreprise}
          onChange={(e) => majEntreprise(e.target.value)}
        />
        <button className={styles.bouton} onClick={() => setFormulaire({ ...revendicationVide })}>
          + Nouvelle revendication
        </button>
        <button
          className={styles.boutonSecondaire}
          onClick={exporterPDF}
          disabled={revendications.length === 0}
        >
          📄 Exporter le cahier (PDF)
        </button>
      </div>

      <div className={styles.statsLigne}>
        <div className={styles.stat}><strong>{revendications.length}</strong> au total</div>
        {STATUTS.map((s) => (
          <button
            key={s.id}
            className={`${styles.statFiltre} ${filtreStatut === s.id ? styles.statFiltreActif : ''}`}
            style={{ '--couleur-statut': s.couleur }}
            onClick={() => setFiltreStatut(filtreStatut === s.id ? '' : s.id)}
          >
            <strong>{compteStatut(s.id)}</strong> {s.label.toLowerCase()}
          </button>
        ))}
        <select
          className={styles.filtre}
          value={filtreTheme}
          onChange={(e) => setFiltreTheme(e.target.value)}
        >
          <option value="">Tous les thèmes</option>
          {themesRevendicatifs.map((t) => (
            <option key={t.id} value={t.id}>{t.icone} {t.label}</option>
          ))}
        </select>
      </div>

      {nbReponsesQuestionnaire > 0 && (
        <p className={styles.lienQuestionnaire}>
          💡 {nbReponsesQuestionnaire} réponse{nbReponsesQuestionnaire > 1 ? 's' : ''} au{' '}
          <Link to="/questionnaire">questionnaire des besoins</Link> peuvent alimenter ce cahier
          (volet Synthèse, bouton « cahier revendicatif »).
        </p>
      )}

      {formulaire && (
        <form className={styles.formulaire} onSubmit={enregistrerFormulaire}>
          <h2 className={styles.formulaireTitre}>
            {formulaire.id ? 'Modifier la revendication' : 'Nouvelle revendication'}
          </h2>
          <label className={styles.champ}>
            Revendication *
            <input
              type="text"
              value={formulaire.titre}
              onChange={champ('titre')}
              placeholder="ex : Revalorisation de la prime de nuit à 25%"
              required
              autoFocus
            />
          </label>
          <div className={styles.ligneQuadruple}>
            <label className={styles.champ}>
              Thème
              <select value={formulaire.themeId} onChange={champ('themeId')}>
                {themesRevendicatifs.map((t) => (
                  <option key={t.id} value={t.id}>{t.icone} {t.label}</option>
                ))}
              </select>
            </label>
            <label className={styles.champ}>
              Service concerné
              <input
                type="text"
                value={formulaire.service}
                onChange={champ('service')}
                placeholder="Tous / Logistique..."
              />
            </label>
            <label className={styles.champ}>
              Priorité
              <select value={formulaire.priorite} onChange={champ('priorite')}>
                {PRIORITES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </label>
            <label className={styles.champ}>
              Statut
              <select value={formulaire.statut} onChange={champ('statut')}>
                {STATUTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
          <label className={styles.champ}>
            Constat / besoin d'origine
            <textarea
              value={formulaire.constat}
              onChange={champ('constat')}
              rows={2}
              placeholder="La situation concrète qui motive la revendication..."
            />
          </label>
          <label className={styles.champ}>
            Argumentaire
            <textarea
              value={formulaire.argumentaire}
              onChange={champ('argumentaire')}
              rows={3}
              placeholder="Les arguments pour convaincre et négocier (chiffres, comparaisons, droit...)"
            />
          </label>
          <div className={styles.formulaireActions}>
            <button type="submit" className={styles.bouton}>
              {formulaire.id ? 'Enregistrer' : 'Ajouter au cahier'}
            </button>
            <button type="button" className={styles.boutonSecondaire} onClick={() => setFormulaire(null)}>
              Annuler
            </button>
          </div>
        </form>
      )}

      {revendications.length === 0 && !formulaire && (
        <div className={styles.vide}>
          <p>Le cahier est vide pour l'instant.</p>
          <p>
            Commencez par recueillir les besoins avec le{' '}
            <Link to="/questionnaire">questionnaire</Link>, puis ajoutez ici vos premières
            revendications.
          </p>
        </div>
      )}

      {parTheme.map(({ theme, liste }) => (
        <section key={theme.id} className={styles.sectionTheme}>
          <h2 className={styles.themeTitre} style={{ color: theme.couleur }}>
            {theme.icone} {theme.label}
            <span className={styles.themeCompteur}>{liste.length}</span>
          </h2>
          <ul className={styles.listeRevendications}>
            {liste.map((rev) => {
              const statut = statutParId(rev.statut);
              return (
                <li key={rev.id} className={styles.revendication} style={{ '--couleur-theme': theme.couleur }}>
                  <div className={styles.revendicationHaut}>
                    <h3 className={styles.revendicationTitre}>{rev.titre}</h3>
                    <span className={styles.badgeStatut} style={{ backgroundColor: statut.couleur }}>
                      {statut.label}
                    </span>
                  </div>
                  {(rev.constat || rev.argumentaire) && (
                    <div className={styles.revendicationDetails}>
                      {rev.constat && <p><strong>Constat :</strong> {rev.constat}</p>}
                      {rev.argumentaire && <p><strong>Argumentaire :</strong> {rev.argumentaire}</p>}
                    </div>
                  )}
                  <div className={styles.revendicationBas}>
                    <span className={styles.meta}>
                      {rev.service ? `📍 ${rev.service}` : '📍 tous services'}
                      {' · '}
                      {PRIORITES.find((p) => p.id === rev.priorite)?.label || rev.priorite}
                    </span>
                    <span className={styles.actions}>
                      <select
                        className={styles.statutSelect}
                        value={rev.statut}
                        onChange={(e) => changerStatut(rev, e.target.value)}
                        aria-label="Changer le statut"
                      >
                        {STATUTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                      <button className={styles.boutonPetit} onClick={() => setFormulaire({ ...rev })}>
                        ✏️ Modifier
                      </button>
                      <button className={styles.boutonPetitDanger} onClick={() => supprimer(rev)}>
                        🗑️
                      </button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default CahierRevendicatifTool;
