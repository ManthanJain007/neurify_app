"""
Summarizer API - Text summarization capabilities
"""

import google.generativeai as genai
from typing import Optional, Dict, Any, List

async def summarize(
    text: str,
    length: str = 'medium',
    style: str = 'paragraph'
) -> Dict[str, Any]:
    """
    Summarize text using Gemini
    
    Args:
        text: Text to summarize
        length: 'short', 'medium', or 'long'
        style: 'bullets', 'paragraph', or 'key-points'
    
    Returns:
        Dict with summary and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        length_instructions = {
            'short': 'in 2-3 sentences',
            'medium': 'in 1 paragraph (4-6 sentences)',
            'long': 'in 2-3 paragraphs'
        }
        
        style_instructions = {
            'bullets': 'as bullet points',
            'paragraph': 'as a cohesive paragraph',
            'key-points': 'highlighting the key points'
        }
        
        prompt = f"""Summarize the following text {length_instructions.get(length, 'in 1 paragraph')} {style_instructions.get(style, 'as a paragraph')}.

Text: {text}

Summary:"""
        
        response = model.generate_content(prompt)
        
        return {
            'summary': response.text,
            'metadata': {
                'original_length': len(text.split()),
                'summary_length': len(response.text.split()),
                'compression_ratio': round(len(response.text.split()) / len(text.split()), 2),
                'style': style,
                'length': length
            }
        }
    except Exception as e:
        raise Exception(f"Summarizer API Error: {str(e)}")

async def extract_key_points(text: str) -> List[str]:
    """
    Extract key points from text
    
    Args:
        text: Input text
    
    Returns:
        List of key points
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Extract the main key points from this text. List only the most important points, one per line, without numbering or bullets.

Text: {text}

Key Points:"""
        
        response = model.generate_content(prompt)
        
        # Split response into individual points
        points = [point.strip() for point in response.text.strip().split('\n') if point.strip()]
        
        return points
    except Exception as e:
        raise Exception(f"Key Points Extraction Error: {str(e)}")
