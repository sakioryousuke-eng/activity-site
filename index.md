---
layout: default
title: 公約と進捗
---

# 公約と進捗
<p>下のカードで進捗を確認できます。PDF版はページ下部から閲覧・保存できます。</p>

<nav class="tabs">
  <a href="{{ site.baseurl }}/" class="active">📌 公約と進捗</a>
  <a href="{{ site.baseurl }}/pages/activity.html">🏡 地域活動</a>
  <a href="{{ site.baseurl }}/pages/matrix.html">💬 一般質問（マトリックス）</a>
</nav>

<style>
  .tabs { display:flex; gap:.5rem; margin:1rem 0 1.25rem; flex-wrap:wrap; }
  .tabs a { padding:.4rem .7rem; border:1px solid #e5e7eb; border-radius:8px; text-decoration:none; }
  .tabs a.active { background:#f0f7ff; border-color:#cfe2ff; }
  .grid { display:grid; gap:1rem; grid-template-columns:1fr; }
  @media (min-width: 720px){ .grid{ grid-template-columns:1fr 1fr; } }
  .card { border:1px solid #e5e7eb; border-radius:12px; padding:1rem; background:#fff; }
  .title { margin:.1rem 0 .6rem; font-weight:700; }
  .chip { display:inline-block; padding:.15rem .55rem; border-radius:999px; font-size:.8rem; margin-left:.4rem; }
  .s-未着手 { background:#f8fafc; border:1px solid #e5e7eb; }
  .s-調整中 { background:#fff7ed; border:1px solid #fed7aa; }
  .s-実施中 { background:#ecfeff; border:1px solid #a5f3fc; }
  .s-完了   { background:#ecfdf5; border:1px solid #a7f3d0; }
  .s-継続   { background:#f5f3ff; border:1px solid #ddd6fe; }
  details { margin-top:.6rem; }
  .pdf-wrap { margin:1.5rem 0; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; }
</style>

<div class="grid">
{% for p in site.data.promises.promises %}
  <div class="card">
    <div class="title">
      {{ p.title }}
      <span class="chip s-{{ p.status }}">{{ p.status }}</span>
    </div>
    <div>{{ p.detail }}</div>
    <small>最終更新: {{ p.last_update }}</small>

    <details>
      <summary>詳細・今後の予定</summary>
      <div style="margin-top:.5rem;">
        <p>（ここに個別の取組・ロードマップ・関係部署・資料リンク等を追記していきます）</p>
        <!-- 例:
        <ul>
          <li>2025-10-10 関係課ヒアリング</li>
          <li>2025-11-05 制度設計案ドラフト</li>
        </ul>
        -->
      </div>
    </details>
  </div>
{% endfor %}
</div>

## 公約PDF（プレビュー & ダウンロード）
<div class="pdf-wrap">
  <object data="{{ site.baseurl }}/assets/pdf/promise.pdf" type="application/pdf" width="100%" height="560">
    <p>PDFを表示できない場合は、<a href="{{ site.baseurl }}/assets/pdf/promise.pdf">こちらからダウンロード</a>してください。</p>
  </object>
</div>
