/* 공통 기능: 아이콘, 카드, 이미지, 상세 보기 모달, 푸터
   (이 파일은 보통 수정할 필요가 없습니다. 내용은 data.js 에서 바꾸세요) */

const ICON = {
  left:  '<svg viewBox="0 0 28 28" fill="none"><path d="M16.5 8.5 11 14l5.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  right: '<svg viewBox="0 0 28 28" fill="none"><path d="M11.5 8.5 17 14l-5.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  down:  '<svg viewBox="0 0 16 16" fill="none"><path d="M8 2.5v11m0 0L4 9.5m4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  up:    '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13V3m0 0L4 7m4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  download: '<svg viewBox="0 0 16 16" fill="none"><path d="M8 2.5v8m0 0L4.5 7M8 10.5 11.5 7M3 13.5h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 5v14M15 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  play:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10-6.5-10-6.5Z"/></svg>',
};

/* 툴 정보 (data.js 의 tools 에 쓰는 이름) */
const TOOLS = {
  photoshop:    { label: '포토샵',      color: 'blue',   bar: '#31A8FF', bg: '#001E36', fg: '#31A8FF', short: 'Ps' },
  figma:        { label: '피그마',      color: 'purple', bar: '#A259FF', bg: '#1E1E1E', fg: '#FFFFFF', short: 'Fg', img: 'images/icons/figma.png' },
  illustrator:  { label: '일러스트',    color: 'orange', bar: '#FF9A00', bg: '#330000', fg: '#FF9A00', short: 'Ai' },
  aftereffects: { label: '에프터이펙트', color: 'navy',   bar: '#9999FF', bg: '#00005B', fg: '#9999FF', short: 'Ae' },
  premiere:     { label: '프리미어 프로', color: 'navy',  bar: '#9999FF', bg: '#00005B', fg: '#9999FF', short: 'Pr' },
  rhino:        { label: '라이노',      color: 'black',  bar: '#111111', bg: '#111111', fg: '#FFFFFF', short: 'Rh' },
  keyshot:      { label: '키샷',        color: 'black',  bar: '#111111', bg: '#111111', fg: '#FFFFFF', short: 'Ks' },
  blender:      { label: '블렌더',      color: 'orange', bar: '#F5792A', bg: '#1E1E1E', fg: '#F5792A', short: 'Bl' },
  higgsfield:   { label: '힉스필드',    color: 'lime',   bar: '#D3FF16', bg: '#111111', fg: '#D3FF16', short: 'Hf' },
  claude:       { label: 'Claude',      color: 'gray',   bar: '#D97757', bg: '#D97757', fg: '#FFFFFF', short: 'Cl' },
  gpt:          { label: 'ChatGPT',     color: 'gray',   bar: '#111111', bg: '#111111', fg: '#FFFFFF', short: 'Gp' },
  code:         { label: 'HTML·CSS·JS', color: 'gray',   bar: '#484858', bg: '#2A2A37', fg: '#FFFFFF', short: '</>' },
};
const CAT = {
  web:    { label: 'Web',    color: 'var(--c-web)' },
  mobile: { label: 'Mobile', color: 'var(--c-mobile)' },
  other:  { label: 'Other',  color: 'var(--c-other)' },
};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toolIcon(key) {
  const t = TOOLS[key]; if (!t) return '';
  if (t.img) return `<img class="tool-icon tool-icon--img" src="${esc(t.img)}" alt="${esc(t.label)}">`;  // 아이콘 이미지가 있으면 그걸 사용
  if (t.figma) {
    return `<svg class="tool-icon" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="${t.bg}"/>
      <g transform="translate(17 10)"><path d="M3.5 0h3.5v7H3.5a3.5 3.5 0 0 1 0-7Z" fill="#F24E1E"/><path d="M7 0h3.5a3.5 3.5 0 0 1 0 7H7V0Z" fill="#FF7262"/>
      <path d="M3.5 7H7v7H3.5a3.5 3.5 0 0 1 0-7Z" fill="#A259FF"/><circle cx="10.5" cy="10.5" r="3.5" fill="#1ABCFE"/>
      <path d="M3.5 14H7v3.5a3.5 3.5 0 1 1-3.5-3.5Z" fill="#0ACF83"/></g></svg>`;
  }
  return `<svg class="tool-icon" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="${t.bg}"/>
    <text x="24" y="31" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="20" font-weight="700" fill="${t.fg}">${t.short}</text></svg>`;
}

/* 이미지: 경로가 없거나 파일이 없으면 회색 자리 표시 */
function placeholder(label, hint) {
  return `<div class="ph"><span>${esc(label)}</span>${hint ? `<small>${esc(hint)}</small>` : ''}</div>`;
}
function imgTag(src, alt, label, cls = '') {
  if (!src) return placeholder(label, '');
  return `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-ph="${esc(label)}" onerror="__imgFail(this)">`;
}
window.__imgFail = function (img) {
  const d = document.createElement('div');
  d.innerHTML = placeholder(img.dataset.ph || '이미지', img.getAttribute('src'));
  img.replaceWith(d.firstElementChild);
};

function tagHTML(label, color) { return `<span class="tag" data-c="${esc(color || 'gray')}">#${esc(label)}</span>`; }
function toolTags(keys = []) { return keys.map(k => TOOLS[k] ? tagHTML(TOOLS[k].label, TOOLS[k].color) : '').join(''); }

