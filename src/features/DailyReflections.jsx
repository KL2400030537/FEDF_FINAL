import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyReflections.css';
const DailyReflections = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    const savedReflection = localStorage.getItem('reflection');
    if (savedReflection) {
      setReflection(savedReflection);
    }
  }, []);

  const handleReflectionChange = (e) => {
    const newReflection = e.target.value;
    setReflection(newReflection);
    localStorage.setItem('reflection', newReflection);
  };

  return (
    <div className="feature daily-reflections">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
      <h4>Daily Reflections</h4>
      <textarea
        value={reflection}
        onChange={handleReflectionChange}
        placeholder="Write your thoughts here..."
      />
      <p>Your Reflection: {reflection || 'None'}</p>
    </div>
  );
};

export default DailyReflections;