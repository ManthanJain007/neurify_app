"""
Quick API Test Script
Tests the NeuroWrite API endpoints
"""

import requests
import json

BASE_URL = "http://localhost:8001"

def test_api():
    print("🧪 Testing NeuroWrite API...\n")
    
    # Test 1: Health Check
    print("1️⃣ Health Check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"✅ Status: {response.json()}\n")
    
    # Test 2: Summarize
    print("2️⃣ Testing Summarizer API...")
    data = {
        "text": "Artificial intelligence has revolutionized many industries. Machine learning algorithms can now process vast amounts of data and make predictions with remarkable accuracy. Deep learning, a subset of machine learning, has enabled breakthroughs in computer vision, natural language processing, and speech recognition.",
        "length": "short",
        "style": "paragraph"
    }
    response = requests.post(f"{BASE_URL}/gemini/summarize", json=data)
    result = response.json()
    print(f"✅ Summary: {result['data']}\n")
    
    # Test 3: Translate
    print("3️⃣ Testing Translator API...")
    data = {
        "text": "Hello, welcome to NeuroWrite!",
        "target_language": "French"
    }
    response = requests.post(f"{BASE_URL}/gemini/translate", json=data)
    result = response.json()
    print(f"✅ Translation: {result['data']}\n")
    
    # Test 4: Rewrite/Humanize
    print("4️⃣ Testing Humanize API...")
    data = {
        "text": "The implementation of artificial intelligence systems requires careful consideration of various factors.",
        "options": {
            "pattern_breaking": True,
            "natural_flow": True
        }
    }
    response = requests.post(f"{BASE_URL}/gemini/rewrite/humanize", json=data)
    result = response.json()
    print(f"✅ Humanized: {result['data']}\n")
    
    print("=" * 60)
    print("🎉 All API tests passed!")
    print("=" * 60)
    print("\n📚 View full API docs at: http://localhost:8001/docs")

if __name__ == "__main__":
    try:
        test_api()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nMake sure the server is running: python ai-engine/main.py")
