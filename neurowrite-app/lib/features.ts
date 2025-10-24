export interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  premium: boolean;
}

export const FEATURE_CATEGORIES = [
  { id: 'editor', name: 'AI Editor', icon: '✍️' },
  { id: 'grammar', name: 'Grammar & Spelling', icon: '✓' },
  { id: 'style', name: 'Writing Style', icon: '🎨' },
  { id: 'tone', name: 'Tone & Voice', icon: '🎭' },
  { id: 'content', name: 'Content Generation', icon: '✨' },
  { id: 'rewrite', name: 'Rewriting & Paraphrasing', icon: '🔄' },
  { id: 'translate', name: 'Translation', icon: '🌍' },
  { id: 'seo', name: 'SEO & Marketing', icon: '📈' },
  { id: 'academic', name: 'Academic Writing', icon: '🎓' },
  { id: 'business', name: 'Business Writing', icon: '💼' },
  { id: 'creative', name: 'Creative Writing', icon: '🎪' },
  { id: 'social', name: 'Social Media', icon: '📱' },
  { id: 'email', name: 'Email Writing', icon: '📧' },
  { id: 'analysis', name: 'Text Analysis', icon: '📊' },
  { id: 'ai', name: 'AI Enhancement', icon: '🤖' },
];

export const FEATURES: Feature[] = [
  // Grammar & Spelling (15 features) - ALL FREE
  { id: 'grammar-check', name: 'Grammar Check', description: 'Advanced grammar correction', category: 'grammar', icon: '✓', premium: false },
  { id: 'spelling-check', name: 'Spelling Check', description: 'Real-time spelling correction', category: 'grammar', icon: '📝', premium: false },
  { id: 'punctuation', name: 'Punctuation', description: 'Fix punctuation errors', category: 'grammar', icon: '.,!?', premium: false },
  { id: 'sentence-structure', name: 'Sentence Structure', description: 'Improve sentence flow', category: 'grammar', icon: '📐', premium: false },
  { id: 'subject-verb', name: 'Subject-Verb Agreement', description: 'Fix verb tense issues', category: 'grammar', icon: '⚖️', premium: false },
  { id: 'articles', name: 'Article Usage', description: 'A/an/the correction', category: 'grammar', icon: 'abc', premium: false },
  { id: 'prepositions', name: 'Preposition Check', description: 'Fix preposition errors', category: 'grammar', icon: '🔗', premium: false },
  { id: 'modifiers', name: 'Misplaced Modifiers', description: 'Fix modifier placement', category: 'grammar', icon: '↔️', premium: false },
  { id: 'fragments', name: 'Sentence Fragments', description: 'Complete incomplete sentences', category: 'grammar', icon: '🧩', premium: false },
  { id: 'run-ons', name: 'Run-on Sentences', description: 'Split long sentences', category: 'grammar', icon: '✂️', premium: false },
  { id: 'parallelism', name: 'Parallelism', description: 'Fix parallel structure', category: 'grammar', icon: '||', premium: false },
  { id: 'tense-consistency', name: 'Tense Consistency', description: 'Maintain consistent tense', category: 'grammar', icon: '⏰', premium: false },
  { id: 'pronoun-usage', name: 'Pronoun Usage', description: 'Fix pronoun errors', category: 'grammar', icon: '👤', premium: false },
  { id: 'comma-splices', name: 'Comma Splices', description: 'Fix comma splice errors', category: 'grammar', icon: ',', premium: false },
  { id: 'auto-fix-all', name: 'Auto-Fix All Errors', description: 'Automatically fix all errors', category: 'grammar', icon: '⚡', premium: false },

  // Writing Style (20 features)
  { id: 'clarity', name: 'Clarity Enhancement', description: 'Make writing clearer', category: 'style', icon: '💎', premium: false },
  { id: 'conciseness', name: 'Conciseness', description: 'Remove unnecessary words', category: 'style', icon: '📦', premium: false },
  { id: 'readability', name: 'Readability Score', description: 'Check reading level', category: 'style', icon: '📖', premium: false },
  { id: 'word-choice', name: 'Word Choice', description: 'Better vocabulary suggestions', category: 'style', icon: '📚', premium: false },
  { id: 'redundancy', name: 'Redundancy Removal', description: 'Remove repetitive phrases', category: 'style', icon: '🔁', premium: false },
  { id: 'passive-voice', name: 'Passive Voice Detection', description: 'Convert to active voice', category: 'style', icon: '👉', premium: false },
  { id: 'sentence-variety', name: 'Sentence Variety', description: 'Vary sentence structure', category: 'style', icon: '🎨', premium: false },
  { id: 'flow', name: 'Text Flow', description: 'Improve narrative flow', category: 'style', icon: '🌊', premium: false },
  { id: 'transitions', name: 'Transition Words', description: 'Add transitions', category: 'style', icon: '🔀', premium: false },
  { id: 'formality', name: 'Formality Level', description: 'Adjust formality', category: 'style', icon: '👔', premium: false },
  { id: 'vivid-language', name: 'Vivid Language', description: 'More descriptive writing', category: 'style', icon: '🎭', premium: false },
  { id: 'cliches', name: 'Cliché Detection', description: 'Identify overused phrases', category: 'style', icon: '🚫', premium: false },
  { id: 'jargon', name: 'Jargon Simplification', description: 'Simplify technical terms', category: 'style', icon: '🔧', premium: false },
  { id: 'power-words', name: 'Power Words', description: 'Strengthen your writing', category: 'style', icon: '💪', premium: false },
  { id: 'descriptive', name: 'Descriptive Enhancement', description: 'Add more details', category: 'style', icon: '🖼️', premium: false },
  { id: 'brevity', name: 'Brevity Check', description: 'Make it shorter', category: 'style', icon: '⚡', premium: false },
  { id: 'elaboration', name: 'Elaboration', description: 'Add more depth', category: 'style', icon: '🌳', premium: false },
  { id: 'parallel-structure', name: 'Parallel Structure', description: 'Maintain consistency', category: 'style', icon: '═', premium: false },
  { id: 'sentence-length', name: 'Sentence Length', description: 'Optimize sentence length', category: 'style', icon: '📏', premium: false },
  { id: 'vocabulary-level', name: 'Vocabulary Level', description: 'Adjust vocabulary', category: 'style', icon: '📖', premium: false },

  // Tone & Voice (15 features)
  { id: 'tone-detector', name: 'Tone Detector', description: 'Analyze current tone', category: 'tone', icon: '🎵', premium: false },
  { id: 'tone-formal', name: 'Formal Tone', description: 'Make text formal', category: 'tone', icon: '🎩', premium: false },
  { id: 'tone-casual', name: 'Casual Tone', description: 'Make text casual', category: 'tone', icon: '😎', premium: false },
  { id: 'tone-professional', name: 'Professional Tone', description: 'Business appropriate', category: 'tone', icon: '💼', premium: false },
  { id: 'tone-friendly', name: 'Friendly Tone', description: 'Warm and friendly', category: 'tone', icon: '🤗', premium: false },
  { id: 'tone-persuasive', name: 'Persuasive Tone', description: 'More convincing', category: 'tone', icon: '🎯', premium: false },
  { id: 'tone-empathetic', name: 'Empathetic Tone', description: 'Show understanding', category: 'tone', icon: '❤️', premium: false },
  { id: 'tone-confident', name: 'Confident Tone', description: 'Sound more confident', category: 'tone', icon: '💪', premium: false },
  { id: 'tone-enthusiastic', name: 'Enthusiastic Tone', description: 'Show excitement', category: 'tone', icon: '🎉', premium: false },
  { id: 'tone-neutral', name: 'Neutral Tone', description: 'Balanced tone', category: 'tone', icon: '⚖️', premium: false },
  { id: 'tone-diplomatic', name: 'Diplomatic Tone', description: 'Tactful writing', category: 'tone', icon: '🕊️', premium: false },
  { id: 'tone-humorous', name: 'Humorous Tone', description: 'Add humor', category: 'tone', icon: '😄', premium: false },
  { id: 'tone-serious', name: 'Serious Tone', description: 'More serious', category: 'tone', icon: '😐', premium: false },
  { id: 'tone-optimistic', name: 'Optimistic Tone', description: 'Positive outlook', category: 'tone', icon: '☀️', premium: false },
  { id: 'tone-urgency', name: 'Urgency Tone', description: 'Create urgency', category: 'tone', icon: '⚠️', premium: false },

  // Content Generation (20 features)
  { id: 'blog-generator', name: 'Blog Post Generator', description: 'Generate blog content', category: 'content', icon: '📝', premium: false },
  { id: 'paragraph-generator', name: 'Paragraph Generator', description: 'Generate paragraphs', category: 'content', icon: '📄', premium: false },
  { id: 'intro-generator', name: 'Introduction Writer', description: 'Write introductions', category: 'content', icon: '🚪', premium: false },
  { id: 'conclusion-generator', name: 'Conclusion Writer', description: 'Write conclusions', category: 'content', icon: '🏁', premium: false },
  { id: 'headline-generator', name: 'Headline Generator', description: 'Create catchy headlines', category: 'content', icon: '📰', premium: false },
  { id: 'outline-generator', name: 'Outline Generator', description: 'Create content outlines', category: 'content', icon: '📋', premium: false },
  { id: 'expand-text', name: 'Text Expander', description: 'Expand short text', category: 'content', icon: '↔️', premium: false },
  { id: 'shorten-text', name: 'Text Shortener', description: 'Condense text', category: 'content', icon: '⇿', premium: false },
  { id: 'bullet-points', name: 'Bullet Point Generator', description: 'Create bullet lists', category: 'content', icon: '•', premium: false },
  { id: 'story-generator', name: 'Story Generator', description: 'Generate creative stories', category: 'content', icon: '📖', premium: false },
  { id: 'dialogue-generator', name: 'Dialogue Generator', description: 'Write dialogue', category: 'content', icon: '💬', premium: false },
  { id: 'description-generator', name: 'Description Generator', description: 'Write descriptions', category: 'content', icon: '🖼️', premium: false },
  { id: 'argument-generator', name: 'Argument Generator', description: 'Build arguments', category: 'content', icon: '⚖️', premium: false },
  { id: 'example-generator', name: 'Example Generator', description: 'Generate examples', category: 'content', icon: '💡', premium: false },
  { id: 'analogy-generator', name: 'Analogy Generator', description: 'Create analogies', category: 'content', icon: '🔄', premium: false },
  { id: 'question-generator', name: 'Question Generator', description: 'Generate questions', category: 'content', icon: '❓', premium: false },
  { id: 'answer-generator', name: 'Answer Generator', description: 'Generate answers', category: 'content', icon: '💡', premium: false },
  { id: 'summary-generator', name: 'Summary Generator', description: 'Summarize text', category: 'content', icon: '📊', premium: false },
  { id: 'key-points', name: 'Key Points Extractor', description: 'Extract main points', category: 'content', icon: '🔑', premium: false },
  { id: 'call-to-action', name: 'CTA Generator', description: 'Create calls to action', category: 'content', icon: '📣', premium: false },

  // Rewriting & Paraphrasing (15 features)
  { id: 'paraphrase', name: 'Paraphrase', description: 'Rephrase text', category: 'rewrite', icon: '🔄', premium: false },
  { id: 'rewrite-formal', name: 'Rewrite Formal', description: 'Make more formal', category: 'rewrite', icon: '🎩', premium: false },
  { id: 'rewrite-casual', name: 'Rewrite Casual', description: 'Make more casual', category: 'rewrite', icon: '😎', premium: false },
  { id: 'rewrite-simple', name: 'Simplify', description: 'Simplify complex text', category: 'rewrite', icon: '📝', premium: false },
  { id: 'rewrite-complex', name: 'Make Complex', description: 'Add sophistication', category: 'rewrite', icon: '🎓', premium: false },
  { id: 'humanize', name: 'AI Humanizer', description: 'Make AI text human-like', category: 'rewrite', icon: '🤖➡️👤', premium: false },
  { id: 'plagiarism-rewrite', name: 'Plagiarism Rewriter', description: 'Rewrite to avoid plagiarism', category: 'rewrite', icon: '🔒', premium: false },
  { id: 'multiple-versions', name: 'Multiple Versions', description: 'Generate variations', category: 'rewrite', icon: '🎲', premium: false },
  { id: 'synonym-replacer', name: 'Synonym Replacer', description: 'Replace with synonyms', category: 'rewrite', icon: '📚', premium: false },
  { id: 'sentence-rewriter', name: 'Sentence Rewriter', description: 'Rewrite sentences', category: 'rewrite', icon: '✏️', premium: false },
  { id: 'paragraph-rewriter', name: 'Paragraph Rewriter', description: 'Rewrite paragraphs', category: 'rewrite', icon: '📄', premium: false },
  { id: 'word-replacer', name: 'Word Replacer', description: 'Replace specific words', category: 'rewrite', icon: '🔤', premium: false },
  { id: 'spin-text', name: 'Text Spinner', description: 'Create spun content', category: 'rewrite', icon: '🌪️', premium: false },
  { id: 'restructure', name: 'Restructure Text', description: 'Change structure', category: 'rewrite', icon: '🏗️', premium: false },
  { id: 'style-transfer', name: 'Style Transfer', description: 'Match writing style', category: 'rewrite', icon: '🎨', premium: false },

  // Translation (10 features)
  { id: 'translate', name: 'Translate', description: 'Multi-language translation', category: 'translate', icon: '🌍', premium: false },
  { id: 'detect-language', name: 'Language Detection', description: 'Detect text language', category: 'translate', icon: '🔍', premium: false },
  { id: 'translate-bulk', name: 'Bulk Translation', description: 'Translate multiple texts', category: 'translate', icon: '📚', premium: false },
  { id: 'translate-preserve', name: 'Preserve Formatting', description: 'Keep formatting in translation', category: 'translate', icon: '🎨', premium: false },
  { id: 'translate-technical', name: 'Technical Translation', description: 'Translate technical content', category: 'translate', icon: '⚙️', premium: false },
  { id: 'translate-context', name: 'Context-Aware Translation', description: 'Translation with context', category: 'translate', icon: '🧠', premium: false },
  { id: 'back-translate', name: 'Back Translation', description: 'Translate back to check accuracy', category: 'translate', icon: '↩️', premium: false },
  { id: 'multilingual-check', name: 'Multilingual Check', description: 'Check in multiple languages', category: 'translate', icon: '🌐', premium: false },
  { id: 'localization', name: 'Localization', description: 'Adapt for local audiences', category: 'translate', icon: '📍', premium: false },
  { id: 'translation-memory', name: 'Translation Memory', description: 'Save translations', category: 'translate', icon: '💾', premium: false },

  // SEO & Marketing (15 features)
  { id: 'seo-score', name: 'SEO Score', description: 'Check SEO optimization', category: 'seo', icon: '📈', premium: false },
  { id: 'keyword-density', name: 'Keyword Density', description: 'Analyze keywords', category: 'seo', icon: '🔑', premium: false },
  { id: 'meta-description', name: 'Meta Description', description: 'Generate meta descriptions', category: 'seo', icon: '📝', premium: false },
  { id: 'title-tags', name: 'Title Tags', description: 'Create SEO titles', category: 'seo', icon: '🏷️', premium: false },
  { id: 'product-description', name: 'Product Descriptions', description: 'Write product copy', category: 'seo', icon: '🛍️', premium: false },
  { id: 'ad-copy', name: 'Ad Copy', description: 'Create ad text', category: 'seo', icon: '📢', premium: false },
  { id: 'landing-page', name: 'Landing Page Copy', description: 'Write landing pages', category: 'seo', icon: '🎯', premium: false },
  { id: 'press-release', name: 'Press Release', description: 'Write press releases', category: 'seo', icon: '📰', premium: false },
  { id: 'sales-copy', name: 'Sales Copy', description: 'Persuasive sales writing', category: 'seo', icon: '💰', premium: false },
  { id: 'marketing-email', name: 'Marketing Email', description: 'Create marketing emails', category: 'seo', icon: '📧', premium: false },
  { id: 'value-proposition', name: 'Value Proposition', description: 'Create value statements', category: 'seo', icon: '💎', premium: false },
  { id: 'competitor-analysis', name: 'Competitor Analysis', description: 'Analyze competitor content', category: 'seo', icon: '🔍', premium: false },
  { id: 'content-ideas', name: 'Content Ideas', description: 'Generate content topics', category: 'seo', icon: '💡', premium: false },
  { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Generate hashtags', category: 'seo', icon: '#️⃣', premium: false },
  { id: 'brand-voice', name: 'Brand Voice', description: 'Match brand voice', category: 'seo', icon: '🎙️', premium: false },

  // Academic Writing (10 features)
  { id: 'citation-generator', name: 'Citation Generator', description: 'Generate citations', category: 'academic', icon: '📚', premium: false },
  { id: 'thesis-statement', name: 'Thesis Statement', description: 'Create thesis statements', category: 'academic', icon: '🎓', premium: false },
  { id: 'research-summary', name: 'Research Summary', description: 'Summarize research', category: 'academic', icon: '🔬', premium: false },
  { id: 'abstract-generator', name: 'Abstract Generator', description: 'Write abstracts', category: 'academic', icon: '📄', premium: false },
  { id: 'literature-review', name: 'Literature Review', description: 'Create literature reviews', category: 'academic', icon: '📖', premium: false },
  { id: 'methodology', name: 'Methodology Section', description: 'Write methodology', category: 'academic', icon: '⚗️', premium: false },
  { id: 'academic-tone', name: 'Academic Tone', description: 'Academic writing style', category: 'academic', icon: '🎓', premium: false },
  { id: 'plagiarism-checker', name: 'Plagiarism Checker', description: 'Check for plagiarism', category: 'academic', icon: '🔒', premium: false },
  { id: 'research-questions', name: 'Research Questions', description: 'Generate research questions', category: 'academic', icon: '❓', premium: false },
  { id: 'academic-formatting', name: 'Academic Formatting', description: 'Format academic papers', category: 'academic', icon: '📋', premium: false },

  // Business Writing (10 features)
  { id: 'business-plan', name: 'Business Plan', description: 'Write business plans', category: 'business', icon: '📊', premium: false },
  { id: 'executive-summary', name: 'Executive Summary', description: 'Create executive summaries', category: 'business', icon: '📈', premium: false },
  { id: 'proposal', name: 'Proposal Writer', description: 'Write proposals', category: 'business', icon: '📝', premium: false },
  { id: 'report', name: 'Report Writer', description: 'Create reports', category: 'business', icon: '📊', premium: false },
  { id: 'memo', name: 'Memo Writer', description: 'Write memos', category: 'business', icon: '📋', premium: false },
  { id: 'meeting-notes', name: 'Meeting Notes', description: 'Format meeting notes', category: 'business', icon: '📝', premium: false },
  { id: 'job-description', name: 'Job Description', description: 'Write job postings', category: 'business', icon: '💼', premium: false },
  { id: 'performance-review', name: 'Performance Review', description: 'Write reviews', category: 'business', icon: '⭐', premium: false },
  { id: 'contract-summary', name: 'Contract Summary', description: 'Summarize contracts', category: 'business', icon: '📜', premium: false },
  { id: 'financial-report', name: 'Financial Report', description: 'Create financial reports', category: 'business', icon: '💵', premium: false },

  // Creative Writing (10 features)
  { id: 'character-generator', name: 'Character Generator', description: 'Create characters', category: 'creative', icon: '🎭', premium: false },
  { id: 'plot-generator', name: 'Plot Generator', description: 'Generate plot ideas', category: 'creative', icon: '📖', premium: false },
  { id: 'poetry-generator', name: 'Poetry Generator', description: 'Write poetry', category: 'creative', icon: '🌹', premium: false },
  { id: 'script-generator', name: 'Script Generator', description: 'Write scripts', category: 'creative', icon: '🎬', premium: false },
  { id: 'song-lyrics', name: 'Song Lyrics', description: 'Write song lyrics', category: 'creative', icon: '🎵', premium: false },
  { id: 'creative-prompts', name: 'Creative Prompts', description: 'Generate writing prompts', category: 'creative', icon: '💡', premium: false },
  { id: 'world-building', name: 'World Building', description: 'Create fictional worlds', category: 'creative', icon: '🌍', premium: false },
  { id: 'scene-generator', name: 'Scene Generator', description: 'Write scenes', category: 'creative', icon: '🎬', premium: false },
  { id: 'metaphor-generator', name: 'Metaphor Generator', description: 'Create metaphors', category: 'creative', icon: '🌸', premium: false },
  { id: 'imagery-enhancer', name: 'Imagery Enhancer', description: 'Add vivid imagery', category: 'creative', icon: '🖼️', premium: false },

  // Social Media (10 features)
  { id: 'social-post', name: 'Social Media Post', description: 'Create social posts', category: 'social', icon: '📱', premium: false },
  { id: 'twitter-thread', name: 'Twitter Thread', description: 'Write Twitter threads', category: 'social', icon: '🐦', premium: false },
  { id: 'instagram-caption', name: 'Instagram Caption', description: 'Write captions', category: 'social', icon: '📸', premium: false },
  { id: 'linkedin-post', name: 'LinkedIn Post', description: 'Professional posts', category: 'social', icon: '💼', premium: false },
  { id: 'facebook-post', name: 'Facebook Post', description: 'Facebook content', category: 'social', icon: '👥', premium: false },
  { id: 'tiktok-script', name: 'TikTok Script', description: 'Write TikTok scripts', category: 'social', icon: '🎵', premium: false },
  { id: 'youtube-description', name: 'YouTube Description', description: 'Video descriptions', category: 'social', icon: '📹', premium: false },
  { id: 'bio-generator', name: 'Bio Generator', description: 'Create social bios', category: 'social', icon: '👤', premium: false },
  { id: 'content-calendar', name: 'Content Calendar', description: 'Plan social content', category: 'social', icon: '📅', premium: false },
  { id: 'engagement-optimizer', name: 'Engagement Optimizer', description: 'Optimize for engagement', category: 'social', icon: '📈', premium: false },

  // Email Writing (10 features)
  { id: 'professional-email', name: 'Professional Email', description: 'Write professional emails', category: 'email', icon: '📧', premium: false },
  { id: 'cold-email', name: 'Cold Email', description: 'Write cold outreach', category: 'email', icon: '❄️', premium: false },
  { id: 'follow-up-email', name: 'Follow-up Email', description: 'Create follow-ups', category: 'email', icon: '🔄', premium: false },
  { id: 'thank-you-email', name: 'Thank You Email', description: 'Write thank you emails', category: 'email', icon: '🙏', premium: false },
  { id: 'apology-email', name: 'Apology Email', description: 'Write apology emails', category: 'email', icon: '😔', premium: false },
  { id: 'rejection-email', name: 'Rejection Email', description: 'Polite rejections', category: 'email', icon: '🚫', premium: false },
  { id: 'invitation-email', name: 'Invitation Email', description: 'Create invitations', category: 'email', icon: '✉️', premium: false },
  { id: 'newsletter', name: 'Newsletter', description: 'Write newsletters', category: 'email', icon: '📰', premium: false },
  { id: 'email-subject', name: 'Email Subject Lines', description: 'Generate subject lines', category: 'email', icon: '📬', premium: false },
  { id: 'signature-generator', name: 'Email Signature', description: 'Create signatures', category: 'email', icon: '✍️', premium: false },

  // Text Analysis (10 features)
  { id: 'word-count', name: 'Word Count', description: 'Count words/characters', category: 'analysis', icon: '🔢', premium: false },
  { id: 'reading-time', name: 'Reading Time', description: 'Estimate reading time', category: 'analysis', icon: '⏱️', premium: false },
  { id: 'sentiment-analysis', name: 'Sentiment Analysis', description: 'Analyze sentiment', category: 'analysis', icon: '😊😐😢', premium: false },
  { id: 'emotion-detection', name: 'Emotion Detection', description: 'Detect emotions', category: 'analysis', icon: '❤️', premium: false },
  { id: 'complexity-score', name: 'Complexity Score', description: 'Measure complexity', category: 'analysis', icon: '📊', premium: false },
  { id: 'unique-words', name: 'Unique Words', description: 'Count unique words', category: 'analysis', icon: '🎯', premium: false },
  { id: 'frequency-analysis', name: 'Word Frequency', description: 'Analyze word frequency', category: 'analysis', icon: '📈', premium: false },
  { id: 'text-comparison', name: 'Text Comparison', description: 'Compare two texts', category: 'analysis', icon: '⚖️', premium: false },
  { id: 'topic-extraction', name: 'Topic Extraction', description: 'Extract main topics', category: 'analysis', icon: '🏷️', premium: false },
  { id: 'intent-analysis', name: 'Intent Analysis', description: 'Analyze user intent', category: 'analysis', icon: '🎯', premium: false },

  // AI Enhancement (15 features)
  { id: 'ai-detector', name: 'AI Content Detector', description: 'Detect AI-written text', category: 'ai', icon: '🤖', premium: false },
  { id: 'bypass-ai-detection', name: 'Bypass AI Detection', description: 'Make AI text undetectable', category: 'ai', icon: '🎭', premium: false },
  { id: 'pattern-breaking', name: 'Pattern Breaking', description: 'Break AI patterns', category: 'ai', icon: '🔨', premium: false },
  { id: 'natural-flow', name: 'Natural Flow', description: 'Add natural flow', category: 'ai', icon: '🌊', premium: false },
  { id: 'personality-injection', name: 'Personality Injection', description: 'Add personality', category: 'ai', icon: '✨', premium: false },
  { id: 'idiom-integration', name: 'Idiom Integration', description: 'Add idioms naturally', category: 'ai', icon: '💬', premium: false },
  { id: 'contraction-control', name: 'Contraction Control', description: 'Manage contractions', category: 'ai', icon: "don't", premium: false },
  { id: 'emotional-depth', name: 'Emotional Depth', description: 'Add emotional nuance', category: 'ai', icon: '💝', premium: false },
  { id: 'conversational-style', name: 'Conversational Style', description: 'More conversational', category: 'ai', icon: '💬', premium: false },
  { id: 'personal-touch', name: 'Personal Touch', description: 'Add personal elements', category: 'ai', icon: '👤', premium: false },
  { id: 'originality-boost', name: 'Originality Boost', description: 'Increase originality', category: 'ai', icon: '🌟', premium: false },
  { id: 'context-awareness', name: 'Context Awareness', description: 'Improve context understanding', category: 'ai', icon: '🧠', premium: false },
  { id: 'coherence-check', name: 'Coherence Check', description: 'Check text coherence', category: 'ai', icon: '🔗', premium: false },
  { id: 'authenticity-score', name: 'Authenticity Score', description: 'Measure authenticity', category: 'ai', icon: '✓', premium: false },
  { id: 'human-score', name: 'Human Score', description: 'How human is the text', category: 'ai', icon: '👤', premium: false },
];

export function getFeaturesByCategory(category: string): Feature[] {
  return FEATURES.filter(f => f.category === category);
}

export function getFreeFeatures(): Feature[] {
  return FEATURES.filter(f => !f.premium);
}

export function getPremiumFeatures(): Feature[] {
  return FEATURES.filter(f => f.premium);
}
