import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="tag">ML-Powered SMS Security</div>

      <h1>
        <span className="glow">Smart</span>Shield
      </h1>

      <p className="subtitle">
        SMS & URL Phishing Detection System
      </p>

      <p className="desc">
        Protect yourself from smishing attacks using real-time detection,
        suspicious URL analysis and intelligent pattern recognition.
      </p>

     <a href="#analyzer">
       <button className="primary-btn">
        Start Scanning ↓
      </button>
     </a>

    <div className="stats">
  <div>
    <h3>SMS</h3>
    <p>Phishing Detection</p>
  </div>

  <div>
    <h3>URL</h3>
    <p>Threat Analysis</p>
  </div>

  <div>
    <h3>Real-Time</h3>
    <p>Security Alerts</p>
  </div>
</div>
    </section>
  );
};

export default Hero;