import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="tag">ML-Powered SMS Security</div>

      <h1>
        <span className="glow">Smart</span>Shield
      </h1>

      <p className="subtitle">
        SMS Phishing Detection System
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
          <h3>12+</h3>
          <p>Threat Patterns</p>
        </div>
        <div>
          <h3>Real-time</h3>
          <p>Detection</p>
        </div>
       
      </div>
    </section>
  );
};

export default Hero;