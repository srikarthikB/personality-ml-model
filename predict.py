import re
import joblib
from scipy.sparse import hstack


model = joblib.load('models/mbti_model.pkl')
word_vectorizer = joblib.load('models/word_vectorizer.pkl')
char_vectorizer = joblib.load('models/char_vectorizer.pkl')

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

    prediction = model.predict(combined_features)
    return prediction[0]

sample = """I enjoy deep conversations and spending time alone
            thinking about abstract ideas and the future.
         """

result = predict_personality(sample)

print("Predicted Personality:", result)