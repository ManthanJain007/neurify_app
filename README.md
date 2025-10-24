# 🧠 Neurify - AI Writing Assistant

**165+ AI Features | Powered by Google Gemini | 100% Free**

Neurify is a comprehensive AI writing platform with 165+ powerful features powered by Google's Gemini AI.

![Features](https://img.shields.io/badge/Features-165+-blue) ![Status](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 15 Feature Categories
- **Grammar & Spelling** (15 features) - Grammar check, spelling, punctuation
- **Writing Style** (20 features) - Clarity, conciseness, readability
- **Tone & Voice** (15 features) - Formal, casual, professional
- **Content Generation** (20 features) - Blogs, headlines, stories
- **Rewriting & Paraphrasing** (15 features) - AI humanization
- **Translation** (10 features) - 15+ languages
- **SEO & Marketing** (15 features) - Meta descriptions, ad copy
- **Academic Writing** (10 features) - Citations, abstracts
- **Business Writing** (10 features) - Proposals, reports
- **Creative Writing** (10 features) - Stories, poetry
- **Social Media** (10 features) - Posts for all platforms
- **Email Writing** (10 features) - Professional emails
- **Text Analysis** (10 features) - Sentiment, word count
- **AI Enhancement** (15 features) - AI detection bypass

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Google Gemini API key

### Installation

1. **Clone**
```bash
git clone https://github.com/YOUR_USERNAME/neurify.git
cd neurify
```

2. **Backend Setup**
```bash
cd ai-engine
pip install -r requirements.txt
# Add GEMINI_API_KEY to .env
python -m uvicorn main:app --reload --port 8001
```

3. **Frontend Setup**
```bash
cd neurowrite-app
npm install
npm run dev
```

4. **Access**
- Frontend: http://localhost:3000
- API Docs: http://localhost:8001/docs

## 📦 Structure

```
neurify/
├── ai-engine/           # FastAPI backend
│   ├── main.py
│   ├── neural_networks/
│   └── .env
├── neurowrite-app/      # Next.js frontend
│   ├── app/
│   ├── components/
│   └── lib/
└── README.md
```

## 🛠️ Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript, TailwindCSS  
**Backend:** FastAPI, Python, Google Gemini AI

## 🌐 Deployment

### Vercel (Frontend)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/neurify)

### Railway (Backend)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

## 📄 License

MIT License

---

Made with ❤️ using Google Gemini AI
