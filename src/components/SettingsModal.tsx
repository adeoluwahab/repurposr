import { useState, useEffect, type ChangeEvent } from 'react';
import { Save, Key, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import type { AIServiceConfig } from '../types';
import { saveConfig } from '../services/aiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: AIServiceConfig;
  onConfigChange: (config: AIServiceConfig) => void;
}

const PROVIDER_OPTIONS = [
  { value: 'openai', label: 'OpenAI', description: 'GPT-4o, GPT-4o-mini, GPT-4 Turbo' },
  { value: 'anthropic', label: 'Anthropic', description: 'Claude 3.5 Sonnet, Claude 3 Haiku' },
  { value: 'custom', label: 'Custom Endpoint', description: 'LocalAI, Ollama, or compatible API' },
];

const MODEL_OPTIONS: Record<string, { value: string; label: string }[]> = {
  openai: [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast, Cost-effective)' },
    { value: 'gpt-4o', label: 'GPT-4o (Most Capable)' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  ],
  anthropic: [
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku (Fast, Cost-effective)' },
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Most Capable)' },
  ],
  custom: [
    { value: 'local-model', label: 'Custom Model Name' },
  ],
};

const DEFAULT_BASE_URLS: Record<AIServiceConfig['provider'], string> = {
  openai: 'https://api.openai.com/v1',
  anthropic: 'https://api.anthropic.com/v1',
  custom: '',
};

export function SettingsModal({ isOpen, onClose, currentConfig, onConfigChange }: SettingsModalProps) {
  const [config, setConfig] = useState<AIServiceConfig>(currentConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setConfig(currentConfig);
    setSaveStatus('idle');
    setSaveError('');
  }, [currentConfig, isOpen]);

  const handleChange = (field: keyof AIServiceConfig, value: string) => {
    const newConfig = { ...config, [field]: value };
    if (field === 'provider') {
      const provider = value as AIServiceConfig['provider'];
      newConfig.baseUrl = DEFAULT_BASE_URLS[provider] || '';
      newConfig.model = MODEL_OPTIONS[provider]?.[0]?.value || '';
    }
    setConfig(newConfig);
    setSaveStatus('idle');
    setSaveError('');
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(e.target.name as keyof AIServiceConfig, e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    let persistenceError: string | null = null;
    try {
      saveConfig(config);
    } catch (error) {
      persistenceError = error instanceof Error ? error.message : 'Unable to save settings.';
    }
    onConfigChange(config);
    setSaveStatus(persistenceError ? 'error' : 'success');
    setSaveError(persistenceError ?? '');
    setTimeout(() => setSaveStatus('idle'), 3000);
    setIsSaving(false);
  };

  const models = MODEL_OPTIONS[config.provider] || MODEL_OPTIONS.custom;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Provider Settings"
      description="Configure your LLM provider and credentials. Browser storage is not encrypted."
      size="lg"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Provider Selection</CardTitle>
            <CardDescription>
              OpenAI and Anthropic require API keys. Custom endpoints can be configured with or without one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              label="AI Provider"
              name="provider"
              value={config.provider}
              onChange={handleSelectChange}
              options={PROVIDER_OPTIONS}
              placeholder="Select provider"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Provider settings are saved in this browser. Your API key is kept in memory only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                label="API Key"
                type={showKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => handleChange('apiKey', e.target.value)}
                placeholder="Enter your API key"
                helperText="Kept in memory for this page session and sent directly to your selected provider. Reloading clears it."
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
                onClick={() => setShowKey(!showKey)}
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <Key className="h-5 w-5" />
                )}
              </Button>
            </div>

            <Input
              label={config.provider === 'custom' ? 'Custom API Endpoint URL' : 'API Base URL (Optional)'}
              value={config.baseUrl}
              onChange={(e) => handleChange('baseUrl', e.target.value)}
              placeholder={DEFAULT_BASE_URLS[config.provider] || 'Enter custom endpoint URL'}
              helperText={config.provider === 'custom' ? 'Required; enter the full chat-completions-compatible endpoint URL' : 'Leave empty to use the provider default'}
            />

            <Select
              label="Model"
              name="model"
              value={config.model}
              onChange={handleSelectChange}
              options={models}
              placeholder="Select model"
            />
          </CardContent>
        </Card>

        <Card className="border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
              <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <p><strong>Demo Mode:</strong> Without an OpenAI or Anthropic key, the app shows preset example content; it does not transform your input. A custom endpoint can be used without a key.</p>
                <p><strong>Privacy:</strong> Your API key is not saved in browser storage and is cleared when this page reloads. When you generate with a provider, your input and key are sent directly from your browser to that provider. Do not enter sensitive content unless you trust the provider.</p>
                <p><strong>Costs:</strong> You're responsible for any API usage costs from your provider.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            variant="brand"
            onClick={handleSave}
            isLoading={isSaving}
            disabled={!config.apiKey.trim() && config.provider !== 'custom'}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        {saveStatus === 'success' && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 animate-slide-down">
            <CheckCircle className="h-4 w-4" />
            Settings saved successfully!
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-slide-down">
            <AlertCircle className="h-4 w-4" />
            Settings are active for this session but could not be saved: {saveError}
          </div>
        )}
      </div>
    </Modal>
  );
}