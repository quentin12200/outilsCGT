// src/components/pages/QuestionnaireTool.js
// Questionnaire de recueil des besoins des salariés.
//
// Deux volets :
//  - « Recueillir » : le questionnaire à faire remplir (tournée de service,
//    tablette qui circule, AG...). Chaque réponse est enregistrée puis le
//    formulaire se vide pour le salarié suivant.
//  - « Synthèse » : classement des priorités exprimées, lecture des réponses
//    ouvertes, export CSV, et envoi d'un besoin vers le cahier revendicatif.
//
// Les réponses sont sauvegardées localement et partagées avec l'espace
// syndicat quand Firebase est configuré (clé 'questionnaireReponses').

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import storageService from '../services/storageService';
import { useAuth } from '../../context/AuthContext';
import useSyncTempsReel from '../../hooks/useSyncTempsReel';
import { themesRevendicatifs, themeParId } from '../../data/themesRevendicatifs';
import styles from './QuestionnaireTool.module.css';

const REPONSES_KEY = 'questionnaireReponses';
const CAHIER_KEY = 'cahierRevendicatif';
const MAX_PRIORITES = 3;

const CSP_OPTIONS = [
  'Ouvrier·e',
  'Employé·e',
  'Technicien·ne / Agent de maîtrise',
  'Ingénieur·e / Cadre'
];

const reponseVide = {
  service: '',
  csp: '',
  priorites: [],
  attentes: '',
  revendication: '',
  pretAG: '',
  contact: ''
};

