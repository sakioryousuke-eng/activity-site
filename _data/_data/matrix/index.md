---
layout: default
title: 質問マトリクス
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/style.css">

<div class="nav">
  <a href="{{ site.baseurl }}/#pledges">🏳️‍🌈 公約</a>
  <a href="{{ site.baseurl }}/activities">📍 地域</a>
  <a href="{{ site.baseurl }}/matrix">💬 質問</a>
</div>

<div class="wrapper">
  <h1>質問マトリクス</h1>
  <p class="meta">左の行：<b>崎尾の一般質問／他議員の一般質問</b>、上の列：公約。セルをクリックで内訳。</p>

  {%- assign pledges = site.data.pledges | sort: "order" -%}
  {%- assign q_self  = site.data.questions -%}
  {%- assign q_other = site.data.other_members_questions -%}

  <style>
    table.mx{width:100%;border-collapse:collapse}
    .mx th,.mx td{border:1px solid #e5e7eb;padding:10px;vertical-align:top}
    .mx th{background:#f8fafc}
    .cell .count{font-weight:700;margin-right:8px}
    .mini{color:#6b7280;font-size:12px}
    details.cards{margin-top:6px}
  </style>

  <table class="mx">
    <thead>
      <tr>
        <th></th>
        {%- for p in pledges -%}
          <th>{{ p.title }}</th>
        {%- endfor -%}
      </tr>
    </thead>
    <tbody>
      {%- assign rows = "self,other" | split: "," -%}
      {%- for r in rows -%}
        <tr>
          <th>{% if r == "self" %}崎尾の一般質問{% else %}他議員の一般質問{% endif %}</th>
          {%- for p in pledges -%}
            {%- if r == "self" -%}
              {%- assign list = q_self  | where_exp:"q","q.pledge_ids and (q.pledge_ids contains p.id)" -%}
            {%- else -%}
              {%- assign list = q_other | where_exp:"q","q.pledge_ids and (q.pledge_ids contains p.id)" -%}
            {%- endif -%}
            {%- assign list = list | sort: "date" | reverse -%}
            {%- assign latest = list | first -%}
            <td class="cell">
              <div>
                <span class="count">{{ list.size }}</span>
                <span class="mini">{% if latest %}最新: {{ latest.date }}{% else %}—{% endif %}</span>
                {% if latest and latest.minutes_url %} <a class="mini" href="{{ latest.minutes_url }}">[PDF]</a>{% endif %}
              </div>
              <details class="cards">
                <summary>内訳を開く</summary>
                <div class="cards">
                  {%- for q in list -%}
                  <div class="card">
                    <div class="meta">
                      {{ q.date }} ｜ {{ q.dept }}{% if r == "other" and q.member %} ｜ {{ q.member }}{% endif %}
                    </div>
                    <div class="title">{{ q.title }}</div>
                    <div class="meta">
                      {% if q.minutes_url %}<a href="{{ q.minutes_url }}">[PDF]</a>{% endif %}
                      <span class="badge">関連: {{ p.id }}</span>
                    </div>
                  </div>
                  {%- endfor -%}
                  {% if list.size == 0 %}<div class="meta">該当なし</div>{% endif %}
                </div>
              </details>
            </td>
          {%- endfor -%}
        </tr>
      {%- endfor -%}
    </tbody>
  </table>

  <p class="mini">セル＝件数／直近日付／PDFショートカット。クリックで詳細（行：日付/件名/所管/[PDF]/関連公約）。</p>
</div>
