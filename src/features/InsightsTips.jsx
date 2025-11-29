import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './InsightsTips.css';
// Sample pool of insights (you can expand this list)
const insightPool = [
  "Take a 5-minute break to breathe deeply 🌿",
  "Stay hydrated – drink a glass of water 💧",
  "Write down one thing you’re grateful for 🙏",
  "Stretch your body for 2 minutes 🧘",
  "Avoid screen time for 15 minutes to relax your eyes 👀",
  "Listen to calming music 🎶",
  "Go for a short walk outside 🚶‍♂️",
  "Focus on something positive today 🌞",
  "Try a quick journaling exercise 📖",
  "Celebrate a small win today 🎉"
];

const InsightsTips = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem("insightsData"));

    if (savedData && savedData.date === today) {
      // If insights already generated today, load them
      setInsights(savedData.insights);
    } else {
      // Generate 2–3 random insights
      const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const shuffled = [...insightPool].sort(() => 0.5 - Math.random());
      const newInsights = shuffled.slice(0, count);

      setInsights(newInsights);
      localStorage.setItem(
        "insightsData",
        JSON.stringify({ date: today, insights: newInsights })
      );
    }
  }, []);

  return (
    <div className="feature insights-tips">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
      <h4>Insights & Personalized Tips</h4>
      <ul>
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightsTips;
