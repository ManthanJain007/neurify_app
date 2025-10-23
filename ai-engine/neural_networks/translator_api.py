"""
Translator API - Multi-language translation
"""

import google.generativeai as genai
from typing import Optional, Dict, Any, List

async def translate(
    text: str,
    target_language: str,
    source_language: str = 'auto'
) -> Dict[str, Any]:
    """
    Translate text using Gemini
    
    Args:
        text: Text to translate
        target_language: Target language
        source_language: Source language (auto-detect if 'auto')
    
    Returns:
        Dict with translation and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        if source_language == 'auto':
            prompt = f"Translate this text to {target_language}:\n\n{text}\n\nTranslation:"
        else:
            prompt = f"Translate this text from {source_language} to {target_language}:\n\n{text}\n\nTranslation:"
        
        response = model.generate_content(prompt)
        
        return {
            'translation': response.text,
            'metadata': {
                'source_language': source_language,
                'target_language': target_language,
                'original_length': len(text.split()),
                'translated_length': len(response.text.split())
            }
        }
    except Exception as e:
        raise Exception(f"Translator API Error: {str(e)}")

async def detect_language(text: str) -> Dict[str, Any]:
    """
    Detect language of text
    
    Args:
        text: Text to analyze
    
    Returns:
        Dict with detected language info
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Detect the language of this text and provide:
1. Language name
2. ISO language code
3. Confidence level (high/medium/low)

Text: {text}

Respond in JSON format with fields: language, code, confidence"""
        
        response = model.generate_content(prompt)
        
        return {
            'success': True,
            'detection': response.text,
            'text_sample': text[:100]
        }
    except Exception as e:
        raise Exception(f"Language Detection Error: {str(e)}")

async def get_supported_languages() -> List[Dict[str, str]]:
    """
    Get list of supported languages
    
    Returns:
        List of language dictionaries
    """
    # Common languages supported by Gemini
    languages = [
        {"code": "en", "name": "English"},
        {"code": "es", "name": "Spanish"},
        {"code": "fr", "name": "French"},
        {"code": "de", "name": "German"},
        {"code": "it", "name": "Italian"},
        {"code": "pt", "name": "Portuguese"},
        {"code": "ru", "name": "Russian"},
        {"code": "ja", "name": "Japanese"},
        {"code": "ko", "name": "Korean"},
        {"code": "zh", "name": "Chinese"},
        {"code": "ar", "name": "Arabic"},
        {"code": "hi", "name": "Hindi"},
        {"code": "bn", "name": "Bengali"},
        {"code": "tr", "name": "Turkish"},
        {"code": "vi", "name": "Vietnamese"},
        {"code": "th", "name": "Thai"},
        {"code": "pl", "name": "Polish"},
        {"code": "nl", "name": "Dutch"},
        {"code": "sv", "name": "Swedish"},
        {"code": "id", "name": "Indonesian"}
    ]
    
    return languages
