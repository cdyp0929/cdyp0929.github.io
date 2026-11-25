/* 모두 보기 페이지 (works.html) */
(() => {
  const P = PORTFOLIO;
  const root = document.getElementById('all');
  const keys = Object.keys(P.categories).filter(k => P.works.some(w => w.category === k)); // 작품 있는 카테고리만
  let cat = location.hash.replace('#', '') || new URLSearchParams(location.search).get('cat');
  if (!keys.includes(cat)) cat = keys[0] || 'web';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

  // 뼈대는 한 번만 만들고, 탭을 누르면 내용만 모션과 함께 바뀝니다
  root.innerHTML = `<div class="container">
    <header class="all-head">
      <a class="arrow all-back" href="index.html#${cat}" aria-label="메인으로 돌아가기">${ICON.left}</a>
      <div class="all-copy"><h1 class="all-title"></h1><p class="all-desc"></p></div>
      <nav class="tabs">${keys.map(k => `<button class="tab" data-cat="${k}">${esc(P.categories[k].tab)}<small>${P.works.filter(w => w.category === k).length}</small></button>`).join('')}<span class="tab-ink"></span></nav>
    </header>
    <div class="all-body"></div>
  </div>`;
  const $ = s => root.querySelector(s);
  const tabs = [...root.querySelectorAll('.tab')], ink = $('.tab-ink'), copy = $('.all-copy'), body = $('.all-body');

  const moveInk = () => {
    const t = tabs.find(x => x.dataset.cat === cat); if (!t) return;
    ink.style.width = t.offsetWidth + 'px';
    ink.style.transform = `translateX(${t.offsetLeft}px)`;
  };

  function fill() {
    const info = P.categories[cat], list = P.works.filter(w => w.category === cat);
    document.title = `${info.title} | ${P.profile.name} 포트폴리오`;
    $('.all-title').textContent = info.title;
    $('.all-desc').textContent = info.desc;
    $('.all-back').href = `index.html#${cat}`;
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.cat === cat));
    body.innerHTML = list.length
      ? `<div class="all-grid">${list.map(w => cardHTML(w, true)).join('')}</div>`
      : '<p class="all-empty">작품을 준비 중입니다.</p>';
    moveInk();
  }

  let busy = false;
  async function switchTo(next) {
    if (next === cat || busy) return;
    busy = true;
    cat = next;
    history.replaceState(null, '', `#${cat}`);
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.cat === cat));
    moveInk();
    root.classList.add('is-leaving');                 // 기존 내용 빠지기
    await wait(180);
    fill();
    root.classList.remove('is-leaving');
    root.classList.add('is-entering');                // 새 내용 들어오기
    void root.offsetWidth;
    root.classList.add('is-enter-run');
    await wait(500);
    root.classList.remove('is-entering', 'is-enter-run');
    busy = false;
  }

  tabs.forEach(t => t.addEventListener('click', () => switchTo(t.dataset.cat)));
  window.addEventListener('resize', moveInk);
  fill();
  root.classList.add('ink-ready');
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(moveInk);
  renderFooter(document.getElementById('footer'));
})();
