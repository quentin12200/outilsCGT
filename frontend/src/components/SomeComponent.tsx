import React from 'react';
import { useNavigate } from 'react-router-dom';

function SomeComponent() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ...existing code... */}
      <button onClick={() => navigate('/some-path')}>Go to Some Path</button>
      {/* ...existing code... */}
    </div>
  );
}

export default SomeComponent;
