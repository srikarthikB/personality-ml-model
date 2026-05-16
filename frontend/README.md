# MBTI Mind Reader — Frontend

A modern, dark-aesthetic React frontend for the MBTI Personality Predictor API.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations and transitions
- **Axios** — API requests

## Folder Structure

```
mbti-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BackgroundOrbs.jsx    # Animated bg orbs + neural grid
│   │   ├── ErrorMessage.jsx      # Error display with dismiss
│   │   ├── Footer.jsx            # Minimal footer
│   │   ├── Header.jsx            # Title + eyebrow label
│   │   ├── LoadingOverlay.jsx    # Animated loading state
│   │   ├── ResultCard.jsx        # MBTI result card
│   │   └── TextInput.jsx         # Textarea + word counter + submit
│   ├── data/
│   │   └── mbtiData.js           # All 16 types: colors, titles, traits
│   ├── hooks/
│   │   └── usePrediction.js      # API call hook with error handling
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Setup

### 1. Prerequisites

- Node.js 18+
- Your FastAPI backend running at `http://127.0.0.1:8000`

### 2. Install dependencies

```bash
cd mbti-frontend
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
npm run preview   # preview the build locally
```

## API Integration

The frontend calls:

```
POST http://127.0.0.1:8000/predict
Content-Type: application/json

{ "text": "user input text" }
```

Response:
```json
{ "personality": "INTP", "confidence": 78.4 }
```

The hook in `src/hooks/usePrediction.js` handles all API logic including:
- Loading state
- Timeout (15s)
- Network errors (server not running)
- Backend validation errors

## Configuration

To change the API URL, edit `src/hooks/usePrediction.js`:

```js
const API_URL = 'http://127.0.0.1:8000/predict';
```

## Features

- ✅ Large textarea with placeholder examples
- ✅ Live word + character counter
- ✅ Min 5 words validation with live feedback
- ✅ Ctrl/⌘ + Enter keyboard shortcut
- ✅ Neural-ring loading animation with step labels
- ✅ Animated result card with per-type colors and glows
- ✅ MBTI dimension breakdown (E/I, S/N, T/F, J/P)
- ✅ Animated confidence progress bar
- ✅ Trait badges
- ✅ Error handling with clear messages
- ✅ Mobile responsive
- ✅ Dark cosmic aesthetic
