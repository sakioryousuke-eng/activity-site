---
layout: default
title: 公約と進捗
---

<h1>📌 公約と進捗</h1>
<p>カードをタップ/クリックすると、その場でPDFをモーダル表示します（スマホでも見切れません）。</p>

<div class="toolbar">
  <div class="filters">
    <button class="fbtn active" data-filter="all">すべて</button>
    <button class="fbtn" data-filter="構想中">構想中</button>
    <button class="fbtn" data-filter="経過観察中">経過観察中</button>
    <button class="fbtn" data-filter="活動中">活動中</button>
    <button class="fbtn" data-filter="継続">継続</button>
    <button class="fbtn" data-filter="完了">完了</button>
  </div>
  <input id="kw" type="search" placeholder="キーワード検索（タイトル・説明）">
</div>

<div class="grid" id="cards">
{% assign list = site.data.promises.promises %}
{% for p in list %}
  <article class="card"
           data-status="{{ p.status }}"
           data-text="{{ p.title }} {{ p.detail }} {{ p.status }} {{ p.last_update }}">
    {% if p.pdf %}
      <!-- 透明な全面リンク（共通レイアウトのJSが拾ってモーダル表示） -->
      <a class="stretched"
         href="{{ p.pdf | relative_url }}"
         data-modal="pdf"
         data-title="{{ p.title | escape }}"
         aria-label="{{ p.title | escape }}"></a>
    {% endif %}

    <header class="title">
      <span class="ttl">{{ p.title }}</span>
      <span class="chip s-{{ p.status }}">{{ p.status }}</span>
    </header>

    <p class="desc">{{ p.detail }}</p>
    <p class="meta"><small>最終更新: <time>{{ p.last_update }}</time></small></p>

    <div class="actions">
      {% if p.pdf %}
        <a href="{{ p.pdf | relative_url }}" data-modal="pdf" data-title="{{ p.title | escape }}" class="btn">📄 PDF</a>
        <a href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener" class="btn ghost">↗︎ 新しいタブ</a>
      {% else %}
        <span class="btn disabled" aria-disabled="true">PDF準備中</span>
      {% endif %}
    </div>

    <details class="more">
      <summary>詳細・今後の予定</summary>
      <div class="more-body">
        <p>（個別の取組・ロードマップ・関連資料リンク等をここへ追記できます）</p>
      </div>
    </details>
  </article>
{% endfor %}
</div>

<style>
/* ツールバー */
.toolbar{display:flex;justify-content:space-between;align-items:center;gap:.6rem;margin:.8rem 0 1.2rem;flex-wrap:wrap}
.filters{display:flex;gap:.4rem;flex-wrap:wrap}
.fbtn{border:1px solid #e5e7eb;background:#fff;padding:.35rem .7rem;border-radius:999px;cursor:pointer}
.fbtn.active{background:#eef5ff;border-color:#cfe2ff}
#kw{padding:.42rem .6rem;border:1px solid #e5e7eb;border-radius:9px;min-width:14rem;max-width:60vw}

/* グリッド & カード */
.grid{display:grid;gap:1.2rem;grid-template-columns:1fr}
@media(min-width:720px){.grid{grid-template-columns:1fr 1fr}}
.card{
  position:relative;
  border-radius:16px;
  padding:1.2rem;
  background:#fff;
  box-shadow:0 4px 10px rgba(0,0,0,.05);
  transition:transform .18s, box-shadow .18s;
}
.card:hover{transform:translateY(-3px);box-shadow:0 6px 14px rgba(0,0,0,.10)}
.stretched{position:absolute;inset:0;z-index:1;text-indent:-9999px;overflow:hidden}

/* タイトル・バッジ */
.title{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin-bottom:.45rem}
.ttl{font-weight:700;font-size:1.06rem}
.chip{font-size:.8rem;padding:.18rem .55rem;border-radius:999px}
.s-構想中{background:#fee2e2;color:#991b1b}
.s-経過観察中{background:#fef3c7;color:#92400e}
.s-活動中{background:#d1fae5;color:#065f46}
.s-継続{background:#ede9fe;color:#5b21b6}
.s-完了{background:#bfdbfe;color:#1e40af}

/* 本文・フッタ */
.desc{margin:.25rem 0 .4rem}
.meta{color:#6b7280;margin:.2rem 0 .6rem}

/* ボタン */
.actions{display:flex;gap:.5rem;flex-wrap:wrap;position:relative;z-index:2}
.btn{display:inline-block;text-decoration:none;border:1px solid #dbeafe;background:#eff6ff;color:#1d4ed8;padding:.35rem .65rem;border-radius:8px;font-size:.92rem}
.btn:hover{background:#dbeafe}
.btn.ghost{background:#fff}
.btn.disabled{opacity:.55;cursor:not-allowed;border-style:dashed}

/* details */
.more summary{cursor:pointer;margin-top:.2rem}
.more-body{margin-top:.5rem;color:#374151}

/* モバイル微調整 */
@media(max-width:720px){
  .ttl{font-size:1rem}
  .btn{padding:.3rem .55rem;font-size:.9rem}
}
</style>

<script>
// ステータス/検索フィルタ
function applyFilter(){
  const f = document.querySelector('.fbtn.active')?.dataset.filter || 'all';
  const kw = (document.getElementById('kw').value || '').toLowerCase();
  document.querySelectorAll('#cards .card').forEach(c=>{
    const okS = (f==='all' || c.dataset.status===f);
    const okK = (!kw || c.dataset.text.toLowerCase().includes(kw));
    c.style.display = (okS && okK)? '' : 'none';
  });
}
document.querySelectorAll('.fbtn').forEach(b=>{
  b.addEventListener('click', e=>{
    document.querySelectorAll('.fbtn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    applyFilter();
  });
});
document.getElementById('kw').addEventListener('input', applyFilter);
applyFilter();
</script>
