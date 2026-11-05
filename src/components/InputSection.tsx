import { useState, type ChangeEvent } from 'react';
import { Mic, FileText, Trash2, Sparkles } from 'lucide-react';
import { Textarea } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import type { ContentType, ContentInput } from '../types';
import { CONTENT_TYPE_LABELS, CONTENT_TYPE_DESCRIPTIONS } from '../types';

interface InputSectionProps {
  input: ContentInput;
  onInputChange: (input: Partial<ContentInput>) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  error: string | null;
}

const CONTENT_TYPES: { value: ContentType; label: string; description: string }[] = [
  { value: 'professional', label: CONTENT_TYPE_LABELS.professional, description: CONTENT_TYPE_DESCRIPTIONS.professional },
  { value: 'casual', label: CONTENT_TYPE_LABELS.casual, description: CONTENT_TYPE_DESCRIPTIONS.casual },
  { value: 'educational', label: CONTENT_TYPE_LABELS.educational, description: CONTENT_TYPE_DESCRIPTIONS.educational },
  { value: 'engaging', label: CONTENT_TYPE_LABELS.engaging, description: CONTENT_TYPE_DESCRIPTIONS.engaging },
];

const MAX_CHARS = 10000;

export function InputSection({ input, onInputChange, isGenerating, onGenerate, error }: InputSectionProps) {
  const [isComposing, setIsComposing] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isComposing) {
      onInputChange({ rawText: e.target.value });
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsComposing(false);
    onInputChange({ rawText: e.target.value });
  };

  const handleClear = () => {
    onInputChange({ rawText: '' });
  };

  const handleTypeChange = (value: string) => {
    onInputChange({ contentType: value as ContentType });
  };

  const charCount = input.rawText.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canGenerate = charCount > 0 && charCount <= MAX_CHARS && !isGenerating;

  return (
    <section className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Input Content</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Paste your transcript, article, or notes below
          </p>
        </div>
        {input.rawText && (
          <Button variant="ghost" size="sm" onClick={handleClear} aria-label="Clear input">
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Textarea
        value={input.rawText}
        onChange={handleTextChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="Paste your raw content here... (transcript, blog post, notes, etc.)"
        showCharCount
        maxLength={MAX_CHARS}
        error={isOverLimit ? `Maximum ${MAX_CHARS.toLocaleString()} characters allowed` : undefined}
        helperText={!input.rawText ? 'Minimum 10 characters recommended for best results' : undefined}
        rows={8}
        disabled={isGenerating}
        aria-label="Raw content input"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full sm:w-auto">
          <Select
            label="Content Style"
            value={input.contentType}
            onChange={handleTypeChange}
            options={CONTENT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
            placeholder="Select content style"
            disabled={isGenerating}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="brand"
            size="lg"
            onClick={onGenerate}
            disabled={!canGenerate}
            isLoading={isGenerating}
            className="w-full sm:w-auto"
          >
            <Sparkles className="h-5 w-5" />
            {isGenerating ? 'Generating...' : 'Generate Repurposed Content'}
          </Button>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500 animate-slide-down">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {input.contentType && (
        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
              <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900 dark:text-white">
                {CONTENT_TYPE_LABELS[input.contentType]} Style Selected
              </p>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                {CONTENT_TYPE_DESCRIPTIONS[input.contentType]}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>{charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters</span>
        <span className={cn(isOverLimit && 'text-red-500')}>
          {isOverLimit ? 'Over limit' : 'Ready to generate'}
        </span>
      </div>
    </section>
  );
}