// src/components/Common/PageHeader.js
import React from 'react';

function PageHeader({ title, subtitle, icon }) {
  return (
    <div className="bg-red-700 text-white py-6 px-4 mb-6">
      <div className="container mx-auto">
        <div className="flex items-center">
          {icon && (
            <div className="mr-4">
              <i className={`fas fa-${icon} text-2xl`}></i>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-white/80">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;