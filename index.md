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
        <p>（ここに個別の取組・ロードマップ・資料リンク等を追記していきます）</p>
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

<style>
  /* --- タブ --- */
  .tabs { display:flex; gap:.5rem; margin:1rem 0 1.25rem; flex-wrap:wrap; }
  .tabs a { padding:.4rem .7rem; border:1px solid #e5e7eb; border-radius:8px; text-decoration:none; }
  .tabs a.active { background:#f0f7ff; border-color:#cfe2ff; }

  /* --- 公約進捗カード（ご指定のスタイル）--- */
  .grid {
    display: grid;
    gap: 1.2rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 720px) {
    .grid { grid-template-columns: 1fr 1fr; }
  }
  .card {
    border-radius: 16px;
    padding: 1.2rem;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.1);
  }
  .title {
    font-weight: 700;
    font-size: 1.05rem;
    margin-bottom: .5rem;
  }
  .chip {
    font-size: .8rem;
    padding: .2rem .6rem;
    border-radius: 999px;
    margin-left: .5rem;
  }

  /* --- ステータス色（はっきり）--- */
  .s-未着手 { background:#fee2e2; color:#991b1b; }
  .s-調整中 { background:#fef3c7; color:#92400e; }
  .s-実施中 { background:#d1fae5; color:#065f46; }
  .s-完了   { background:#bfdbfe; color:#1e40af; }
  .s-継続   { background:#ede9fe; color:#5b21b6; }

  /* --- PDF枠もカード風 --- */
  .pdf-wrap {
    margin: 2rem 0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 3px 12px rgba(0,0,0,0.1);
  }
</style>
