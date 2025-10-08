import React from 'react';
import './LessonsGuides.css';
const LessonsGuides = () => {
  const lessons = [
    'Understanding Stress',
    'Mindfulness Basics',
    'Building Resilience',
  ];

  return (
    <div className="feature lessons-guides">
      <h4>Lessons & Guides</h4>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>{lesson}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonsGuides;