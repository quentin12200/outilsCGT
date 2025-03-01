import React from 'react';

function FooterFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              &copy; {currentYear} Outils CGT. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a href="/mentions-legales" className="text-gray-400 hover:text-white">
              Mentions légales
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="/aide" className="text-gray-400 hover:text-white">
              Aide
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>L'informatique au service du militantisme CGT</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterFooter;