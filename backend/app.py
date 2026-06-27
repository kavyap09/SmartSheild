from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pickle
import pandas as pd
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app)

model = joblib.load("sms_phishing_model.pkl")
with open("url_phish_smart.pkl", "rb") as f:
    url_model = pickle.load(f)

phishing_words = {
    "bank": 5,
    "verify": 8,
    "account": 5,
    "otp": 10,
    "click": 8,
    "link": 8,
    "reward": 8,
    "urgent": 8,
    "blocked": 10,
    "suspended": 10,
    "update": 5,
    "winner": 10,
    "won": 8,
    "free": 5,
    "claim": 8,
    "prize": 8,
    "lottery": 10,
    "kyc": 10,
    "upi": 10,
    "gift": 5,
    "cash": 5,
    "offer": 5
}
# URL FEATURE EXTRACTION
def extract_features(url):
    parsed = urlparse(url)
    hostname = parsed.netloc.lower()

    return {
        "url_length": len(url),
        "num_dots": hostname.count("."),
        "has_https": int("https" in url),
        "has_at": int("@" in url),
        "has_hyphen": int("-" in hostname),
        "num_digits": sum(c.isdigit() for c in url),
        "has_login": int("login" in url.lower()),
    }


# ANALYZE API
@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json

    detection_type = data.get("type", "sms")
    if detection_type == "url":
        url = data.get("url", "")

        if not url:
            return jsonify({
                "error": "URL is required"
            }), 400

        features = extract_features(url)

        df_test = pd.DataFrame([features])

        prediction = url_model.predict(df_test)[0]

        confidence = float(
            url_model.predict_proba(df_test)[0][1] * 100
        )

        if prediction == 1:

            status = "UNSAFE"
            risk_level = "HIGH"

            recommendation = (
                "This URL appears to be a phishing website. "
                "Avoid opening it or entering personal information."
            )

        else:

            status = "SAFE"
            risk_level = "LOW"

            recommendation = (
                "This URL appears to be safe."
            )

        return jsonify({
            "status": status,
            "suspicionRate": round(confidence, 2),
            "riskLevel": risk_level,
            "keywords": [],
            "recommendation": recommendation
        })
    message = data.get("message", "")

    if not message:
        return jsonify({
            "error": "Message is required"
        }), 400

    probabilities = model.predict_proba(
        [message]
    )[0]

    spam_probability = probabilities[1] * 100

    matched_keywords = []
    keyword_boost = 0

    for word, score in phishing_words.items():

        if word in message.lower():

            matched_keywords.append(word)
            keyword_boost += score

    keyword_boost = min(
        keyword_boost,
        25
    )

    final_score = min(
        spam_probability + keyword_boost,
        100
    )

    if final_score < 40:

        status = "SAFE"
        risk_level = "LOW"

        recommendation = (
            "Message appears legitimate."
        )

    elif final_score < 70:

        status = "SUSPICIOUS"
        risk_level = "MEDIUM"

        recommendation = (
            "Verify sender before responding."
        )

    else:

        status = "UNSAFE"
        risk_level = "HIGH"

        recommendation = (
            "Avoid clicking links or sharing personal information."
        )

    return jsonify({

        "status": status,
        "suspicionRate": round(final_score, 2),
        "riskLevel": risk_level,
        "keywords": matched_keywords,
        "recommendation": recommendation

    })


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )