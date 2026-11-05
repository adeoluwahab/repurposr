import { useState } from 'react';
import { Copy, Check, Linkedin, Twitter, Mail, Video, Hash, MessageSquare, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { cn } from '../lib/utils';
import { copyToClipboard } from '../lib/utils';
import type { LinkedInPost, TwitterThread, NewsletterSummary, VideoHook } from '../types';

interface ContentCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export function ContentCard({ title, icon, children, className, footer }: ContentCardProps) {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="flex-1 p-5">{children}</CardContent>
      {footer && (
        <div className="px-5 pb-5 pt-0">{footer}</div>
      )}
    </Card>
  );
}

interface LinkedInCardProps {
  content: LinkedInPost;
}

export function LinkedInCard({ content }: LinkedInCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const fullText = `${content.hook}\n\n${content.body}\n\n${content.hashtags.join(' ')}\n\n${content.callToAction}`;

  const handleCopy = async () => {
    await copyToClipboard(fullText);
    setCopied('full');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyHook = async () => {
    await copyToClipboard(content.hook);
    setCopied('hook');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ContentCard
      title="LinkedIn Post"
      icon={<Linkedin className="h-5 w-5" />}
      footer={
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={copied === 'full' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' : ''}
          >
            {copied === 'full' ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" /> Copy Full Post
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyHook}
            className={copied === 'hook' ? 'text-green-600 dark:text-green-400' : ''}
          >
            {copied === 'hook' ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" /> Hook Only
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 p-4 border border-brand-200 dark:border-brand-800">
          <p className="font-medium text-slate-900 dark:text-white">{content.hook}</p>
          <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">Hook</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{content.body}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {content.hashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
            >
              <Hash className="h-3 w-3 mr-1" />{tag}
            </span>
          ))}
        </div>

        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
          <p className="font-medium text-slate-900 dark:text-white">{content.callToAction}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Call to Action</p>
        </div>
      </div>
    </ContentCard>
  );
}

interface TwitterCardProps {
  content: TwitterThread;
}

export function TwitterCard({ content }: TwitterCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const fullThread = `${content.hook}\n\n${content.tweets.map((t, i) => `${i + 1}/${content.tweets.length + 1} ${t}`).join('\n\n')}\n\n${content.callToAction}`;

  const handleCopy = async () => {
    await copyToClipboard(fullThread);
    setCopied('full');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ContentCard
      title="X / Twitter Thread"
      icon={<Twitter className="h-5 w-5" />}
      footer={
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={copied === 'full' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' : ''}
        >
          {copied === 'full' ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Copied Thread!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy Full Thread
            </>
          )}
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{content.hook}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Hook Tweet</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {content.tweets.map((tweet, index) => (
            <div key={index} className="group relative rounded-xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium text-sm">
                  {index + 1}/{content.tweets.length + 1}
                </div>
                <p className="flex-1 text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">{tweet}</p>
              </div>
              <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    await copyToClipboard(`${index + 1}/${content.tweets.length + 1} ${tweet}`);
                  }}
                  className="h-7 w-7 text-slate-400 hover:text-brand-600"
                  aria-label={`Copy tweet ${index + 1}`}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-brand-50 dark:bg-brand-900/20 p-4 border border-brand-200 dark:border-brand-800">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{content.callToAction}</p>
              <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">Closing CTA</p>
            </div>
          </div>
        </div>
      </div>
    </ContentCard>
  );
}

interface NewsletterCardProps {
  content: NewsletterSummary;
}

export function NewsletterCard({ content }: NewsletterCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const fullText = `Subject: ${content.subjectLine}\nPreheader: ${content.preheader}\n\n${content.body}\n\n${content.cta}`;

  const handleCopy = async () => {
    await copyToClipboard(fullText);
    setCopied('full');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ContentCard
      title="Newsletter Summary"
      icon={<Mail className="h-5 w-5" />}
      footer={
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={copied === 'full' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' : ''}
        >
          {copied === 'full' ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy Newsletter
            </>
          )}
        </Button>
      }
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject Line</p>
              <p className="font-semibold text-slate-900 dark:text-white">{content.subjectLine}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preheader</p>
              <p className="text-slate-600 dark:text-slate-400">{content.preheader}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{content.body}</p>
        </div>

        <div className="rounded-lg bg-brand-50 dark:bg-brand-900/20 p-4 border border-brand-200 dark:border-brand-800">
          <p className="font-medium text-slate-900 dark:text-white">{content.cta}</p>
          <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">Call to Action</p>
        </div>
      </div>
    </ContentCard>
  );
}

interface VideoCardProps {
  content: VideoHook[];
}

export function VideoCard({ content }: VideoCardProps) {
  const [copied, setCopied] = useState<number | null>(null);

  const fullText = content.map((hook, i) =>
    `Hook ${i + 1}: ${hook.hook}\nVisual: ${hook.visualCue}\nDuration: ${hook.duration}`
  ).join('\n\n---\n\n');

  const handleCopyAll = async () => {
    await copyToClipboard(fullText);
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyOne = async (index: number) => {
    const hook = content[index];
    await copyToClipboard(`${hook.hook}\n\nVisual: ${hook.visualCue}\nDuration: ${hook.duration}`);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ContentCard
      title="Short-Form Video Hooks"
      icon={<Video className="h-5 w-5" />}
      footer={
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyAll}
          className={copied === -1 ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' : ''}
        >
          {copied === -1 ? (
            <>
              <Check className="h-4 w-4 mr-1" /> All Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy All Hooks
            </>
          )}
        </Button>
      }
    >
      <div className="space-y-4">
        {content.map((hook, index) => (
          <div
            key={index}
            className="group relative rounded-xl bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                <span className="font-bold text-lg">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white">{hook.hook}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Visual:</span> {hook.visualCue}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Duration:</span> {hook.duration}
                </p>
              </div>
            </div>
            <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyOne(index)}
                className={cn('h-7 w-7', copied === index ? 'text-green-600' : 'text-slate-400 hover:text-brand-600')}
                aria-label={`Copy hook ${index + 1}`}
              >
                {copied === index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  );
}