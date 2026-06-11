from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("sms_phishing_model.pkl")

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

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json

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
        recommendation = "Message appears legitimate."

    elif final_score < 70:

        status = "SUSPICIOUS"
        risk_level = "MEDIUM"
        recommendation = "Verify sender before responding."
    else:

        status = "UNSAFE"
        risk_level = "HIGH"
        recommendation = "Avoid clicking links or sharing personal information."
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