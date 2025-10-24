#!/usr/bin/env python3
"""
NeuroWrite Platform Feature Test Script
Tests all major API endpoints to ensure everything works correctly
"""

import requests
import json
from typing import Dict, Any

BASE_URL = "http://localhost:8001"

# Test cases for each major feature category
TEST_CASES = {
    "Grammar Check": {
        "endpoint": "/gemini/proofread/grammar",
        "data": {"text": "This are a test sentance with erors and misplaced modifier running."}
    },
    "Auto-Fix": {
        "endpoint": "/gemini/proofread/auto-fix",
        "data": {"text": "Ths is badley writen text that need fixing."}
    },
    "Spelling Check": {
        "endpoint": "/gemini/proofread/spelling",
        "data": {"text": "The qwick brown fox jumps over the lasy dog."}
    },
    "Summarize": {
        "endpoint": "/gemini/summarize",
        "data": {
            "text": "Artificial intelligence is transforming how we live and work. Machine learning algorithms can now recognize patterns, make predictions, and even create art. The technology continues to advance rapidly.",
            "length": "short",
            "style": "paragraph"
        }
    },
    "Paraphrase": {
        "endpoint": "/gemini/rewrite/paraphrase",
        "data": {"text": "The quick brown fox jumps over the lazy dog."}
    },
    "Humanize AI Text": {
        "endpoint": "/gemini/rewrite/humanize",
        "data": {
            "text": "AI-generated content detection systems identify algorithmically produced text through pattern recognition and linguistic analysis.",
            "options": {
                "pattern_breaking": True,
                "natural_flow": True,
                "idiom_integration": True,
                "contraction_control": True,
                "emotional_tone": True
            }
        }
    },
    "Tone Adjustment": {
        "endpoint": "/gemini/rewrite/tone",
        "data": {
            "text": "We need to talk about your performance.",
            "tone": "empathetic",
            "intensity": 75
        }
    },
    "Simplify": {
        "endpoint": "/gemini/rewrite/simplify",
        "data": {"text": "The utilization of multifaceted lexical components obfuscates comprehension."}
    },
    "Translation": {
        "endpoint": "/gemini/translate",
        "data": {
            "text": "Hello, how are you today?",
            "target_language": "Spanish",
            "source_language": "auto"
        }
    },
    "Language Detection": {
        "endpoint": "/gemini/translate/detect",
        "data": {"text": "Bonjour, comment allez-vous?"}
    },
    "Content Generation": {
        "endpoint": "/gemini/write",
        "data": {
            "prompt": "Write a short introduction about artificial intelligence",
            "style": "professional",
            "tone": "informative",
            "word_count": 100
        }
    },
    "Text Expansion": {
        "endpoint": "/gemini/write/expand",
        "data": {"text": "AI is important."}
    },
    "Key Points Extraction": {
        "endpoint": "/gemini/summarize/key-points",
        "data": {"text": "Climate change is affecting ecosystems globally. Rising temperatures are melting ice caps. Sea levels are rising. Weather patterns are becoming more extreme."}
    },
    "Intent Analysis": {
        "endpoint": "/gemini/prompt/analyze-intent",
        "data": {"text": "Can you help me improve my writing skills?"}
    },
    "Readability Score": {
        "endpoint": "/gemini/proofread/readability",
        "data": {"text": "The cat sat on the mat. It was a sunny day. Birds were singing."}
    }
}

def test_health_check() -> bool:
    """Test if the backend is running"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running and healthy")
            return True
        else:
            print("❌ Backend returned non-200 status")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend at", BASE_URL)
        print("   Make sure to run: python ai-engine/main.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_feature(name: str, endpoint: str, data: Dict[str, Any]) -> bool:
    """Test a single feature endpoint"""
    try:
        url = f"{BASE_URL}{endpoint}"
        response = requests.post(url, json=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ {name}")
            # Print a preview of the result
            if isinstance(result, dict):
                if 'data' in result:
                    preview = str(result['data'])[:100]
                    print(f"   Preview: {preview}...")
                elif 'success' in result:
                    print(f"   Success: {result['success']}")
            return True
        else:
            print(f"❌ {name} - Status {response.status_code}")
            print(f"   Error: {response.text[:200]}")
            return False
    except requests.exceptions.Timeout:
        print(f"⚠️  {name} - Request timeout (AI processing can be slow)")
        return False
    except Exception as e:
        print(f"❌ {name} - Error: {str(e)[:100]}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("NeuroWrite Platform - Feature Test Suite")
    print("=" * 60)
    print()
    
    # Test health check first
    print("Testing backend connection...")
    if not test_health_check():
        print("\n⚠️  Backend is not running. Please start it first:")
        print("   cd ai-engine")
        print("   python main.py")
        return
    
    print()
    print("Testing features...")
    print("-" * 60)
    
    # Run all feature tests
    passed = 0
    failed = 0
    
    for name, config in TEST_CASES.items():
        if test_feature(name, config["endpoint"], config["data"]):
            passed += 1
        else:
            failed += 1
        print()
    
    # Summary
    print("=" * 60)
    print("Test Summary")
    print("=" * 60)
    print(f"✅ Passed: {passed}/{len(TEST_CASES)}")
    print(f"❌ Failed: {failed}/{len(TEST_CASES)}")
    print()
    
    if failed == 0:
        print("🎉 All features are working correctly!")
        print()
        print("Next steps:")
        print("1. Start the frontend: cd neurowrite-app && npm run dev")
        print("2. Open http://localhost:3000")
        print("3. Try all 165+ features in the UI!")
    else:
        print("⚠️  Some features need attention.")
        print("Common issues:")
        print("- Missing or invalid GEMINI_API_KEY in .env")
        print("- Python dependencies not installed")
        print("- Network connectivity issues")
        print()
        print("Check the logs above for specific errors.")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
