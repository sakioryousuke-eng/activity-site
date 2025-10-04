---
layout: default
title: 公約の進捗
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/style.css">

<div class="nav">
  <a href="{{ site.baseurl }}/#pledges">🏳️‍🌈 公約</a>
  <a href="{{ site.baseurl }}/activities">📍 地域</a>
  <a href="{{ site.baseurl }}/matrix">💬 質問</a>
</div>

<div class="wrapper">
<section id="pledges">
  <h1>公約の進捗</h1>
  <div class="cards">
    {% assign items = site.data.pledges | sort: "order" %}
    {% for p in items %}
      <div class="card">
        <div>
          <span class="badge">{{ p.status | default: "not_started" }}</span>
          {% if p.topics %}{% for t in p.topics %}<span class="badge">{{ t }}</span>{% endfor %}{% endif %}
        </div>
        <div class="title">{{ p.title }}</div>
        {% if p.pledge_text %}<div class="meta">{{ p.pledge_text }}</div>{% endif %}
        <div class="progress"><span style="width: {{ p.percent | default: 0 }}%"></span></div>
        <div class="meta">更新日: {{ p.last_update }}</div>
      </div>
    {% endfor %}
  </div>
</section>
</div>
