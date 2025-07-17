import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const API_BASE = "https://feedback-api-1063311936337.us-central1.run.app";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submitFeedback = async () => {
    if (!name || !message) return;
    await fetch(`${API_BASE}/submit?name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`, { method: 'POST' });
    setName('');
    setMessage('');
    fetchFeedbacks();
  };

  const fetchFeedbacks = async () => {
    const res = await fetch(`${API_BASE}/feedbacks`);
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="App">
      <div style={{ padding: '30px 0' }}>
        <img src={logo} alt="logo" style={{ height: '80px' }} />
      </div>
      <main style={{ padding: '20px' }}>
        <h2>Submit Feedback</h2>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
        <br />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
        <br />
        <button onClick={submitFeedback}>Submit</button>
        <h2>Feedbacks</h2>
        <ul>
          {feedbacks.map(fb => (
            <li key={fb.id}><strong>{fb.name}</strong>: {fb.message}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
