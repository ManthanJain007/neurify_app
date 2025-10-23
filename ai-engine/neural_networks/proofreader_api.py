"""
Proofreader API - Grammar, spelling, and style checking
"""

import google.generativeai as genai
from typing import Dict, Any, List

async def check(text: str) -> Dict[str, Any]:
    """
    Comprehensive grammar and style check
    
    Args:
        text: Text to check
    
    Returns:
        Dict with all errors and suggestions
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Perform a comprehensive proofreading check on this text. Identify:
1. Grammar errors
2. Spelling mistakes
3. Punctuation issues
4. Style improvements
5. Clarity suggestions

Text: {text}

Provide a detailed analysis in JSON format with fields: grammar_errors, spelling_errors, punctuation_issues, style_suggestions, overall_quality_score (0-100)"""
        
        response = model.generate_content(prompt)
        
        return {
            'success': True,
            'analysis': response.text,
            'text_length': len(text.split())
        }
    except Exception as e:
        raise Exception(f"Proofreader API Error: {str(e)}")

async def check_grammar(text: str) -> List[Dict[str, Any]]:
    """
    Check grammar errors
    
    Args:
        text: Text to check
    
    Returns:
        List of grammar errors with suggestions
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Identify all grammar errors in this text. For each error, provide:
- The incorrect text
- The type of error
- The correction
- A brief explanation

Text: {text}

List each error on a new line in this format: ERROR | TYPE | CORRECTION | EXPLANATION"""
        
        response = model.generate_content(prompt)
        
        errors = []
        for line in response.text.strip().split('\n'):
            if '|' in line:
                parts = [p.strip() for p in line.split('|')]
                if len(parts) >= 4:
                    errors.append({
                        'error': parts[0],
                        'type': parts[1],
                        'correction': parts[2],
                        'explanation': parts[3]
                    })
        
        return errors
    except Exception as e:
        raise Exception(f"Grammar Check Error: {str(e)}")

async def check_spelling(text: str) -> List[Dict[str, str]]:
    """
    Check spelling errors
    
    Args:
        text: Text to check
    
    Returns:
        List of spelling errors with corrections
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Identify all spelling errors in this text. For each error, provide:
- The misspelled word
- The correct spelling

Text: {text}

List each error on a new line in this format: MISSPELLED | CORRECT"""
        
        response = model.generate_content(prompt)
        
        errors = []
        for line in response.text.strip().split('\n'):
            if '|' in line:
                parts = [p.strip() for p in line.split('|')]
                if len(parts) >= 2:
                    errors.append({
                        'misspelled': parts[0],
                        'correction': parts[1]
                    })
        
        return errors
    except Exception as e:
        raise Exception(f"Spelling Check Error: {str(e)}")

async def get_readability_score(text: str) -> Dict[str, Any]:
    """
    Calculate readability score
    
    Args:
        text: Text to analyze
    
    Returns:
        Dict with readability metrics
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Analyze the readability of this text and provide:
1. Overall readability score (0-100, where 100 is easiest to read)
2. Reading level (e.g., "8th grade", "college", "professional")
3. Average sentence length
4. Vocabulary complexity (simple/moderate/complex)
5. Suggestions for improvement

Text: {text}

Respond in JSON format."""
        
        response = model.generate_content(prompt)
        
        word_count = len(text.split())
        sentence_count = text.count('.') + text.count('!') + text.count('?')
        avg_words_per_sentence = word_count / max(sentence_count, 1)
        
        return {
            'success': True,
            'analysis': response.text,
            'metrics': {
                'word_count': word_count,
                'sentence_count': sentence_count,
                'avg_words_per_sentence': round(avg_words_per_sentence, 1)
            }
        }
    except Exception as e:
        raise Exception(f"Readability Analysis Error: {str(e)}")

async def auto_fix(text: str) -> str:
    """
    Automatically fix all errors
    
    Args:
        text: Text to fix
    
    Returns:
        Corrected text
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Fix all grammar, spelling, punctuation, and style errors in this text. 
Return ONLY the corrected text without explanations or formatting.

Original text: {text}

Corrected text:"""
        
        response = model.generate_content(prompt)
        
        return response.text.strip()
    except Exception as e:
        raise Exception(f"Auto-fix Error: {str(e)}")
