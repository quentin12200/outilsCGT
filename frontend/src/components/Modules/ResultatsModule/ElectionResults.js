// src/components/ResultatsModule/ElectionResults.js
import React from 'react';

function ElectionResults({ results }) {
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Get total votes for other unions
  const getTotalOtherVotes = () => {
    return Object.values(results.otherUnionVotes).reduce((sum, votes) => sum + votes, 0);
  };

  // Calculate non-expressed votes
  const getNonExpressedVotes = () => {
    return results.totalVoters - results.validVotes;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-red-700 mb-4">
        Résultats de l'élection du {formatDate(results.date)}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Participation</h3>
          <div className="text-2xl font-bold">{results.participation}%</div>
          <div className="text-sm text-gray-500">{results.validVotes} votants sur {results.totalVoters} inscrits</div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Score CGT</h3>
          <div className="text-2xl font-bold text-red-700">{results.cgtScore}%</div>
          <div className="text-sm text-gray-500">{results.cgtVotes} voix sur {results.validVotes} SVE</div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Position</h3>
          <div className="text-2xl font-bold text-blue-700">
            {/* Calculate CGT position among unions */}
            {(() => {
              const allScores = [
                { name: 'CGT', votes: results.cgtVotes },
                ...Object.entries(results.otherUnionVotes).map(([name, votes]) => ({ name, votes }))
              ].sort((a, b) => b.votes - a.votes);
              
              const cgtPosition = allScores.findIndex(org => org.name === 'CGT') + 1;
              return `${cgtPosition}${cgtPosition === 1 ? 'er' : 'ème'} rang`;
            })()}
          </div>
          <div className="text-sm text-gray-500">sur {Object.keys(results.otherUnionVotes).length + 1} organisations</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Répartition des voix</h3>
        
        <div className="w-full bg-gray-200 rounded-full h-8 mb-4 overflow-hidden">
          {/* CGT votes bar */}
          <div 
            className="bg-red-700 h-full text-xs text-white flex items-center justify-center"
            style={{ width: `${results.cgtScore}%` }}
          >
            {results.cgtScore > 5 ? `CGT ${results.cgtScore}%` : ''}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Détail des suffrages</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-semibold text-red-700">CGT</span>
                <span>{results.cgtVotes} voix ({results.cgtScore}%)</span>
              </li>
              
              {Object.entries(results.otherUnionVotes).map(([union, votes]) => {
                const score = ((votes / results.validVotes) * 100).toFixed(2);
                return (
                  <li key={union} className="flex justify-between">
                    <span>{union}</span>
                    <span>{votes} voix ({score}%)</span>
                  </li>
                );
              })}
              
              <li className="flex justify-between border-t pt-2">
                <span>Non exprimés</span>
                <span>{getNonExpressedVotes()} ({((getNonExpressedVotes() / results.totalVoters) * 100).toFixed(2)}%)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium mb-4">Représentation graphique</h4>
            <div className="space-y-2">
              {/* Donut chart visualization would be implemented here
                  As a simple representation, we'll use colored bars */}
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-700 mr-2"></div>
                <div className="flex-1">CGT</div>
                <div className="font-medium">{results.cgtScore}%</div>
              </div>
              
              {Object.entries(results.otherUnionVotes).map(([union, votes], index) => {
                const score = ((votes / results.validVotes) * 100).toFixed(2);
                // Different colors for different unions
                const colors = ['bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];
                const colorIndex = index % colors.length;
                
                return (
                  <div key={union} className="flex items-center">
                    <div className={`w-4 h-4 ${colors[colorIndex]} mr-2`}></div>
                    <div className="flex-1">{union}</div>
                    <div className="font-medium">{score}%</div>
                  </div>
                );
              })}
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                <div className="flex-1">Non exprimés</div>
                <div className="font-medium">
                  {((getNonExpressedVotes() / results.totalVoters) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionResults;