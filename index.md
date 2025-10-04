---
layout: default
title: 一般質問マトリクス
permalink: /matrix/
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/style.css">

<div class="wrapper">
  <h1>一般質問マトリクス</h1>
  <p class="meta">分野ごとに「崎尾の一般質問」と「類似議員」を表示します。クリックで詳細が開きます。</p>

  {% assign matrix = site.data.matrix %}
  {% assign cats = "教育,福祉,観光,その他" | split: "," %}

  <style>
    .matrix-field .card{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:12px 0;line-height:1.7;background:#fff}
    details{margin-top:.25rem}
    summary{cursor:pointer}
    .mini{color:#6b7280;font-size:12px}
    @media (max-width:768px){.matrix-field .card{padding:14px}}
  </style>

  {% for cat in cats %}
    <h2 id="{{ cat }}">{{ cat }}</h2>
    <div class="matrix-field">
      {% for item in matrix[cat] %}
        <div class="card">
          <div><strong>【崎尾】{{ item.sakio.session }}（{{ item.sakio.month }}）</strong></div>
          <div style="white-space:pre-wrap; margin:.25rem 0 .5rem;">
            {{ item.sakio.text }}
            {% if item.sakio.pdf %}<div class="mini"><a href="{{ item.sakio.pdf }}">[PDF]</a></div>{% endif %}
          </div>

          {% if item.related and item.related.size > 0 %}
            <details>
              <summary><strong>【類似議員】内訳を開く</strong></summary>
              <ul>
                {% for r in item.related %}
                  <li>
                    {{ r.name }}（{{ r.party }}）：{{ r.month }}／{{ r.topic }}
                    {% if r.source_url %} <a href="{{ r.source_url }}">[PDF]</a>{% endif %}
                  </li>
                {% endfor %}
              </ul>
            </details>
          {% else %}
            <div class="mini">（類似議員の該当なし）</div>
          {% endif %}
        </div>
      {% endfor %}
      {% if matrix[cat] == nil or matrix[cat].size == 0 %}
        <div class="mini">この分野はまだ登録がありません。</div>
      {% endif %}
    </div>
  {% endfor %}
</div>
