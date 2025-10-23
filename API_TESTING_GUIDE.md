# 🧪 NeuroWrite API Testing Guide

## Quick Test Examples for Swagger UI

Visit: **http://localhost:8001/docs**

---

## 1. 📝 PROMPT API

### `/gemini/prompt` - Generate Response
```json
{
  "prompt": "Write a creative story about a robot learning to paint",
  "context": "The robot has never created art before",
  "temperature": 0.8,
  "max_tokens": 500
}
```

### `/gemini/prompt/analyze-intent` - Analyze Intent
```json
{
  "text": "Can you help me write a professional email to my boss?"
}
```

---

## 2. 📊 SUMMARIZER API

### `/gemini/summarize` - Summarize Text
```json
{
  "text": "Artificial intelligence has transformed the landscape of technology over the past decade. Machine learning algorithms can now process vast amounts of data and identify patterns that would be impossible for humans to detect. Deep learning, a subset of machine learning, has enabled breakthroughs in computer vision, allowing computers to recognize objects in images with superhuman accuracy. Natural language processing has advanced to the point where AI can understand context, sentiment, and even generate human-like text. These advancements have applications in healthcare, finance, transportation, and countless other industries.",
  "length": "short",
  "style": "paragraph"
}
```

**Try different options:**
- `length`: "short", "medium", "long"
- `style`: "bullets", "paragraph", "key-points"

### `/gemini/summarize/key-points` - Extract Key Points
```json
{
  "text": "Climate change is one of the most pressing issues of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary cause. Renewable energy sources like solar and wind power offer hope for a sustainable future."
}
```

---

## 3. ✍️ WRITER API

### `/gemini/write` - Generate Content
```json
{
  "prompt": "Write a blog post introduction about the benefits of morning meditation",
  "style": "conversational",
  "tone": "inspirational",
  "word_count": 150
}
```

**Try different styles:**
- "creative", "technical", "academic", "conversational", "professional"

**Try different tones:**
- "formal", "casual", "inspirational", "humorous", "serious"

### `/gemini/write/complete` - Text Completion
```json
{
  "text": "The future of artificial intelligence will"
}
```

### `/gemini/write/expand` - Expand Text
```json
{
  "text": "Coffee is a popular beverage enjoyed worldwide."
}
```

Add query parameter: `target_length=300`

---

## 4. 🔄 REWRITER API

### `/gemini/rewrite` - Rewrite Text
```json
{
  "text": "The company announced quarterly earnings that exceeded expectations.",
  "style": "casual",
  "preserve_meaning": true,
  "creativity_level": 0.7
}
```

### `/gemini/rewrite/paraphrase` - Paraphrase
```json
{
  "text": "Innovation drives progress in the modern world."
}
```

### `/gemini/rewrite/simplify` - Simplify Text
```json
{
  "text": "The implementation of sophisticated algorithms necessitates comprehensive evaluation of computational complexity and resource allocation parameters."
}
```

### `/gemini/rewrite/humanize` - Humanize AI Text ⭐
```json
{
  "text": "Artificial intelligence systems demonstrate remarkable capabilities in processing large datasets and generating insights through advanced computational methodologies.",
  "options": {
    "pattern_breaking": true,
    "natural_flow": true,
    "idiom_integration": true,
    "contraction_control": true,
    "emotional_tone": true
  }
}
```

### `/gemini/rewrite/tone` - Adjust Tone
```json
{
  "text": "We need to discuss the project deadline.",
  "tone": "professional",
  "intensity": 80
}
```

**Available tones:**
- "formal", "casual", "professional", "creative", "persuasive", "technical", "empathetic"

**Intensity:** 0-100 (higher = stronger tone)

---

## 5. 🌍 TRANSLATOR API

### `/gemini/translate` - Translate Text
```json
{
  "text": "Good morning! How are you today?",
  "target_language": "Spanish",
  "source_language": "auto"
}
```

**Supported Languages:**
English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Bengali, Turkish, Vietnamese, Thai, Polish, Dutch, Swedish, Indonesian

### `/gemini/translate/detect` - Detect Language
```json
{
  "text": "Bonjour, comment allez-vous?"
}
```

### `/gemini/translate/languages` - Get Supported Languages
Just click "Execute" (no body needed)

---

## 6. ✅ PROOFREADER API

### `/gemini/proofread` - Comprehensive Check
```json
{
  "text": "This are a sentance with some erors in grammer and spelling that needs to be fixed."
}
```

### `/gemini/proofread/grammar` - Check Grammar
```json
{
  "text": "She don't like going to the store. Him and me went yesterday."
}
```

### `/gemini/proofread/spelling` - Check Spelling
```json
{
  "text": "I recieved the mesage about the metting tommorrow."
}
```

### `/gemini/proofread/readability` - Readability Score
```json
{
  "text": "The quick brown fox jumps over the lazy dog. This sentence is easy to read. Complex sentences with multiple clauses and sophisticated vocabulary may be more challenging for some readers to comprehend efficiently."
}
```

### `/gemini/proofread/auto-fix` - Auto-Fix All Errors
```json
{
  "text": "their are alot of mistakes in this sentance that need fixed"
}
```

---

## 🎯 Advanced Test Scenarios

### Test 1: Complete Writing Workflow
1. Generate content with `/gemini/write`
2. Humanize it with `/gemini/rewrite/humanize`
3. Check grammar with `/gemini/proofread`
4. Translate to another language with `/gemini/translate`

### Test 2: Content Improvement
1. Start with rough text
2. Simplify with `/gemini/rewrite/simplify`
3. Adjust tone with `/gemini/rewrite/tone`
4. Auto-fix errors with `/gemini/proofread/auto-fix`

### Test 3: Multi-language Content
1. Write in English with `/gemini/write`
2. Translate to Spanish with `/gemini/translate`
3. Translate to French with `/gemini/translate`
4. Detect language of result with `/gemini/translate/detect`

---

## 💡 Pro Tips

1. **Click any endpoint** → **"Try it out"** → **Edit JSON** → **"Execute"**
2. **Scroll down** to see more endpoints (30+ total)
3. **Copy response** data for further testing
4. **Experiment** with different parameters
5. **Save your favorite** test cases for quick access

---

## 🐛 Troubleshooting

**Error 500?** 
- Check your `.env` file has valid `GEMINI_API_KEY`
- Ensure text input is not empty

**Error 422?**
- Verify JSON format is correct
- Check required fields are present

**Slow response?**
- Normal for AI processing (5-10 seconds)
- Larger texts take longer

---

## 📊 Response Format

All successful responses follow this pattern:

```json
{
  "success": true,
  "data": "Generated/processed text here",
  "metadata": {
    "word_count": 150,
    "model": "gemini-2.0-flash-exp"
  }
}
```

---

## 🎉 Have Fun Testing!

Your NeuroWrite AI Engine is fully operational with all 6 Gemini APIs!

**Documentation:** http://localhost:8001/docs
**Alternative Docs:** http://localhost:8001/redoc
**API Root:** http://localhost:8001/
