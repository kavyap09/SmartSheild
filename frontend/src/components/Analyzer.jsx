import React, { useState } from "react";

const Analyzer = () => {
  const [message, setMessage] = useState("");
 const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const analyzeMessage = async () => {

  if (!message.trim()) return;

  setLoading(true);

  try {

    const response = await fetch(
      "http://localhost:5000/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message
        })
      }
    );

    const data = await response.json();

    setResult(data);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};
  return (
    <section className="analyzer" id="analyzer">
      <h2>
        Analyze Your <span className="glow">Message</span>
      </h2>

      <div className="analyzer-box">
        <textarea
          placeholder="Paste your SMS message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

      <button
  className="primary-btn analyze-btn"
  onClick={analyzeMessage}
  disabled={loading}
>
  {loading ? "Analyzing..." : "Analyze Message"}
</button>
      </div>
{result && (
  <div className={`scan-result ${result.status.toLowerCase()}`}>

    <div className="scan-status">
      {result.status === "SAFE" && "🟢 SAFE"}
      {result.status === "SUSPICIOUS" && "🟡 SUSPICIOUS"}
      {result.status === "UNSAFE" && "🔴 UNSAFE"}
    </div>

    <div className="scan-grid">

      <div className="scan-item">
        <span className="label">Suspicion Rate</span>
        <span className="value">
          {result.suspicionRate}%
        </span>
      </div>

      <div className="scan-item">
        <span className="label">Risk Level</span>
        <span className="value">
          {result.riskLevel}
        </span>
      </div>

    </div>

    <div className="keywords-box">

      <h4>Detected Keywords</h4>

      <div className="keyword-list">

        {result.keywords?.length > 0 ? (
          result.keywords.map((word, index) => (
            <span
              key={index}
              className="keyword-pill"
            >
              {word}
            </span>
          ))
        ) : (
          <span className="keyword-pill safe-pill">
            None Detected
          </span>
        )}

      </div>

    </div>

    <div className="recommendation-box">
      <h4>Recommendation</h4>
      <p>{result.recommendation}</p>
    </div>

  </div>
)}
    </section>
  );
};

export default Analyzer;