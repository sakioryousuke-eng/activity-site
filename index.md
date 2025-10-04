---
layout: default
title: ホーム
---

# 崎尾亮介 活動報告サイト

<div class="cards">

  <a class="card" href="{{ site.baseurl }}/pages/promise.html">
    <h2>📌 公約と進捗</h2>
    <p>公約の全体像と進捗。後日、内容を追加します。</p>
  </a>

  <a class="card" href="{{ site.baseurl }}/pages/activity.html">
    <h2>🏡 地域活動</h2>
    <p>地域での取り組み・イベント情報。後日、内容を追加します。</p>
  </a>

  <a class="card" href="{{ site.baseurl }}/pages/matrix.html">
    <h2>💬 一般質問（マトリックス）</h2>
    <p>分野×質問×類似議員。行クリックで詳細を開閉できます。</p>
  </a>

</div>

<style>
  .cards {
    display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;
  }
  .card {
    display: block; padding: 1.25rem; border-radius: 10px; background: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0,0,0,.08); text-decoration: none; color: inherit; transition: .2s;
  }
  .card:hover { background: #f0f8ff; transform: translateY(-2px); }
  .card h2 { margin: 0 0 .25rem; font-size: 1.2rem; }
  .card p { margin: 0; color:#555; }
  @media (min-width: 720px) {
    .cards { flex-direction: row; }
    .card { flex: 1; }
  }
</style>
