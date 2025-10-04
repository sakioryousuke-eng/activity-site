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
  <h1>一般質問マトリクス（縦長）</h1>
  <p class="meta">横：<b>崎尾の一般質問</b>／<b>他議員の一般質問</b>　縦：<b>教育・福祉・観光・その他</b></p>

  {%- assign empty = "" | split: "" -%}
  {%- assign q_self  = site.data.questions               | default: empty -%}
  {%- assign q_other = site.data.other_members_questions | default: empty -%}
  {%- assign cats = "教育,福祉,観光,その他" | split: "," -%}

  <style>
    table.mx{width:100%;border-collapse:collapse;margin-top:8px}
    .mx th,.mx td{border:1px solid #e5e7eb;padding:12px;vertical-align:top}
    .mx th{background:#f8fafc}
    .count{font-weight:700;margin-right:8px}
    .mini{color:#6b7280;font-size:12px}
    .list{margin:6px 0 0 0;padding-left:18px}
    .list li{margin:2px 0}
  </style>

  <table class="mx">
    <thead>
      <tr>
        <th>分野</th>
        <th>崎尾の一般質問</th>
        <th>他議員の一般質問</th>
      </tr>
    </thead>
    <tbody>
      {%- for c in cats -%}
        {%- assign s_list = q_self  | where: "dept", c | sort: "date" | reverse -%}
        {%- assign o_list = q_other | where: "dept", c | sort: "date" | reverse -%}
        {%- assign s_latest = s_list | first -%}
        {%- assign o_latest = o_list | first -%}
        <tr>
          <th>{{ c }}</th>

          <td>
            <div>
              <span class="count">{{ s_list.size }}</span>
              <span class="mini">{% if s_latest %}最新: {{ s_latest.date }}{% else %}—{% endif %}</span>
            </div>
            <ul class="list">
              {%- for q in s_list -%}
                <li>
                  {{ q.date }}　<a href="{{ q.minutes_url | default: '#' }}">{{ q.title }}</a>
                  <span class="mini">（{{ q.pledge_ids }}）</span>
                </li>
              {%- endfor -%}
              {% if s_list.size == 0 %}<li class="mini">該当なし</li>{% endif %}
            </ul>
          </td>

          <td>
            <div>
              <span class="count">{{ o_list.size }}</span>
              <span class="mini">{% if o_latest %}最新: {{ o_latest.date }}{% else %}—{% endif %}</span>
            </div>
            <ul class="list">
              {%- for q in o_list -%}
                <li>
                  {{ q.date }}　<a href="{{ q.minutes_url | default: '#' }}">{{ q.title }}</a>
                  <span class="mini">（{{ q.member }}｜{{ q.pledge_ids }}）</span>
                </li>
              {%- endfor -%}
              {% if o_list.size == 0 %}<li class="mini">該当なし</li>{% endif %}
            </ul>
          </td>
        </tr>
      {%- endfor -%}
    </tbody>
  </table>

  <p class="mini">※ dept列の値を「教育／福祉／観光／その他」に揃えると自動で集計されます。</p>
</div>
