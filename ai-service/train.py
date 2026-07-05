import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load dataset
data = pd.read_csv("dataset.csv")

X = data["text"]

y_category = data["category"]
y_priority = data["priority"]

# Convert text to vectors
vectorizer = TfidfVectorizer()

X_vectorized = vectorizer.fit_transform(X)

# Train category model
category_model = MultinomialNB()
category_model.fit(X_vectorized, y_category)

# Train priority model
priority_model = MultinomialNB()
priority_model.fit(X_vectorized, y_priority)

# Save everything
joblib.dump(vectorizer, "vectorizer.pkl")
joblib.dump(category_model, "category_model.pkl")
joblib.dump(priority_model, "priority_model.pkl")

print("AI models trained successfully!")