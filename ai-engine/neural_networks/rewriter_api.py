"""
Rewriter API - Text rewriting and transformation
"""

import google.generativeai as genai
from typing import Optional, Dict, Any, List

async def rewrite(
    text: str,
    style: Optional[str] = None,
    preserve_meaning: bool = True,
    creativity_level: float = 0.5
) -> Dict[str, Any]:
    """
    Rewrite text with specified parameters
    
    Args:
        text: Text to rewrite
        style: Target writing style
        preserve_meaning: Whether to preserve original meaning
        creativity_level: How creative to be (0-1)
    
    Returns:
        Dict with rewritten text and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"Rewrite the following text"
        
        if style:
            prompt += f" in a {style} style"
        
        if preserve_meaning:
            prompt += ", preserving the original meaning"
        else:
            prompt += ", feel free to interpret creatively"
        
        prompt += f"""

Original text: {text}

Rewritten version:"""
        
        generation_config = {
            'temperature': creativity_level,
        }
        
        response = model.generate_content(prompt, generation_config=generation_config)
        
        return {
            'text': response.text,
            'metadata': {
                'original_length': len(text.split()),
                'rewritten_length': len(response.text.split()),
                'style': style,
                'creativity_level': creativity_level
            }
        }
    except Exception as e:
        raise Exception(f"Rewriter API Error: {str(e)}")

async def paraphrase(text: str, num_variations: int = 3) -> List[str]:
    """
    Generate paraphrase variations
    
    Args:
        text: Text to paraphrase
        num_variations: Number of variations to generate
    
    Returns:
        List of paraphrased variations
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Generate {num_variations} different paraphrased versions of this text. 
Each version should convey the same meaning but use different words and sentence structures.
Provide each version on a new line, separated by "---".

Original: {text}

Paraphrased versions:"""
        
        response = model.generate_content(prompt)
        
        # Split variations
        variations = [v.strip() for v in response.text.split('---') if v.strip()]
        
        return variations[:num_variations]
    except Exception as e:
        raise Exception(f"Paraphrase Error: {str(e)}")

async def simplify(text: str) -> Dict[str, Any]:
    """
    Simplify complex text
    
    Args:
        text: Text to simplify
    
    Returns:
        Dict with simplified text and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Simplify this text to make it easier to understand. 
Use simpler words, shorter sentences, and clearer structure while maintaining the core message.

Original text: {text}

Simplified version:"""
        
        response = model.generate_content(prompt)
        
        return {
            'text': response.text,
            'metadata': {
                'original_length': len(text.split()),
                'simplified_length': len(response.text.split())
            }
        }
    except Exception as e:
        raise Exception(f"Simplification Error: {str(e)}")

async def humanize(text: str, options: Dict[str, bool]) -> Dict[str, Any]:
    """
    Humanize AI-generated text
    
    Args:
        text: Text to humanize
        options: Humanization options
    
    Returns:
        Dict with humanized text and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        humanization_instructions = []
        
        if options.get('pattern_breaking', True):
            humanization_instructions.append("vary sentence patterns and structures")
        if options.get('natural_flow', True):
            humanization_instructions.append("add natural conversational flow")
        if options.get('idiom_integration', True):
            humanization_instructions.append("incorporate idioms and colloquialisms where appropriate")
        if options.get('contraction_control', True):
            humanization_instructions.append("use contractions naturally")
        if options.get('emotional_tone', True):
            humanization_instructions.append("add subtle emotional nuances")
        
        instructions = ", ".join(humanization_instructions)
        
        prompt = f"""Rewrite this text to make it sound more human and less AI-generated. 
Apply these techniques: {instructions}.

Original text: {text}

Humanized version:"""
        
        response = model.generate_content(prompt)
        
        return {
            'text': response.text,
            'metadata': {
                'applied_options': [k for k, v in options.items() if v],
                'original_length': len(text.split()),
                'humanized_length': len(response.text.split())
            }
        }
    except Exception as e:
        raise Exception(f"Humanization Error: {str(e)}")

async def adjust_tone(text: str, tone: str, intensity: int = 50) -> Dict[str, Any]:
    """
    Adjust text tone
    
    Args:
        text: Text to adjust
        tone: Target tone (formal, casual, professional, creative, persuasive, technical, empathetic)
        intensity: Tone intensity (0-100)
    
    Returns:
        Dict with tone-adjusted text and metadata
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        intensity_desc = "subtly" if intensity < 40 else "moderately" if intensity < 70 else "strongly"
        
        prompt = f"""Rewrite this text with a {intensity_desc} {tone} tone (intensity: {intensity}/100).

Original text: {text}

Rewritten with {tone} tone:"""
        
        response = model.generate_content(prompt)
        
        return {
            'text': response.text,
            'metadata': {
                'tone': tone,
                'intensity': intensity,
                'original_length': len(text.split()),
                'adjusted_length': len(response.text.split())
            }
        }
    except Exception as e:
        raise Exception(f"Tone Adjustment Error: {str(e)}")

async def stream_rewrite(text: str):
    """
    Stream rewritten text in real-time
    
    Args:
        text: Text to rewrite
    
    Yields:
        Chunks of rewritten text
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"Rewrite this text with improved clarity and flow:\n\n{text}"
        
        response = model.generate_content(prompt, stream=True)
        
        for chunk in response:
            if chunk.text:
                yield chunk.text
    except Exception as e:
        yield f"Error: {str(e)}"
