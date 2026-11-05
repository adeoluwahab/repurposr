import { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InputSection } from './components/InputSection';
import { OutputTabs, EmptyState, OutputSkeleton } from './components/OutputTabs';
import { SettingsModal } from './components/SettingsModal';
import { generateContent, getDefaultConfig } from './services/aiService';
import type { ContentInput, GeneratedContent, OutputPlatform, AIServiceConfig } from './types';

const INITIAL_INPUT: ContentInput = {
  rawText: '',
  contentType: 'professional',
};

export function App() {
  const [input, setInput] = useState<ContentInput>(INITIAL_INPUT);
  const [output, setOutput] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputPlatform>('linkedin');
  const [config, setConfig] = useState<AIServiceConfig>(() => getDefaultConfig());
  const [showSettings, setShowSettings] = useState(false);

  const hasApiKey = config.apiKey.trim().length > 0;

  const handleInputChange = useCallback((changes: Partial<ContentInput>) => {
    setInput((prev) => ({ ...prev, ...changes }));
    setError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!input.rawText.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setOutput(null);

    try {
      const result = await generateContent(input, config);
      setOutput(result);
      setActiveTab('linkedin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate content. Please try again.';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }, [input, config, isGenerating]);

  const handleConfigChange = useCallback((newConfig: AIServiceConfig) => {
    setConfig(newConfig);
  }, []);

  const handleTabChange = useCallback((tab: OutputPlatform) => {
    setActiveTab(tab);
  }, []);

  const handleSettingsClose = useCallback(() => {
    setShowSettings(false);
  }, []);

  // Keyboard shortcut: Ctrl/Cmd + Enter to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isGenerating && input.rawText.trim()) {
        e.preventDefault();
        handleGenerate();
      }
      if (e.key === 'Escape') {
        setShowSettings(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGenerating, input.rawText, handleGenerate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar onSettingsClick={() => setShowSettings(true)} hasApiKey={hasApiKey} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Transform Content Into{' '}
              <span className="gradient-text">Multi-Platform Gold</span>
            </h1>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Paste any transcript, article, or notes. Get LinkedIn posts, X threads, newsletters, and video hooks —
              instantly optimized for each platform.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <InputSection
                input={input}
                onInputChange={handleInputChange}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                error={error}
              />
            </div>

            <div className="lg:col-span-7">
              {isGenerating ? (
                <OutputSkeleton />
              ) : output ? (
                <OutputTabs
                  content={output}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              ) : (
                <EmptyState onGenerateClick={handleGenerate} />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Built with Repurposr — AI Content Repurposer</p>
          <p className="mt-1">
            Keyboard shortcut: <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">Ctrl/Cmd + Enter</kbd> to generate
          </p>
        </div>
      </footer>

      <SettingsModal
        isOpen={showSettings}
        onClose={handleSettingsClose}
        currentConfig={config}
        onConfigChange={handleConfigChange}
      />
    </div>
  );
}

export default App;