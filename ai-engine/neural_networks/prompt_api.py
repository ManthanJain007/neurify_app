"""
Prompt API - Generate responses from user prompts
"""

import google.generativeai as genai
from typing import Optional, Dict, Any

async def generate(
    prompt: str,
    context: Optional[str] = None,
    temperature: float = 0.7,
    max_tokens: int = 1024
) -> Dict[str, Any]:
    """
    Generate response from Gemini Prompt API
    
    Args:
        prompt: User's prompt text
        context: Optional context for the prompt
        temperature: Creativity level (0-1)
        max_tokens: Maximum response length
    
    Returns:
        Dict with 'text' and 'metadata'
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        # Combine prompt with context if provided
        full_prompt = f"{context}\n\n{prompt}" if context else prompt
        
        # Configure generation parameters
        generation_config = {
            'temperature': temperature,
            'max_output_tokens': max_tokens,
        }
        
        response = model.generate_content(
            full_prompt,
            generation_config=generation_config
        )
        
        return {
            'text': response.text,
            'metadata': {
                'model': 'gemini-2.0-flash-exp',
                'temperature': temperature,
                'prompt_tokens': len(full_prompt.split()),
                'completion_tokens': len(response.text.split())
            }
        }
    except Exception as e:
        raise Exception(f"Prompt API Error: {str(e)}")

async def analyze_intent(text: str) -> Dict[str, Any]:
    """
    Analyze user intent from text
    
    Args:
        text: Input text to analyze
    
    Returns:
        Dict with intent analysis
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Analyze the intent of this text and provide:
1. Primary intent (e.g., question, request, statement, command)
2. Topic/subject
3. Sentiment (positive, neutral, negative)
4. Urgency level (low, medium, high)

Text: "{text}"

Respond in JSON format."""
        
        response = model.generate_content(prompt)
        
        return {
            'success': True,
            'intent_analysis': response.text,
            'original_text': text
        }
    except Exception as e:
        raise Exception(f"Intent Analysis Error: {str(e)}")
