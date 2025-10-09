---
layout: default
title: 公約と進捗
---

# 公約と進捗
<p>カードをクリックすると、設定済みのPDFをページ内モーダルで表示します。</p>

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
      <div class="hint">クリックでPDFを開く</div>
    {% endif %}
  </div>
{% endfor %}
</div>

<!-- PDF モーダル（iframe版） -->
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
<style>
  /* 既存の .tabs, .card … はそのままでOK。モーダル部分だけ差し替え */

  dialog#pdfModal{
    width:min(960px,96vw);
    /* iOS での “vh” 問題を回避：優先して 100dvh を使い、なければ 100vh */
    height: calc(100vh - 28px);
    margin:14px auto;            /* 画面上下にわずかに余白 */
    border:none; padding:0; border-radius:16px;
    box-shadow:0 20px 50px rgba(0,0,0,.25);
    max-height:none;
  }
  @supports (height: 100dvh) {
    dialog#pdfModal{ height: calc(100dvh - 28px); }
  }
  dialog::backdrop{ background:rgba(0,0,0,.35); }

  .modal-head{
    display:flex;justify-content:space-between;align-items:center;
    padding:.6rem .9rem;border-bottom:1px solid #e5e7eb;background:#fafafa
  }
  .modal-body{ height: calc(100% - 48px); overflow:hidden; }
  #pdfFrame{ width:100%; height:100%; display:block; }

  /* モーダル表示中は背面のページスクロールを止める */
  body.modal-open{ overflow:hidden; }
</style>



<script>
  const dlg   = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  const titleEl = document.getElementById('pdfTitle');

  // 実デバイスの高さで調整（iOSのツールバー対策）
  function sizeDialog(){
    const h = window.innerHeight;           // 実測
    dlg.style.height = (h - 28) + 'px';     // 上下14pxの余白
  }

  // カードクリック → PDF表示
  document.addEventListener('click', (e)=>{
    if (e.target.closest('details')) return;
    const card = e.target.closest('.card.is-clickable');
    if (!card) return;

    const urlBase = card.getAttribute('data-pdf');
    if (!urlBase) return;

    // キャッシュ防止
    const url = urlBase + (urlBase.includes('?')?'&':'?') + 't=' + Date.now();
    frame.src = url;
    titleEl.textContent = card.getAttribute('data-title') || '資料';

    sizeDialog();
    dlg.showModal();
    document.body.classList.add('modal-open');
  });

  // 閉じる
  document.getElementById('closeModal').addEventListener('click', ()=>{
    dlg.close();
    frame.src = 'about:blank';
    document.body.classList.remove('modal-open');
  });

  // ESCでも閉じる
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && typeof dlg.close === 'function') {
      dlg.close(); frame.src = 'about:blank';
      document.body.classList.remove('modal-open');
    }
  });

  // 端末の回転・アドレスバー表示/非表示などで再計算
  window.addEventListener('resize', ()=>{
    if (dlg.open) sizeDialog();
  });
</script>
