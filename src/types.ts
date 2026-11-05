export type ContentType = 'professional' | 'casual' | 'educational' | 'engaging';

export type OutputPlatform = 'linkedin' | 'twitter' | 'newsletter' | 'video';

export interface ContentInput {
  rawText: string;
  contentType: ContentType;
}

export interface LinkedInPost {
  hook: string;
  body: string;
  hashtags: string[];
  callToAction: string;
}

export interface TwitterThread {
  hook: string;
  tweets: string[];
  callToAction: string;
}

export interface NewsletterSummary {
  subjectLine: string;
  preheader: string;
  body: string;
  cta: string;
}

export interface VideoHook {
  hook: string;
  visualCue: string;
  duration: string;
}

export interface GeneratedContent {
  linkedin: LinkedInPost;
  twitter: TwitterThread;
  newsletter: NewsletterSummary;
  video: VideoHook[];
}

export interface AIServiceConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

export interface AppState {
  input: ContentInput;
  output: GeneratedContent | null;
  isGenerating: boolean;
  error: string | null;
  activeTab: OutputPlatform;
  settings: AIServiceConfig;
  showSettings: boolean;
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  professional: 'Professional',
  casual: 'Casual',
  educational: 'Educational',
  engaging: 'Engaging',
};

export const CONTENT_TYPE_DESCRIPTIONS: Record<ContentType, string> = {
  professional: 'Thought-leadership tone, authoritative and polished',
  casual: 'Conversational, relatable, like talking to a friend',
  educational: 'Instructional, value-packed, teaches something specific',
  engaging: 'Hook-heavy, story-driven, maximizes interaction',
};

export const PLATFORM_LABELS: Record<OutputPlatform, string> = {
  linkedin: 'LinkedIn',
  twitter: 'X / Twitter',
  newsletter: 'Newsletter',
  video: 'Video Hooks',
};

export const PLATFORM_ICONS: Record<OutputPlatform, string> = {
  linkedin: 'linkedin',
  twitter: 'twitter',
  newsletter: 'mail',
  video: 'video',
};