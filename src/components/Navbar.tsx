import { Menu, X, Settings, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { SettingsModal } from './SettingsModal';
import type { AIServiceConfig } from '../types';

interface NavbarProps {
  onSettingsClick: () => void;
  hasApiKey: boolean;
}

export function Navbar({ onSettingsClick, hasApiKey }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-xl text-slate-900 dark:text-white">Repurposr</span>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              AI Content Repurposer
            </span>
            <Button variant="ghost" size="sm" onClick={onSettingsClick}>
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={onSettingsClick} aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}