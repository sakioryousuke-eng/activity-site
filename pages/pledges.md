activity-site/pages/pledges.md
---
layout: default
title: 公約の進捗
permalink: /pledges/
---

# 公約の進捗

{% assign pledges = site.data.pledges %}
<div class="pledges">
  {% for p in pledges %}
  <div class="card" style="border:1px solid #ddd; border-radius:10px; padding:12px; margin:10px 0;">
    <div><strong>{{ p.title }}</strong></div>
    <div style="margin:6px 0;">分野: {{ p.category }}</div>
    <div style="opacity:0.8;">更新日: {{ p.last_update }}</div>
    <div>{{ p.description }}</div>
  </div>
  {% endfor %}
</div>