function QuestionnaireTool() {
  const { firebaseEnabled, user, syndicat } = useAuth();
  const [volet, setVolet] = useState('recueillir'); // 'recueillir' | 'synthese'
  const [reponses, setReponses] = useState([]);
  const [formulaire, setFormulaire] = useState(reponseVide);
  const [merci, setMerci] = useState(false);
  const [filtreService, setFiltreService] = useState('');
  const [envoyees, setEnvoyees] = useState({}); // besoins déjà envoyés au cahier
  const chargeRef = useRef(false);

  // Chargement : local d'abord, puis version partagée si disponible
  useEffect(() => {
    const charger = async () => {
      const local = storageService.loadFromLocal(REPONSES_KEY);
      if (local?.reponses) setReponses(local.reponses);
      const partage = await storageService.loadFromServer(REPONSES_KEY);
      if (partage?.reponses) setReponses(partage.reponses);
      chargeRef.current = true;
    };
    charger();
  }, [syndicat?.id]);

  // Temps réel : les réponses saisies par les camarades arrivent en direct
  useSyncTempsReel(REPONSES_KEY, (donnees) => {
    if (donnees?.reponses) setReponses(donnees.reponses);
  });

  const sauvegarder = (nouvellesReponses) => {
    const donnees = { reponses: nouvellesReponses, majLe: new Date().toISOString() };
    storageService.saveLocally(REPONSES_KEY, donnees);
    storageService.saveToServer(REPONSES_KEY, donnees);
  };

  // ---- Volet « Recueillir » ----

  const basculerPriorite = (themeId) => {
    setFormulaire((f) => {
      const deja = f.priorites.includes(themeId);
      if (deja) return { ...f, priorites: f.priorites.filter((p) => p !== themeId) };
      if (f.priorites.length >= MAX_PRIORITES) return f;
      return { ...f, priorites: [...f.priorites, themeId] };
    });
  };

  const champ = (nom) => (e) => setFormulaire((f) => ({ ...f, [nom]: e.target.value }));

  const formulaireValide =
    formulaire.priorites.length > 0 || formulaire.attentes.trim() !== '';

  const soumettre = (e) => {
    e.preventDefault();
    if (!formulaireValide) return;
    const nouvelle = {
      ...formulaire,
      id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString()
    };
    const nouvelles = [...reponses, nouvelle];
    setReponses(nouvelles);
    sauvegarder(nouvelles);
    setFormulaire((f) => ({ ...reponseVide, service: f.service })); // garde le service pour la tournée
    setMerci(true);
    window.scrollTo(0, 0);
  };

  // PDF vierge pour la distribution papier
  const imprimerVierge = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const gauche = 20;
    let y = 20;
    doc.setFontSize(16);
    doc.setTextColor(183, 28, 28);
    doc.text('Questionnaire CGT — Vos besoins, vos priorités', gauche, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("Vos réponses servent à construire le cahier revendicatif. Merci !", gauche, y);
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text('Votre service : ______________________    Votre catégorie : ______________________', gauche, y);
    y += 12;
    doc.setFont(undefined, 'bold');
    doc.text(`1. Vos ${MAX_PRIORITES} priorités (cochez) :`, gauche, y);
    doc.setFont(undefined, 'normal');
    y += 7;
    themesRevendicatifs.forEach((t) => {
      doc.rect(gauche, y - 3.5, 4, 4);
      doc.text(t.label, gauche + 7, y);
      y += 7;
    });
    y += 3;
    doc.setFont(undefined, 'bold');
    doc.text("2. Qu'est-ce qui doit changer en priorité dans votre travail ?", gauche, y);
    doc.setFont(undefined, 'normal');
    y += 8;
    for (let i = 0; i < 3; i++) { doc.line(gauche, y, 190, y); y += 8; }
    doc.setFont(undefined, 'bold');
    doc.text('3. Quelle revendication la CGT devrait-elle porter en premier ?', gauche, y);
    doc.setFont(undefined, 'normal');
    y += 8;
    for (let i = 0; i < 3; i++) { doc.line(gauche, y, 190, y); y += 8; }
    doc.setFont(undefined, 'bold');
    doc.text('4. Seriez-vous prêt·e à participer à une assemblée générale ?', gauche, y);
    doc.setFont(undefined, 'normal');
    y += 7;
    doc.text('☐ Oui        ☐ Non        ☐ Ne sait pas', gauche, y);
    y += 10;
    doc.text('Pour être recontacté·e (facultatif) : ____________________________________', gauche, y);
    doc.save('questionnaire-cgt.pdf');
  };

  // ---- Volet « Synthèse » ----

  const services = useMemo(
    () => [...new Set(reponses.map((r) => r.service.trim()).filter(Boolean))].sort(),
    [reponses]
  );

  const reponsesFiltrees = useMemo(
    () => (filtreService ? reponses.filter((r) => r.service.trim() === filtreService) : reponses),
    [reponses, filtreService]
  );

  const classement = useMemo(() => {
    const compte = {};
    reponsesFiltrees.forEach((r) => r.priorites.forEach((p) => { compte[p] = (compte[p] || 0) + 1; }));
    return themesRevendicatifs
      .map((t) => ({ theme: t, votes: compte[t.id] || 0 }))
      .filter((c) => c.votes > 0)
      .sort((a, b) => b.votes - a.votes);
  }, [reponsesFiltrees]);

  const maxVotes = classement.length ? classement[0].votes : 1;
  const pretsAG = reponsesFiltrees.filter((r) => r.pretAG === 'oui').length;
  const contacts = reponsesFiltrees.filter((r) => r.contact.trim()).length;

  const exporterCSV = () => {
    const entetes = ['date', 'service', 'categorie', 'priorites', 'attentes', 'revendication', 'pret_AG', 'contact'];
    const lignes = reponses.map((r) => [
      new Date(r.date).toLocaleDateString('fr-FR'),
      r.service,
      r.csp,
      r.priorites.map((p) => themeParId(p).label).join(' | '),
      r.attentes,
      r.revendication,
      r.pretAG,
      r.contact
    ]);
    const echapper = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = '﻿' + [entetes, ...lignes].map((l) => l.map(echapper).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(blob);
    lien.download = 'reponses-questionnaire-cgt.csv';
    lien.click();
    URL.revokeObjectURL(lien.href);
  };

  // Envoie un besoin exprimé vers le cahier revendicatif (brouillon « à discuter »)
  const envoyerAuCahier = async (reponse, texte) => {
    const cahierLocal = storageService.loadFromLocal(CAHIER_KEY);
    const cahierPartage = await storageService.loadFromServer(CAHIER_KEY);
    const cahier = cahierPartage || cahierLocal || { entreprise: '', revendications: [] };
    const revendications = cahier.revendications || [];
    revendications.push({
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      titre: texte.length > 90 ? `${texte.slice(0, 90)}…` : texte,
      constat: `Besoin exprimé via le questionnaire${reponse.service ? ` (service : ${reponse.service})` : ''} : « ${texte} »`,
      argumentaire: '',
      themeId: reponse.priorites[0] || 'autres',
      service: reponse.service || '',
      priorite: 'moyenne',
      statut: 'a-discuter',
      creeLe: new Date().toISOString()
    });
    const donnees = { ...cahier, revendications, majLe: new Date().toISOString() };
    storageService.saveLocally(CAHIER_KEY, donnees);
    storageService.saveToServer(CAHIER_KEY, donnees);
    setEnvoyees((prev) => ({ ...prev, [`${reponse.id}-${texte.slice(0, 20)}`]: true }));
  };

  const modeSauvegarde = firebaseEnabled && user && syndicat
    ? `✅ Réponses partagées avec « ${syndicat.nom} »`
    : '💾 Réponses enregistrées sur cet appareil';

  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <h1 className={styles.titre}>Questionnaire des besoins</h1>
        <p className={styles.sousTitre}>
          Partir des salariés : recueillir leurs priorités et leurs attentes pour
          construire un cahier revendicatif légitime.
        </p>
        <p className={styles.modeSauvegarde}>{modeSauvegarde}</p>
      </header>

      <div className={styles.volets} role="tablist">
        <button
          role="tab"
          aria-selected={volet === 'recueillir'}
          className={`${styles.volet} ${volet === 'recueillir' ? styles.voletActif : ''}`}
          onClick={() => setVolet('recueillir')}
        >
          📝 Recueillir
        </button>
        <button
          role="tab"
          aria-selected={volet === 'synthese'}
          className={`${styles.volet} ${volet === 'synthese' ? styles.voletActif : ''}`}
          onClick={() => { setVolet('synthese'); setMerci(false); }}
        >
          📊 Synthèse ({reponses.length})
        </button>
      </div>

      {volet === 'recueillir' && (
        <div className={styles.carte}>
          {merci ? (
            <div className={styles.merci}>
              <div className={styles.merciIcone}>✊</div>
              <h2>Merci pour vos réponses !</h2>
              <p>Elles alimentent directement le cahier revendicatif du syndicat.</p>
              <button className={styles.bouton} onClick={() => setMerci(false)}>
                Réponse suivante
              </button>
            </div>
          ) : (
            <form onSubmit={soumettre}>
              <div className={styles.ligneDouble}>
                <label className={styles.champ}>
                  Votre service / atelier
                  <input
                    type="text"
                    value={formulaire.service}
                    onChange={champ('service')}
                    placeholder="ex : Logistique"
                    list="listeServices"
                  />
                  <datalist id="listeServices">
                    {services.map((s) => <option key={s} value={s} />)}
                  </datalist>
                </label>
                <label className={styles.champ}>
                  Votre catégorie
                  <select value={formulaire.csp} onChange={champ('csp')}>
                    <option value="">— facultatif —</option>
                    {CSP_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
              </div>

              <fieldset className={styles.groupe}>
                <legend className={styles.legende}>
                  1. Vos priorités <span className={styles.indice}>(choisissez-en jusqu'à {MAX_PRIORITES})</span>
                </legend>
                <div className={styles.chips}>
                  {themesRevendicatifs.map((t) => {
                    const choisi = formulaire.priorites.includes(t.id);
                    const plein = !choisi && formulaire.priorites.length >= MAX_PRIORITES;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        className={`${styles.chip} ${choisi ? styles.chipChoisi : ''}`}
                        style={choisi ? { backgroundColor: t.couleur, borderColor: t.couleur } : undefined}
                        onClick={() => basculerPriorite(t.id)}
                        disabled={plein}
                        aria-pressed={choisi}
                      >
                        {t.icone} {t.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className={styles.champ}>
                2. Qu'est-ce qui doit changer en priorité dans votre travail ?
                <textarea
                  value={formulaire.attentes}
                  onChange={champ('attentes')}
                  rows={3}
                  placeholder="Décrivez la situation concrète..."
                />
              </label>

              <label className={styles.champ}>
                3. Quelle revendication la CGT devrait-elle porter en premier ?
                <textarea
                  value={formulaire.revendication}
                  onChange={champ('revendication')}
                  rows={2}
                  placeholder="Votre proposition..."
                />
              </label>

              <fieldset className={styles.groupe}>
                <legend className={styles.legende}>4. Seriez-vous prêt·e à participer à une assemblée générale ?</legend>
                <div className={styles.radios}>
                  {[['oui', 'Oui'], ['non', 'Non'], ['nsp', 'Ne sait pas']].map(([valeur, label]) => (
                    <label key={valeur} className={styles.radio}>
                      <input
                        type="radio"
                        name="pretAG"
                        value={valeur}
                        checked={formulaire.pretAG === valeur}
                        onChange={champ('pretAG')}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={styles.champ}>
                Pour être recontacté·e <span className={styles.indice}>(facultatif)</span>
                <input
                  type="text"
                  value={formulaire.contact}
                  onChange={champ('contact')}
                  placeholder="Nom, téléphone ou email"
                />
              </label>

              <div className={styles.actionsFormulaire}>
                <button type="submit" className={styles.bouton} disabled={!formulaireValide}>
                  Enregistrer la réponse
                </button>
                <button type="button" className={styles.boutonSecondaire} onClick={imprimerVierge}>
                  📄 Questionnaire papier (PDF)
                </button>
              </div>
              {!formulaireValide && (
                <p className={styles.indice}>Choisissez au moins une priorité ou décrivez une attente pour enregistrer.</p>
              )}
            </form>
          )}
        </div>
      )}

      {volet === 'synthese' && (
        <div>
          {reponses.length === 0 ? (
            <div className={styles.carte}>
              <p>Aucune réponse pour l'instant. Faites remplir le questionnaire lors de la
              tournée des services, ou distribuez la version papier puis saisissez les réponses ici.</p>
            </div>
          ) : (
            <>
              <div className={styles.statsLigne}>
                <div className={styles.stat}><strong>{reponsesFiltrees.length}</strong> réponse{reponsesFiltrees.length > 1 ? 's' : ''}</div>
                <div className={styles.stat}><strong>{pretsAG}</strong> prêt·es pour une AG</div>
                <div className={styles.stat}><strong>{contacts}</strong> contact{contacts > 1 ? 's' : ''} laissé{contacts > 1 ? 's' : ''}</div>
                {services.length > 0 && (
                  <select
                    className={styles.filtre}
                    value={filtreService}
                    onChange={(e) => setFiltreService(e.target.value)}
                  >
                    <option value="">Tous les services</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
                <button className={styles.boutonSecondaire} onClick={exporterCSV}>⬇️ Export CSV</button>
              </div>

              <div className={styles.carte}>
                <h2 className={styles.sectionTitre}>Priorités exprimées</h2>
                {classement.length === 0 && <p>Aucune priorité cochée dans ces réponses.</p>}
                {classement.map(({ theme, votes }) => (
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
              </div>

              <div className={styles.carte}>
                <h2 className={styles.sectionTitre}>Paroles de salariés</h2>
                <p className={styles.indice}>
                  Transformez les besoins exprimés en revendications : ils arrivent en
                  brouillon « à discuter » dans le <Link to="/cahier-revendicatif">cahier revendicatif</Link>.
                </p>
                <ul className={styles.listeParoles}>
                  {reponsesFiltrees
                    .flatMap((r) =>
                      [r.attentes, r.revendication]
                        .filter((texte) => texte && texte.trim())
                        .map((texte) => ({ reponse: r, texte: texte.trim() }))
                    )
                    .map(({ reponse, texte }) => {
                      const cle = `${reponse.id}-${texte.slice(0, 20)}`;
                      return (
                        <li key={cle} className={styles.parole}>
                          <blockquote>« {texte} »</blockquote>
                          <div className={styles.paroleMeta}>
                            <span>
                              {reponse.service || 'service non précisé'}
                              {reponse.csp ? ` — ${reponse.csp}` : ''}
                            </span>
                            {envoyees[cle] ? (
                              <span className={styles.envoye}>✓ envoyé au cahier</span>
                            ) : (
                              <button
                                className={styles.boutonPetit}
                                onClick={() => envoyerAuCahier(reponse, texte)}
                              >
                                → cahier revendicatif
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionnaireTool;
