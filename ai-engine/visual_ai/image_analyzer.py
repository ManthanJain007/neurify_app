"""
Image Analyzer - Analyze and describe images using Gemini Vision
"""

import google.generativeai as genai
from typing import Dict, Any, List
from PIL import Image
import io

async def describe_image(image_data: bytes) -> Dict[str, Any]:
    """
    Generate detailed description of image
    
    Args:
        image_data: Image file bytes
    
    Returns:
        Dict with image description
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        image = Image.open(io.BytesIO(image_data))
        
        prompt = "Provide a detailed description of this image, including objects, people, setting, colors, and mood."
        
        response = model.generate_content([prompt, image])
        
        return {
            'success': True,
            'description': response.text
        }
    except Exception as e:
        raise Exception(f"Image Description Error: {str(e)}")

async def detect_objects(image_data: bytes) -> List[str]:
    """
    Detect objects in image
    
    Args:
        image_data: Image file bytes
    
    Returns:
        List of detected objects
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        image = Image.open(io.BytesIO(image_data))
        
        prompt = "List all objects visible in this image. Provide only the object names, one per line."
        
        response = model.generate_content([prompt, image])
        
        objects = [obj.strip() for obj in response.text.strip().split('\n') if obj.strip()]
        
        return objects
    except Exception as e:
        raise Exception(f"Object Detection Error: {str(e)}")

async def analyze_scene(image_data: bytes) -> Dict[str, Any]:
    """
    Analyze scene context and composition
    
    Args:
        image_data: Image file bytes
    
    Returns:
        Dict with scene analysis
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        image = Image.open(io.BytesIO(image_data))
        
        prompt = """Analyze this image and provide:
1. Scene type (indoor/outdoor, location type)
2. Main subjects
3. Composition quality
4. Lighting conditions
5. Mood/atmosphere

Respond in JSON format."""
        
        response = model.generate_content([prompt, image])
        
        return {
            'success': True,
            'analysis': response.text
        }
    except Exception as e:
        raise Exception(f"Scene Analysis Error: {str(e)}")
