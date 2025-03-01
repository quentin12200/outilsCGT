import React, { useState } from 'react';

const AssembleeGeneraleModule = () => {
  const [etapeAG, setEtapeAG] = useState('besoins');
  const [formData, setFormData] = useState({
    dateAG: '',
    lieuAG: '',
    heureDebut: '',
    heureFin: '',
    ordreJour: '',
    syndiques: [],
    newName: '',
    newEmail: '',
    newTel: '',
    newService: '',
    motivationMessage: '',
    materiels: {
      salle: false,
      projecteur: false,
      sonorisation: false,
      ordinateur: false,
      documents: false,
      rafraichissements: false
    }
  });
  
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const updateMateriel = (item) => {
    setFormData(prev => ({
      ...prev,
      materiels: {
        ...prev.materiels,
        [item]: !prev.materiels[item]
      }
    }));
  };
  
  const addSyndique = () => {
    if (!formData.newName.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      syndiques: [
        ...prev.syndiques,
        {
          id: Date.now(),
          name: prev.newName,
          email: prev.newEmail,
          tel: prev.newTel,
          service: prev.newService,
          confirmed: false,
          present: false
        }
      ],
      newName: '',
      newEmail: '',
      newTel: '',
      newService: ''
    }));
  };
  
  const removeSyndique = (id) => {
    setFormData(prev => ({
      ...prev,
      syndiques: prev.syndiques.filter(s => s.id !== id)
    }));
  };
  
  const updateSyndique = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      syndiques: prev.syndiques.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    }));
  };
  
  const getConfirmedCount = () => {
    return formData.syndiques.filter(s => s.confirmed).length;
  };
  
  const getPresentCount = () => {
    return formData.syndiques.filter(s => s.present).length;
  };
  
  const getParticipationRate = () => {
    if (formData.syndiques.length === 0) return 0;
    return (getPresentCount() / formData.syndiques.length) * 100;
  };
  
  const generateConvocation = () => {
    // Ici on pourrait générer un PDF ou un email de convocation
    alert("Fonction à implémenter : Générer les convocations pour les syndiqués");
  };
  
  // Configuration des différentes étapes de l'AG
  const etapesAG = {
    besoins: {
      title: "AG Étape 1 : Besoins",
      description: "L'assemblée générale des syndiqués pour recueillir les besoins des salariés",
      objectifs: [
        "Présenter les enjeux du contexte",
        "Préciser la méthode et les outils",
        "Organiser le déploiement auprès des salariés",
        "Répartir le travail entre les syndiqués"
      ],
      materiels: [
        "Questionnaires des besoins",
        "Rétroplanning imprimé",
        "Liste des salariés par service"
      ]
    },
    revendications: {
      title: "AG Étape 2 : Revendications",
      description: "L'assemblée générale des syndiqués pour élaborer les revendications",
      objectifs: [
        "Analyser les besoins recueillis",
        "Élaborer collectivement le cahier revendicatif",
        "Valider les candidatures",
        "Préparer la communication"
      ],
      materiels: [
        "Synthèse des besoins recueillis",
        "Projet de cahier revendicatif",
        "Liste de candidats potentiels"
      ]
    },
    mobilisation: {
      title: "AG Étape 3 : Mobilisation",
      description: "L'assemblée générale avec les salariés pour présenter les revendications",
      objectifs: [
        "Présenter le cahier revendicatif",
        "Présenter les candidats",
        "Recueillir les derniers avis",
        "Mobiliser pour le vote"
      ],
      materiels: [
        "Cahier revendicatif finalisé",
        "Professions de foi",
        "Tracts et affiches"
      ]
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-6">Organisation d'une Assemblée Générale</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Type d'assemblée générale</h3>
        
        <div className="flex mb-6 border-b">
          {Object.keys(etapesAG).map((etape) => (
            <button
              key={etape}
              className={`pb-2 px-4 relative flex-1 ${etapeAG === etape ? 'font-bold border-b-2 border-red-600' : ''}`}
              onClick={() => setEtapeAG(etape)}
            >
              {etapesAG[etape].title}
              {etapeAG === etape && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></span>
              )}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-700 mb-4">{etapesAG[etapeAG].description}</p>
            
            <div className="bg-red-50 p-4 rounded mb-4">
              <h4 className="font-semibold mb-2">Objectifs de cette AG :</h4>
              <ul className="list-disc pl-5">
                {etapesAG[etapeAG].objectifs.map((objectif, index) => (
                  <li key={index} className="mb-1">{objectif}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Matériel nécessaire :</h4>
              <ul className="list-disc pl-5">
                {etapesAG[etapeAG].materiels.map((materiel, index) => (
                  <li key={index} className="mb-1">{materiel}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Informations pratiques</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Date de l'AG</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={formData.dateAG}
                  onChange={(e) => updateFormData('dateAG', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Lieu</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.lieuAG}
                  onChange={(e) => updateFormData('lieuAG', e.target.value)}
                  placeholder="Salle de réunion, local syndical..."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Heure de début</label>
                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  value={formData.heureDebut}
                  onChange={(e) => updateFormData('heureDebut', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Heure de fin prévue</label>
                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  value={formData.heureFin}
                  onChange={(e) => updateFormData('heureFin', e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 text-sm">Ordre du jour</label>
              <textarea
                className="w-full border p-2 rounded"
                value={formData.ordreJour}
                onChange={(e) => updateFormData('ordreJour', e.target.value)}
                placeholder="1. Introduction&#10;2. Présentation des enjeux&#10;3. Répartition des tâches..."
                rows={4}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Matériel à prévoir</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="salle"
                    checked={formData.materiels.salle}
                    onChange={() => updateMateriel('salle')}
                    className="mr-2"
                  />
                  <label htmlFor="salle">Réservation salle</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="projecteur"
                    checked={formData.materiels.projecteur}
                    onChange={() => updateMateriel('projecteur')}
                    className="mr-2"
                  />
                  <label htmlFor="projecteur">Projecteur</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sonorisation"
                    checked={formData.materiels.sonorisation}
                    onChange={() => updateMateriel('sonorisation')}
                    className="mr-2"
                  />
                  <label htmlFor="sonorisation">Sonorisation</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ordinateur"
                    checked={formData.materiels.ordinateur}
                    onChange={() => updateMateriel('ordinateur')}
                    className="mr-2"
                  />
                  <label htmlFor="ordinateur">Ordinateur</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="documents"
                    checked={formData.materiels.documents}
                    onChange={() => updateMateriel('documents')}
                    className="mr-2"
                  />
                  <label htmlFor="documents">Documents imprimés</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rafraichissements"
                    checked={formData.materiels.rafraichissements}
                    onChange={() => updateMateriel('rafraichissements')}
                    className="mr-2"
                  />
                  <label htmlFor="rafraichissements">Rafraîchissements</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Liste des syndiqués à convoquer</h3>
        
        <div className="mb-4 p-4 border rounded">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">Nom et prénom</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={formData.newName}
                onChange={(e) => updateFormData('newName', e.target.value)}
                placeholder="Nom et prénom"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={formData.newEmail}
                onChange={(e) => updateFormData('newEmail', e.target.value)}
                placeholder="email@exemple.com"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Téléphone</label>
              <input
                type="tel"
                className="w-full border p-2 rounded"
                value={formData.newTel}
                onChange={(e) => updateFormData('newTel', e.target.value)}
                placeholder="06 XX XX XX XX"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Service</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={formData.newService}
                onChange={(e) => updateFormData('newService', e.target.value)}
                placeholder="Service ou département"
              />
            </div>
          </div>
          
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={addSyndique}
          >
            Ajouter à la liste
          </button>
        </div>
        
        {formData.syndiques.length > 0 ? (
          <div>
            <div className="flex mb-2 font-bold text-sm">
              <div className="flex-1">Nom</div>
              <div className="w-24 md:w-48 hidden md:block">Email</div>
              <div className="w-24 hidden md:block">Téléphone</div>
              <div className="w-24 hidden md:block">Service</div>
              <div className="w-20 text-center">Confirmé</div>
              <div className="w-20 text-center">Présent</div>
              <div className="w-16"></div>
            </div>
            
            {formData.syndiques.map((syndique) => (
              <div key={syndique.id} className="flex mb-2 items-center text-sm border-b pb-2">
                <div className="flex-1 font-medium">{syndique.name}</div>
                <div className="w-24 md:w-48 hidden md:block">{syndique.email}</div>
                <div className="w-24 hidden md:block">{syndique.tel}</div>
                <div className="w-24 hidden md:block">{syndique.service}</div>
                <div className="w-20 text-center">
                  <input
                    type="checkbox"
                    checked={syndique.confirmed}
                    onChange={() => updateSyndique(syndique.id, 'confirmed', !syndique.confirmed)}
                  />
                </div>
                <div className="w-20 text-center">
                  <input
                    type="checkbox"
                    checked={syndique.present}
                    onChange={() => updateSyndique(syndique.id, 'present', !syndique.present)}
                  />
                </div>
                <div className="w-16 text-center">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeSyndique(syndique.id)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={generateConvocation}
              >
                Générer les convocations
              </button>
              
              <div className="text-sm text-gray-700">
                <div>Total des syndiqués: <strong>{formData.syndiques.length}</strong></div>
                <div>Confirmés: <strong>{getConfirmedCount()}</strong> ({((getConfirmedCount() / formData.syndiques.length) * 100).toFixed(0)}%)</div>
                <div>Présents: <strong>{getPresentCount()}</strong> ({getParticipationRate().toFixed(0)}%)</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 my-4">
            Aucun syndiqué ajouté à la liste pour le moment
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-4">Message de motivation</h3>
        
        <div className="mb-4">
          <label className="block mb-2">Message à inclure dans la convocation</label>
          <textarea
            className="w-full border p-2 rounded"
            value={formData.motivationMessage}
            onChange={(e) => updateFormData('motivationMessage', e.target.value)}
            placeholder="Chers camarades,&#10;&#10;Notre Assemblée Générale est un moment essentiel de notre démocratie syndicale. Votre présence est importante pour..."
            rows={6}
          ></textarea>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">
          <h4 className="font-bold mb-2">Important :</h4>
          <p className="mb-2">Une AG des syndiqués se construit avec :</p>
          <ul className="list-disc pl-5">
            <li>Courrier à CHAQUE SYNDIQUÉ précisant l'objet et les enjeux</li>
            <li>Appel téléphonique de confirmation</li>
            <li>Ne pas oublier de terminer ce moment par un apéritif, pizzas, etc. !</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
// Ajouter à la fin de votre fichier assemblee.js
ReactDOM.render(
    <AssembleeGeneraleModule />,
    document.getElementById('assemblee-container')
  );
export default AssembleeGeneraleModule;