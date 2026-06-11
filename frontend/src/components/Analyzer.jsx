import React, { useState } from "react";

const Analyzer = () => {
  const [mode, setMode] = useState("sms");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMessage = async () => {
    if (
      (mode === "sms" && !message.trim()) ||
      (mode === "url" && !url.trim())
    ) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: mode,
            message: mode === "sms" ? message : "",
            url: mode === "url" ? url : "",
          }),
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
        Analyze Your <span className="glow">Content</span>
      </h2>

      {/* Toggle */}
      <div className="toggle-box">
        <button
          className={mode === "sms" ? "active" : ""}
          onClick={() => {
            setMode("sms");
            setResult(null);
          }}
        >
          📩 SMS Detection
        </button>

        <button
          className={mode === "url" ? "active" : ""}
          onClick={() => {
            setMode("url");
            setResult(null);
          }}
        >
          🔗 URL Detection
        </button>
      </div>

      <div className="analyzer-box">
        {mode === "sms" ? (
          <textarea
            placeholder="Paste your SMS message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder="Enter URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
          />
        )}

        <button
          className="primary-btn analyze-btn"
          onClick={analyzeMessage}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : mode === "sms"
            ? "Analyze Message"
            : "Analyze URL"}
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
            <h4>
              {mode === "sms"
                ? "Detected Keywords"
                : "Detected Features"}
            </h4>

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