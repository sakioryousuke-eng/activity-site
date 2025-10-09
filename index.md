---
layout: default
title: 公約と進捗
---

# 公約と進捗
<p>カードをタップすると、その場でPDFをモーダルで開きます（iPhoneでも見切れません）。</p>

<nav class="tabs">
  <a href="{{ site.baseurl }}/" class="active">📌 公約へのアプローチ</a>
  <a href="{{ site.baseurl }}/pages/activity.html">🏡 活動報告</a>
  <a href="{{ site.baseurl }}/pages/matrix.html">💬 一般質問</a>
</nav>

<div class="grid">
{% for p in site.data.promises.promises %}
  <div
    class="card {% if p.pdf %}is-clickable{% endif %}"
    {% if p.pdf %}data-pdf="{{ site.baseurl }}/{{ p.pdf }}"{% endif %}
    data-title="{{ p.title | escape }}"
  >
    <div class="title">
      {{ p.title }}
      <span class="chip s-{{ p.status }}">{{ p.status }}</span>
    </div>
    <div>{{ p.detail }}</div>
    <small>最終更新: {{ p.last_update }}</small>
    {% if p.pdf %}
      <div class="hint">📄 タップでPDFを開く</div>
    {% endif %}
  </div>
{% endfor %}
</div>

<!-- PDF モーダル -->
<dialog id="pdfModal" aria-label="PDF表示モーダル">
  <div class="modal-head">
    <strong id="pdfTitle">資料</strong>
    <button id="closeModal" aria-label="閉じる">×</button>
  </div>
  <div class="modal-body">
    <iframe id="pdfFrame" src="about:blank" title="PDFビューア" frameborder="0"></iframe>
  </div>
</dialog>

<style>
  .tabs { display:flex; gap:.5rem; margin:1rem 0 1.25rem; flex-wrap:wrap; }
  .tabs a { padding:.4rem .7rem; border:1px solid #e5e7eb; border-radius:8px; text-decoration:none; }
  .tabs a.active { background:#f0f7ff; border-color:#cfe2ff; }

  .grid { display:grid; gap:1.2rem; grid-template-columns:1fr; }
  @media (min-width:720px){ .grid{ grid-template-columns:1fr 1fr; } }

  .card {
    border-radius:16px; padding:1.2rem; background:#fff;
    box-shadow:0 4px 10px rgba(0,0,0,.05);
    transition:transform .2s ease, box-shadow .2s ease;
    position:relative;
  }
  .card:hover { transform:translateY(-3px); box-shadow:0 6px 14px rgba(0,0,0,.1); }
  .is-clickable { cursor:pointer; }
  .title { font-weight:700; font-size:1.05rem; margin-bottom:.5rem; }
  .chip { font-size:.8rem; padding:.2rem .6rem; border-radius:999px; margin-left:.5rem; }
  .s-構想中 { background:#fee2e2; color:#991b1b; }
  .s-経過観察中 { background:#fef3c7; color:#92400e; }
  .s-活動中 { background:#d1fae5; color:#065f46; }
  .s-完了 { background:#bfdbfe; color:#1e40af; }
  .s-継続 { background:#ede9fe; color:#5b21b6; }
  .hint { position:absolute; right:12px; bottom:10px; font-size:.8rem; color:#6b7280; }

  /* ===== モーダル（スマホ完全対応） ===== */
  :root{
    --safe-top: env(safe-area-inset-top,0px);
    --safe-bottom: env(safe-area-inset-bottom,0px);
  }
  dialog#pdfModal{
    border:none; padding:0; border-radius:12px;
    box-shadow:0 20px 50px rgba(0,0,0,.25);
    width:min(960px,96vw);
    height:min(90vh,800px);
    max-height:none;
  }
  @supports (height: 100dvh){
    dialog#pdfModal{ height:calc(100dvh - 20px); }
  }
  dialog::backdrop{ background:rgba(0,0,0,.35); }
  .modal-head{
    display:flex; justify-content:space-between; align-items:center;
    padding:calc(.6rem + var(--safe-top)) .9rem .6rem;
    border-bottom:1px solid #e5e7eb; background:#fafafa;
  }
  .modal-body{ height:calc(100% - 48px - var(--safe-top) - var(--safe-bottom)); overflow:hidden; }
  #pdfFrame{ width:100%; height:100%; display:block; }
  body.modal-open{ overflow:hidden; }
</style>

<script>
  const dlg = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  const titleEl = document.getElementById('pdfTitle');

  // カードクリックでPDF表示
  document.addEventListener('click', (e)=>{
    const card = e.target.closest('.card.is-clickable');
    if (!card) return;
    const url = card.dataset.pdf;
    if (!url) return;
    frame.src = url + (url.includes('?') ? '&' : '?') + 't=' + Date.now(); // キャッシュ防止
    titleEl.textContent = card.dataset.title || '資料';
    dlg.showModal();
    document.body.classList.add('modal-open');
  });

  // 閉じる
  document.getElementById('closeModal').addEventListener('click', ()=>{
    dlg.close();
    frame.src='about:blank';
    document.body.classList.remove('modal-open');
  });

  // ESCで閉じる
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape'){ dlg.close(); frame.src='about:blank'; document.body.classList.remove('modal-open'); }
  });
</script>

