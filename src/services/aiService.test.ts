import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateContent, getDefaultConfig, saveConfig } from './aiService';
import type { AIServiceConfig, ContentInput, GeneratedContent } from '../types';

const input: ContentInput = {
  rawText: 'A short article about building reliable software.',
  contentType: 'professional',
};

const generatedContent: GeneratedContent = {
  linkedin: {
    hook: 'A useful hook',
    body: 'A useful post body',
    hashtags: ['#Software'],
    callToAction: 'Share your thoughts.',
  },
  twitter: {
    hook: 'A thread hook',
    tweets: ['First tweet'],
    callToAction: 'Follow for more.',
  },
  newsletter: {
    subjectLine: 'A subject',
    preheader: 'A preheader',
    body: 'A newsletter body',
    cta: 'Read more.',
  },
  video: [
    { hook: 'Hook one', visualCue: 'Show a screen', duration: '5s' },
    { hook: 'Hook two', visualCue: 'Show a chart', duration: '5s' },
    { hook: 'Hook three', visualCue: 'Show a team', duration: '5s' },
  ],
};

const openAIConfig: AIServiceConfig = {
  provider: 'openai',
  apiKey: 'test-key',
  baseUrl: 'https://api.example.test/v1',
  model: 'test-model',
};

function mockOpenAIResponse(content: unknown = generatedContent): Response {
  return new Response(
    JSON.stringify({ choices: [{ message: { content: JSON.stringify(content) } }] }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('generateContent', () => {
  it('uses the OpenAI chat-completions endpoint for a base URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockOpenAIResponse());
    vi.stubGlobal('fetch', fetchMock);

    await expect(generateContent(input, openAIConfig)).resolves.toEqual(generatedContent);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/v1/chat/completions',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('uses the default OpenAI endpoint when no base URL is saved', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockOpenAIResponse());
    vi.stubGlobal('fetch', fetchMock);

    await generateContent(input, { provider: 'openai', apiKey: 'test-key' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.any(Object)
    );
  });

  it('preserves query parameters on an OpenAI base URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockOpenAIResponse());
    vi.stubGlobal('fetch', fetchMock);

    await generateContent(input, {
      ...openAIConfig,
      baseUrl: 'https://api.example.test/v1?tenant=demo',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/v1/chat/completions?tenant=demo',
      expect.any(Object)
    );
  });

  it('preserves a full OpenAI endpoint URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockOpenAIResponse());
    vi.stubGlobal('fetch', fetchMock);

    await generateContent(input, {
      ...openAIConfig,
      baseUrl: 'https://api.example.test/custom/chat/completions',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/custom/chat/completions',
      expect.any(Object)
    );
  });

  it('uses the Anthropic messages endpoint for an API base URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ content: [{ type: 'text', text: JSON.stringify(generatedContent) }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    await generateContent(input, {
      provider: 'anthropic',
      apiKey: 'test-key',
      baseUrl: 'https://api.example.test/v1',
      model: 'test-model',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.test/v1/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'anthropic-dangerous-direct-browser-access': 'true',
        }),
      })
    );
  });

  it('uses custom endpoints without requiring or sending an API key', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockOpenAIResponse());
    vi.stubGlobal('fetch', fetchMock);

    await generateContent(input, {
      provider: 'custom',
      apiKey: '',
      baseUrl: 'http://localhost:11434/v1/chat/completions',
      model: 'local-model',
    });

    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:11434/v1/chat/completions');
    expect((request.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it('surfaces provider failures instead of returning demo content', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: { message: 'Invalid API key' } }), {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    await expect(generateContent(input, openAIConfig)).rejects.toThrow('Invalid API key');
  });

  it('rejects invalid provider URLs before making a request', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      generateContent(input, { ...openAIConfig, baseUrl: 'not-a-url' })
    ).rejects.toThrow('Enter a valid API URL');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects malformed nested content returned by the provider', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(mockOpenAIResponse({ ...generatedContent, newsletter: {} }))
    );

    await expect(generateContent(input, openAIConfig)).rejects.toThrow(
      'AI returned incomplete newsletter content.'
    );
  });

  it('uses preset example responses in keyless demo mode', async () => {
    vi.useFakeTimers();
    const result = generateContent(input, {
      provider: 'openai',
      apiKey: '',
    });
    await vi.advanceTimersByTimeAsync(1500);

    await expect(result).resolves.toHaveProperty('video');
  });
});

describe('API key persistence', () => {
  it('saves provider settings without persisting the API key', () => {
    const values = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    });

    saveConfig(openAIConfig);

    expect(JSON.parse(values.get('repurposr_ai_config') ?? '{}')).toEqual({
      ...openAIConfig,
      apiKey: '',
    });
  });

  it('clears an API key from legacy saved settings when loading them', () => {
    const setItem = vi.fn();
    vi.stubGlobal('localStorage', {
      getItem: () => JSON.stringify(openAIConfig),
      setItem,
    });

    expect(getDefaultConfig()).toEqual({ ...openAIConfig, apiKey: '' });
    expect(setItem).toHaveBeenCalledWith(
      'repurposr_ai_config',
      JSON.stringify({ ...openAIConfig, apiKey: '' })
    );
  });
});
