"""
Neurify AI Engine - Simplified for Deployment
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI app
app = FastAPI(
    title="Neurify AI Engine",
    description="AI processing engine with Gemini API integration",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str
    feature_id: str = "generate"

class AIResponse(BaseModel):
    success: bool
    data: str

@app.get("/")
async def root():
    return {
        "service": "Neurify AI Engine",
        "status": "operational",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "ai_engine": "operational"}

@app.post("/api/generate", response_model=AIResponse)
async def generate(request: TextRequest):
    """Generate AI response"""
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content(request.text)
        return AIResponse(success=True, data=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main_simple:app", host="0.0.0.0", port=8001, reload=True)
