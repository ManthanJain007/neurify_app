const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export interface APIResponse {
  success: boolean;
  data: string;
  metadata?: any;
}

// Grammar & Spelling APIs
export async function checkGrammar(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/proofread/grammar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function checkSpelling(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/proofread/spelling`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function autoFixAll(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/proofread/auto-fix`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function comprehensiveProofread(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/proofread`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

// Style & Readability
export async function getReadabilityScore(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/proofread/readability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

// Summarization
export async function summarizeText(text: string, length: string = 'medium', style: string = 'paragraph'): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, length, style })
  });
  return response.json();
}

export async function extractKeyPoints(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/summarize/key-points`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

// Content Generation
export async function generateContent(prompt: string, style?: string, tone?: string, word_count?: number): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/write`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, style, tone, word_count })
  });
  return response.json();
}

export async function expandText(text: string, target_length: number = 500): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/write/expand?target_length=${target_length}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function completeText(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/write/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

// Rewriting & Paraphrasing
export async function rewriteText(text: string, style?: string, creativity_level: number = 0.5): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/rewrite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, style, preserve_meaning: true, creativity_level })
  });
  return response.json();
}

export async function paraphraseText(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/rewrite/paraphrase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function simplifyText(text: string): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/rewrite/simplify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function humanizeText(text: string, options?: any): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/rewrite/humanize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      text, 
      options: options || {
        pattern_breaking: true,
        natural_flow: true,
        idiom_integration: true,
        contraction_control: true,
        emotional_tone: true
      }
    })
  });
  return response.json();
}

// Tone Adjustment
export async function adjustTone(text: string, tone: string, intensity: number = 50): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/rewrite/tone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, tone, intensity })
  });
  return response.json();
}

// Translation
export async function translateText(text: string, target_language: string, source_language: string = 'auto'): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, target_language, source_language })
  });
  return response.json();
}

export async function detectLanguage(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/translate/detect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

export async function getSupportedLanguages() {
  const response = await fetch(`${API_BASE_URL}/gemini/translate/languages`);
  return response.json();
}

// Prompt API
export async function generatePromptResponse(prompt: string, context?: string, temperature: number = 0.7): Promise<APIResponse> {
  const response = await fetch(`${API_BASE_URL}/gemini/prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, context, temperature, max_tokens: 2048 })
  });
  return response.json();
}

