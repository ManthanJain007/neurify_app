"""
OCR Processor - Extract text from images using Gemini Vision
"""

import google.generativeai as genai
from typing import Dict, Any
from PIL import Image
import io

async def extract_text(image_data: bytes) -> str:
    """
    Extract text from image using Gemini Vision API
    
    Args:
        image_data: Image file bytes
    
    Returns:
        Extracted text
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Use Gemini Vision to extract text
        prompt = "Extract all text from this image. Return only the extracted text without any additional commentary."
        
        response = model.generate_content([prompt, image])
        
        return response.text
    except Exception as e:
        raise Exception(f"OCR Processing Error: {str(e)}")

async def analyze_document(image_data: bytes) -> Dict[str, Any]:
    """
    Analyze document structure and content
    
    Args:
        image_data: Image file bytes
    
    Returns:
        Dict with document analysis
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        image = Image.open(io.BytesIO(image_data))
        
        prompt = """Analyze this document image and provide:
1. Document type (e.g., letter, form, invoice, receipt)
2. Layout structure
3. Extracted text
4. Key information identified

Respond in JSON format."""
        
        response = model.generate_content([prompt, image])
        
        return {
            'success': True,
            'analysis': response.text
        }
    except Exception as e:
        raise Exception(f"Document Analysis Error: {str(e)}")
