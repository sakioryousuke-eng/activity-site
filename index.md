---
layout: default
title: 公約と進捗
---

# 公約と進捗
<p>カードをタップすると、その場でPDFをモーダルで開きます（スマホでも見切れません）。</p>

<nav class="tabs">
  <a href="{{ '/' | relative_url }}" class="active">📌 公約へのアプローチ</a>
  <a href="{{ '/pages/activity.html' | relative_url }}">🏡 活動報告</a>
  <a href="{{ '/pages/matrix.html'  | relative_url }}">💬 一般質問</a>
</nav>

<div class="grid">
{% for p in site.data.promises.promises %}
  <div class="card"
       {% if p.pdf %} data-open-pdf data-pdf="{{ p.pdf | relative_url }}" {% endif %}
       data-title="{{ p.title | escape }}">
    <div class="title">
      {{ p.title }}
      <span class="chip s-{{ p.status }}">{{ p.status }}</span>
    </div>
    <div>{{ p.detail }}</div>
    <small>最終更新: {{ p.last_update }}</small>
    {% if p.pdf %}<div class="hint">📄 タップでPDFを開く</div>{% endif %}
  </div>
{% endfor %}
</div>

<style>
  .tabs{display:flex;gap:.5rem;margin:1rem 0 1.25rem;flex-wrap:wrap}
  .tabs a{padding:.4rem .7rem;border:1px solid #e5e7eb;border-radius:8px;text-decoration:none}
  .tabs a.active{background:#f0f7ff;border-color:#cfe2ff}

  .grid{display:grid;gap:1.2rem;grid-template-columns:1fr}
  @media(min-width:720px){.grid{grid-template-columns:1fr 1fr}}

  .card{border-radius:16px;padding:1.2rem;background:#fff;box-shadow:0 4px 10px rgba(0,0,0,.05);transition:transform .2s ease, box-shadow .2s ease;position:relative;cursor:pointer}
  .card:hover{transform:translateY(-3px);box-shadow:0 6px 14px rgba(0,0,0,.1)}
  .title{font-weight:700;font-size:1.05rem;margin-bottom:.5rem}
  .chip{font-size:.8rem;padding:.2rem .6rem;border-radius:999px;margin-left:.5rem}
  .s-構想中{background:#fee2e2;color:#991b1b}
  .s-経過観察中{background:#fef3c7;color:#92400e}
  .s-活動中{background:#d1fae5;color:#065f46}
  .s-完了{background:#bfdbfe;color:#1e40af}
  .s-継続{background:#ede9fe;color:#5b21b6}
  .hint{position:absolute;right:12px;bottom:10px;font-size:.8rem;color:#6b7280}
</style>
