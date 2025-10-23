import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_AI_ENGINE_URL || '/ai';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Configure axios instance
const aiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': GEMINI_API_KEY,
  },
  timeout: 30000,
});

// Request interceptor for auth token
aiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface GeminiPromptRequest {
  prompt: string;
  context?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GeminiResponse {
  success: boolean;
  data: string;
  metadata?: {
    processingTime: number;
    tokenCount: number;
    model: string;
  };
}

export interface ToneAdjustment {
  tone: 'formal' | 'casual' | 'professional' | 'creative' | 'persuasive' | 'technical' | 'empathetic';
  intensity: number; // 0-100
}

export interface HumanizationOptions {
  patternBreaking: boolean;
  naturalFlow: boolean;
  idiomIntegration: boolean;
  contractionControl: boolean;
  emotionalTone: boolean;
}

/**
 * 1. PROMPT API - Natural Language Understanding
 */
export const promptAPI = {
  async generate(request: GeminiPromptRequest): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/prompt', request);
    return response.data;
  },

  async analyzeIntent(text: string): Promise<{ intent: string; confidence: number }> {
    const response = await aiClient.post('/gemini/prompt/analyze-intent', { text });
    return response.data;
  },
};

/**
 * 2. SUMMARIZER API - Intelligent Content Summarization
 */
export const summarizerAPI = {
  async summarize(
    text: string,
    options?: {
      length?: 'short' | 'medium' | 'long';
      style?: 'bullets' | 'paragraph' | 'key-points';
    }
  ): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/summarize', {
      text,
      ...options,
    });
    return response.data;
  },

  async extractKeyPoints(text: string): Promise<string[]> {
    const response = await aiClient.post('/gemini/summarize/key-points', { text });
    return response.data.keyPoints;
  },
};

/**
 * 3. WRITER API - AI-Powered Content Generation
 */
export const writerAPI = {
  async generate(
    prompt: string,
    options?: {
      style?: string;
      tone?: string;
      wordCount?: number;
    }
  ): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/write', {
      prompt,
      ...options,
    });
    return response.data;
  },

  async complete(partialText: string): Promise<string[]> {
    const response = await aiClient.post('/gemini/write/complete', { text: partialText });
    return response.data.completions;
  },

  async expand(text: string, targetLength: number): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/write/expand', { text, targetLength });
    return response.data;
  },
};

/**
 * 4. REWRITER API - Style Transfer & Paraphrasing
 */
export const rewriterAPI = {
  async rewrite(
    text: string,
    options?: {
      style?: string;
      preserveMeaning?: boolean;
      creativityLevel?: number;
    }
  ): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/rewrite', {
      text,
      ...options,
    });
    return response.data;
  },

  async paraphrase(text: string): Promise<string[]> {
    const response = await aiClient.post('/gemini/rewrite/paraphrase', { text });
    return response.data.variations;
  },

  async simplify(text: string): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/rewrite/simplify', { text });
    return response.data;
  },

  async humanize(text: string, options: HumanizationOptions): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/rewrite/humanize', {
      text,
      options,
    });
    return response.data;
  },

  async adjustTone(text: string, toneAdjustment: ToneAdjustment): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/rewrite/tone', {
      text,
      ...toneAdjustment,
    });
    return response.data;
  },
};

/**
 * 5. TRANSLATOR API - Multi-Language Support
 */
export const translatorAPI = {
  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<GeminiResponse> {
    const response = await aiClient.post('/gemini/translate', {
      text,
      targetLanguage,
      sourceLanguage: sourceLanguage || 'auto',
    });
    return response.data;
  },

  async detectLanguage(text: string): Promise<{ language: string; confidence: number }> {
    const response = await aiClient.post('/gemini/translate/detect', { text });
    return response.data;
  },

  async getSupportedLanguages(): Promise<string[]> {
    const response = await aiClient.get('/gemini/translate/languages');
    return response.data.languages;
  },
};

/**
 * 6. PROOFREADER API - Advanced Grammar Checking
 */
export interface GrammarError {
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
  message: string;
  suggestions: string[];
  position: { start: number; end: number };
  severity: 'error' | 'warning' | 'info';
}

export interface ProofreadResult {
  errors: GrammarError[];
  correctedText: string;
  readabilityScore: number;
  statistics: {
    wordCount: number;
    sentenceCount: number;
    avgWordsPerSentence: number;
  };
}

export const proofreaderAPI = {
  async check(text: string): Promise<ProofreadResult> {
    const response = await aiClient.post('/gemini/proofread', { text });
    return response.data;
  },

  async checkGrammar(text: string): Promise<GrammarError[]> {
    const response = await aiClient.post('/gemini/proofread/grammar', { text });
    return response.data.errors;
  },

  async checkSpelling(text: string): Promise<GrammarError[]> {
    const response = await aiClient.post('/gemini/proofread/spelling', { text });
    return response.data.errors;
  },

  async getReadabilityScore(text: string): Promise<{
    fleschKincaid: number;
    grade: string;
    suggestions: string[];
  }> {
    const response = await aiClient.post('/gemini/proofread/readability', { text });
    return response.data;
  },

  async autoFix(text: string): Promise<string> {
    const response = await aiClient.post('/gemini/proofread/auto-fix', { text });
    return response.data.correctedText;
  },
};

/**
 * Batch Processing for Large Documents
 */
export const batchProcessing = {
  async processInChunks<T>(
    text: string,
    processor: (chunk: string) => Promise<T>,
    chunkSize: number = 5000
  ): Promise<T[]> {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    const results = await Promise.all(chunks.map(processor));
    return results;
  },
};

/**
 * Stream Processing for Real-Time Updates
 */
export const streamProcessing = {
  async streamRewrite(
    text: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/gemini/rewrite/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ text }),
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Stream not available');

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onComplete();
        break;
      }

      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  },
};

export default {
  promptAPI,
  summarizerAPI,
  writerAPI,
  rewriterAPI,
  translatorAPI,
  proofreaderAPI,
  batchProcessing,
  streamProcessing,
};
