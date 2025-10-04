---
layout: default
title: 一般質問マトリックス
---

# 一般質問マトリックス
<p>行（質問）をクリックすると、会期や類似議員の詳細が開閉します。</p>

<style>
  .matrix-wrap { overflow-x: auto; }
  table.matrix { width:100%; border-collapse: collapse; }
  .matrix th, .matrix td { border:1px solid #ddd; padding:.75rem; vertical-align: top; }
  .matrix thead th { position: sticky; top: 0; background:#fafafa; z-index:1; }
  .matrix tbody tr.data-row { cursor: pointer; }
  .matrix tbody tr.data-row:hover { background:#f7fbff; }
  .matrix tbody tr.detail-row { display: none; background:#fcfcfc; }
  .matrix tbody tr.detail-row.open { display: table-row; }
  .badge { display:inline-block; padding:.15rem .5rem; border-radius:999px; background:#eef5ff; font-size:.8rem; }
  .pill { display:inline-block; padding:.1rem .45rem; border:1px solid #cfe2ff; border-radius:6px; margin-right:.35rem; font-size:.8rem; background:#f6f9ff; }

  /* スマホ最適化 */
  @media (max-width: 720px) {
    .matrix thead { display:none; }
    .matrix tbody tr.data-row { display:block; border:1px solid #eee; margin-bottom:.75rem; }
    .matrix tbody tr.data-row td { display:block; border:none; border-bottom:1px dashed #eee; }
    .matrix tbody tr.data-row td:first-child { font-weight:700; }
    .matrix tbody tr.detail-row.open { display: block; }
  }
</style>

<div class="matrix-wrap">
<table class="matrix">
  <thead>
    <tr>
      <th style="width:10rem;">分野</th>
      <th>崎尾の質問（年月・文言）</th>
      <th style="width:18rem;">類似議員（クリックで詳細）</th>
    </tr>
  </thead>
  <tbody>
  {% assign idx = 0 %}
  {% for category in site.data.matrix %}
    {% assign cat = category[0] %}
    {% assign items = category[1] %}
    {% for item in items %}
      {% assign row_id = 'row-' | append: idx %}
      <tr class="data-row" data-target="{{ row_id }}">
        <td><span class="badge">{{ cat }}</span></td>
        <td>
          <div><strong>{{ item.sakio.month }}</strong>　{{ item.sakio.text }}</div>
          <div class="pill">会期：{{ item.sakio.session }}</div>
        </td>
        <td>
          {% if item.related and item.related.size > 0 %}
            {% for r in item.related %}
              <span class="pill">{{ r.name }}（{{ r.party }}）</span>
            {% endfor %}
            <small>…クリックで詳細</small>
          {% else %}
            <span>-</span>
          {% endif %}
        </td>
      </tr>
      <tr id="{{ row_id }}" class="detail-row">
        <td colspan="3">
          <div style="display:grid; gap:.5rem;">
            <div><strong>質問詳細</strong>：{{ item.sakio.session }}／{{ item.sakio.month }}／{{ item.sakio.text }}</div>
            {% if item.related and item.related.size > 0 %}
              <div>
                <strong>類似議員 詳細</strong>
                <ul style="margin:.4rem 0 .2rem 1.2rem;">
                  {% for r in item.related %}
                    <li><strong>{{ r.name }}</strong>（{{ r.party }}）：{{ r.month }}／{{ r.topic }}</li>
                  {% endfor %}
                </ul>
              </div>
            {% endif %}
          </div>
        </td>
      </tr>
      {% assign idx = idx | plus: 1 %}
    {% endfor %}
  {% endfor %}
  </tbody>
</table>
</div>

<script>
  // 行クリックで直下の詳細行をトグル
  document.addEventListener('click', function(e){
    const tr = e.target.closest('tr.data-row');
    if(!tr) return;
    const id = tr.getAttribute('data-target');
    const detail = document.getElementById(id);
    if(!detail) return;
    detail.classList.toggle('open');
  });
</script>
