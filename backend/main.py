from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import re
from scipy.sparse import hstack

app = FastAPI(
    title="MBTI Personality Predictor API",
    description="Hybrid NLP personality prediction API using TF-IDF and LinearSVC",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = joblib.load('../models/mbti_model.pkl')
word_vectorizer = joblib.load('../models/word_vectorizer.pkl')
char_vectorizer = joblib.load('../models/char_vectorizer.pkl')

mbti_types = [
    'infj', 'infp', 'intj', 'intp',
    'isfj', 'isfp', 'istj', 'istp',
    'enfj', 'enfp', 'entj', 'entp',
    'esfj', 'esfp', 'estj', 'estp'
]

def clean_text(text):
    text = text.lower()
    for personality in mbti_types:
        text = text.replace(personality, '')
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()

    return text

def predict_personality(text):
    cleaned = clean_text(text)
    word_features = word_vectorizer.transform([cleaned])
    char_features = char_vectorizer.transform([cleaned])
    combined_features = hstack([word_features, char_features])
    prediction = model.predict(combined_features)[0]
    decision_scores = model.decision_function(combined_features)
    raw_confidence = float(decision_scores.max())
    confidence = min(max((raw_confidence + 1) * 20, 0), 100)
    return {
        "personality": prediction,
        "confidence": round(confidence, 2)
    }

@app.get("/health")
def health():
    return {"status": "running"}

@app.get("/")
def home():
    return {"message": "API running"}
    
class PredictionRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(request: PredictionRequest):
    if not request.text.strip():
        return {"error": "Text cannot be empty"}
    if len(request.text.split()) < 5:
        return {
            "error": "Please enter at least 5 words"
        }
    result = predict_personality(request.text)
    return result