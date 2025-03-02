// EcoleDemocratiePage.js
import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import PhaseAvant from '../Modules/Demarche/Phases/PhaseAvant';
import PhasePendant from '../Modules/Demarche/Phases/PhasePendant';
import PhaseApres from '../Modules/Demarche/Phases/PhaseApres';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';
import styles from './EcoleDemocratiePage.module.css';

const EcoleDemocratiePage = () => {
  const [activeTab, setActiveTab] = useState('schema');
  return (
    <Container className={styles.pageContainer}>
      <Row className="mb-4">
        <Col>
          <h1 className={styles.pageTitle}>École de la Démocratie CGT</h1>
          <p className={styles.pageDescription}>
            L'École de la Démocratie est un pilier fondamental de l'approche syndicale CGT.
            Elle structure notre démarche en trois phases essentielles - Avant, Pendant et Après -
            garantissant une pratique syndicale démocratique où chaque syndiqué est acteur
            des décisions et actions collectives.
          </p>
        </Col>
      </Row>

      <Tab.Container id="ecole-democratie-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row className="mb-4">
          <Col>
            <Nav variant="tabs" className={styles.navTabs}>
              <Nav.Item>
                <Nav.Link eventKey="schema" className={styles.navLink}>
                  Schéma Global
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="avant" className={styles.navLink}>
                  Phase Avant
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pendant" className={styles.navLink}>
                  Phase Pendant
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="apres" className={styles.navLink}>
                  Phase Après
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="schema">
                <SchemaGlobal />
              </Tab.Pane>
              <Tab.Pane eventKey="avant">
                <PhaseAvant />
              </Tab.Pane>
              <Tab.Pane eventKey="pendant">
                <PhasePendant />
              </Tab.Pane>
              <Tab.Pane eventKey="apres">
                <PhaseApres />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Row className="mt-5">
        <Col>
          <div className={styles.ressourcesBox}>
            <h3>Ressources complémentaires</h3>
            <ul>
              <li>Guide pratique de la démarche démocratique CGT</li>
              <li>Formation "Acteur dans la CGT"</li>
              <li>Fiches pratiques d'animation de réunions</li>
              <li>Modèles de documents pour la consultation des syndiqués</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EcoleDemocratiePage;