/* 작품 카드 */
function cardHTML(w, small = false) {
  return `<article class="card${small ? ' card--sm' : ''}">
    <div class="card-thumb">${imgTag(w.thumbnail, w.title, '썸네일')}</div>
    <div class="card-body">
      <div>
        <div class="card-chips"><span class="chip chip--dark">${esc(w.badge || CAT[w.category]?.label || '')}</span>${w.period ? `<span class="chip">${esc(w.period.replace(/\s*\(.*\)/, ''))}</span>` : ''}</div>
        <h3 class="card-name" style="margin-top:24px">${esc(w.title)}</h3>
        <p class="card-desc">${esc(w.summary)}</p>
      </div>
      <button class="card-detail" data-open="${esc(w.id)}">상세 보기</button>
    </div>
  </article>`;
}

/* ---------- 상세 보기 모달 ---------- */
const Modal = (() => {
  let el, lastFocus;
  function build() {
    el = document.createElement('div');
    el.className = 'modal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = `<button class="modal-close" aria-label="닫기">${ICON.close}</button><div class="modal-grid"></div>`;
    document.body.appendChild(el);
    // X 버튼을 눌러야만 닫힘 (딤드 클릭·ESC 로는 닫히지 않음)
    el.querySelector('.modal-close').addEventListener('click', close);
  }
  function open(id) {
    const w = PORTFOLIO.works.find(x => x.id === id); if (!w) return;
    if (!el) build();
    lastFocus = document.activeElement;
    // detail: 긴 이미지 한 장 (예전 방식 images: [...] 도 그대로 동작)
    const list = w.detail ? [w.detail] : (w.images && w.images.length ? w.images : ['']);
    const imgs = list.map((src, i) => imgTag(src, `${w.title} 상세`, list.length > 1 ? `상세 이미지 ${i + 1}` : '상세 이미지')).join('');
    el.querySelector('.modal-grid').innerHTML = `
      <article class="modal-panel">
        <header class="modal-head">
          <span class="tag" data-c="black">${esc(w.type ? w.type.split('·').pop().trim() : CAT[w.category].label)}</span>
          <h2 class="modal-title">${esc(w.title)}</h2>
          <p class="modal-summary">${esc(w.summary)}</p>
        </header>
        <div class="modal-images">${imgs}</div>
      </article>
      <aside class="modal-info">
        ${w.tools?.length ? `<div class="info-row"><span>Tools</span><div class="tags">${toolTags(w.tools)}</div></div>` : ''}
        ${w.period ? `<div class="info-row"><span>Period</span><p>${esc(w.period)}</p></div>` : ''}
        ${w.role ? `<div class="info-row"><span>Role</span><p>${esc(w.role)}</p></div>` : ''}
        ${w.type ? `<div class="info-row"><span>Type</span><p>${esc(w.type)}</p></div>` : ''}
      </aside>`;
    el.scrollTop = 0;
    // 스크롤바가 사라진 만큼 오른쪽 여백을 채워서 화면(그리드)이 옆으로 밀리지 않게
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.paddingRight = sbw ? sbw + 'px' : '';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.classList.add('is-locked');
    requestAnimationFrame(() => el.classList.add('is-open'));
    document.dispatchEvent(new CustomEvent('modal:open'));
    el.querySelector('.modal-close').focus({ preventScroll: true });
  }
  function close() {
    el.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    document.documentElement.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('modal:close'));
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) { e.preventDefault(); open(b.dataset.open); } });
  return { open, close };
})();

/* ---------- 연락처 버튼 (url: 링크 / popup: 작은 박스) ---------- */
function contactBtn(item, cls) {
  if (item.popup) {
    return `<span class="pop-wrap"><button type="button" class="btn ${cls}" data-pop aria-expanded="false">${esc(item.label)}</button><span class="pop" role="status">${esc(item.popup)}</span></span>`;
  }
  return `<a class="btn ${cls}" href="${esc(item.url || '#')}" target="_blank" rel="noopener">${esc(item.label)}</a>`;
}
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-pop]');
  document.querySelectorAll('[data-pop][aria-expanded="true"]').forEach(b => { if (b !== btn) b.setAttribute('aria-expanded', 'false'); });
  if (btn) btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('[data-pop][aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false')); });

/* ---------- 푸터 ---------- */
function renderFooter(target, topHref = '#') {
  const f = PORTFOLIO.footer;
  target.innerHTML = `<div class="container">
    <div class="footer-top">
      <div><p class="footer-label">CONTACT</p><h2 class="footer-headline">${esc(f.headline)}</h2></div>
      <div class="footer-actions">
        <p class="footer-email">${esc(f.email)}</p>
        <div class="footer-links">
          ${f.resume ? `<a class="btn btn--primary" href="${esc(f.resume)}" download>이력서 PDF ${ICON.download}</a>` : ''}
          ${(f.links || []).map(l => contactBtn(l, 'btn--glass btn--lg')).join('')}
        </div>
      </div>
    </div>
    <div class="footer-bottom"><span>${esc(f.copyright)}</span><a class="btn btn--text" href="${topHref}" data-top>맨 위로 ${ICON.up}</a></div>
  </div>`;
  target.querySelector('[data-top]').addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ---------- 스크롤바 폭 측정 → 카드·제목·화살표의 왼쪽 줄을 정확히 맞춤 ----------
   (100vw 는 스크롤바까지 포함해서, 윈도우처럼 스크롤바가 있는 화면에선 몇 px 어긋남) */
(() => {
  const root = document.documentElement;
  const measure = () => {
    if (root.style.overflow === 'hidden') return;   // 상세 보기 열려 있을 땐 그대로
    root.style.setProperty('--sbw', (window.innerWidth - root.clientWidth) + 'px');
  };
  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  new ResizeObserver(measure).observe(document.body);
})();
