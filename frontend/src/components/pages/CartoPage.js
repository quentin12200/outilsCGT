import React, { useState, useRef } from 'react';
import CartoMain from '../CartoModule/CartoMain';
import CartographieAvancee from '../CartoModule/CartographieAvancee';
import styles from './CartoPage.module.css';
import { FaFilePdf, FaBuilding } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function CartoPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const cartoMainRef = useRef(null);

  const toggleAdvancedCartography = () => {
    setShowAdvanced(!showAdvanced);
  };

  const generatePDF = async () => {
    if (!cartoMainRef.current) return;
    
    try {
      // Récupérer la référence à la section de synthèse complète
      const fullSynthesisRef = cartoMainRef.current.getFullSynthesisRef();
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

  return (
    <div className={styles.cartoContainer}>
      <header className={styles.cartoHeader}>
        <h1 className={styles.cartoTitle}>Cartographie Stratégique</h1>
        <p className={styles.cartoSubtitle}>
          Visualisez le taux de syndicalisation par service et identifiez les zones prioritaires
        </p>
      </header>

      <div className={styles.cartoContent}>
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
        
        <p className={styles.cartoParagraph}>
          Cet outil vous permet de réaliser une cartographie stratégique de votre établissement 
          en analysant la répartition des syndiqués par service. Vous obtiendrez un plan d'action 
          personnalisé pour renforcer la présence CGT dans les zones prioritaires.
        </p>

        <CartoMain ref={cartoMainRef} />
        
        <div className={styles.actionButtons}>
          <button 
            className={styles.pdfButton}
            onClick={generatePDF}
            aria-label="Générer un PDF de la synthèse complète"
          >
            <FaFilePdf /> Générer un PDF de la synthèse complète
          </button>
        </div>
        
        <div className={styles.cartoSectionDivider}>
          <span>Cartographie Avancée</span>
          <button 
            className={styles.advancedButton}
            onClick={toggleAdvancedCartography}
            aria-label={showAdvanced ? "Masquer la cartographie avancée" : "Afficher la cartographie avancée"}
          >
            {showAdvanced ? 'Masquer la cartographie avancée' : 'Afficher la cartographie avancée'}
          </button>
        </div>
        
        {showAdvanced && <CartographieAvancee isVisible={showAdvanced} />}
      </div>
    </div>
  );
}

export default CartoPage;