export async function analyzeIntent(text: string) {
  const response = await fetch(`${API_BASE_URL}/gemini/prompt/analyze-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}

// Feature Router - Maps ALL 165 feature IDs to API calls
export async function executeFeature(featureId: string, text: string, options?: any): Promise<APIResponse> {
  try {
    switch (featureId) {
      // ==================== GRAMMAR & SPELLING (15 features) ====================
      case 'grammar-check':
        const grammarResult = await checkGrammar(text);
        return { success: true, data: JSON.stringify(grammarResult, null, 2) };
      case 'spelling-check':
        const spellingResult = await checkSpelling(text);
        return { success: true, data: JSON.stringify(spellingResult, null, 2) };
      case 'punctuation':
      case 'sentence-structure':
      case 'subject-verb':
      case 'articles':
      case 'prepositions':
      case 'modifiers':
      case 'fragments':
      case 'run-ons':
      case 'parallelism':
      case 'tense-consistency':
      case 'pronoun-usage':
      case 'comma-splices':
        const proofResult = await comprehensiveProofread(text);
        return { success: true, data: typeof proofResult === 'string' ? proofResult : JSON.stringify(proofResult, null, 2) };
      case 'auto-fix-all':
        const fixed = await autoFixAll(text);
        return { success: true, data: fixed.correctedText };
      
      // ==================== WRITING STYLE (20 features) ====================
      case 'clarity':
        return await rewriteText(text, 'clear');
      case 'conciseness':
        return await generateContent(`Rewrite this text to be more concise while preserving meaning: ${text}`);
      case 'readability':
        const readabilityResult = await getReadabilityScore(text);
        return { success: true, data: typeof readabilityResult === 'string' ? readabilityResult : JSON.stringify(readabilityResult, null, 2) };
      case 'word-choice':
        return await generateContent(`Improve the word choice in this text: ${text}`);
      case 'redundancy':
        return await generateContent(`Remove redundant phrases from this text: ${text}`);
      case 'passive-voice':
        return await rewriteText(text, 'active');
      case 'sentence-variety':
        return await generateContent(`Rewrite this with more sentence variety: ${text}`);
      case 'flow':
        return await generateContent(`Improve the flow and transitions in this text: ${text}`);
      case 'transitions':
        return await generateContent(`Add appropriate transition words to this text: ${text}`);
      case 'formality':
        return await adjustTone(text, 'formal', 50);
      case 'vivid-language':
        return await generateContent(`Rewrite this with more vivid, descriptive language: ${text}`);
      case 'cliches':
        return await generateContent(`Identify and replace clichés in this text: ${text}`);
      case 'jargon':
        return await simplifyText(text);
      case 'power-words':
        return await generateContent(`Rewrite this using powerful, impactful words: ${text}`);
      case 'descriptive':
        return await generateContent(`Add more descriptive details to this text: ${text}`);
      case 'brevity':
        return await summarizeText(text, 'short');
      case 'elaboration':
        return await expandText(text, 500);
      case 'parallel-structure':
        return await generateContent(`Fix parallel structure in this text: ${text}`);
      case 'sentence-length':
        return await generateContent(`Optimize sentence length for better readability: ${text}`);
      case 'vocabulary-level':
        return await generateContent(`Adjust vocabulary level to be more accessible: ${text}`);
      
      // ==================== TONE & VOICE (15 features) ====================
      case 'tone-detector':
        const toneResult = await analyzeIntent(text);
        return { success: true, data: typeof toneResult === 'string' ? toneResult : JSON.stringify(toneResult, null, 2) };
      case 'tone-formal':
        return await adjustTone(text, 'formal', 80);
      case 'tone-casual':
        return await adjustTone(text, 'casual', 80);
      case 'tone-professional':
        return await adjustTone(text, 'professional', 80);
      case 'tone-friendly':
        return await adjustTone(text, 'friendly', 75);
      case 'tone-persuasive':
        return await adjustTone(text, 'persuasive', 85);
      case 'tone-empathetic':
        return await adjustTone(text, 'empathetic', 75);
      case 'tone-confident':
        return await adjustTone(text, 'confident', 80);
      case 'tone-enthusiastic':
        return await generateContent(`Rewrite this with an enthusiastic tone: ${text}`, undefined, 'enthusiastic');
      case 'tone-neutral':
        return await adjustTone(text, 'neutral', 50);
      case 'tone-diplomatic':
        return await generateContent(`Rewrite this diplomatically: ${text}`, undefined, 'diplomatic');
      case 'tone-humorous':
        return await generateContent(`Add appropriate humor to this text: ${text}`, undefined, 'humorous');
      case 'tone-serious':
        return await adjustTone(text, 'serious', 85);
      case 'tone-optimistic':
        return await generateContent(`Rewrite with an optimistic tone: ${text}`, undefined, 'optimistic');
      case 'tone-urgency':
        return await generateContent(`Rewrite to create urgency: ${text}`, undefined, 'urgent');
      
      // ==================== CONTENT GENERATION (20 features) ====================
      case 'blog-generator':
        return await generateContent(`Write a comprehensive blog post about: ${text}`, 'conversational', 'engaging', 800);
      case 'paragraph-generator':
        return await generateContent(`Write a detailed paragraph about: ${text}`, undefined, undefined, 150);
      case 'intro-generator':
        return await generateContent(`Write a compelling introduction for: ${text}`, 'engaging');
      case 'conclusion-generator':
        return await generateContent(`Write a strong conclusion for: ${text}`, 'professional');
      case 'headline-generator':
        return await generateContent(`Create 5 catchy headlines for: ${text}`);
      case 'outline-generator':
        return await generateContent(`Create a detailed content outline for: ${text}`);
      case 'expand-text':
        return await expandText(text, options?.targetLength || 500);
      case 'shorten-text':
        return await summarizeText(text, 'short');
      case 'bullet-points':
        return await generateContent(`Convert this to well-organized bullet points: ${text}`);
      case 'story-generator':
        return await generateContent(`Write a creative story about: ${text}`, 'narrative', 'engaging', 600);
      case 'dialogue-generator':
        return await generateContent(`Write natural dialogue for: ${text}`);
      case 'description-generator':
        return await generateContent(`Write a vivid description of: ${text}`, 'descriptive');
      case 'argument-generator':
        return await generateContent(`Build a strong argument for: ${text}`, 'persuasive');
      case 'example-generator':
        return await generateContent(`Generate relevant examples for: ${text}`);
      case 'analogy-generator':
        return await generateContent(`Create helpful analogies to explain: ${text}`);
      case 'question-generator':
        return await generateContent(`Generate thought-provoking questions about: ${text}`);
      case 'answer-generator':
        return await generateContent(`Provide comprehensive answers for: ${text}`);
      case 'summary-generator':
        return await summarizeText(text, 'medium');
      case 'key-points':
        const points = await extractKeyPoints(text);
        return { success: true, data: '• ' + points.keyPoints.join('\n• ') };
      case 'call-to-action':
        return await generateContent(`Create a powerful call-to-action for: ${text}`, 'persuasive');
      
      // ==================== REWRITING & PARAPHRASING (15 features) ====================
      case 'paraphrase':
        const paraphrased = await paraphraseText(text);
        return { success: true, data: paraphrased.variations.join('\n\n===== Version 2 =====\n\n') };
      case 'rewrite-formal':
        return await adjustTone(text, 'formal', 85);
      case 'rewrite-casual':
        return await adjustTone(text, 'casual', 85);
      case 'rewrite-simple':
      case 'simplify':
        return await simplifyText(text);
      case 'rewrite-complex':
        return await generateContent(`Rewrite this with more sophisticated language: ${text}`);
      case 'humanize':
        return await humanizeText(text);
      case 'plagiarism-rewrite':
        return await generateContent(`Rewrite this to be completely original while preserving the core message: ${text}`);
      case 'multiple-versions':
        const versions = await paraphraseText(text);
        return { success: true, data: versions.variations.join('\n\n------- Alternative Version -------\n\n') };
      case 'synonym-replacer':
        return await generateContent(`Replace words with appropriate synonyms: ${text}`);
      case 'sentence-rewriter':
        return await rewriteText(text);
      case 'paragraph-rewriter':
        return await rewriteText(text, 'improved');
      case 'word-replacer':
        return await generateContent(`Improve word choices in: ${text}`);
      case 'spin-text':
        return await paraphraseText(text).then(r => ({ success: true, data: r.variations[0] }));
      case 'restructure':
        return await generateContent(`Restructure this text for better organization: ${text}`);
      case 'style-transfer':
        return await rewriteText(text, options?.targetStyle || 'improved', 0.7);
      
      // ==================== TRANSLATION (10 features) ====================
      case 'translate':
        return await translateText(text, options?.targetLanguage || 'es');
      case 'detect-language':
        const detected = await detectLanguage(text);
        return { success: true, data: `Detected language: ${JSON.stringify(detected)}` };
      case 'translate-bulk':
        return await translateText(text, options?.targetLanguage || 'es');
      case 'translate-preserve':
        return await translateText(text, options?.targetLanguage || 'es');
      case 'translate-technical':
        return await translateText(text, options?.targetLanguage || 'es');
      case 'translate-context':
        return await translateText(text, options?.targetLanguage || 'es');
      case 'back-translate':
        const translated = await translateText(text, 'es');
        return await translateText(translated.data, 'en');
      case 'multilingual-check':
        return await detectLanguage(text);
      case 'localization':
        return await generateContent(`Adapt this for ${options?.region || 'local'} audiences: ${text}`);
      case 'translation-memory':
        return await translateText(text, options?.targetLanguage || 'es');
      
      // ==================== SEO & MARKETING (15 features) ====================
      case 'seo-score':
        return await generateContent(`Analyze the SEO quality of this content and provide a score with recommendations: ${text}`);
      case 'keyword-density':
        return await generateContent(`Analyze keyword density in: ${text}`);
      case 'meta-description':
        return await generateContent(`Write an SEO-optimized meta description (150-160 chars) for: ${text}`, undefined, undefined, 160);
      case 'title-tags':
        return await generateContent(`Create SEO-optimized title tags for: ${text}`);
      case 'product-description':
        return await generateContent(`Write a compelling product description for: ${text}`, 'persuasive', 'engaging');
      case 'ad-copy':
        return await generateContent(`Write persuasive ad copy for: ${text}`, 'persuasive', 'urgent', 100);
      case 'landing-page':
        return await generateContent(`Write conversion-focused landing page copy for: ${text}`, 'persuasive', 'professional', 500);
      case 'press-release':
        return await generateContent(`Write a professional press release about: ${text}`, 'formal', 'professional', 400);
      case 'sales-copy':
        return await generateContent(`Write persuasive sales copy for: ${text}`, 'persuasive', 'engaging');
      case 'marketing-email':
        return await generateContent(`Write a marketing email for: ${text}`, 'persuasive', 'friendly', 300);
      case 'value-proposition':
        return await generateContent(`Create a compelling value proposition for: ${text}`, 'persuasive');
      case 'competitor-analysis':
        return await generateContent(`Analyze competitor content and provide insights: ${text}`);
      case 'content-ideas':
        return await generateContent(`Generate 10 content ideas related to: ${text}`);
      case 'hashtag-generator':
        return await generateContent(`Generate relevant hashtags for: ${text}`);
      case 'brand-voice':
        return await generateContent(`Adapt this to match the brand voice described: ${text}`);
      
      // ==================== ACADEMIC WRITING (10 features) ====================
      case 'citation-generator':
        return await generateContent(`Generate proper citations for: ${text}`);
      case 'thesis-statement':
        return await generateContent(`Create a strong thesis statement for: ${text}`);
      case 'research-summary':
        return await summarizeText(text, 'medium', 'paragraph');
      case 'abstract-generator':
        return await generateContent(`Write an academic abstract for: ${text}`, 'academic', 'formal', 250);
      case 'literature-review':
        return await generateContent(`Write a literature review section for: ${text}`, 'academic', 'formal');
      case 'methodology':
        return await generateContent(`Write a methodology section for: ${text}`, 'academic', 'formal');
      case 'academic-tone':
        return await adjustTone(text, 'formal', 90);
      case 'plagiarism-checker':
        return await generateContent(`Analyze this text for potential plagiarism concerns: ${text}`);
      case 'research-questions':
        return await generateContent(`Generate research questions for: ${text}`);
      case 'academic-formatting':
        return await generateContent(`Format this according to academic standards: ${text}`);
      
      // ==================== BUSINESS WRITING (10 features) ====================
      case 'business-plan':
        return await generateContent(`Write a business plan section for: ${text}`, 'professional', 'formal', 600);
      case 'executive-summary':
        return await generateContent(`Write an executive summary for: ${text}`, 'professional', 'formal', 300);
      case 'proposal':
        return await generateContent(`Write a business proposal for: ${text}`, 'professional', 'persuasive', 500);
      case 'report':
        return await generateContent(`Write a business report about: ${text}`, 'professional', 'formal', 400);
      case 'memo':
        return await generateContent(`Write a professional memo about: ${text}`, 'professional', 'formal', 200);
      case 'meeting-notes':
        return await generateContent(`Format these meeting notes professionally: ${text}`);
      case 'job-description':
        return await generateContent(`Write a comprehensive job description for: ${text}`, 'professional');
      case 'performance-review':
        return await generateContent(`Write a performance review for: ${text}`, 'professional', 'diplomatic');
      case 'contract-summary':
        return await summarizeText(text, 'medium', 'key-points');
      case 'financial-report':
        return await generateContent(`Write a financial report section for: ${text}`, 'professional', 'formal');
      
      // ==================== CREATIVE WRITING (10 features) ====================
      case 'character-generator':
        return await generateContent(`Create a detailed character profile for: ${text}`, 'creative', 'descriptive');
      case 'plot-generator':
        return await generateContent(`Generate creative plot ideas for: ${text}`, 'creative');
      case 'poetry-generator':
        return await generateContent(`Write a beautiful poem about: ${text}`, 'creative', 'artistic');
      case 'script-generator':
        return await generateContent(`Write a script for: ${text}`, 'creative', 'engaging', 400);
      case 'song-lyrics':
        return await generateContent(`Write song lyrics about: ${text}`, 'creative', 'artistic');
      case 'creative-prompts':
        return await generateContent(`Generate creative writing prompts based on: ${text}`);
      case 'world-building':
        return await generateContent(`Create a fictional world for: ${text}`, 'creative', 'descriptive');
      case 'scene-generator':
        return await generateContent(`Write a vivid scene for: ${text}`, 'creative', 'descriptive');
      case 'metaphor-generator':
        return await generateContent(`Create powerful metaphors for: ${text}`, 'creative');
      case 'imagery-enhancer':
        return await generateContent(`Enhance this with vivid imagery: ${text}`, 'creative', 'descriptive');
      
      // ==================== SOCIAL MEDIA (10 features) ====================
      case 'social-post':
        return await generateContent(`Create an engaging social media post about: ${text}`, 'casual', 'engaging', 120);
      case 'twitter-thread':
        return await generateContent(`Create a Twitter/X thread about: ${text}`, 'casual', 'engaging');
      case 'instagram-caption':
        return await generateContent(`Write an Instagram caption for: ${text}`, 'casual', 'engaging', 150);
      case 'linkedin-post':
        return await generateContent(`Write a LinkedIn post about: ${text}`, 'professional', 'engaging', 200);
      case 'facebook-post':
        return await generateContent(`Write a Facebook post about: ${text}`, 'casual', 'friendly');
      case 'tiktok-script':
        return await generateContent(`Write a TikTok video script for: ${text}`, 'casual', 'energetic');
      case 'youtube-description':
        return await generateContent(`Write a YouTube video description for: ${text}`, 'casual', 'engaging');
      case 'bio-generator':
        return await generateContent(`Create a compelling social media bio for: ${text}`, 'casual', undefined, 150);
      case 'content-calendar':
        return await generateContent(`Create a content calendar plan for: ${text}`);
      case 'engagement-optimizer':
        return await generateContent(`Optimize this for engagement: ${text}`, 'casual', 'engaging');
      
      // ==================== EMAIL WRITING (10 features) ====================
      case 'professional-email':
        return await generateContent(`Write a professional email about: ${text}`, 'professional', 'formal');
      case 'cold-email':
        return await generateContent(`Write a cold outreach email for: ${text}`, 'professional', 'persuasive');
      case 'follow-up-email':
        return await generateContent(`Write a follow-up email regarding: ${text}`, 'professional', 'friendly');
      case 'thank-you-email':
        return await generateContent(`Write a thank you email for: ${text}`, 'professional', 'warm');
      case 'apology-email':
        return await generateContent(`Write an apology email about: ${text}`, 'professional', 'empathetic');
      case 'rejection-email':
        return await generateContent(`Write a polite rejection email for: ${text}`, 'professional', 'diplomatic');
      case 'invitation-email':
        return await generateContent(`Write an invitation email for: ${text}`, 'professional', 'friendly');
      case 'newsletter':
        return await generateContent(`Write a newsletter section about: ${text}`, 'engaging', 'informative', 400);
      case 'email-subject':
        return await generateContent(`Create 5 compelling email subject lines for: ${text}`);
      case 'signature-generator':
        return await generateContent(`Create a professional email signature for: ${text}`);
      
      // ==================== TEXT ANALYSIS (10 features) ====================
      case 'word-count':
        const words = text.trim().split(/\s+/).filter(w => w).length;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
        return { success: true, data: `📊 Text Statistics:\n\nWords: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpace}\nSentences: ${sentences}\nAverage word length: ${(charsNoSpace / words).toFixed(1)} characters` };
      case 'reading-time':
        const wordCount = text.trim().split(/\s+/).filter(w => w).length;
        const minutes = Math.ceil(wordCount / 200);
        const seconds = Math.ceil((wordCount / 200) * 60) % 60;
        return { success: true, data: `⏱️ Estimated reading time:\n\n${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}\n\n(Based on average reading speed of 200 words/minute)` };
      case 'sentiment-analysis':
        return await generateContent(`Analyze the sentiment and emotional tone of: ${text}`);
      case 'emotion-detection':
        return await generateContent(`Detect and analyze the emotions expressed in: ${text}`);
      case 'complexity-score':
        const complexityResult = await getReadabilityScore(text);
        return { success: true, data: typeof complexityResult === 'string' ? complexityResult : JSON.stringify(complexityResult, null, 2) };
      case 'unique-words':
        const wordsArray = text.toLowerCase().split(/\s+/).filter(w => w);
        const uniqueWords = new Set(wordsArray);
        return { success: true, data: `Unique words: ${uniqueWords.size}\nTotal words: ${wordsArray.length}\nVocabulary diversity: ${((uniqueWords.size / wordsArray.length) * 100).toFixed(1)}%` };
      case 'frequency-analysis':
        return await generateContent(`Analyze word frequency in: ${text}`);
      case 'text-comparison':
        return await generateContent(`Compare and analyze these texts: ${text}`);
      case 'topic-extraction':
        return await generateContent(`Extract main topics from: ${text}`);
      case 'intent-analysis':
        const intentResult = await analyzeIntent(text);
        return { success: true, data: typeof intentResult === 'string' ? intentResult : JSON.stringify(intentResult, null, 2) };
      
      // ==================== AI ENHANCEMENT (15 features) ====================
      case 'ai-detector':
        return await generateContent(`Analyze whether this text appears AI-generated: ${text}`);
      case 'bypass-ai-detection':
        return await humanizeText(text);
      case 'pattern-breaking':
        return await humanizeText(text, { pattern_breaking: true });
      case 'natural-flow':
        return await humanizeText(text, { natural_flow: true });
      case 'personality-injection':
        return await generateContent(`Rewrite this with more personality: ${text}`);
      case 'idiom-integration':
        return await humanizeText(text, { idiom_integration: true });
      case 'contraction-control':
        return await humanizeText(text, { contraction_control: true });
      case 'emotional-depth':
        return await humanizeText(text, { emotional_tone: true });
      case 'conversational-style':
        return await adjustTone(text, 'casual', 70);
      case 'personal-touch':
        return await generateContent(`Add personal touches to make this more relatable: ${text}`);
      case 'originality-boost':
        return await generateContent(`Rewrite this to be more original and unique: ${text}`);
      case 'context-awareness':
        return await generateContent(`Improve context awareness in: ${text}`);
      case 'coherence-check':
        return await generateContent(`Check and improve coherence in: ${text}`);
      case 'authenticity-score':
        return await generateContent(`Rate the authenticity of this text: ${text}`);
      case 'human-score':
        return await generateContent(`Rate how human this text sounds (0-100): ${text}`);
      
      // Default fallback
      default:
        return { 
          success: false, 
          data: `Feature "${featureId}" not implemented yet. Please check the feature ID.` 
        };
    }
  } catch (error: any) {
    console.error('Feature execution error:', error);
    return { 
      success: false, 
      data: `Error: ${error.message || 'Unknown error occurred'}. Make sure the backend server is running on port 8001.`
    };
  }
}
