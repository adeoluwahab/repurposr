import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { Linkedin, Twitter, Mail, Video, Copy, Check, Sparkles } from 'lucide-react';
import { LinkedInCard } from './ContentCard';
import { TwitterCard } from './ContentCard';
import { NewsletterCard } from './ContentCard';
import { VideoCard } from './ContentCard';
import type { GeneratedContent, OutputPlatform } from '../types';
import { PLATFORM_LABELS, PLATFORM_ICONS } from '../types';

interface OutputTabsProps {
  content: GeneratedContent;
  activeTab: OutputPlatform;
  onTabChange: (tab: OutputPlatform) => void;
}

const tabIcons: Record<OutputPlatform, React.ReactNode> = {
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  newsletter: <Mail className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
};

export function OutputTabs({ content, activeTab, onTabChange }: OutputTabsProps) {
  const platforms: OutputPlatform[] = ['linkedin', 'twitter', 'newsletter', 'video'];

  return (
    <div className="animate-slide-up">
      <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full" role="tablist" aria-label="Content platforms">
          {platforms.map((platform) => (
            <TabsTrigger
              key={platform}
              value={platform}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm"
            >
              {tabIcons[platform]}
              <span className="hidden sm:inline">{PLATFORM_LABELS[platform]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="linkedin" className="mt-6">
          <LinkedInCard content={content.linkedin} />
        </TabsContent>

        <TabsContent value="twitter" className="mt-6">
          <TwitterCard content={content.twitter} />
        </TabsContent>

        <TabsContent value="newsletter" className="mt-6">
          <NewsletterCard content={content.newsletter} />
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <VideoCard content={content.video} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface EmptyStateProps {
  onGenerateClick?: () => void;
}

export function EmptyState({ onGenerateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/30">
        <Sparkles className="h-10 w-10 text-brand-600 dark:text-brand-400" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">No Content Generated Yet</h3>
      <p className="mb-6 max-w-md text-slate-500 dark:text-slate-400">
        Paste your content in the input section above, select a style, and hit generate to see your
        repurposed content appear here across all platforms.
      </p>
      {onGenerateClick && (
        <button
          onClick={onGenerateClick}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-base font-medium text-white hover:bg-brand-700 transition-colors"
        >
          <Sparkles className="h-5 w-5" />
          Generate Content
        </button>
      )}
    </div>
  );
}

interface SkeletonCardProps {
  variant: 'linkedin' | 'twitter' | 'newsletter' | 'video';
}

export function SkeletonCard({ variant }: SkeletonCardProps) {
  const baseClass = 'animate-shimmer rounded-lg bg-slate-200 dark:bg-slate-700';

  const skeletons = {
    linkedin: (
      <div className="space-y-4">
        <div className={cn(baseClass, 'h-12 w-3/4')} />
        <div className={cn(baseClass, 'h-32 w-full')} />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={cn(baseClass, 'h-8 w-20')} />
          ))}
        </div>
        <div className={cn(baseClass, 'h-12 w-2/3')} />
      </div>
    ),
    twitter: (
      <div className="space-y-4">
        <div className={cn(baseClass, 'h-16 w-full')} />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={cn(baseClass, 'h-14 w-full')} />
          ))}
        </div>
        <div className={cn(baseClass, 'h-14 w-full')} />
      </div>
    ),
    newsletter: (
      <div className="space-y-4">
        <div className={cn(baseClass, 'h-16 w-full')} />
        <div className={cn(baseClass, 'h-32 w-full')} />
        <div className={cn(baseClass, 'h-12 w-2/3')} />
      </div>
    ),
    video: (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn(baseClass, 'h-24 w-full')} />
        ))}
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
            <div className="h-5 w-5 animate-shimmer rounded" />
          </div>
          <div className={cn(baseClass, 'h-6 w-32')} />
        </div>
      </div>
      <div className="flex-1 p-5">{skeletons[variant]}</div>
    </div>
  );
}

export function OutputSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {(['linkedin', 'twitter', 'newsletter', 'video'] as const).map((variant) => (
        <SkeletonCard key={variant} variant={variant} />
      ))}
    </div>
  );
}