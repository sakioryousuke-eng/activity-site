---
layout: default
title: 公約と進捗
---

# 📌 公約と進捗

カードをクリックするとPDFが開きます。

<div class="grid">
{% for p in site.data.promises.promises %}
  <div class="card">
    <a href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener">
      <strong>{{ p.title }}</strong><br>
      <small>{{ p.status }}（更新：{{ p.last_update }}）</small>
    </a>
    <p>{{ p.detail }}</p>
  </div>
{% endfor %}
</div>

<style>
.grid{display:grid;gap:1rem;margin-top:1rem}
@media(min-width:720px){.grid{grid-template-columns:1fr 1fr}}
.card{border:1px solid #e5e7eb;border-radius:12px;padding:1rem;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.03)}
.card a{text-decoration:none;color:#1d4ed8;font-weight:600}
.card p{margin-top:.5rem;font-size:.95rem;color:#374151}
</style>

