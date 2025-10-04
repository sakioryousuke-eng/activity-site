---
layout: default
title: 質問マトリクス
---

# 質問マトリクス

<table>
  <thead>
    <tr>
      <th>分野</th>
      <th>崎尾の一般質問</th>
      <th>他議員の一般質問</th>
    </tr>
  </thead>
  <tbody>
    {% assign depts = "教育,福祉,観光,その他" | split: "," %}
    {% for d in depts %}
    <tr>
      <td>{{ d }}</td>
      <td>
        {% for q in site.data.questions %}
          {% if q.dept == d %}
            <p>{{ q.title }}</p>
          {% endif %}
        {% endfor %}
      </td>
      <td>
        {% for q in site.data.other_members_questions %}
          {% if q.dept == d %}
            <p>{{ q.title }}（{{ q.member }}）</p>
          {% endif %}
        {% endfor %}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
