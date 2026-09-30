import React from 'react';
import { DEFAULT_KITS as kits, DEFAULT_PORTAL_CONFIG as portalConfig } from './data/defaultKits';
import { CustomerPortalView } from './components/CustomerPortalView';
import { Sparkles } from 'lucide-react';

// Os kits e textos do portal vêm de src/data/defaultKits.ts — edite lá e publique de novo.
export default function App() {
  return (
    <div className="min-h-screen bg-[#fff5f8] text-neutral-800 flex flex-col font-sans">

      {/* Top Main Navigation Bar */}
      <header className="h-16 border-b border-pink-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">

        {/* Branding & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-black shadow-md shadow-pink-400/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-black text-sm sm:text-base text-pink-950 tracking-tight">
              {portalConfig.portalName}
            </h1>
            <span className="hidden md:inline px-2.5 py-0.5 text-[10px] font-black bg-pink-100 text-pink-700 border border-pink-200 rounded-full">
              🎀 Clube de Bonequinhas
            </span>
          </div>
        </div>

      </header>

      {/* Main Body */}
      <main className="flex-1 flex flex-col">
        <CustomerPortalView kits={kits} portalConfig={portalConfig} />
      </main>

    </div>
  );
}
