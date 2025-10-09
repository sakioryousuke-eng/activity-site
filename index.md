---
layout: default
title: 公約と進捗
---

# 公約と進捗
<p>カードをタップすると、その場でPDFをフル画面モーダルで開きます（iPhoneでも切れません）。</p>

<nav class="tabs">
  <a href="{{ site.baseurl }}/" class="active">📌 公約へのアプローチ</a>
  <a href="{{ site.baseurl }}/pages/activity.html">🏡 活動報告</a>
  <a href="{{ site.baseurl }}/pages/matrix.html">💬 一般質問</a>
</nav>

<div class="grid">
{% for p in site.data.promises.promises %}
  <div
    class="card {% if p.pdf %}is-clickable{% endif %}"
    {% if p.pdf %}data-pdf="{{ site.baseurl }}{{ p.pdf }}"{% endif %}
    data-title="{{ p.title | escape }}"
  >
    <div class="title">
      {{ p.title }}
      <span class="chip s-{{ p.status }}">{{ p.status }}</span>
    </div>
    <div>{{ p.detail }}</div>
    <small>最終更新: {{ p.last_update }}</small>

    <details>
      <summary>詳細・今後の予定</summary>
      <div style="margin-top:.5rem;">
        <p>（ここに個別の取組・ロードマップ・資料リンク等を追記していきます）</p>
      </div>
    </details>

    {% if p.pdf %}
      <div class="hint">タップでPDFを開く</div>
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
  /* ===== タブ＆カード（既存の見た目はそのまま） ===== */
  .tabs { display:flex; gap:.5rem; margin:1rem 0 1.25rem; flex-wrap:wrap; }
  .tabs a { padding:.4rem .7rem; border:1px solid #e5e7eb; border-radius:8px; text-decoration:none; }
  .tabs a.active { background:#f0f7ff; border-color:#cfe2ff; }

  .grid { display:grid; gap:1.2rem; grid-template-columns:1fr; }
  @media (min-width: 720px) { .grid { grid-template-columns:1fr 1fr; } }

  .card {
    border-radius: 16px; padding: 1.2rem; background:#fff;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
    transition: transform .2s ease, box-shadow .2s ease;
    position: relative;
  }
  .card:hover { transform: translateY(-4px); box-shadow: 0 6px 14px rgba(0,0,0,.1); }
  .is-clickable { cursor: pointer; }
  .title { font-weight:700; font-size:1.05rem; margin-bottom:.5rem; }
  .chip { font-size:.8rem; padding:.2rem .6rem; border-radius:999px; margin-left:.5rem; }
  .s-構想中 { background:#fee2e2; color:#991b1b; }
  .s-経過観察中 { background:#fef3c7; color:#92400e; }
  .s-活動中 { background:#d1fae5; color:#065f46; }
  .s-完了   { background:#bfdbfe; color:#1e40af; }
  .s-継続   { background:#ede9fe; color:#5b21b6; }
  .hint { position:absolute; right:12px; bottom:10px; font-size:.8rem; color:#6b7280; }

  /* ====== ここからモーダルの“見切れ対策” ====== */
  :root{
    /* iOS安全域 */
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
  }

  dialog#pdfModal{
    border:none; padding:0; border-radius:16px;
    box-shadow:0 20px 50px rgba(0,0,0,.25);
    width:min(960px,96vw);
    height:min(80vh,820px);
  }
  dialog::backdrop{ background:rgba(0,0,0,.35); }

  /* スマホはフルスクリーンで安全域を考慮 */
  dialog#pdfModal.full {
    margin:0; width:100vw; height:100vh; border-radius:0;
  }
  @supports (height: 100dvh){
    dialog#pdfModal.full { width:100dvw; height:100dvh; }
  }

  .modal-head{
    display:flex;justify-content:space-between;align-items:center;
    padding:calc(.6rem + var(--safe-top)) .9rem .6rem;
    border-bottom:1px solid #e5e7eb;background:#fafafa
  }
  .modal-body{
    height:calc(100% - 48px - var(--safe-top) - var(--safe-bottom));
    padding-bottom:var(--safe-bottom);
    overflow:hidden;
  }
  #pdfFrame{ width:100%; height:100%; display:block; }

  /* モーダル表示中は背面スクロールを止める */
  body.modal-open{ overflow:hidden; overscroll-behavior:contain; }
</style>

<script>
  const dlg   = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  const titleEl = document.getElementById('pdfTitle');

  const isMobile = () => window.matchMedia('(max-width: 720px)').matches;

  function openPdf(urlBase, title){
    const url = urlBase + (urlBase.includes('?') ? '&' : '?') + 't=' + Date.now(); // キャッシュ防止
    frame.src = url;
    titleEl.textContent = title || '資料';

    // スマホはフルスクリーン化（safe-area対応）
    if (isMobile()) dlg.classList.add('full'); else dlg.classList.remove('full');

    dlg.showModal();
    document.body.classList.add('modal-open');
  }

  // カードクリック（details の中は除外）
  document.addEventListener('click', (e)=>{
    if (e.target.closest('details')) return;
    const card = e.target.closest('.card.is-clickable');
    if (!card) return;
    const pdf = card.getAttribute('data-pdf');
    if (!pdf) return;
    openPdf(pdf, card.getAttribute('data-title'));
  });

  // 閉じる
  document.getElementById('closeModal').addEventListener('click', ()=>{
    dlg.close();
    frame.src = 'about:blank';
    document.body.classList.remove('modal-open');
  });

  // ESCでも閉じる
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && typeof dlg.close === 'function'){
      dlg.close(); frame.src='about:blank'; document.body.classList.remove('modal-open');
    }
  });

  // 画面回転やバーの出入り時もクラスを再判定
  window.addEventListener('resize', ()=>{
    if (!dlg.open) return;
    if (isMobile()) dlg.classList.add('full'); else dlg.classList.remove('full');
  });
</script>

