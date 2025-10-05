---
layout: default
title: 公約と進捗
---

# 公約と進捗
<p>カードをクリックすると、PDF（設定済みのもの）はその場で開きます。</p>

<nav class="tabs">
  <a href="{{ site.baseurl }}/" class="active">📌 公約と進捗</a>
  <a href="{{ site.baseurl }}/pages/activity.html">🏡 地域活動</a>
  <a href="{{ site.baseurl }}/pages/matrix.html">💬 一般質問（マトリックス）</a>
</nav>

<div class="grid">
{% for p in site.data.promises.promises %}
  <div class="card {% if p.pdf %}is-clickable{% endif %}" {% if p.pdf %}data-pdf="{{ site.baseurl }}{{ p.pdf }}"{% endif %}>
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

<!-- PDF モーダル -->
<dialog id="pdfModal">
  <div class="modal-head">
    <strong>資料</strong>
    <button id="closeModal" aria-label="閉じる">×</button>
  </div>
  <div class="modal-body">
    <object id="pdfViewer" type="application/pdf" width="100%" height="100%"></object>
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
  .s-未着手 { background:#fee2e2; color:#991b1b; }
  .s-調整中 { background:#fef3c7; color:#92400e; }
  .s-実施中 { background:#d1fae5; color:#065f46; }
  .s-完了   { background:#bfdbfe; color:#1e40af; }
  .s-継続   { background:#ede9fe; color:#5b21b6; }
  .hint { position:absolute; right:12px; bottom:10px; font-size:.8rem; color:#6b7280; }

  dialog#pdfModal {
    width: min(1000px, 92vw); height: min(80vh, 820px); border:none; padding:0; border-radius:14px;
    box-shadow: 0 20px 50px rgba(0,0,0,.25);
  }
  dialog::backdrop { background: rgba(0,0,0,.35); }
  .modal-head { display:flex; justify-content:space-between; align-items:center;
    padding:.6rem .9rem; border-bottom:1px solid #e5e7eb; background:#fafafa; }
  .modal-body { height: calc(100% - 46px); }
  #closeModal { border:none; background:#fff; width:32px; height:32px; border-radius:8px; cursor:pointer; font-size:1.1rem; }
  #closeModal:hover { background:#f3f4f6; }
  .modal-body object { width:100%; height:100%; display:block; }
</style>

<!-- PDFモーダル -->
<div id="pdf-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:1000;">
  <div style="width:80%;height:80%;margin:5% auto;background:#fff;border-radius:8px;overflow:hidden;position:relative;">
    <button onclick="document.getElementById('pdf-modal').style.display='none'" style="position:absolute;top:10px;right:15px;">✕</button>
    <iframe src="" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pdf-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modal = document.getElementById('pdf-modal');
      const iframe = modal.querySelector('iframe');
      iframe.src = e.target.href + '?t=' + Date.now(); // ←キャッシュ防止
      modal.style.display = 'block';
    });
  });
});
</script>
