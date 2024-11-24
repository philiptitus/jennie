import React, { useState, useEffect } from 'react';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h2 style={styles.header}>Note from the Developer</h2>
        <p style={styles.message}>
          Hi, user! Due to ongoing technical advancements, **JennieAI** will be
          temporarily unavailable to the public until at most <strong>December 1st, 2024</strong>.
          <br />
          <br />
          Here's what we're working on:
        </p>
        <ul style={styles.list}>
          <li>
            Upgrading our LLM model from <strong>Gemini 1.0 Pro</strong> to{' '}
            <strong>Gemini 1.5</strong> per Google's latest policies. The current model
            is no longer supported, necessitating the shift.
          </li>
          <li>
            Integrating <strong>Google Calendar Services</strong>, which requires
            downtime for technical adjustments.
          </li>
        </ul>
        <p style={styles.message}>
          As a result, the following features are temporarily disabled:
        </p>
        <ul style={styles.list}>
          <li>Job Creation</li>
          <li>Interview Creation</li>
          <li>Preparation Material Creation</li>
          <li>Interview and Prep Material Marking</li>
        </ul>
        <p style={styles.message}>
          We appreciate your patience as we improve JennieAI. For more information, 
          feel free to reach out to the developer: 
          <a href="https://www.linkedin.com/in/philiptitus/" style={styles.link}>
            Philip Titus
          </a>.
        </p>
        <p style={styles.footer}>We promise to be back very soon!</p>
      </div>
    </div>
  ) : null;
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#888',
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  message: {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '10px',
    color: '#555',
  },
  list: {
    textAlign: 'left',
    fontSize: '16px',
    margin: '10px 0',
    padding: '0 20px',
    color: '#555',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  footer: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#777',
    marginTop: '20px',
  },
};

export default Popup;
