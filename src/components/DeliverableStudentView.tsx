import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Play,
  Download,
  Copy,
  Check,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Flame,
  Search,
  ExternalLink,
  Printer
} from 'lucide-react';
import { DeliverableData } from '../types/deliverable';

interface DeliverableStudentViewProps {
  data: DeliverableData;
  onEditRequested?: () => void;
}

export const DeliverableStudentView: React.FC<DeliverableStudentViewProps> = ({
  data,
}) => {
  // Navigation state
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    data.modules[0]?.id || ''
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    data.modules[0]?.lessons[0]?.id || ''
  );

  // Student interaction state (checklist completion)
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Active module & lesson
  const currentModule = useMemo(() => {
    return data.modules.find((m) => m.id === selectedModuleId) || data.modules[0];
  }, [data.modules, selectedModuleId]);

  const currentLesson = useMemo(() => {
    if (!currentModule) return null;
    return (
      currentModule.lessons.find((l) => l.id === selectedLessonId) ||
      currentModule.lessons[0] ||
      null
    );
  }, [currentModule, selectedLessonId]);

  // Overall progress calculation
  const totalLessons = useMemo(() => {
    return data.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  }, [data.modules]);

  const completedCount = useMemo(() => {
    return Object.values(completedLessons).filter(Boolean).length;
  }, [completedLessons]);

  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const willBeDone = !prev[lessonId];
      if (willBeDone) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
        });
      }
      return {
        ...prev,
        [lessonId]: willBeDone,
      };
    });
  };

  const toggleTaskComplete = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleCopySnippet = (snippetId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(snippetId);
    setTimeout(() => setCopiedSnippetId(null), 2500);
  };

  // Certificate Modal state
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState('Membro Oficial');

  // Theme styling helpers
  const themeClasses = useMemo(() => {
    switch (data.theme) {
      case 'emerald_luxury':
        return {
          primaryBg: 'bg-emerald-950/40',
          accentText: 'text-emerald-400',
          accentBg: 'bg-emerald-500',
          accentBorder: 'border-emerald-500/30',
          gradientHero: 'from-emerald-950/90 via-neutral-950 to-neutral-950',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          buttonPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold',
        };
      case 'crimson_dark':
        return {
          primaryBg: 'bg-red-950/40',
          accentText: 'text-red-400',
          accentBg: 'bg-red-500',
          accentBorder: 'border-red-500/30',
          gradientHero: 'from-red-950/90 via-neutral-950 to-neutral-950',
          badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
          buttonPrimary: 'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold',
        };
      case 'royal_blue':
        return {
          primaryBg: 'bg-blue-950/40',
          accentText: 'text-blue-400',
          accentBg: 'bg-blue-500',
          accentBorder: 'border-blue-500/30',
          gradientHero: 'from-blue-950/90 via-neutral-950 to-neutral-950',
          badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          buttonPrimary: 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-bold',
        };
      case 'gold_dark':
      default:
        return {
          primaryBg: 'bg-amber-950/40',
          accentText: 'text-amber-400',
          accentBg: 'bg-amber-500',
          accentBorder: 'border-amber-500/30',
          gradientHero: 'from-amber-950/80 via-neutral-950 to-neutral-950',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          buttonPrimary: 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold',
        };
    }
  }, [data.theme]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30">
      
      {/* Top Notification Bar (Direct Response Urgency / Member Status) */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-xs px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-400 font-medium">
            {data.badgeText || 'ÁREA EXCLUSIVA DE MEMBROS • ACESSO VITALÍCIO'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
          <span className="hidden sm:inline">Progresso do Entregável:</span>
          <div className="w-28 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${themeClasses.accentBg} transition-all duration-500`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className={`font-bold ${themeClasses.accentText}`}>{progressPercentage}%</span>
        </div>
      </div>

      {/* Hero Showcase (Product Cover & Headline) */}
      <div className={`relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b ${themeClasses.gradientHero}`}>
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Headline & Mechanism */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className={themeClasses.accentText}>Mecanismo: {data.uniqueMechanism || 'Método Exclusivo'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {data.title}
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                {data.tagline}
              </p>

              {/* Author & Guarantee Info */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-3">
                  {data.author.avatarUrl ? (
                    <img
                      src={data.author.avatarUrl}
                      alt={data.author.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-amber-400">
                      {data.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-white">{data.author.name}</p>
                    <p className="text-[11px] text-neutral-400">{data.author.role}</p>
                  </div>
                </div>

                <div className="h-6 w-px bg-neutral-800 hidden sm:block" />

                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Conteúdo 100% Validado & Atualizado</span>
                </div>
              </div>
            </div>

            {/* Right: 3D Product Mockup / Drive Photo Cover */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group max-w-[280px] w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-900 shadow-2xl">
                  {data.coverImageUrl ? (
                    <img
                      src={data.coverImageUrl}
                      alt={data.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
                      <Sparkles className="w-10 h-10 text-amber-400 mb-2" />
                      <p className="text-xs font-bold text-white">{data.title}</p>
                      <p className="text-[10px] text-neutral-500 mt-1">Capa Oficial do Produto</p>
                    </div>
                  )}
                  <div className="p-3 bg-neutral-950/90 border-t border-neutral-800 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Entregável Oficial</span>
                    <span className="font-bold text-amber-400">Edição 2026</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Proof & Results Strip (Direct Response Social Proof) */}
      {data.proofs.length > 0 && (
        <div className="bg-neutral-950 border-b border-neutral-800/80 py-4 px-6 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex items-center gap-6 min-w-max">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 pr-4 border-r border-neutral-800">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Resultados dos Alunos</span>
            </div>

            {data.proofs.map((proof) => (
              <div
                key={proof.id}
                className="flex items-center gap-3 bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 rounded-xl text-xs hover:border-neutral-700 transition"
              >
                {proof.imageUrl && (
                  <img
                    src={proof.imageUrl}
                    alt={proof.title}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white truncate max-w-[140px]">{proof.title}</span>
                    {proof.metric && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        {proof.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-400 truncate max-w-[180px]">{proof.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Workspace: Navigation Sidebar + Active Lesson Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Modules & Steps Navigation */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar aulas ou tópicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="space-y-3">
              {data.modules.map((mod, modIdx) => {
                const isSelectedModule = selectedModuleId === mod.id;
                
                // Filter lessons based on search query
                const filteredLessons = mod.lessons.filter(
                  (l) =>
                    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    l.summary.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (searchQuery && filteredLessons.length === 0) return null;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isSelectedModule
                        ? 'border-neutral-700 bg-neutral-900/90 shadow-lg'
                        : 'border-neutral-850 bg-neutral-950 hover:border-neutral-800'
                    }`}
                  >
                    {/* Module Header */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModuleId(mod.id);
                        if (mod.lessons.length > 0) {
                          setSelectedLessonId(mod.lessons[0].id);
                        }
                      }}
                      className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-neutral-900/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-neutral-800 text-neutral-300 font-mono text-xs font-bold flex items-center justify-center">
                          {modIdx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white flex items-center gap-2">
                            {mod.title}
                          </p>
                          {mod.badge && (
                            <span className="text-[10px] text-amber-400 font-medium">
                              {mod.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-neutral-500 transition-transform ${
                          isSelectedModule ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {/* Lessons list under this module */}
                    {isSelectedModule && (
                      <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-neutral-800/60">
                        {filteredLessons.map((les) => {
                          const isCurrent = selectedLessonId === les.id;
                          const isDone = completedLessons[les.id];

                          return (
                            <button
                              key={les.id}
                              type="button"
                              onClick={() => setSelectedLessonId(les.id)}
                              className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition cursor-pointer text-xs ${
                                isCurrent
                                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold'
                                  : 'hover:bg-neutral-800/60 text-neutral-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                                )}
                                <span className="truncate">{les.title}</span>
                              </div>
                              {les.duration && (
                                <span className="text-[10px] text-neutral-500 ml-2 flex-shrink-0">
                                  {les.duration}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Card (Certificado & Bônus) */}
            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Recursos Adicionais
              </h4>

              {data.certificate.enabled && (
                <button
                  type="button"
                  onClick={() => setShowCertificate(true)}
                  className="w-full p-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl flex items-center justify-between text-xs text-neutral-200 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Emitir Certificado</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              )}
            </div>

          </div>

          {/* RIGHT: Active Lesson Interactive Player & Content */}
          <div className="lg:col-span-8 space-y-6">
            {currentLesson ? (
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
                
                {/* Lesson Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-amber-400">
                      {currentModule.title}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {currentLesson.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLessonComplete(currentLesson.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      completedLessons[currentLesson.id]
                        ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                    }`}
                  >
                    {completedLessons[currentLesson.id] ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Concluído</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-neutral-400" />
                        <span>Marcar como Concluído</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Secret / Callout Box */}
                {currentLesson.calloutBox && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-amber-300">
                        {currentLesson.calloutBox.title}
                      </p>
                      <p className="text-neutral-300 leading-relaxed">
                        {currentLesson.calloutBox.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary */}
                {currentLesson.summary && (
                  <div className="p-3.5 bg-neutral-950/70 border border-neutral-850 rounded-xl text-xs text-neutral-300 leading-relaxed">
                    <span className="font-bold text-white mr-1.5">Resumo Rápido:</span>
                    {currentLesson.summary}
                  </div>
                )}

                {/* Lesson Main Content (Markdown formatted body) */}
                <div className="prose prose-invert max-w-none text-neutral-200 text-sm leading-relaxed whitespace-pre-line font-sans space-y-3">
                  {currentLesson.contentMarkdown}
                </div>

                {/* Interactive Action Checklist */}
                {currentLesson.checklist && currentLesson.checklist.length > 0 && (
                  <div className="p-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Checklist Prático de Ação
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Marque as etapas conforme você executa para registrar o seu progresso:
                    </p>

                    <div className="space-y-2 pt-1">
                      {currentLesson.checklist.map((task, tIdx) => {
                        const taskId = `${currentLesson.id}-task-${tIdx}`;
                        const isDone = completedTasks[taskId];

                        return (
                          <label
                            key={taskId}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer text-xs ${
                              isDone
                                ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-200 line-through'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-neutral-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!isDone}
                              onChange={() => toggleTaskComplete(taskId)}
                              className="mt-0.5 rounded border-neutral-700 text-emerald-500 focus:ring-emerald-500 bg-neutral-950"
                            />
                            <span className="leading-relaxed flex-1">{task}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Copy Snippets / Scripts (Direct Response Copy Box) */}
                {currentLesson.copySnippets && currentLesson.copySnippets.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Copy className="w-4 h-4 text-amber-400" /> Scripts & Copys para Copiar e Colar
                    </h4>

                    {currentLesson.copySnippets.map((snippet) => (
                      <div
                        key={snippet.id}
                        className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{snippet.title}</span>
                          {snippet.tag && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {snippet.tag}
                            </span>
                          )}
                        </div>

                        <div className="p-3 bg-neutral-900 rounded-xl font-mono text-xs text-neutral-200 border border-neutral-850">
                          {snippet.content}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopySnippet(snippet.id, snippet.content)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          {copiedSnippetId === snippet.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copiado para a área de transferência!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Script</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 text-center text-neutral-500 bg-neutral-900/40 rounded-3xl border border-neutral-800">
                Selecione uma aula no menu lateral para começar.
              </div>
            )}

            {/* Bônus Exclusivos Section */}
            {data.bonuses.length > 0 && (
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Seus Bônus Exclusivos Inclusos
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Materiais complementares liberados gratuitamente junto com a sua inscrição.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.bonuses.map((bonus) => (
                    <div
                      key={bonus.id}
                      className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex gap-4 items-center group hover:border-neutral-700 transition"
                    >
                      {bonus.coverImageUrl && (
                        <img
                          src={bonus.coverImageUrl}
                          alt={bonus.title}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-amber-400 uppercase">
                          {bonus.tag}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">
                          {bonus.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">
                          {bonus.description}
                        </p>
                        <button
                          type="button"
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300"
                        >
                          <Download className="w-3 h-3" />
                          <span>Baixar Material</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Response Upsell Box (Acelerador VIP) */}
            {data.upsell.enabled && (
              <div className="relative overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/60 via-neutral-950 to-neutral-950 p-6 sm:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-amber-500 text-neutral-950 font-black text-[10px] uppercase tracking-wider rounded-bl-2xl">
                  {data.upsell.badge}
                </div>

                <div className="max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    <span>Aceleração de Resultados</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {data.upsell.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {data.upsell.subheadline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {data.upsell.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-neutral-200">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-xs text-neutral-500 line-through block">
                        De {data.upsell.regularPrice}
                      </span>
                      <span className="text-lg font-black text-emerald-400">
                        Por apenas {data.upsell.offerPrice}
                      </span>
                    </div>

                    <a
                      href={data.upsell.ctaLink || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-black rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition flex items-center gap-2"
                    >
                      <span>{data.upsell.ctaText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Footer Support */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-6 px-6 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {data.title} • Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-4">
            {data.support.whatsappNumber && (
              <a
                href={`https://wa.me/${data.support.whatsappNumber}?text=${encodeURIComponent(
                  data.support.whatsappMessage || 'Olá, preciso de suporte no produto.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp de Suporte</span>
              </a>
            )}
            {data.support.supportEmail && (
              <a
                href={`mailto:${data.support.supportEmail}`}
                className="hover:text-white"
              >
                {data.support.supportEmail}
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black">Certificado Oficial de Conclusão</h3>
              <p className="text-xs text-neutral-400">
                Parabéns pelo comprometimento em concluir todos os módulos do entregável!
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <label className="block text-xs text-neutral-400 mb-1 text-left">
                Seu Nome Completo para o Certificado:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-semibold text-center text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Printable Preview Card */}
            <div className="p-8 border-4 border-double border-amber-500/40 rounded-2xl bg-gradient-to-b from-neutral-950 to-neutral-900 space-y-4">
              <p className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
                CERTIFICADO DE EXCELÊNCIA & DOMÍNIO
              </p>
              <h4 className="text-2xl font-serif italic text-white">{studentName}</h4>
              <p className="text-xs text-neutral-300 max-w-md mx-auto">
                Concluiu com aproveitamento integral o programa <strong>{data.title}</strong>, dominando o mecanismo <em>{data.uniqueMechanism}</em>.
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-800 text-[11px] text-neutral-400">
                <span>Carga Horária: {data.certificate.hours || '30 Horas'}</span>
                <span>Instrutor: {data.author.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar em PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
