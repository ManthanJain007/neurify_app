"""
Writer API - Content generation capabilities
"""

import google.generativeai as genai
from typing import Optional, Dict, Any, List

async def generate(
    prompt: str,
    style: Optional[str] = None,
    tone: Optional[str] = None,
    word_count: Optional[int] = None
) -> Dict[str, Any]:
    """
    Generate content using Gemini Writer API
    
    Args:
        prompt: Content generation prompt
        style: Writing style (e.g., 'creative', 'technical', 'academic')
        tone: Writing tone (e.g., 'formal', 'casual', 'professional')
        word_count: Target word count
    
    Returns:
        Dict with generated text and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        # Build enhanced prompt
        enhanced_prompt = f"Write content based on this prompt: {prompt}"
        
        if style:
            enhanced_prompt += f"\nStyle: {style}"
        if tone:
            enhanced_prompt += f"\nTone: {tone}"
        if word_count:
            enhanced_prompt += f"\nTarget length: approximately {word_count} words"
        
        enhanced_prompt += "\n\nGenerate the content:"
        
        response = model.generate_content(enhanced_prompt)
        
        return {
            'text': response.text,
            'metadata': {
                'word_count': len(response.text.split()),
                'style': style,
                'tone': tone,
                'requested_words': word_count
            }
        }
    except Exception as e:
        raise Exception(f"Writer API Error: {str(e)}")

async def complete(text: str, num_completions: int = 3) -> List[str]:
    """
    Generate text completions
    
    Args:
        text: Partial text to complete
        num_completions: Number of completion suggestions
    
    Returns:
        List of completion suggestions
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Given this incomplete text, provide {num_completions} different ways to complete it. 
Provide only the completion text for each option, separated by newlines.

Incomplete text: "{text}"

Completions:"""
        
        response = model.generate_content(prompt)
        
        # Parse completions
        completions = [c.strip() for c in response.text.strip().split('\n') if c.strip()]
        
        return completions[:num_completions]
    except Exception as e:
        raise Exception(f"Text Completion Error: {str(e)}")

async def expand(text: str, target_length: int = 500) -> Dict[str, Any]:
    """
    Expand text to target length
    
    Args:
        text: Text to expand
        target_length: Target word count
    
    Returns:
        Dict with expanded text and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        current_length = len(text.split())
        
        prompt = f"""Expand the following text from {current_length} words to approximately {target_length} words. 
Add relevant details, examples, and elaboration while maintaining the original meaning and style.

Original text: {text}

Expanded version:"""
        
        response = model.generate_content(prompt)
        
        return {
            'text': response.text,
            'metadata': {
                'original_length': current_length,
                'expanded_length': len(response.text.split()),
                'target_length': target_length,
                'expansion_ratio': round(len(response.text.split()) / current_length, 2)
            }
        }
    except Exception as e:
        raise Exception(f"Text Expansion Error: {str(e)}")
