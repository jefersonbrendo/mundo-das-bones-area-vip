import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  Download,
  Sparkles,
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import { PrintableKit, PortalConfig, KitCategory } from '../types/kits';
import { formatShareableImageUrl } from '../utils/driveUrlHelper';

interface CustomerPortalViewProps {
  kits: PrintableKit[];
  portalConfig: PortalConfig;
}

export const CustomerPortalView: React.FC<CustomerPortalViewProps> = ({
  kits,
  portalConfig,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<KitCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (kitId: string) => {
    setFavorites((prev) => ({ ...prev, [kitId]: !prev[kitId] }));
  };

  // Filtered kits
  const filteredKits = useMemo(() => {
    return kits.filter((kit) => {
      if (selectedCategory !== 'todos' && kit.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = kit.title.toLowerCase().includes(q);
        const matchesDesc = kit.description.toLowerCase().includes(q);
        const matchesCat = kit.categoryLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }
      if (showOnlyFavorites && !favorites[kit.id]) return false;
      return true;
    });
  }, [kits, selectedCategory, searchQuery, showOnlyFavorites, favorites]);

  // Categories matching user's Drive folders
  const categories: Array<{ id: KitCategory; label: string; icon: string }> = [
    { id: 'todos', label: 'TODOS', icon: '💖' },
    { id: 'bonequinhas', label: 'BONEQUINHAS', icon: '🎀' },
    { id: 'barbies', label: 'BARBIES', icon: '✨' },
    { id: 'princesas', label: 'PRINCESAS', icon: '👑' },
    { id: 'pets', label: 'PETS', icon: '🐾' },
    { id: 'acessorios', label: 'ACESSÓRIOS', icon: '👜' },
    { id: 'bonecas_prontas', label: 'BONECAS PRONTAS', icon: '👗' },
    { id: 'realistas', label: 'REALISTAS', icon: '⭐' },
    { id: 'guia', label: 'GUIA', icon: '📖' },
  ];

  const totalPagesCount = kits.reduce((acc, k) => acc + (k.pageCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f8] via-[#fff0f5] to-[#fdf4f8] text-neutral-800 flex flex-col font-sans selection:bg-pink-300 selection:text-pink-900">
      
      {/* Top Banner: Delicate pastel pink bar */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white px-4 py-2 text-xs font-medium shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 max-w-xl truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-extrabold tracking-wide">✨ Cantinho Encantado:</span>
          <span className="truncate opacity-95">{portalConfig.welcomeMessage}</span>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shadow-sm ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30 scale-105'
                      : 'bg-white text-pink-900/80 hover:bg-pink-50 border border-pink-200/80 hover:border-pink-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Favorites Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar kit, princesa, pet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-pink-200 rounded-2xl text-pink-950 placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition"
              />
            </div>

            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`p-2.5 rounded-2xl text-xs border transition cursor-pointer shadow-sm ${
                showOnlyFavorites
                  ? 'bg-rose-500 border-rose-600 text-white font-bold'
                  : 'bg-white border-pink-200 text-pink-500 hover:bg-pink-50'
              }`}
              title="Filtrar por Favoritos"
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-white' : ''}`} />
            </button>

          </div>

        </div>
      </div>

      {/* Main Kits Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
        
        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between text-xs text-pink-900/60 font-semibold">
          <span>Mostrando {filteredKits.length} kits prontinhos para recortar e brincar</span>
          {(showOnlyFavorites || searchQuery || selectedCategory !== 'todos') && (
            <button
              onClick={() => {
                setShowOnlyFavorites(false);
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="text-pink-600 hover:underline font-bold"
            >
              Limpar filtros ✨
            </button>
          )}
        </div>

        {filteredKits.length === 0 ? (
          <div className="py-20 text-center text-pink-900/60 bg-white/80 rounded-3xl border border-pink-200 shadow-sm p-8">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-pink-400 opacity-60" />
            <p className="text-lg font-black text-pink-950">Nenhum kit encontrado com esse filtro</p>
            <p className="text-xs text-pink-700/70 mt-1">
              Tente pesquisar outro nome fofo ou clique em &quot;Todos os Kits&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredKits.map((kit) => {
              const isFav = !!favorites[kit.id];

              return (
                <div
                  key={kit.id}
                  className="group relative rounded-3xl bg-white border border-pink-200/90 hover:border-pink-300 hover:shadow-2xl hover:shadow-pink-200/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Cover Photo with Cute Rounded Corners & Shadows */}
                    <div className="relative aspect-[3/4] w-full bg-pink-50 overflow-hidden">
                      <img
                        src={formatShareableImageUrl(kit.coverImageUrl)}
                        alt={kit.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {kit.isNew && (
                          <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-[10px] rounded-full shadow-md">
                            ✨ NOVIDADE
                          </span>
                        )}
                        {kit.isPopular && !kit.isNew && (
                          <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-[10px] rounded-full shadow-md">
                            💖 MAIS AMADO
                          </span>
                        )}
                        {kit.isVipBonus && (
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-[10px] rounded-full shadow-md">
                            👑 BÔNUS VIP
                          </span>
                        )}
                      </div>

                      {/* Top Right Heart Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(kit.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md cursor-pointer ${
                          isFav
                            ? 'bg-rose-500 text-white scale-110'
                            : 'bg-white/80 text-pink-400 hover:text-rose-500 hover:bg-white'
                        }`}
                        title="Favoritar este Kit"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-pink-600 bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-100">
                          {kit.categoryLabel}
                        </span>
                        <span className="text-pink-700/80 font-black">
                          {kit.pageCount} {kit.pageCount === 1 ? 'Arquivo' : 'Arquivos'}
                        </span>
                      </div>

                      <h3
                        className="text-base font-black text-pink-950 group-hover:text-pink-600 transition line-clamp-2 leading-tight"
                        title={kit.title}
                      >
                        {kit.title}
                      </h3>

                      <p className="text-xs text-pink-900/70 line-clamp-2 leading-relaxed">
                        {kit.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 pt-1">
                    <a
                      href={kit.pdfDownloadUrl || kit.coverImageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs shadow-md shadow-pink-500/25 hover:shadow-lg transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Abrir no Google Drive</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-pink-100 bg-white py-8 px-6 text-xs text-pink-900/60 font-medium mt-12 text-center">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} {portalConfig.portalName} • Feito com amor para a imaginação infantil 💖</p>
        </div>
      </footer>

    </div>
  );
};
