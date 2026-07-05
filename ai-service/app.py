from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load models
vectorizer = joblib.load("vectorizer.pkl")
category_model = joblib.load("category_model.pkl")
priority_model = joblib.load("priority_model.pkl")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    text = data["text"]

    text_vector = vectorizer.transform([text])

    category = category_model.predict(text_vector)[0]

    priority = priority_model.predict(text_vector)[0]

    return jsonify({
        "category": category,
        "priority": priority
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)