import React from 'react';
import  './StoriesExperiences.css';
const StoriesExperiences = () => {
  const stories = [
    'Story 1: Overcoming Anxiety',
    'Story 2: Journey to Self-Love',
    'Story 3: Finding Balance in Life',
  ];

  return (
    <div className="feature stories-experiences">
      <h4>Stories & Experiences</h4>
      <ul>
        {stories.map((story, index) => (
          <li key={index}>{story}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoriesExperiences;