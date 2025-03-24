import React, { useState, useEffect } from 'react';
import styles from './RepresentativityCalculator.module.css';

const RepresentativityCalculator = () => {
  // État pour stocker les syndicats et leurs résultats
  const [unions, setUnions] = useState([
    { id: 1, name: 'CGT', votes: 0, color: '#b71c1c' },
    { id: 2, name: 'Autre syndicat 1', votes: 0, color: '#1976d2' },
    { id: 3, name: 'Autre syndicat 2', votes: 0, color: '#388e3c' }
  ]);
  
  // État pour les votes blancs/nuls et le nombre d'inscrits
  const [blankVotes, setBlankVotes] = useState(0);
  const [totalRegistered, setTotalRegistered] = useState(0);
  
  // État pour les résultats calculés
  const [results, setResults] = useState({
    totalVotes: 0,
    validVotes: 0,
    quorum: 0,
    quorumReached: false,
    unionResults: []
  });
  
  // Calculer les résultats lorsque les données changent
  useEffect(() => {
    // Calculer le total des votes exprimés
    const totalVotes = unions.reduce((sum, union) => sum + Number(union.votes), 0) + Number(blankVotes);
    
    // Calculer les votes valides (hors blancs et nuls)
    const validVotes = totalVotes - Number(blankVotes);
    
    // Calculer le quorum (50% des inscrits)
    const quorum = Math.ceil(Number(totalRegistered) * 0.5);
    
    // Vérifier si le quorum est atteint
    const quorumReached = totalVotes >= quorum;
    
    // Calculer les résultats pour chaque syndicat
    const unionResults = unions.map(union => {
      const votes = Number(union.votes);
      const percentage = validVotes > 0 ? (votes / validVotes) * 100 : 0;
      const isRepresentative = percentage >= 10; // Un syndicat est représentatif s'il obtient au moins 10%
      
      return {
        ...union,
        votes,
        percentage: percentage.toFixed(2),
        isRepresentative
      };
    });
    
    // Mettre à jour l'état des résultats
    setResults({
      totalVotes,
      validVotes,
      quorum,
      quorumReached,
      unionResults
    });
  }, [unions, blankVotes, totalRegistered]);
  
  // Gérer le changement des votes pour un syndicat
  const handleUnionVotesChange = (id, votes) => {
    setUnions(prevUnions => 
      prevUnions.map(union => 
        union.id === id ? { ...union, votes: votes } : union
      )
    );
  };
  
  // Ajouter un nouveau syndicat
  const handleAddUnion = () => {
    const newId = Math.max(...unions.map(u => u.id), 0) + 1;
    setUnions([...unions, { id: newId, name: `Syndicat ${newId}`, votes: 0, color: getRandomColor() }]);
  };
  
  // Supprimer un syndicat
  const handleRemoveUnion = (id) => {
    setUnions(unions.filter(union => union.id !== id));
  };
  
  // Mettre à jour le nom d'un syndicat
  const handleUnionNameChange = (id, name) => {
    setUnions(prevUnions => 
      prevUnions.map(union => 
        union.id === id ? { ...union, name } : union
      )
    );
  };
  
  // Générer une couleur aléatoire
  const getRandomColor = () => {
    const colors = ['#f57c00', '#7b1fa2', '#0288d1', '#689f38', '#d32f2f', '#455a64'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Réinitialiser le calculateur
  const handleReset = () => {
    setUnions([
      { id: 1, name: 'CGT', votes: 0, color: '#b71c1c' },
      { id: 2, name: 'Autre syndicat 1', votes: 0, color: '#1976d2' },
      { id: 3, name: 'Autre syndicat 2', votes: 0, color: '#388e3c' }
    ]);
    setBlankVotes(0);
    setTotalRegistered(0);
  };
  
  return (
    <div className={styles.calculator}>
      <h2 className={styles.title}>Calculateur de représentativité syndicale</h2>
      
      <div className={styles.formSection}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="totalRegistered">Nombre d'électeurs inscrits</label>
            <input
              id="totalRegistered"
              type="number"
              min="0"
              value={totalRegistered}
              onChange={(e) => setTotalRegistered(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="blankVotes">Votes blancs et nuls</label>
            <input
              id="blankVotes"
              type="number"
              min="0"
              value={blankVotes}
              onChange={(e) => setBlankVotes(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        
        <h3 className={styles.subtitle}>Résultats par organisation syndicale</h3>
        
        {unions.map((union) => (
          <div key={union.id} className={styles.unionRow}>
            <div className={styles.unionColor} style={{ backgroundColor: union.color }}></div>
            <div className={styles.unionNameField}>
              <input
                type="text"
                value={union.name}
                onChange={(e) => handleUnionNameChange(union.id, e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.unionVotesField}>
              <input
                type="number"
                min="0"
                value={union.votes}
                onChange={(e) => handleUnionVotesChange(union.id, e.target.value)}
                className={styles.input}
              />
            </div>
            <button 
              className={styles.removeButton}
              onClick={() => handleRemoveUnion(union.id)}
              disabled={unions.length <= 1}
              aria-label="Supprimer ce syndicat"
            >
              ✕
            </button>
          </div>
        ))}
        
        <div className={styles.buttonRow}>
          <button className={styles.addButton} onClick={handleAddUnion}>
            + Ajouter un syndicat
          </button>
          <button className={styles.resetButton} onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </div>
      
      <div className={styles.resultsSection}>
        <h3 className={styles.subtitle}>Résultats du scrutin</h3>
        
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>{results.totalVotes}</div>
            <div className={styles.summaryLabel}>Votants</div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {totalRegistered > 0 ? ((results.totalVotes / totalRegistered) * 100).toFixed(2) : 0}%
            </div>
            <div className={styles.summaryLabel}>Participation</div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>{results.validVotes}</div>
            <div className={styles.summaryLabel}>Suffrages valables</div>
          </div>
          
          <div className={`${styles.summaryCard} ${results.quorumReached ? styles.quorumReached : styles.quorumNotReached}`}>
            <div className={styles.summaryValue}>
              {results.quorumReached ? 'Atteint' : 'Non atteint'}
            </div>
            <div className={styles.summaryLabel}>Quorum ({results.quorum} votes requis)</div>
          </div>
        </div>
        
        <h3 className={styles.subtitle}>Représentativité des syndicats</h3>
        
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            {results.unionResults.map((result) => (
              <div 
                key={result.id} 
                className={styles.chartBar}
                style={{ 
                  width: `${result.percentage}%`, 
                  backgroundColor: result.color,
                  minWidth: result.percentage > 0 ? '2%' : '0'
                }}
                title={`${result.name}: ${result.percentage}%`}
              ></div>
            ))}
          </div>
          <div className={styles.chartLabels}>
            {results.unionResults.map((result) => (
              <div key={result.id} className={styles.chartLabel}>
                <div className={styles.labelColor} style={{ backgroundColor: result.color }}></div>
                <div className={styles.labelName}>{result.name}</div>
                <div className={styles.labelValue}>{result.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.representativityTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Organisation</div>
            <div className={styles.tableCell}>Voix</div>
            <div className={styles.tableCell}>Pourcentage</div>
            <div className={styles.tableCell}>Représentativité</div>
          </div>
          
          {results.unionResults.map((result) => (
            <div key={result.id} className={styles.tableRow}>
              <div className={styles.tableCell}>
                <div className={styles.unionLabel}>
                  <div className={styles.unionColor} style={{ backgroundColor: result.color }}></div>
                  <div>{result.name}</div>
                </div>
              </div>
              <div className={styles.tableCell}>{result.votes}</div>
              <div className={styles.tableCell}>{result.percentage}%</div>
              <div className={styles.tableCell}>
                <div className={`${styles.representativityBadge} ${result.isRepresentative ? styles.isRepresentative : styles.notRepresentative}`}>
                  {result.isRepresentative ? 'Représentatif' : 'Non représentatif'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.infoBox}>
          <h4>Rappel des règles de représentativité</h4>
          <ul>
            <li>Pour être représentatif, un syndicat doit obtenir au moins 10% des suffrages exprimés.</li>
            <li>Le quorum est atteint si au moins 50% des électeurs inscrits ont voté.</li>
            <li>Pour être valide, le scrutin doit avoir atteint le quorum.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RepresentativityCalculator;
