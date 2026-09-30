import { DeliverableData } from '../types/deliverable';

export function generateStandaloneDeliverableHtml(data: DeliverableData): string {
  const jsonData = JSON.stringify(data).replace(/<\/script>/g, '<\\/script>');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} - Área do Membro</title>
  <meta name="description" content="${data.tagline}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #09090b; color: #f4f4f5; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #18181b; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 9999px; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  
  <!-- Top Bar -->
  <div class="bg-neutral-900 border-b border-neutral-800 text-xs px-4 py-2 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-neutral-400 font-medium">${data.badgeText || 'ÁREA EXCLUSIVA DE MEMBROS'}</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-neutral-400 text-xs">Progresso:</span>
      <div class="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div id="progress-bar" class="h-full bg-amber-500 transition-all duration-300" style="width: 0%"></div>
      </div>
      <span id="progress-text" class="text-amber-400 font-bold text-xs">0%</span>
    </div>
  </div>

  <!-- Hero Header -->
  <header class="relative border-b border-neutral-800 bg-gradient-to-b from-amber-950/40 via-neutral-950 to-neutral-950 py-10 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div class="md:col-span-8 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span>Mecanismo: ${data.uniqueMechanism || 'Método Exclusivo'}</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">${data.title}</h1>
        <p class="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">${data.tagline}</p>
        <div class="flex items-center gap-3 pt-2">
          ${
            data.author.avatarUrl
              ? `<img src="${data.author.avatarUrl}" alt="${data.author.name}" class="w-10 h-10 rounded-full object-cover border-2 border-amber-500/40">`
              : `<div class="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-amber-400">${data.author.name.charAt(0)}</div>`
          }
          <div>
            <p class="text-xs font-bold text-white">${data.author.name}</p>
            <p class="text-[11px] text-neutral-400">${data.author.role}</p>
          </div>
        </div>
      </div>
      <div class="md:col-span-4 flex justify-center">
        ${
          data.coverImageUrl
            ? `<img src="${data.coverImageUrl}" alt="Capa" class="w-full max-w-[260px] aspect-[4/3] object-cover rounded-2xl border border-neutral-700 shadow-2xl">`
            : ''
        }
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar -->
      <aside class="lg:col-span-4 space-y-4">
        <div id="modules-list" class="space-y-3"></div>
      </aside>

      <!-- Content Area -->
      <section class="lg:col-span-8 space-y-6">
        <div id="lesson-card" class="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <!-- Active lesson injected here -->
        </div>

        <!-- Upsell Banner -->
        ${
          data.upsell && data.upsell.enabled
            ? `
          <div class="rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/60 to-neutral-950 p-6 sm:p-8 space-y-4">
            <span class="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-amber-500 text-neutral-950 rounded-full font-bold">
              ${data.upsell.badge}
            </span>
            <h3 class="text-xl sm:text-2xl font-black text-white">${data.upsell.headline}</h3>
            <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${data.upsell.subheadline}</p>
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <div>
                <span class="text-xs text-neutral-500 line-through block">De ${data.upsell.regularPrice}</span>
                <span class="text-lg font-black text-emerald-400">Por ${data.upsell.offerPrice}</span>
              </div>
              <a href="${data.upsell.ctaLink || '#'}" target="_blank" class="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-xs sm:text-sm transition">
                ${data.upsell.ctaText}
              </a>
            </div>
          </div>
          `
            : ''
        }
      </section>
    </div>
  </main>

  <footer class="border-t border-neutral-800 bg-neutral-950 py-6 text-center text-xs text-neutral-500">
    <p>© ${new Date().getFullYear()} ${data.title} • Todos os direitos reservados.</p>
  </footer>

  <script>
    const appData = ${jsonData};
    let activeModuleId = appData.modules[0]?.id || '';
    let activeLessonId = appData.modules[0]?.lessons[0]?.id || '';
    let completedLessons = {};
    let completedTasks = {};

    function renderModules() {
      const container = document.getElementById('modules-list');
      container.innerHTML = appData.modules.map((m, mIdx) => {
        const isSelected = m.id === activeModuleId;
        return \`
          <div class="border border-neutral-800 rounded-2xl bg-neutral-900/60 overflow-hidden">
            <button onclick="selectModule('\${m.id}')" class="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-800/40 transition">
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-bold flex items-center justify-center font-mono">\${mIdx + 1}</span>
                <div>
                  <p class="text-xs font-bold text-white">\${m.title}</p>
                  \${m.badge ? \`<span class="text-[10px] text-amber-400 font-medium">\${m.badge}</span>\` : ''}
                </div>
              </div>
            </button>
            \${isSelected ? \`
              <div class="px-3 pb-3 space-y-1 border-t border-neutral-800/50 pt-2">
                \${m.lessons.map(l => {
                  const isCurrent = l.id === activeLessonId;
                  const isDone = completedLessons[l.id];
                  return \`
                    <button onclick="selectLesson('\${l.id}')" class="w-full p-2.5 rounded-xl flex items-center justify-between text-xs text-left transition \${isCurrent ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold' : 'text-neutral-300 hover:bg-neutral-800/60'}">
                      <span class="truncate">\${isDone ? '✓ ' : '○ '}\${l.title}</span>
                      \${l.duration ? \`<span class="text-[10px] text-neutral-500 ml-2">\${l.duration}</span>\` : ''}
                    </button>
                  \`;
                }).join('')}
              </div>
            \` : ''}
          </div>
        \`;
      }).join('');
    }

    function renderLesson() {
      const currentMod = appData.modules.find(m => m.id === activeModuleId) || appData.modules[0];
      const lesson = currentMod?.lessons.find(l => l.id === activeLessonId) || currentMod?.lessons[0];
      if (!lesson) return;

      const isDone = completedLessons[lesson.id];
      const card = document.getElementById('lesson-card');
      card.innerHTML = \`
        <div class="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <span class="text-xs font-semibold text-amber-400">\${currentMod.title}</span>
            <h2 class="text-xl sm:text-2xl font-black text-white mt-1">\${lesson.title}</h2>
          </div>
          <button onclick="toggleLessonDone('\${lesson.id}')" class="px-4 py-2 rounded-xl text-xs font-bold transition \${isDone ? 'bg-emerald-500 text-neutral-950' : 'bg-neutral-800 text-neutral-200 border border-neutral-700 hover:bg-neutral-700'}">
            \${isDone ? '✓ Concluído' : 'Marcar como Concluído'}
          </button>
        </div>

        \${lesson.summary ? \`<div class="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-xs text-neutral-300"><strong class="text-white">Resumo:</strong> \${lesson.summary}</div>\` : ''}

        <div class="text-sm text-neutral-200 leading-relaxed whitespace-pre-line space-y-3 font-sans">
          \${lesson.contentMarkdown}
        </div>

        \${lesson.checklist && lesson.checklist.length > 0 ? \`
          <div class="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
            <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider">Checklist Prático de Execução</h4>
            <div class="space-y-2">
              \${lesson.checklist.map((task, idx) => {
                const taskId = lesson.id + '-' + idx;
                const checked = completedTasks[taskId];
                return \`
                  <label class="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-800 text-xs cursor-pointer hover:bg-neutral-900 transition \${checked ? 'text-neutral-500 line-through' : 'text-neutral-200'}">
                    <input type="checkbox" onchange="toggleTask('\${taskId}')" \${checked ? 'checked' : ''} class="rounded text-amber-500 bg-neutral-950">
                    <span>\${task}</span>
                  </label>
                \`;
              }).join('')}
            </div>
          </div>
        \` : ''}
      \`;
      updateProgress();
    }

    function selectModule(id) {
      activeModuleId = id;
      const mod = appData.modules.find(m => m.id === id);
      if (mod && mod.lessons.length > 0) activeLessonId = mod.lessons[0].id;
      renderModules();
      renderLesson();
    }

    function selectLesson(id) {
      activeLessonId = id;
      renderModules();
      renderLesson();
    }

    function toggleLessonDone(id) {
      completedLessons[id] = !completedLessons[id];
      renderModules();
      renderLesson();
    }

    function toggleTask(id) {
      completedTasks[id] = !completedTasks[id];
      renderLesson();
    }

    function updateProgress() {
      const total = appData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      const done = Object.values(completedLessons).filter(Boolean).length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      document.getElementById('progress-bar').style.width = pct + '%';
      document.getElementById('progress-text').innerText = pct + '%';
    }

    renderModules();
    renderLesson();
  </script>
</body>
</html>`;
}
