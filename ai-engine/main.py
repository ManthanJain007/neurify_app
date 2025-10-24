"""
NeuroWrite AI Engine
FastAPI application integrating all 6 Gemini APIs with advanced AI capabilities
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import asyncio
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Import AI modules
from neural_networks import prompt_api, summarizer_api, writer_api, rewriter_api, translator_api, proofreader_api
from voice_processing import voice_processor
from visual_ai import ocr_processor, image_analyzer
from blockchain import web3_service

load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI app
app = FastAPI(
    title="Neurify AI Engine",
    description="Advanced AI processing engine with Gemini API integration - 165+ Features",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====================
# REQUEST/RESPONSE MODELS
# ====================

class PromptRequest(BaseModel):
    prompt: str
    context: Optional[str] = None
    temperature: float = Field(default=0.7, ge=0, le=1)
    max_tokens: int = Field(default=1024, ge=1, le=8192)

class TextRequest(BaseModel):
    text: str

class SummarizeRequest(TextRequest):
    length: Optional[str] = 'medium'  # short, medium, long
    style: Optional[str] = 'paragraph'  # bullets, paragraph, key-points

class WriteRequest(BaseModel):
    prompt: str
    style: Optional[str] = None
    tone: Optional[str] = None
    word_count: Optional[int] = None

class RewriteRequest(TextRequest):
    style: Optional[str] = None
    preserve_meaning: bool = True
    creativity_level: float = Field(default=0.5, ge=0, le=1)

class HumanizeRequest(TextRequest):
    options: Dict[str, bool] = {
        'pattern_breaking': True,
        'natural_flow': True,
        'idiom_integration': True,
        'contraction_control': True,
        'emotional_tone': True
    }

class ToneAdjustmentRequest(TextRequest):
    tone: str  # formal, casual, professional, creative, persuasive, technical, empathetic
    intensity: int = Field(default=50, ge=0, le=100)

class TranslateRequest(TextRequest):
    target_language: str
    source_language: Optional[str] = 'auto'

class AIResponse(BaseModel):
    success: bool
    data: str
    metadata: Optional[Dict[str, Any]] = None

# ====================
# HEALTH CHECK
# ====================

@app.get("/")
async def root():
    return {
        "service": "Neurify AI Engine",
        "status": "operational",
        "version": "1.0.0",
        "features": 165,
        "gemini_apis": ["prompt", "summarizer", "writer", "rewriter", "translator", "proofreader"]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "ai_engine": "operational",
        "gemini_connection": "active"
    }

# ====================
# 1. PROMPT API ENDPOINTS
# ====================

@app.post("/gemini/prompt", response_model=AIResponse)
async def generate_prompt(request: PromptRequest):
    """Generate response from Gemini Prompt API"""
    try:
        result = await prompt_api.generate(
            prompt=request.prompt,
            context=request.context,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/prompt/analyze-intent")
async def analyze_intent(request: TextRequest):
    """Analyze user intent from text"""
    try:
        result = await prompt_api.analyze_intent(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ====================
# 2. SUMMARIZER API ENDPOINTS
# ====================

@app.post("/gemini/summarize", response_model=AIResponse)
async def summarize_text(request: SummarizeRequest):
    """Summarize text using Gemini Summarizer API"""
    try:
        result = await summarizer_api.summarize(
            text=request.text,
            length=request.length,
            style=request.style
        )
        return AIResponse(success=True, data=result['summary'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/summarize/key-points")
async def extract_key_points(request: TextRequest):
    """Extract key points from text"""
    try:
        key_points = await summarizer_api.extract_key_points(request.text)
        return {"keyPoints": key_points}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ====================
# 3. WRITER API ENDPOINTS
# ====================

@app.post("/gemini/write", response_model=AIResponse)
async def generate_content(request: WriteRequest):
    """Generate content using Gemini Writer API"""
    try:
        result = await writer_api.generate(
            prompt=request.prompt,
            style=request.style,
            tone=request.tone,
            word_count=request.word_count
        )
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/write/complete")
async def complete_text(request: TextRequest):
    """Generate text completions"""
    try:
        completions = await writer_api.complete(request.text)
        return {"completions": completions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/write/expand", response_model=AIResponse)
async def expand_text(request: TextRequest, target_length: int = 500):
    """Expand text to target length"""
    try:
        result = await writer_api.expand(request.text, target_length)
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ====================
# 4. REWRITER API ENDPOINTS
# ====================

@app.post("/gemini/rewrite", response_model=AIResponse)
async def rewrite_text(request: RewriteRequest):
    """Rewrite text with Gemini Rewriter API"""
    try:
        result = await rewriter_api.rewrite(
            text=request.text,
            style=request.style,
            preserve_meaning=request.preserve_meaning,
            creativity_level=request.creativity_level
        )
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/rewrite/paraphrase")
async def paraphrase_text(request: TextRequest):
    """Generate paraphrase variations"""
    try:
        variations = await rewriter_api.paraphrase(request.text)
        return {"variations": variations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/rewrite/simplify", response_model=AIResponse)
async def simplify_text(request: TextRequest):
    """Simplify complex text"""
    try:
        result = await rewriter_api.simplify(request.text)
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/rewrite/humanize", response_model=AIResponse)
async def humanize_text(request: HumanizeRequest):
    """Humanize AI-generated text"""
    try:
        result = await rewriter_api.humanize(request.text, request.options)
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/rewrite/tone", response_model=AIResponse)
async def adjust_tone(request: ToneAdjustmentRequest):
    """Adjust text tone"""
    try:
        result = await rewriter_api.adjust_tone(request.text, request.tone, request.intensity)
        return AIResponse(success=True, data=result['text'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/rewrite/stream")
async def stream_rewrite(request: RewriteRequest):
    """Stream rewritten text in real-time"""
    async def generate():
        async for chunk in rewriter_api.stream_rewrite(request.text):
            yield chunk
    
    return StreamingResponse(generate(), media_type="text/plain")

# ====================
# 5. TRANSLATOR API ENDPOINTS
# ====================

@app.post("/gemini/translate", response_model=AIResponse)
async def translate_text(request: TranslateRequest):
    """Translate text using Gemini Translator API"""
    try:
        result = await translator_api.translate(
            text=request.text,
            target_language=request.target_language,
            source_language=request.source_language
        )
        return AIResponse(success=True, data=result['translation'], metadata=result.get('metadata'))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/translate/detect")
async def detect_language(request: TextRequest):
    """Detect language of text"""
    try:
        result = await translator_api.detect_language(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/gemini/translate/languages")
async def get_supported_languages():
    """Get list of supported languages"""
    try:
        languages = await translator_api.get_supported_languages()
        return {"languages": languages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ====================
# 6. PROOFREADER API ENDPOINTS
# ====================

@app.post("/gemini/proofread")
async def check_text(request: TextRequest):
    """Comprehensive grammar and style check"""
    try:
        result = await proofreader_api.check(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/proofread/grammar")
async def check_grammar(request: TextRequest):
    """Check grammar errors"""
    try:
        errors = await proofreader_api.check_grammar(request.text)
        return {"errors": errors}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/proofread/spelling")
async def check_spelling(request: TextRequest):
    """Check spelling errors"""
    try:
        errors = await proofreader_api.check_spelling(request.text)
        return {"errors": errors}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/proofread/readability")
async def get_readability_score(request: TextRequest):
    """Calculate readability score"""
    try:
        result = await proofreader_api.get_readability_score(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gemini/proofread/auto-fix")
async def auto_fix_text(request: TextRequest):
    """Automatically fix all errors"""
    try:
        corrected = await proofreader_api.auto_fix(request.text)
        return {"correctedText": corrected}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ====================
# ADDITIONAL AI FEATURES
# ====================

@app.post("/ai/voice/process")
async def process_voice(audio_data: bytes):
    """Process voice input"""
    try:
        result = await voice_processor.transcribe(audio_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/vision/ocr")
async def extract_text_from_image(image_data: bytes):
    """Extract text from image using OCR"""
    try:
        text = await ocr_processor.extract_text(image_data)
        return {"extractedText": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/blockchain/verify")
async def verify_content_blockchain(content: str):
    """Verify content on blockchain"""
    try:
        result = await web3_service.verify_content(content)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Vercel serverless handler
handler = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )
