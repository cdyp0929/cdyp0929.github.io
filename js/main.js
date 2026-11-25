/* 메인 페이지 (index.html) */
(() => {
  const P = PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byCat = c => P.works.filter(w => w.category === c);

  /* ---------- HERO ---------- */
  function renderHero() {
    const hero = $('#home');
    let slides = P.works.filter(w => w.featured);
    if (!slides.length) slides = P.works.slice(0, 1);
    hero.innerHTML = slides.map((w, i) => `
      <div class="hero-slide${i === 0 ? ' is-active' : ''}${w.heroText === false ? ' hero-slide--bare' : ''}" data-theme="${w.heroTheme === 'light' ? 'light' : 'dark'}">
        <div class="hero-visual"${w.heroText === false && w.hero ? ` style="--poster:url('${esc(w.hero)}')"` : ''}>${w.heroVideo
          ? `<video src="${esc(w.heroVideo)}" ${w.hero ? `poster="${esc(w.hero)}"` : ''} muted loop playsinline preload="auto" data-ph="빌보드 영상"></video>`
          : imgTag(w.hero, w.title, '빌보드 이미지')}</div>
        ${w.heroText === false ? `<a href="#" class="hero-hit" data-open="${esc(w.id)}" aria-label="${esc(w.title)} 자세히 보기"></a>` : `<div class="hero-copy">
          ${w.logo ? `<div class="hero-logo"><img src="${esc(w.logo)}" alt="" onerror="this.parentNode.remove()"></div>` : ''}
          <p class="hero-label" style="margin-top:8px">${esc(w.heroLabel || w.title)}</p>
          <h1 class="hero-title">${esc(w.heroTitle || w.title)}</h1>
          <a href="#" class="hero-more" data-open="${esc(w.id)}">더 알아보기</a>
        </div>`}
      </div>`).join('') + (slides.length > 1 ? `
      <div class="hero-controls">
        <div class="hero-arrows">
          <button class="arrow arrow--light hero-prev" aria-label="이전">${ICON.left}</button>
          <button class="arrow arrow--light hero-next" aria-label="다음">${ICON.right}</button>
        </div>
        <div class="hero-progress">
          <span class="hero-count">01 / ${String(slides.length).padStart(2, '0')}</span>
          <div class="hero-track"><div class="hero-fill"></div></div>
          <button class="hero-play" aria-label="자동 재생 멈춤">${ICON.pause}</button>
        </div>
      </div>` : '');

    const setTheme = el => hero.classList.toggle('hero--light', el.dataset.theme === 'light');
    setTheme($('.hero-slide', hero));
    // 빌보드 영상: 파일이 없으면 회색 자리 표시, 보이는 슬라이드만 재생
    $$('.hero-visual video', hero).forEach(v => v.addEventListener('error', () => {
      const d = document.createElement('div'); d.innerHTML = placeholder('빌보드 영상', v.getAttribute('src'));
      v.replaceWith(d.firstElementChild);
    }));
    let heroPaused = false;   // 일시정지 버튼 상태 (영상도 같이 멈춤)
    const playVideos = () => $$('.hero-slide', hero).forEach(s => {
      const v = $('video', s); if (!v) return;
      if (s.classList.contains('is-active')) { v.currentTime = 0; if (!heroPaused) v.play().catch(() => {}); } else v.pause();
    });
    playVideos();
    if (slides.length < 2) return;
    const els = $$('.hero-slide', hero), fill = $('.hero-fill', hero), playBtn = $('.hero-play', hero), count = $('.hero-count', hero);
    const DURATION = 5000;
    let idx = 0, start = performance.now(), playing = true, elapsed = 0, held = false;
    const go = n => {
      els[idx].classList.remove('is-active');
      idx = (n + els.length) % els.length;
      els[idx].classList.add('is-active');
      setTheme(els[idx]);
      playVideos();
      count.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(els.length).padStart(2, '0');
      start = performance.now(); elapsed = 0;
    };
    const tick = now => {
      if (playing && !held) {
        elapsed = now - start;
        if (elapsed >= DURATION) go(idx + 1);
      }
      fill.style.width = Math.min(100, (elapsed / DURATION) * 100) + '%';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    $('.hero-prev', hero).onclick = () => go(idx - 1);
    $('.hero-next', hero).onclick = () => go(idx + 1);
    // 상세 보기가 열려 있는 동안은 빌보드(진행 바·영상)를 멈췄다가, 닫으면 이어서 재생
    const activeVideo = () => $('.hero-slide.is-active video', hero);
    document.addEventListener('modal:open', () => { held = true; activeVideo()?.pause(); });
    document.addEventListener('modal:close', () => {
      held = false; start = performance.now() - elapsed;
      if (playing) activeVideo()?.play().catch(() => {});
    });
    playBtn.onclick = () => {
      playing = !playing;
      heroPaused = !playing;
      const v = activeVideo();
      if (v) playing ? v.play().catch(() => {}) : v.pause();
      if (playing) start = performance.now() - elapsed;
      playBtn.innerHTML = playing ? ICON.pause : ICON.play;
      playBtn.setAttribute('aria-label', playing ? '자동 재생 멈춤' : '자동 재생');
    };
  }

  /* ---------- PROFILE ---------- */
  function renderProfile() {
    const pr = P.profile;
    const total = P.works.length || 1;
    const counts = ['mobile', 'web', 'other'].map(c => ({ c, n: byCat(c).length }));
    const pct = counts.map(x => ({ ...x, p: Math.round((x.n / total) * 100) }));
    const edu = (label, list) => Array.isArray(list) ? `<div class="edu-group"><p class="edu-label">${label}</p>${list.map(i => `<div class="edu-item"><div><strong>${esc(i.title)}</strong>${i.sub ? `<small>${esc(i.sub)}</small>` : ''}</div><span>${esc(i.date)}</span></div>`).join('')}</div>` : '';

    $('#profile').innerHTML = `<div class="container">
      <h2 class="section-title">PROFILE</h2>
      <div class="profile-grid">
        <div class="profile-card">
          ${imgTag(pr.photo, pr.name, '프로필 사진', 'profile-photo')}
          <div class="profile-info">
            <div>
              <p class="profile-name">${esc(pr.name)}</p>
              <p class="profile-role">${esc(pr.role)}</p>
              <p class="profile-bio">${esc(pr.bio)}</p>
            </div>
            <div>
              <p class="profile-label">Contact</p>
              <div class="profile-links">${pr.contacts.map(c => contactBtn(c, 'btn--glass')).join('')}</div>
            </div>
          </div>
        </div>
        <div class="profile-right">
          <div class="card-box works-card">
            <div class="works-head">
              <p class="card-title">Works<span>총 ${P.works.length}개</span></p>
              <button class="btn btn--outline" data-goto="${['web', 'mobile', 'other'].find(c => byCat(c).length) || 'profile'}">작업물 내려보기 ${ICON.down}</button>
            </div>
            <div class="stack-bar">${pct.filter(x => x.n).map(x => `<span style="flex-grow:${x.n};background:${CAT[x.c].color}"></span>`).join('')}</div>
            <ul class="legend">${pct.filter(x => x.n).map(x => `<li><i style="background:${CAT[x.c].color}"></i>${CAT[x.c].label} <b>${x.p}%</b></li>`).join('')}</ul>
          </div>
          <div class="profile-row">
            <div class="card-box skills-card">
              <div class="tools">${pr.tools.map(t => `
                <div class="tool-row">${toolIcon(t.tool)}
                  <div class="tool-bar"><span style="width:${t.level}%;background:${TOOLS[t.tool]?.bar || '#111'}"></span></div>
                  <span class="tool-pct">${t.level}%</span></div>`).join('')}
              </div>
              <div class="skills-body"><p class="card-title">Skills</p><div class="tags">${pr.skills.map(s => tagHTML(s.label, s.color)).join('')}</div></div>
            </div>
            <div class="card-box edu-card">
              <p class="card-title">Education &amp; Awards</p>
              ${edu('Education', pr.education)}${edu('Awards', pr.awards)}${edu('Certificates', pr.certificates)}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ---------- 작품 섹션 + 캐러셀 ---------- */
  function renderWorks() {
    $$('.works-section').forEach(sec => {
      const c = sec.dataset.cat, list = byCat(c);
      if (!list.length) {               // 작품이 없는 카테고리는 섹션과 메뉴에서 숨김
        sec.remove();
        document.querySelector(`.nav a[data-target="${c}"]`)?.remove();
        return;
      }
      sec.innerHTML = `
        <div class="container works-header">
          <h2 class="section-title">${esc(P.categories[c].title)}</h2>
          <a class="btn btn--viewall" href="works.html#${c}">모두 보기</a>
        </div>
        <div class="carousel">${list.map(w => cardHTML(w)).join('') || '<p class="all-empty">작품을 준비 중입니다.</p>'}</div>
        <div class="container carousel-arrows">
          <button class="arrow" data-dir="-1" aria-label="이전 작품">${ICON.left}</button>
          <button class="arrow" data-dir="1" aria-label="다음 작품">${ICON.right}</button>
        </div>`;
      const track = $('.carousel', sec), [prev, next] = $$('.carousel-arrows .arrow', sec);
      const cards = () => $$('.card', track);
      const padL = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
      // 각 카드가 왼쪽 여백선에 딱 맞는 스크롤 위치
      const stops = () => {
        const tl = track.getBoundingClientRect().left;
        return cards().map(c => c.getBoundingClientRect().left - tl + track.scrollLeft - padL());
      };
      // 마지막 카드가 화면 안에 다 보이면 끝
      const atEnd = () => {
        const list = cards(); if (!list.length) return true;
        return list[list.length - 1].getBoundingClientRect().right <= track.getBoundingClientRect().right + 1;
      };
      const update = () => {
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = atEnd();
      };
      next.onclick = () => {
        if (atEnd()) return;
        const max = track.scrollWidth - track.clientWidth;
        const s = stops().find(p => p > track.scrollLeft + 2);
        if (s !== undefined) track.scrollTo({ left: Math.min(s, max), behavior: 'smooth' });
      };
      prev.onclick = () => {
        const s = stops().filter(p => p < track.scrollLeft - 2).pop();
        track.scrollTo({ left: Math.max(0, s ?? 0), behavior: 'smooth' });
      };
      track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  }

  /* ---------- GNB: 섹션 이동 + 스크롤 위치에 따라 활성화 ---------- */
  const SECTIONS = ['home', 'profile', 'web', 'mobile', 'other'];
  function targetY(id) {
    const el = document.getElementById(id);
    if (!el || id === 'home') return 0;
    if (id === 'profile') return el.offsetTop;
    return el.offsetTop - Math.max(0, (window.innerHeight - el.offsetHeight) / 2);
  }
  function goto(id, behavior = 'smooth') { window.scrollTo({ top: targetY(id), behavior }); }

  function initNav() {
    const nav = $('#nav'), ind = $('.nav-indicator', nav), links = $$('a', nav);
    const setActive = id => {
      links.forEach(a => a.classList.toggle('is-active', a.dataset.target === id));
      const a = links.find(x => x.dataset.target === id);
      if (a) { ind.style.left = a.offsetLeft + 'px'; ind.style.width = a.offsetWidth + 'px'; }
    };
    links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); goto(a.dataset.target); history.replaceState(null, '', '#' + a.dataset.target); }));
    document.addEventListener('click', e => { const b = e.target.closest('[data-goto]'); if (b) { e.preventDefault(); goto(b.dataset.goto); } });

    let ticking = false;
    const spy = () => {
      ticking = false;
      const mid = window.scrollY + window.innerHeight / 2;
      let current = 'home';
      for (const id of SECTIONS) { const el = document.getElementById(id); if (el && el.offsetTop <= mid) current = id; }
      const footer = $('#footer');
      const last = SECTIONS.filter(id => document.getElementById(id)).pop();
      if (footer && footer.offsetTop <= mid) current = last;
      setActive(current);
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
    window.addEventListener('resize', spy);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(spy);
    spy();
  }

  renderHero();
  renderProfile();
  renderWorks();
  renderFooter($('#footer'));
  initNav();

  // works.html 에서 돌아올 때 해당 섹션으로
  const hash = location.hash.replace('#', '');
  if (SECTIONS.includes(hash)) window.addEventListener('load', () => goto(hash, 'auto'));
})();
