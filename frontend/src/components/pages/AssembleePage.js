// src/components/pages/AssembleePage.js
import React, { useState } from 'react';
import styles from './AssembleePage.module.css';

function AssembleePage() {
  const [activeTab, setActiveTab] = useState('pourquoi');

  // Définition des onglets
  const tabs = [
    { id: 'pourquoi', label: 'Pourquoi des AG?' },
    { id: 'preparation', label: 'Préparation' },
    { id: 'animation', label: 'Animation' },
    { id: 'suivi', label: 'Suivi et actions' },
    { id: 'outils', label: 'Outils pratiques' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Assemblées Générales</h1>
        <p className={styles.subtitle}>
          L'AG : un moment démocratique essentiel et le point de départ de toute démarche syndicale efficace
        </p>
      </header>

      <div className={styles.card}>
        <blockquote className={styles.blockquote}>
          "C'est la capacité du syndicat à mettre en œuvre le processus démocratique capable de déployer des syndiqués,
          auteurs, acteurs et décideurs pour construire le cahier revendicatif répondant aux besoins exprimés au plus près
          des postes de travail."
        </blockquote>

        {/* Navigation par onglets */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        <div className={styles.tabContent}>
          {activeTab === 'pourquoi' && (
            <div>
              <h2 className={styles.sectionTitle}>Les AG : cœur battant de la démarche syndicale</h2>
              <div className={styles.grid}>
                <div className={`${styles.box} ${styles.redBox}`}>
                  <h3 className={styles.boxTitle}>L'AG des syndiqués</h3>
                  <p className={styles.boxText}>
                    Point de départ essentiel pour toute démarche revendicative, l'AG des syndiqués permet de :
                  </p>
                  <ul className={styles.list}>
                    <li>Construire <strong>collectivement</strong> les revendications</li>
                    <li>Impliquer les syndiqués comme <strong>auteurs, acteurs et décideurs</strong></li>
                    <li>Planifier démocratiquement les actions à mener</li>
                    <li>Renforcer la cohésion et l'engagement des militants</li>
                  </ul>
                </div>

                <div className={`${styles.box} ${styles.blueBox}`}>
                  <h3 className={styles.boxTitle}>L'AG des salariés</h3>
                  <p className={styles.boxText}>
                    Moment clé de mobilisation, l'AG des salariés permet de :
                  </p>
                  <ul className={styles.list}>
                    <li>Présenter les revendications élaborées démocratiquement</li>
                    <li>Débattre avec l'ensemble des salariés</li>
                    <li>Mobiliser au-delà des seuls syndiqués</li>
                    <li>Construire un rapport de force pour les négociations</li>
                  </ul>
                </div>
              </div>

              <h3 className={styles.subsectionTitle}>Les 3 types d'AG essentielles</h3>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHead}>
                    <tr>
                      <th className={styles.tableHeader}>Type d'AG</th>
                      <th className={styles.tableHeader}>Étape</th>
                      <th className={styles.tableHeader}>Objectifs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>AG des syndiqués (1)</td>
                      <td className={styles.tableCell}>Préparation et lancement</td>
                      <td className={styles.tableCell}>
                        Présentation des enjeux, du contexte, de la démarche et du rétroplanning.<br />
                        Lancement de la consultation sur les besoins.
                      </td>
                    </tr>
                    <tr className={styles.tableRowAlt}>
                      <td className={styles.tableCell}>AG des syndiqués (2)</td>
                      <td className={styles.tableCell}>Élaboration revendicative</td>
                      <td className={styles.tableCell}>
                        Analyse des besoins recueillis.<br />
                        Élaboration démocratique des revendications et des listes représentatives.
                      </td>
                    </tr>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>AG des salariés</td>
                      <td className={styles.tableCell}>Mobilisation</td>
                      <td className={styles.tableCell}>
                        Présentation de la démarche et mise en débat démocratique des revendications.<br />
                        Mobilisation pour l'action collective.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`${styles.box} ${styles.yellowBox}`}>
                <h3 className={styles.boxTitle}>Impacts d'une AG réussie</h3>
                <div className={styles.grid}>
                  <div className={styles.smallBox}>
                    <h4 className={styles.smallBoxTitle}>Information</h4>
                    <p className={styles.smallBoxText}>
                      Communiquez régulièrement sur l'avancement des actions et les résultats obtenus pour maintenir la dynamique collective.
                    </p>
                  </div>
                  <div className={styles.smallBox}>
                    <h4 className={styles.smallBoxTitle}>Valorisation</h4>
                    <p className={styles.smallBoxText}>
                      Mettez en avant les réussites, même partielles, pour encourager la mobilisation et reconnaître l'engagement des militants.
                    </p>
                  </div>
                  <div className={styles.smallBox}>
                    <h4 className={styles.smallBoxTitle}>Évaluation</h4>
                    <p className={styles.smallBoxText}>
                      Analysez régulièrement l'efficacité des actions pour adapter la stratégie et améliorer les méthodes.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${styles.box} ${styles.redBox}`}>
                <h3 className={styles.boxTitle}>Préparer la prochaine AG</h3>
                <p className={styles.boxText}>
                  Chaque AG doit s'inscrire dans un processus continu :
                </p>
                <ul className={styles.list}>
                  <li>Faire le bilan de l'AG précédente (participation, dynamique, décisions...)</li>
                  <li>Identifier les points à améliorer dans l'organisation et l'animation</li>
                  <li>Évaluer l'impact des actions menées suite aux décisions prises</li>
                  <li>Préparer la prochaine AG avec les enseignements tirés</li>
                </ul>
                <p className={styles.boxNote}>
                  La régularité des AG est un facteur clé pour maintenir la dynamique syndicale et la mobilisation des salariés.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'outils' && (
            <div>
              <h2 className={styles.sectionTitle}>Outils pratiques pour des AG réussies</h2>
              <div className={styles.grid}>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Modèles de documents</h3>
                  <ul className={styles.list}>
                    <li>
                      Convocation d'AG des syndiqués
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Tract d'annonce d'AG des salariés
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Feuille d'émargement
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Modèle de compte-rendu
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Tableau de suivi des actions
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                  </ul>
                </div>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Supports pédagogiques</h3>
                  <ul className={styles.list}>
                    <li>
                      Guide de l'animateur d'AG
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Fiches techniques d'animation
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Présentation PowerPoint "AG efficace"
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Formation "Animer une AG syndicale"
                      <button className={styles.resourceButton}>Télécharger</button>
                    </li>
                    <li>
                      Tutoriel vidéo "Préparer une AG"
                      <button className={styles.resourceButton}>Voir la vidéo</button>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className={styles.subsectionTitle}>Cycle de vie d'une AG</h3>
              <div className={styles.card}>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead className={styles.tableHead}>
                      <tr>
                        <th className={styles.tableHeader}>Phase</th>
                        <th className={styles.tableHeader}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.tableRow}>
                        <td className={styles.tableCell}>Avant</td>
                        <td className={styles.tableCell}>Préparation, planification et communication préliminaire</td>
                      </tr>
                      <tr className={styles.tableRowAlt}>
                        <td className={styles.tableCell}>Pendant</td>
                        <td className={styles.tableCell}>Animation, prise de parole et mobilisation pendant l'AG</td>
                      </tr>
                      <tr className={styles.tableRow}>
                        <td className={styles.tableCell}>Après</td>
                        <td className={styles.tableCell}>Suivi, compte-rendu et plan d'action post-AG</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.box}>
                <h3 className={styles.boxTitle}>Besoin d'accompagnement pour vos AG ?</h3>
                <p className={styles.boxText}>
                  Notre équipe de formation peut vous accompagner pour améliorer l'organisation et l'animation de vos AG :
                </p>
                <ul className={styles.list}>
                  <li>Formation sur site à l'animation d'AG</li>
                  <li>Accompagnement à la préparation d'AG spécifiques</li>
                  <li>Conseils personnalisés sur vos supports et méthodes</li>
                </ul>
                <button className={styles.fixedButton}>Demander un accompagnement</button>
              </div>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div>
              <h2 className={styles.sectionTitle}>Préparer une AG efficace</h2>
              <div className={styles.box}>
                <h3 className={styles.boxTitle}>Checklist de préparation</h3>
                <div className={styles.grid}>
                  {["Définir clairement l'objectif de l'AG", "Choisir date, horaire et lieu adaptés", "Préparer un ordre du jour précis", "Informer largement (affichage, tract, mail...)", "Préparer les documents à distribuer", "Vérifier l'équipement et la logistique", "Désigner animateur et rapporteur", "Prévoir les votes nécessaires"].map((item, index) => (
                    <div key={index} className={styles.checkboxItem}>
                      <input type="checkbox" id={`prep${index}`} />
                      <label htmlFor={`prep${index}`}>{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className={styles.subsectionTitle}>Élaborer un ordre du jour efficace</h3>
              <div className={styles.box}>
                <ol className={styles.list}>
                  <li>
                    <strong className={styles.boxTitle}>Introduction</strong>
                    <ul className={styles.list}>
                      <li>Accueil et présentation des participants</li>
                      <li>Rappel de l'objectif de l'AG</li>
                      <li>Validation de l'ordre du jour</li>
                    </ul>
                  </li>
                  <li>
                    <strong className={styles.boxTitle}>Informations</strong>
                    <ul className={styles.list}>
                      <li>Point sur la situation (entreprise, secteur, actualités)</li>
                      <li>Compte-rendu des actions menées</li>
                    </ul>
                  </li>
                  <li>
                    <strong className={styles.boxTitle}>Débat</strong>
                    <ul className={styles.list}>
                      <li>Présentation des enjeux et des besoins recueillis</li>
                      <li>Discussion ouverte et constructive</li>
                      <li>Formulation des propositions</li>
                    </ul>
                  </li>
                  <li>
                    <strong className={styles.boxTitle}>Décisions</strong>
                    <ul className={styles.list}>
                      <li>Vote sur les propositions</li>
                      <li>Élaboration du plan d'action</li>
                      <li>Désignation des responsables de chaque action</li>
                    </ul>
                  </li>
                  <li>
                    <strong className={styles.boxTitle}>Conclusion</strong>
                    <ul className={styles.list}>
                      <li>Synthèse des décisions prises</li>
                      <li>Calendrier des prochaines échéances</li>
                      <li>Mot de la fin mobilisateur</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className={styles.grid}>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Communication avant l'AG</h3>
                  <ul className={styles.list}>
                    <li>Envoi des convocations au moins 15 jours à l'avance</li>
                    <li>Affichage visible sur les panneaux syndicaux</li>
                    <li>Distribution de tracts avec horaire, lieu et ordre du jour</li>
                    <li>Relances individuelles (surtout pour les syndiqués)</li>
                    <li>Communication sur l'importance des enjeux abordés</li>
                  </ul>
                </div>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Logistique</h3>
                  <ul className={styles.list}>
                    <li>Salle adaptée au nombre de participants attendus</li>
                    <li>Disposition favorisant les échanges (cercle, U...)</li>
                    <li>Matériel nécessaire (vidéoprojecteur, paperboard...)</li>
                    <li>Documents imprimés en nombre suffisant</li>
                    <li>Feuille d'émargement pour tracer la participation</li>
                    <li>Prévoir rafraîchissements/collation si possible</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'animation' && (
            <div>
              <h2 className={styles.sectionTitle}>Animer efficacement une AG</h2>
              <div className={styles.grid}>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Les rôles clés</h3>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>L'animateur</h4>
                    <ul className={styles.list}>
                      <li>Introduit la réunion et présente l'ordre du jour</li>
                      <li>Distribue la parole équitablement</li>
                      <li>Veille au respect du timing</li>
                      <li>Recentre les débats si nécessaire</li>
                      <li>Synthétise les échanges</li>
                      <li>Fait procéder aux votes</li>
                    </ul>
                  </div>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>Le rapporteur</h4>
                    <ul className={styles.list}>
                      <li>Prend des notes sur le déroulement</li>
                      <li>Enregistre les décisions prises</li>
                      <li>Relève les points à approfondir</li>
                      <li>Rédige le compte-rendu</li>
                    </ul>
                  </div>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>Les intervenants</h4>
                    <ul className={styles.list}>
                      <li>Préparent leurs interventions à l'avance</li>
                      <li>Présentent clairement les sujets</li>
                      <li>Répondent aux questions</li>
                      <li>Contribuent à la dynamique collective</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Les techniques d'animation</h3>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>Tour de table</h4>
                    <p className={styles.boxText}>
                      Permet à chacun de s'exprimer brièvement. Utile en début de réunion pour les présentations ou en fin pour un ressenti.
                    </p>
                  </div>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>Débat organisé</h4>
                    <p className={styles.boxText}>
                      Alternance de présentations courtes et de temps d'échanges. Efficace pour traiter plusieurs sujets.
                    </p>
                  </div>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>Brainstorming</h4>
                    <p className={styles.boxText}>
                      Recueil sans filtrage des idées, puis organisation et priorisation. Idéal pour trouver des solutions créatives.
                    </p>
                  </div>
                  <div className={styles.box}>
                    <h4 className={styles.boxTitle}>Travail en sous-groupes</h4>
                    <p className={styles.boxText}>
                      Division en petits groupes pour approfondir des thèmes, puis mise en commun. Favorise l'implication de tous.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.box}>
                <h3 className={styles.boxTitle}>Bonnes pratiques pour une animation réussie</h3>
                <ul className={styles.list}>
                  <li>Commencer et terminer à l'heure prévue</li>
                  <li>Présenter clairement les objectifs de la réunion</li>
                  <li>Établir collectivement quelques règles de fonctionnement</li>
                  <li>Favoriser l'expression de tous, y compris les plus réservés</li>
                  <li>Reformuler régulièrement pour s'assurer de la bonne compréhension</li>
                  <li>Gérer les personnalités difficiles avec diplomatie</li>
                  <li>Faire des synthèses régulières pour jalonner la progression</li>
                  <li>Conclure par des décisions claires et un plan d'action</li>
                </ul>
              </div>
              <h3 className={styles.subsectionTitle}>Gérer les situations difficiles</h3>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHead}>
                    <tr>
                      <th className={styles.tableHeader}>Situation</th>
                      <th className={styles.tableHeader}>Comment réagir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>Monopolisation de la parole</td>
                      <td className={styles.tableCell}>
                        "Merci pour cette contribution. Pour permettre à chacun de s'exprimer, je propose de donner la parole à d'autres personnes..."
                      </td>
                    </tr>
                    <tr className={styles.tableRowAlt}>
                      <td className={styles.tableCell}>Digression du sujet</td>
                      <td className={styles.tableCell}>
                        "Ce point est intéressant, mais il nous éloigne du sujet principal. Pouvons-nous le noter pour y revenir ultérieurement et poursuivre sur notre ordre du jour ?"
                      </td>
                    </tr>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>Tension ou conflit</td>
                      <td className={styles.tableCell}>
                        "Je comprends que ce sujet suscite des émotions. Prenons un moment pour clarifier les points de vue en nous concentrant sur les faits et les solutions possibles."
                      </td>
                    </tr>
                    <tr className={styles.tableRowAlt}>
                      <td className={styles.tableCell}>Faible participation</td>
                      <td className={styles.tableCell}>
                        Poser des questions ouvertes et directes. Utiliser des techniques comme le tour de table ou les sous-groupes pour favoriser l'expression de tous.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'suivi' && (
            <div>
              <h2 className={styles.sectionTitle}>Après l'AG : suivi et actions</h2>
              <div className={`${styles.box} ${styles.blueBox}`}>
                <h3 className={styles.boxTitle}>Le compte-rendu : outil essentiel</h3>
                <p className={styles.boxText}>
                  Un compte-rendu efficace doit être :<br />
                  - Rapide : diffusé dans les 48h suivant l'AG<br />
                  - Précis : refléter fidèlement les débats et décisions<br />
                  - Structuré : suivre l'ordre du jour avec des rubriques claires<br />
                  - Accessible : lisible et compréhensible par tous<br />
                  - Actionnable : mentionner clairement les décisions et responsables
                </p>
              </div>
              <div className={styles.grid}>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Plan d'action</h3>
                  <ol className={styles.list}>
                    <li><strong className={styles.boxTitle}>Quoi :</strong> actions concrètes à mener</li>
                    <li><strong className={styles.boxTitle}>Qui :</strong> responsables désignés</li>
                    <li><strong className={styles.boxTitle}>Quand :</strong> échéances précises</li>
                    <li><strong className={styles.boxTitle}>Comment :</strong> moyens nécessaires</li>
                    <li><strong className={styles.boxTitle}>Pourquoi :</strong> objectifs visés</li>
                  </ol>
                  <div className={styles.smallBox}>
                    <p className={styles.smallBoxText}>Exemple :</p>
                    <p className={styles.smallBoxText}>Action : Distribution de tracts sur les revendications salariales</p>
                    <p className={styles.smallBoxText}>Responsable : Marie et son équipe</p>
                    <p className={styles.smallBoxText}>Quand : Jeudi 15 mars, 7h30-9h00</p>
                    <p className={styles.smallBoxText}>Moyens : 200 tracts à imprimer, 4 militants mobilisés</p>
                    <p className={styles.smallBoxText}>Objectif : Informer les salariés des propositions CGT avant la NAO</p>
                  </div>
                </div>
                <div className={styles.box}>
                  <h3 className={styles.boxTitle}>Suivi des décisions</h3>
                  <ul className={styles.list}>
                    <li>Mettre en place un tableau de suivi des actions</li>
                    <li>Organiser des points d'étape réguliers</li>
                    <li>Relancer les responsables si nécessaire</li>
                    <li>Adapter le plan en cas d'obstacles</li>
                    <li>Communiquer sur les avancées</li>
                  </ul>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead className={styles.tableHead}>
                        <tr>
                          <th className={styles.tableHeader}>Action</th>
                          <th className={styles.tableHeader}>Resp.</th>
                          <th className={styles.tableHeader}>Délai</th>
                          <th className={styles.tableHeader}>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={styles.tableRow}>
                          <td className={styles.tableCell}>Rédaction tract</td>
                          <td className={styles.tableCell}>Jean</td>
                          <td className={styles.tableCell}>10/03</td>
                          <td className={styles.tableCell}>
                            <span className={styles.statusActive}>Fait</span>
                          </td>
                        </tr>
                        <tr className={styles.tableRowAlt}>
                          <td className={styles.tableCell}>Distribution tract</td>
                          <td className={styles.tableCell}>Marie</td>
                          <td className={styles.tableCell}>15/03</td>
                          <td className={styles.tableCell}>
                            <span className={styles.statusPending}>En cours</span>
                          </td>
                        </tr>
                        <tr className={styles.tableRow}>
                          <td className={styles.tableCell}>Demande audience</td>
                          <td className={styles.tableCell}>Paul</td>
                          <td className={styles.tableCell}>20/03</td>
                          <td className={styles.tableCell}>
                            <span className={styles.statusTodo}>À faire</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className={styles.box}>
                <h3 className={styles.boxTitle}>Communication et mobilisation</h3>
                <div className={styles.grid}>
                  <div className={styles.box}>
                    <p className={styles.boxText}>
                      Expliquer comment la communication interne et externe est organisée pour assurer une mobilisation optimale.
                    </p>
                  </div>
                  <div className={styles.box}>
                    <p className={styles.boxText}>
                      Présenter les canaux de communication utilisés pour informer les salariés des actions en cours et des avancées.
                    </p>
                  </div>
                  <div className={styles.box}>
                    <p className={styles.boxText}>
                      Indiquer comment les retours d'expérience sont recueillis et analysés pour ajuster la stratégie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.fixedSection}>
        <h2 className={styles.fixedTitle}>Les AG, pilier de la démarche démocratique CGT</h2>
        <div className={styles.fixedGrid}>
          <div className={styles.fixedCard}>
            <h3 className={styles.fixedCardTitle}>3 principes fondamentaux</h3>
            <ol className={styles.fixedList}>
              <li>
                <strong>Démocratie syndicale</strong> - Les syndiqués sont auteurs, acteurs et décideurs
              </li>
              <li>
                <strong>Démarche revendicative</strong> - Partir des besoins réels exprimés par les salariés
              </li>
              <li>
                <strong>Mobilisation collective</strong> - Construire un rapport de force favorable
              </li>
            </ol>
          </div>
          <div className={styles.fixedCard}>
            <h3 className={styles.fixedCardTitle}>La dynamique des AG</h3>
            <p className={styles.fixedParagraph}>
              Les AG ne sont pas des événements isolés mais s'inscrivent dans une démarche continue :
            </p>
            <ul className={styles.fixedList}>
              <li>Elles <strong>rythment</strong> la vie syndicale</li>
              <li>Elles <strong>renforcent</strong> la cohésion</li>
              <li>Elles <strong>légitiment</strong> les revendications</li>
              <li>Elles <strong>dynamisent</strong> la syndicalisation</li>
            </ul>
          </div>
        </div>
        <div className={styles.fixedFooter}>
          <blockquote className={styles.fixedQuote}>
            "Une AG réussie est celle qui fait d'abord participer et s'exprimer ses membres avant de prendre des décisions."
          </blockquote>
          <p className={styles.fixedCall}>
            Vous avez réalisé une AG qui a particulièrement bien fonctionné ?
          </p>
          <button className={styles.fixedButton}>Partagez votre expérience</button>
        </div>
      </div>
    </div>
  );
}

export default AssembleePage;
