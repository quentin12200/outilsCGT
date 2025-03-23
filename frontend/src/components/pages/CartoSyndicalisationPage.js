// src/components/pages/CartoSyndicalisationPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CartoMain from '../CartoModule/CartoMain';
import SyndicalisationMain from '../Modules/SyndicalisationModule/SyndicalisationMain';
import CartographieAvancee from '../CartoModule/CartographieAvancee';
import styles from './CartoSyndicalisationPage.module.css';
import { FaFilePdf, FaBuilding, FaChartBar, FaMapMarkedAlt, FaChartPie, FaFileExport, FaFileDownload, FaQuestionCircle } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import heroImage from '../../assets/hero-image.png'; // Import de l'image du héros

const CartoSyndicalisationPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('cartographie');
  const [companyName, setCompanyName] = useState('');
  const cartoMainRef = useRef(null);
  const syndicalisationRef = useRef(null);
  const cartoAvanceeRef = useRef(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Effet pour définir l'onglet actif en fonction du paramètre d'URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['cartographie', 'syndicalisation', 'avancee'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const generatePDF = async () => {
    if (!cartoMainRef.current) return;
    
    try {
      // Récupérer les références aux sections
      const fullSynthesisRef = cartoMainRef.current.getFullSynthesisRef();
      const cardBlockRef = cartoMainRef.current.getCardBlockRef();
      const stats = cartoMainRef.current.getStats();
      
      if (!fullSynthesisRef) {
        alert('Veuillez d\'abord soumettre les données pour générer un PDF.');
        return;
      }
      
      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      
      // Ajouter l'en-tête avec le nom de l'entreprise
      pdf.setFontSize(18);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Cartographie Syndicale`, 105, 15, { align: 'center' });
      
      // Ajouter le nom de l'entreprise
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`${companyName || 'Entreprise'}`, 105, 25, { align: 'center' });
      
      // Ajouter une ligne de séparation
      pdf.setDrawColor(185, 28, 28); // Rouge CGT
      pdf.setLineWidth(0.5);
      pdf.line(20, 30, 190, 30);
      
      // Ajouter la date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gris
      const today = new Date().toLocaleDateString('fr-FR');
      pdf.text(`Généré le ${today}`, 190, 35, { align: 'right' });
      
      // Ajouter les statistiques principales
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`Salariés totaux: ${stats.totalSalaries}`, 20, 45);
      pdf.text(`Syndiqués totaux: ${stats.totalSyndiques}`, 20, 52);
      
      // Mettre en évidence le taux global
      pdf.setFontSize(14);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Taux de syndicalisation global: ${stats.globalRatio.toFixed(1)}%`, 20, 60);
      
      // Capturer la section de synthèse complète
      const canvas = await html2canvas(fullSynthesisRef, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200, // Largeur fixe pour une meilleure qualité
        allowTaint: true, // Permet de capturer des éléments avec des sources croisées
        foreignObjectRendering: false, // Désactive le rendu d'objets étrangers pour une meilleure compatibilité
        onclone: (document, clone) => {
          // Ajuster le clone pour une meilleure capture
          const element = clone.querySelector('.fullSynthesisSection');
          if (element) {
            element.style.width = '1100px';
            element.style.margin = '0';
            element.style.padding = '20px';
            element.style.boxShadow = 'none';
            
            // S'assurer que les éléments du graphique sont correctement capturés
            const pieCharts = clone.querySelectorAll('.pieChart, .pieChartWrapper');
            pieCharts.forEach(chart => {
              chart.style.overflow = 'visible';
              chart.style.zIndex = '1';
            });
            
            // S'assurer que les annotations sont visibles
            const annotations = clone.querySelectorAll('.pieAnnotations, .syndiquesAnnotation, .nonSyndiquesAnnotation');
            annotations.forEach(annotation => {
              annotation.style.overflow = 'visible';
              annotation.style.zIndex = '2';
            });
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 170; // Largeur de l'image en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Vérifier si l'image dépasse la première page
      const firstPageHeight = 220; // Hauteur disponible sur la première page en mm (après l'en-tête)
      
      if (imgHeight <= firstPageHeight) {
        // Si l'image tient sur la première page, l'ajouter directement
        pdf.addImage(imgData, 'PNG', 20, 70, imgWidth, imgHeight);
      } else {
        // Si l'image est trop grande, la diviser sur plusieurs pages
        let heightLeft = imgHeight;
        let position = 70; // Position initiale
        let page = 1;
        
        // Ajouter la première partie de l'image
        pdf.addImage(imgData, 'PNG', 20, position, imgWidth, Math.min(firstPageHeight, imgHeight));
        heightLeft -= firstPageHeight;
        
        // Ajouter les parties restantes sur de nouvelles pages
        while (heightLeft > 0) {
          position = 20; // Position en haut de la nouvelle page
          page++;
          pdf.addPage();
          
          // Ajouter un en-tête léger sur les pages suivantes
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(`${companyName || 'Entreprise'} - Cartographie Syndicale (suite)`, 105, 10, { align: 'center' });
          
          // Calculer la hauteur à ajouter sur cette page
          const pageHeight = 250; // Hauteur disponible sur les pages suivantes
          
          pdf.addImage(
            imgData, 
            'PNG', 
            20, 
            position - (page - 1) * pageHeight, // Décaler l'image vers le haut
            imgWidth, 
            imgHeight
          );
          
          heightLeft -= pageHeight;
        }
      }
      
      // Ajouter la cartographie des services
      if (cardBlockRef) {
        // Ajouter une nouvelle page pour la cartographie des services
        pdf.addPage();
        
        // Ajouter un titre pour la section
        pdf.setFontSize(16);
        pdf.setTextColor(185, 28, 28); // Rouge CGT
        pdf.text('Cartographie des services', 105, 20, { align: 'center' });
        
        // Capturer la section de cartographie des services
        const serviceCanvas = await html2canvas(cardBlockRef, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 1200,
          allowTaint: true,
          foreignObjectRendering: false,
          onclone: (document, clone) => {
            // Ajuster le clone pour une meilleure capture
            const cardBlock = clone.querySelector('[class*="CartoMain_cardBlock"]');
            if (cardBlock) {
              cardBlock.style.width = '1100px';
              cardBlock.style.margin = '0';
              cardBlock.style.padding = '20px';
              cardBlock.style.boxShadow = 'none';
              
              // Ajuster les cartes de service pour la capture
              const cards = clone.querySelectorAll('[class*="ServiceCard_card"]');
              cards.forEach(card => {
                card.style.margin = '10px';
                card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              });
            }
          }
        });
        
        const serviceImgData = serviceCanvas.toDataURL('image/png');
        const serviceImgWidth = 170; // Largeur de l'image en mm
        const serviceImgHeight = serviceCanvas.height * serviceImgWidth / serviceCanvas.width;
        
        // Ajouter l'image de la cartographie des services
        pdf.addImage(serviceImgData, 'PNG', 20, 30, serviceImgWidth, serviceImgHeight);
      }
      
      // Ajouter les données de syndicalisation si l'onglet est actif
      if (syndicalisationRef.current) {
        // Ajouter une nouvelle page pour les données de syndicalisation
        pdf.addPage();
        
        // Ajouter un titre pour la section
        pdf.setFontSize(16);
        pdf.setTextColor(185, 28, 28); // Rouge CGT
        pdf.text('Analyse de syndicalisation', 105, 20, { align: 'center' });
        
        // Récupérer les données de syndicalisation
        const syndicalisationData = syndicalisationRef.current.getSyndicalisationData();
        const statsRef = syndicalisationRef.current.getStatsRef();
        
        if (statsRef) {
          // Capturer la section de statistiques de syndicalisation
          const syndicalisationCanvas = await html2canvas(statsRef, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 1200,
            allowTaint: true,
            foreignObjectRendering: false
          });
          
          const syndicalisationImgData = syndicalisationCanvas.toDataURL('image/png');
          const syndicalisationImgWidth = 170; // Largeur de l'image en mm
          const syndicalisationImgHeight = syndicalisationCanvas.height * syndicalisationImgWidth / syndicalisationCanvas.width;
          
          // Ajouter l'image des statistiques de syndicalisation
          pdf.addImage(syndicalisationImgData, 'PNG', 20, 30, syndicalisationImgWidth, syndicalisationImgHeight);
        }
      }
      
      // Ajouter un pied de page
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gris
      pdf.text(`Document généré par l'outil de cartographie CGT`, 105, 285, { align: 'center' });
      
      // Sauvegarder le PDF
      const fileName = companyName 
        ? `cartographie-${companyName.replace(/\s+/g, '-').toLowerCase()}.pdf` 
        : 'cartographie-syndicale.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  // Fonction pour exporter uniquement la cartographie
  const exportCartographie = async () => {
    if (!cartoMainRef.current) return;
    
    try {
      const cardBlockRef = cartoMainRef.current.getCardBlockRef();
      const stats = cartoMainRef.current.getStats();
      
      if (!cardBlockRef) {
        alert('Veuillez d\'abord soumettre les données pour générer un PDF.');
        return;
      }
      
      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Ajouter l'en-tête
      pdf.setFontSize(18);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Cartographie des services`, 105, 15, { align: 'center' });
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`${companyName || 'Entreprise'}`, 105, 25, { align: 'center' });
      
      // Ajouter les statistiques principales
      pdf.setFontSize(12);
      pdf.text(`Salariés totaux: ${stats.totalSalaries}`, 20, 40);
      pdf.text(`Syndiqués totaux: ${stats.totalSyndiques}`, 20, 47);
      pdf.text(`Taux de syndicalisation: ${stats.globalRatio.toFixed(1)}%`, 20, 54);
      
      // Capturer la section de cartographie des services
      const serviceCanvas = await html2canvas(cardBlockRef, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const serviceImgData = serviceCanvas.toDataURL('image/png');
      const serviceImgWidth = 170; // Largeur de l'image en mm
      const serviceImgHeight = serviceCanvas.height * serviceImgWidth / serviceCanvas.width;
      
      // Ajouter l'image de la cartographie des services
      pdf.addImage(serviceImgData, 'PNG', 20, 65, serviceImgWidth, serviceImgHeight);
      
      // Sauvegarder le PDF
      const fileName = companyName 
        ? `cartographie-services-${companyName.replace(/\s+/g, '-').toLowerCase()}.pdf` 
        : 'cartographie-services.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  // Fonction pour exporter uniquement les données de syndicalisation
  const exportSyndicalisation = async () => {
    if (!syndicalisationRef.current) return;
    
    try {
      const statsRef = syndicalisationRef.current.getStatsRef();
      const syndicalisationData = syndicalisationRef.current.getSyndicalisationData();
      
      if (!statsRef) {
        alert('Veuillez d\'abord soumettre les données pour générer un PDF.');
        return;
      }
      
      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Ajouter l'en-tête
      pdf.setFontSize(18);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Analyse de syndicalisation`, 105, 15, { align: 'center' });
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`${companyName || 'Entreprise'}`, 105, 25, { align: 'center' });
      
      // Ajouter les statistiques principales
      pdf.setFontSize(12);
      pdf.text(`Syndiqués actuels: ${syndicalisationData.currentMembers}`, 20, 40);
      pdf.text(`Salariés totaux: ${syndicalisationData.totalEmployees}`, 20, 47);
      pdf.text(`Taux de syndicalisation: ${syndicalisationData.currentRatio}%`, 20, 54);
      pdf.text(`Objectif de syndicalisation: ${syndicalisationData.targetRatio}%`, 20, 61);
      
      // Capturer la section de statistiques de syndicalisation
      const syndicalisationCanvas = await html2canvas(statsRef, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const syndicalisationImgData = syndicalisationCanvas.toDataURL('image/png');
      const syndicalisationImgWidth = 170; // Largeur de l'image en mm
      const syndicalisationImgHeight = syndicalisationCanvas.height * syndicalisationImgWidth / syndicalisationCanvas.width;
      
      // Ajouter l'image des statistiques de syndicalisation
      pdf.addImage(syndicalisationImgData, 'PNG', 20, 70, syndicalisationImgWidth, syndicalisationImgHeight);
      
      // Sauvegarder le PDF
      const fileName = companyName 
        ? `syndicalisation-${companyName.replace(/\s+/g, '-').toLowerCase()}.pdf` 
        : 'syndicalisation.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  // Fonction pour exporter la cartographie avancée
  const exportCartographieAvancee = async () => {
    if (!cartoAvanceeRef.current) return;
    
    try {
      // Récupérer les données et les références de la cartographie avancée
      const servicesData = cartoAvanceeRef.current.getServicesData();
      const servicesTableRef = cartoAvanceeRef.current.getServicesTableRef();
      
      if (!servicesTableRef || !servicesData || servicesData.length === 0) {
        alert('Veuillez d\'abord ajouter des services pour générer un PDF.');
        return;
      }
      
      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Ajouter l'en-tête
      pdf.setFontSize(18);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Cartographie avancée`, 105, 15, { align: 'center' });
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`${companyName || 'Entreprise'}`, 105, 25, { align: 'center' });
      
      // Ajouter une ligne de séparation
      pdf.setDrawColor(185, 28, 28); // Rouge CGT
      pdf.setLineWidth(0.5);
      pdf.line(20, 30, 190, 30);
      
      // Ajouter la date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gris
      const today = new Date().toLocaleDateString('fr-FR');
      pdf.text(`Généré le ${today}`, 190, 35, { align: 'right' });
      
      // Calculer les totaux
      const totals = servicesData.reduce((acc, service) => {
        acc.totalEmployees += service.totalEmployees;
        acc.totalSyndiques += service.totalSyndiques;
        return acc;
      }, { totalEmployees: 0, totalSyndiques: 0 });
      
      // Ajouter les statistiques principales
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`Nombre total de services: ${servicesData.length}`, 20, 45);
      pdf.text(`Salariés totaux: ${totals.totalEmployees}`, 20, 52);
      pdf.text(`Syndiqués totaux: ${totals.totalSyndiques}`, 20, 59);
      
      // Calculer le taux global
      const globalRatio = totals.totalEmployees > 0 
        ? (totals.totalSyndiques / totals.totalEmployees * 100).toFixed(1) 
        : 0;
      
      // Mettre en évidence le taux global
      pdf.setFontSize(14);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Taux de syndicalisation global: ${globalRatio}%`, 20, 68);
      
      // Capturer le tableau des services
      const canvas = await html2canvas(servicesTableRef, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        allowTaint: true,
        foreignObjectRendering: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 170; // Largeur de l'image en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Ajouter l'image du tableau des services
      pdf.addImage(imgData, 'PNG', 20, 75, imgWidth, imgHeight);
      
      // Ajouter un pied de page
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gris
      pdf.text(`Document généré par l'outil de cartographie avancée CGT`, 105, 285, { align: 'center' });
      
      // Sauvegarder le PDF
      const fileName = companyName 
        ? `cartographie-avancee-${companyName.replace(/\s+/g, '-').toLowerCase()}.pdf` 
        : 'cartographie-avancee.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cartographie et Syndicalisation</h1>
        <p className={styles.subtitle}>
          Visualisez et analysez la présence syndicale dans votre entreprise
        </p>
        <div className={styles.helpContainer}>
          <button 
            className={styles.helpButton}
            onClick={() => setShowHelp(!showHelp)}
            aria-label="Afficher l'aide"
          >
            <FaQuestionCircle /> Comment obtenir les effectifs ?
          </button>
          {showHelp && (
            <div className={styles.helpTooltip}>
              <div className={styles.tooltipHeader}>
                <img src={heroImage} alt="CGT Hero" className={styles.heroImage} />
                <h3 className={styles.tooltipTitle}>Démarche auprès de l'employeur</h3>
              </div>
              <ol className={styles.tooltipList}>
                <li className={styles.tooltipItem}>Adressez une demande écrite à la Direction des Ressources Humaines</li>
                <li className={styles.tooltipItem}>Fondez votre demande sur l'article L.2315-81 du Code du Travail (pour les CSE) ou consultez la BDES</li>
                <li className={styles.tooltipItem}>Précisez le détail souhaité (service, genre, catégorie, etc.)</li>
                <li className={styles.tooltipItem}>Fixez un délai raisonnable de réponse (15 jours)</li>
              </ol>
              <div className={styles.tooltipWarning}>
                En cas de refus, contactez l'inspection du travail ou votre UL/UD
              </div>
              <button 
                className={styles.tooltipCloseButton}
                onClick={() => setShowHelp(false)}
                aria-label="Fermer l'aide"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={styles.companyForm}>
        <div className={styles.formGroup}>
          <label htmlFor="companyName" className={styles.formLabel}>
            <FaBuilding /> Nom de l'entreprise :
          </label>
          <input
            type="text"
            id="companyName"
            className={styles.formInput}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Saisissez le nom de votre entreprise"
            aria-label="Nom de l'entreprise"
          />
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'cartographie' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cartographie')}
          aria-pressed={activeTab === 'cartographie'}
        >
          <FaMapMarkedAlt /> Cartographie des services
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'syndicalisation' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('syndicalisation')}
          aria-pressed={activeTab === 'syndicalisation'}
        >
          <FaChartBar /> Analyse de syndicalisation
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'avancee' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('avancee')}
          aria-pressed={activeTab === 'avancee'}
        >
          <FaChartPie /> Cartographie avancée
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'cartographie' && (
          <div className={styles.cartoContent}>
            <p className={styles.cartoParagraph}>
              Cet outil vous permet de réaliser une cartographie stratégique de votre établissement 
              en analysant la répartition des syndiqués par service. Vous obtiendrez un plan d'action 
              personnalisé pour renforcer la présence CGT dans les zones prioritaires.
            </p>
            <CartoMain ref={cartoMainRef} />
          </div>
        )}
        
        {activeTab === 'syndicalisation' && (
          <div className={styles.syndicalisationContent}>
            <p className={styles.cartoParagraph}>
              Analysez en détail la répartition de vos syndiqués par service, comparez vos taux 
              avec les moyennes du secteur et définissez des objectifs de progression.
            </p>
            <SyndicalisationMain ref={syndicalisationRef} />
          </div>
        )}
        
        {activeTab === 'avancee' && (
          <div className={styles.avanceeContent}>
            <p className={styles.cartoParagraph}>
              Utilisez la cartographie avancée pour analyser en détail la répartition des syndiqués 
              par genre et par catégorie professionnelle. Cet outil vous permet d'identifier les 
              déséquilibres et de cibler vos actions de syndicalisation.
            </p>
            <CartographieAvancee ref={cartoAvanceeRef} isVisible={true} />
          </div>
        )}
      </div>

      <div className={styles.actionButtons}>
        <div className={styles.exportDropdown}>
          <button
            className={styles.exportButton}
            onClick={() => setShowExportOptions(!showExportOptions)}
            aria-expanded={showExportOptions}
            aria-label="Options d'export"
          >
            <FaFileExport /> Exporter <span className={styles.dropdownArrow}>▼</span>
          </button>
          
          {showExportOptions && (
            <div className={styles.exportOptions}>
              <button
                className={styles.exportOptionButton}
                onClick={generatePDF}
                aria-label="Générer un PDF complet"
              >
                <FaFilePdf /> Rapport complet
              </button>
              <button
                className={styles.exportOptionButton}
                onClick={exportCartographie}
                aria-label="Exporter uniquement la cartographie"
              >
                <FaFileDownload /> Cartographie seule
              </button>
              <button
                className={styles.exportOptionButton}
                onClick={exportSyndicalisation}
                aria-label="Exporter uniquement les données de syndicalisation"
              >
                <FaFileDownload /> Syndicalisation seule
              </button>
              <button
                className={styles.exportOptionButton}
                onClick={exportCartographieAvancee}
                aria-label="Exporter la cartographie avancée"
              >
                <FaFileDownload /> Cartographie avancée
              </button>
            </div>
          )}
        </div>
        
        <button
          className={styles.pdfButton}
          onClick={generatePDF}
          aria-label="Générer un PDF"
        >
          <FaFilePdf /> Exporter en PDF
        </button>
      </div>
    </div>
  );
}

export default CartoSyndicalisationPage;
