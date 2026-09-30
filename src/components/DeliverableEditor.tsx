import React, { useState } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  Gift,
  TrendingUp,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  HardDrive,
  Copy,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import {
  DeliverableData,
  ModuleItem,
  LessonItem,
  BonusItem,
  ProofItem,
  DeliverableNiche,
  DeliverableType,
  ThemeStyle
} from '../types/deliverable';

interface DeliverableEditorProps {
  data: DeliverableData;
  onChange: (updated: DeliverableData) => void;
  onOpenDrivePicker: (slotLabel: string, callback: (url: string, driveId: string) => void) => void;
  isDriveConnected: boolean;
  onConnectDrive: () => void;
}

export const DeliverableEditor: React.FC<DeliverableEditorProps> = ({
  data,
  onChange,
  onOpenDrivePicker,
  isDriveConnected,
  onConnectDrive,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'visuals' | 'modules' | 'bonuses' | 'upsell' | 'support'>('info');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(data.modules[0]?.id || null);

  const updateField = <K extends keyof DeliverableData>(field: K, value: DeliverableData[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Module helpers
  const handleAddModule = () => {
    const newMod: ModuleItem = {
      id: `mod-${Date.now()}`,
      title: `Novo Módulo ${data.modules.length + 1}`,
      badge: 'Fase ' + (data.modules.length + 1),
      description: 'Descrição do que o aluno irá conquistar nesta etapa.',
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: 'Primeiro Passo & Orientações Práticas',
          duration: '10 min',
          summary: 'Resumo das instruções diretas.',
          contentMarkdown: 'Descreva aqui o conteúdo prático, o método e as instruções de execução.',
          checklist: ['Passo 1 concluído', 'Passo 2 concluído'],
        },
      ],
    };
    updateField('modules', [...data.modules, newMod]);
    setExpandedModuleId(newMod.id);
  };

  const handleRemoveModule = (modId: string) => {
    updateField('modules', data.modules.filter((m) => m.id !== modId));
  };

  const handleUpdateModule = (modId: string, updated: Partial<ModuleItem>) => {
    updateField(
      'modules',
      data.modules.map((m) => (m.id === modId ? { ...m, ...updated } : m))
    );
  };

  // Lesson helpers
  const handleAddLesson = (modId: string) => {
    const target = data.modules.find((m) => m.id === modId);
    if (!target) return;
    const newLesson: LessonItem = {
      id: `les-${Date.now()}`,
      title: `Aula ${target.lessons.length + 1}: Nova Etapa de Execução`,
      duration: '08 min',
      summary: 'Resumo prático com foco em ação imediata.',
      contentMarkdown: 'Conteúdo detalhado com os segredos de execução.',
      checklist: ['Executar instrução'],
    };
    handleUpdateModule(modId, { lessons: [...target.lessons, newLesson] });
  };

  const handleUpdateLesson = (modId: string, lesId: string, updated: Partial<LessonItem>) => {
    const target = data.modules.find((m) => m.id === modId);
    if (!target) return;
    handleUpdateModule(modId, {
      lessons: target.lessons.map((l) => (l.id === lesId ? { ...l, ...updated } : l)),
    });
  };

  const handleRemoveLesson = (modId: string, lesId: string) => {
    const target = data.modules.find((m) => m.id === modId);
    if (!target) return;
    handleUpdateModule(modId, {
      lessons: target.lessons.filter((l) => l.id !== lesId),
    });
  };

  // Proof helpers
  const handleAddProof = () => {
    const newProof: ProofItem = {
      id: `proof-${Date.now()}`,
      title: 'Novo Depoimento / Resultado',
      caption: 'Descrição do resultado alcançado com o produto',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      metric: 'Resultado Real',
    };
    updateField('proofs', [...data.proofs, newProof]);
  };

  const handleRemoveProof = (id: string) => {
    updateField('proofs', data.proofs.filter((p) => p.id !== id));
  };

  // Bonus helpers
  const handleAddBonus = () => {
    const newBonus: BonusItem = {
      id: `bonus-${Date.now()}`,
      title: `Super Bônus #${data.bonuses.length + 1}`,
      tag: `BÔNUS EXCLUSIVO #${data.bonuses.length + 1}`,
      description: 'Material complementar de alto valor percebido para acelerar resultados.',
      coverImageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80',
    };
    updateField('bonuses', [...data.bonuses, newBonus]);
  };

  const handleRemoveBonus = (id: string) => {
    updateField('bonuses', data.bonuses.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-neutral-100">
      {/* Sub-header Tabs */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-800 bg-neutral-900/60 overflow-x-auto">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'info'
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Estrutura & Oferta</span>
        </button>

        <button
          onClick={() => setActiveTab('visuals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'visuals'
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Fotos do Drive & Visual</span>
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'modules'
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Módulos & Aulas ({data.modules.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bonuses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'bonuses'
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Bônus & Entregas ({data.bonuses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upsell')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'upsell'
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Oferta de Acelerador (Upsell)</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'support'
              ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Suporte & Certificado</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full space-y-6">

        {/* TAB 1: INFO & OFERTA */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Direct response tip card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-300">
                  Fundamento de Direct Response: O Mecanismo Único
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  O entregável deve reforçar imediatamente a &quot;Big Idea&quot; e a promessa da sua VSL. Quando o cliente faz o login nos primeiros 5 minutos, ele precisa sentir que recebeu 10x mais valor do que pagou para blindar a taxa de reembolso e gerar depoimentos espontâneos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Nome do Produto / Entregável
                  </label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Ex: Protocolo Reset Metabólico 21D"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Subheadline / Promessa Central
                  </label>
                  <textarea
                    rows={3}
                    value={data.tagline}
                    onChange={(e) => updateField('tagline', e.target.value)}
                    placeholder="Ex: O método prático para ativar o gasto calórico..."
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Mecanismo Único (Direct Response)
                  </label>
                  <input
                    type="text"
                    value={data.uniqueMechanism}
                    onChange={(e) => updateField('uniqueMechanism', e.target.value)}
                    placeholder="Ex: Ciclo Circadiano de Ativação Enzimática"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-amber-500/40 rounded-xl text-sm font-medium text-amber-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Nicho de Atuação
                  </label>
                  <select
                    value={data.niche}
                    onChange={(e) => updateField('niche', e.target.value as DeliverableNiche)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="saude_fitness">Saúde, Emagrecimento & Boa Forma</option>
                    <option value="marketing_vendas">Marketing Digital, Tráfego & Direct Response</option>
                    <option value="financas_renda">Finanças, Renda Extra & Investimentos</option>
                    <option value="relacionamento_desenvolvimento">Desenvolvimento Pessoal & Relacionamento</option>
                    <option value="personalizado">Personalizado / Outro Nicho</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Formato do Entregável
                  </label>
                  <select
                    value={data.productType}
                    onChange={(e) => updateField('productType', e.target.value as DeliverableType)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="protocolo_desafio">Protocolo Passo a Passo / Desafio Diário</option>
                    <option value="area_membros">Portal de Membros Completo (Módulos & Vídeos)</option>
                    <option value="guia_interativo">Guia Interativo / Manual Prático Web</option>
                    <option value="swipe_file_copys">Swipe File / Cofre de Copys & Scripts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Tema Visual
                  </label>
                  <select
                    value={data.theme}
                    onChange={(e) => updateField('theme', e.target.value as ThemeStyle)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="emerald_luxury">Emerald Gold (Alta Conversão Saúde & Longevidade)</option>
                    <option value="gold_dark">Obsidian Gold (Direct Response & Tráfego Milionário)</option>
                    <option value="crimson_dark">Cyber Crimson (Urgência & Desafio Intenso)</option>
                    <option value="royal_blue">Royal Sapphire (Institucional & Finanças)</option>
                    <option value="clean_dark">Dark Minimalist (Clean Moderno)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Selo / Badge de Acesso
                  </label>
                  <input
                    type="text"
                    value={data.badgeText}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="Ex: ÁREA DO MEMBRO VIP • ACESSO VITALÍCIO"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Author / Expert Info */}
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Especialista / Autor do Produto
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    onOpenDrivePicker('Foto de Perfil do Especialista', (url, driveId) => {
                      updateField('author', { ...data.author, avatarUrl: url, driveFileId: driveId });
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 rounded-xl transition cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Pegar Foto do Drive</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Nome do Especialista</label>
                  <input
                    type="text"
                    value={data.author.name}
                    onChange={(e) => updateField('author', { ...data.author, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Cargo / Especialidade</label>
                  <input
                    type="text"
                    value={data.author.role}
                    onChange={(e) => updateField('author', { ...data.author, role: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Bio / Autoridade</label>
                  <input
                    type="text"
                    value={data.author.bio}
                    onChange={(e) => updateField('author', { ...data.author, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOTOS DO GOOGLE DRIVE & VISUAIS */}
        {activeTab === 'visuals' && (
          <div className="space-y-6">
            {/* Google Drive Status Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-2xl gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Conexão com Google Drive
                    {isDriveConnected ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Conectado
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                        Desconectado
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Você pode selecionar qualquer imagem, mockups 3D, prints de resultados e fotos do seu Drive.
                  </p>
                </div>
              </div>

              {!isDriveConnected && (
                <button
                  type="button"
                  onClick={onConnectDrive}
                  className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  Conectar ao Drive
                </button>
              )}
            </div>

            {/* Slots de Fotos Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Capa Principal / 3D Mockup */}
              <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Capa do Produto (Mockup 3D / Box)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenDrivePicker('Capa Principal do Entregável', (url, driveId) => {
                          onChange({ ...data, coverImageUrl: url, coverDriveFileId: driveId });
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl transition cursor-pointer shadow-sm"
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Buscar no Drive</span>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Essa imagem é o destaque principal da área do aluno e no cabeçalho do entregável.
                  </p>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                  {data.coverImageUrl ? (
                    <img
                      src={data.coverImageUrl}
                      alt="Capa do Entregável"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <ImageIcon className="w-10 h-10 text-neutral-700 mx-auto mb-2" />
                      <p className="text-xs text-neutral-500">Nenhuma capa selecionada</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Superior */}
              <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Banner de Fundo / Header Hero
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenDrivePicker('Banner de Topo', (url, driveId) => {
                          onChange({ ...data, bannerImageUrl: url, bannerDriveFileId: driveId });
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl transition cursor-pointer shadow-sm"
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Buscar no Drive</span>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Banner panorâmico estilizado que serve de fundo e ambientação do produto.
                  </p>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                  {data.bannerImageUrl ? (
                    <img
                      src={data.bannerImageUrl}
                      alt="Banner Hero"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <ImageIcon className="w-10 h-10 text-neutral-700 mx-auto mb-2" />
                      <p className="text-xs text-neutral-500">Nenhum banner selecionado</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Galeria de Prova Social (Prints de Faturamento / Antes e Depois do Drive) */}
            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Prints de Resultados & Prova Social ({data.proofs.length})
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Depoimentos, gráficos e fotos de &quot;Antes e Depois&quot; importados do Drive para manter a motivação do aluno nas alturas.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenDrivePicker('Print de Prova Social', (url, driveId) => {
                        const newProof: ProofItem = {
                          id: `proof-${Date.now()}`,
                          title: 'Resultado Comprovado',
                          caption: 'Print do resultado alcançado com o método',
                          imageUrl: url,
                          driveFileId: driveId,
                          metric: 'Caso Real',
                        };
                        updateField('proofs', [...data.proofs, newProof]);
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl transition cursor-pointer"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Importar do Drive</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddProof}
                    className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-xl transition"
                    title="Adicionar item avulso"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {data.proofs.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
                  Nenhuma imagem de prova social adicionada ainda. Clique em &quot;Importar do Drive&quot;.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.proofs.map((proof, idx) => (
                    <div
                      key={proof.id}
                      className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col gap-2 relative group"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900">
                        <img
                          src={proof.imageUrl}
                          alt={proof.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveProof(proof.id)}
                          className="absolute top-2 right-2 p-1 bg-red-600/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={proof.title}
                          onChange={(e) => {
                            const updated = [...data.proofs];
                            updated[idx].title = e.target.value;
                            updateField('proofs', updated);
                          }}
                          placeholder="Título do Resultado"
                          className="w-full px-2 py-1 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          value={proof.metric || ''}
                          onChange={(e) => {
                            const updated = [...data.proofs];
                            updated[idx].metric = e.target.value;
                            updateField('proofs', updated);
                          }}
                          placeholder="Métrica (ex: -12kg, +R$ 35k)"
                          className="w-full px-2 py-1 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-amber-400 font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MÓDULOS & AULAS */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Conteúdo do Entregável</h3>
                <p className="text-xs text-neutral-400">
                  Estruture os módulos, aulas práticas, checklists interativos e scripts de alta conversão.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddModule}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Módulo</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.modules.map((mod, modIdx) => {
                const isExpanded = expandedModuleId === mod.id;

                return (
                  <div
                    key={mod.id}
                    className="border border-neutral-800 rounded-2xl bg-neutral-900/40 overflow-hidden"
                  >
                    {/* Module Title Bar */}
                    <div className="p-4 bg-neutral-900/90 flex items-center justify-between border-b border-neutral-800/80">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/20">
                          {modIdx + 1}
                        </span>
                        <div className="flex-1 max-w-md">
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => handleUpdateModule(mod.id, { title: e.target.value })}
                            className="font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-amber-500 focus:outline-none w-full"
                          />
                        </div>
                        <input
                          type="text"
                          value={mod.badge || ''}
                          onChange={(e) => handleUpdateModule(mod.id, { badge: e.target.value })}
                          placeholder="Selo (ex: Fase 1)"
                          className="text-[11px] text-amber-400 bg-amber-500/5 border border-amber-500/20 rounded-lg px-2 py-0.5 max-w-[120px]"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onOpenDrivePicker(`Capa do Módulo ${modIdx + 1}`, (url, driveId) => {
                              handleUpdateModule(mod.id, { coverImageUrl: url, driveFileId: driveId });
                            })
                          }
                          title="Foto do Drive para este módulo"
                          className="p-1.5 text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 rounded-lg transition"
                        >
                          <HardDrive className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(mod.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Module Content */}
                    {isExpanded && (
                      <div className="p-6 space-y-6">
                        <div>
                          <label className="block text-xs text-neutral-400 mb-1">
                            Descrição resumida do módulo
                          </label>
                          <input
                            type="text"
                            value={mod.description}
                            onChange={(e) => handleUpdateModule(mod.id, { description: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200"
                          />
                        </div>

                        {/* Lessons List */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                              Aulas / Passos ({mod.lessons.length})
                            </h5>
                            <button
                              type="button"
                              onClick={() => handleAddLesson(mod.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar Aula / Passo</span>
                            </button>
                          </div>

                          {mod.lessons.map((les, lesIdx) => (
                            <div
                              key={les.id}
                              className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 flex-1">
                                  <span className="text-xs text-neutral-500 font-mono">
                                    {modIdx + 1}.{lesIdx + 1}
                                  </span>
                                  <input
                                    type="text"
                                    value={les.title}
                                    onChange={(e) =>
                                      handleUpdateLesson(mod.id, les.id, { title: e.target.value })
                                    }
                                    className="font-semibold text-sm text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-amber-500 w-full"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={les.duration || ''}
                                    onChange={(e) =>
                                      handleUpdateLesson(mod.id, les.id, { duration: e.target.value })
                                    }
                                    placeholder="Duração (ex: 10 min)"
                                    className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 w-24 text-center"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLesson(mod.id, les.id)}
                                    className="p-1 text-neutral-600 hover:text-red-400"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] text-neutral-500 mb-1">
                                  Conteúdo em Texto / Instruções Práticas
                                </label>
                                <textarea
                                  rows={4}
                                  value={les.contentMarkdown}
                                  onChange={(e) =>
                                    handleUpdateLesson(mod.id, les.id, { contentMarkdown: e.target.value })
                                  }
                                  className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 font-mono leading-relaxed"
                                />
                              </div>

                              {/* Checklist Items */}
                              <div>
                                <label className="block text-[11px] text-neutral-500 mb-1">
                                  Checklist de Ação do Aluno (um por linha)
                                </label>
                                <textarea
                                  rows={2}
                                  value={(les.checklist || []).join('\n')}
                                  onChange={(e) =>
                                    handleUpdateLesson(mod.id, les.id, {
                                      checklist: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                                    })
                                  }
                                  placeholder="Digite cada tarefa da aula em uma linha..."
                                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-300"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: BÔNUS & ENTREGAS */}
        {activeTab === 'bonuses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Bônus & Entregáveis Complementares</h3>
                <p className="text-xs text-neutral-400">
                  Os bônus agregam alto valor percebido e eliminam o arrependimento de compra.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddBonus}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Bônus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.bonuses.map((bonus, bIdx) => (
                <div
                  key={bonus.id}
                  className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={bonus.tag}
                        onChange={(e) => {
                          const updated = [...data.bonuses];
                          updated[bIdx].tag = e.target.value;
                          updateField('bonuses', updated);
                        }}
                        className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1 w-fit"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBonus(bonus.id)}
                        className="p-1 text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={bonus.title}
                      onChange={(e) => {
                        const updated = [...data.bonuses];
                        updated[bIdx].title = e.target.value;
                        updateField('bonuses', updated);
                      }}
                      className="font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-amber-500 w-full"
                    />

                    <textarea
                      rows={2}
                      value={bonus.description}
                      onChange={(e) => {
                        const updated = [...data.bonuses];
                        updated[bIdx].description = e.target.value;
                        updateField('bonuses', updated);
                      }}
                      className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                    <div className="flex items-center gap-2">
                      {bonus.coverImageUrl && (
                        <img
                          src={bonus.coverImageUrl}
                          alt={bonus.title}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      )}
                      <span className="text-[11px] text-neutral-500">Capa do Bônus</span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenDrivePicker(`Capa do Bônus: ${bonus.title}`, (url, driveId) => {
                          const updated = [...data.bonuses];
                          updated[bIdx].coverImageUrl = url;
                          updated[bIdx].driveFileId = driveId;
                          updateField('bonuses', updated);
                        })
                      }
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition"
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Drive</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: UPSELL / ACELERADOR */}
        {activeTab === 'upsell' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <p className="font-bold mb-1">Mecanismo de Back-End em Direct Response</p>
              <p className="text-neutral-300">
                Uma das maiores fontes de lucro em Direct Response é o Upsell imediato na área do entregável (Order Bump pós-compra ou Acelerador VIP). Alunos com alto engajamento compram o próximo nível aqui.
              </p>
            </div>

            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.upsell.enabled}
                    onChange={(e) =>
                      updateField('upsell', { ...data.upsell, enabled: e.target.checked })
                    }
                    className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-900"
                  />
                  <span>Ativar Banner de Acelerador VIP (Upsell) na Área de Membros</span>
                </label>
              </div>

              {data.upsell.enabled && (
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Badge de Destaque</label>
                      <input
                        type="text"
                        value={data.upsell.badge}
                        onChange={(e) =>
                          updateField('upsell', { ...data.upsell, badge: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-amber-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Chamada do Botão (CTA)</label>
                      <input
                        type="text"
                        value={data.upsell.ctaText}
                        onChange={(e) =>
                          updateField('upsell', { ...data.upsell, ctaText: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Headline do Upsell</label>
                    <input
                      type="text"
                      value={data.upsell.headline}
                      onChange={(e) =>
                        updateField('upsell', { ...data.upsell, headline: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Subheadline Explicativa</label>
                    <textarea
                      rows={2}
                      value={data.upsell.subheadline}
                      onChange={(e) =>
                        updateField('upsell', { ...data.upsell, subheadline: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Preço Normal (Ancoragem)</label>
                      <input
                        type="text"
                        value={data.upsell.regularPrice}
                        onChange={(e) =>
                          updateField('upsell', { ...data.upsell, regularPrice: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-400 line-through"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Preço Especial para Membro</label>
                      <input
                        type="text"
                        value={data.upsell.offerPrice}
                        onChange={(e) =>
                          updateField('upsell', { ...data.upsell, offerPrice: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Benefícios inclusos (um por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={data.upsell.benefits.join('\n')}
                      onChange={(e) =>
                        updateField('upsell', {
                          ...data.upsell,
                          benefits: e.target.value.split('\n').filter((b) => b.trim().length > 0),
                        })
                      }
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: SUPORTE & CERTIFICADO */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-white">Canais de Suporte & Comunidade VIP</h4>
              <p className="text-xs text-neutral-400">
                Alunos com suporte rápido têm 70% menos propensão a solicitar chargeback ou cancelamento.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">WhatsApp de Suporte (com DDI)</label>
                  <input
                    type="text"
                    value={data.support.whatsappNumber || ''}
                    onChange={(e) =>
                      updateField('support', { ...data.support, whatsappNumber: e.target.value })
                    }
                    placeholder="Ex: 5511999999999"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Email de Atendimento</label>
                  <input
                    type="email"
                    value={data.support.supportEmail || ''}
                    onChange={(e) =>
                      updateField('support', { ...data.support, supportEmail: e.target.value })
                    }
                    placeholder="suporte@seunegocio.com"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Nome da Comunidade Exclusiva</label>
                <input
                  type="text"
                  value={data.support.communityName || ''}
                  onChange={(e) =>
                    updateField('support', { ...data.support, communityName: e.target.value })
                  }
                  placeholder="Comunidade VIP de Membros"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.certificate.enabled}
                    onChange={(e) =>
                      updateField('certificate', { ...data.certificate, enabled: e.target.checked })
                    }
                    className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-900"
                  />
                  <span>Habilitar Emissão de Certificado de Conclusão ao Aluno</span>
                </label>
              </div>

              {data.certificate.enabled && (
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Carga Horária no Certificado</label>
                  <input
                    type="text"
                    value={data.certificate.hours}
                    onChange={(e) =>
                      updateField('certificate', { ...data.certificate, hours: e.target.value })
                    }
                    placeholder="Ex: 30 Horas"
                    className="w-48 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
