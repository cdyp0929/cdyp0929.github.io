/* =========================================================
   포트폴리오 내용 파일
   ---------------------------------------------------------
   사이트에 보이는 글, 이미지, 작품은 전부 이 파일에서 바꿉니다.
   - 글자는 따옴표 '...' 안의 내용만 바꾸세요.
   - 이미지는 images 폴더에 넣고, 아래에 파일 경로를 적으세요.
     (경로가 비어 있거나 파일이 없으면 회색 자리 표시로 보입니다)
   - 항목을 추가할 때는 { ... }, 덩어리를 통째로 복사해서 붙여넣으세요.
     쉼표(,) 하나 빠지면 사이트가 안 나오니 주의!
   ========================================================= */

const PORTFOLIO = {

  /* ---------- 프로필 ---------- */
  profile: {
    name: '채동엽',
    role: 'UI/UX Designer',
    subtitle: '기술이 지나간 흔적에 가치를 더합니다.',   // PROFILE 제목 아래 한 줄 (없으면 지우기)
    bio: '사용자 경험을 중심으로 모바일 앱과 웹을 디자인합니다. 그래픽부터 3D, 영상까지 다양한 작업을 함께 다룹니다.',
    photo: 'images/profile.jpg',          // 전신 사진 (세로로 긴 사진 추천, 약 2:3)

    // url  : 누르면 그 주소로 이동
    // popup: 누르면 버튼 위에 작은 박스로 글자만 보여줌 (한 번 더 누르면 닫힘)
    contacts: [
      { label: 'Email',     popup: 'klsacom409@gmail.com' },
      { label: 'Instagram', url: 'https://instagram.com/disn_dy' },
    ],

    // 툴 숙련도 (level: 0~100)
    tools: [
      { tool: 'photoshop',    level: 82 },
      { tool: 'figma',        level: 92 },
      { tool: 'aftereffects', level: 87 },
    ],

    // 스킬 태그 (color: purple, blue, orange, navy, black, gray)
    skills: [
      { label: '피그마',      color: 'purple' },
      { label: '포토샵',      color: 'blue' },
      { label: '라이노',      color: 'black' },
      { label: '에프터이펙트', color: 'navy' },
      { label: '일러스트',    color: 'orange' },
      { label: '앱디자인',    color: 'gray' },
      { label: '웹 디자인',   color: 'gray' },
      { label: '그래픽 디자인', color: 'gray' },
      { label: '3D 디자인',   color: 'gray' },
      { label: 'AI 활용',     color: 'gray' },
    ],

    // sub: 제목 아래 작은 글씨 (전공 등, 없으면 지워도 됨)
    education: [
      { title: '한국폴리텍대학 제주캠퍼스', sub: '소프트웨어 융합디자인 · 졸업 예정', date: '2023.03 – 2027.02' },
      { title: '제주 세화고등학교', sub: '졸업', date: '2020.03 – 2023.02' },
    ],
    awards: [                             // 비어 있으면 'Awards' 제목만 보입니다 (항목을 지우려면 awards 줄 전체 삭제)
    ],
    certificates: [
      { title: '컴퓨터그래픽스운용기능사', sub: '한국산업인력공단', date: '필기 합격' },
      { title: '웹디자인개발기능사', sub: '한국산업인력공단', date: '필기 합격' },
    ],
  },

  /* ---------- 푸터 ---------- */
  footer: {
    headline: '함께 일할 디자이너를\n찾고 계신가요?',
    email: 'klsacom409@gmail.com',
    resume: '',                           // 이력서 PDF: files 폴더에 넣고 'files/resume.pdf' 로 적으면 버튼이 생깁니다
    links: [                              // url 또는 popup (프로필과 같은 방식)
      { label: 'Instagram', url: 'https://instagram.com/disn_dy' },
    ],
    copyright: '© 2026 Chae dongyeop',
  },

  /* ---------- 카테고리 소개 (모두 보기 페이지) ---------- */
  categories: {
    web:    { title: 'WEB DESIGN',    tab: 'Web',    desc: '반응형 웹사이트와 랜딩 페이지 작업을 모았습니다.' },
    mobile: { title: 'MOBILE DESIGN', tab: 'Mobile', desc: '모바일 앱 UI/UX 작업을 모았습니다.' },
    other:  { title: 'OTHER',         tab: 'Other',  desc: '그래픽, 3D, 영상 등 다양한 작업을 모았습니다.' },
  },

  /* ---------- 작품 ----------
     category : 'web' | 'mobile' | 'other'
     badge    : 카드 제목 위 검정 라벨을 바꾸고 싶을 때 (예: 'Video'), 없으면 카테고리 이름
     featured : true 이면 맨 위 빌보드(히어로)에도 나옵니다
     thumbnail: 카드 썸네일 (모든 작품 같은 비율! 636 x 366 비율 권장, 예: 1272 x 732)
     detail   : 상세 보기 이미지 한 장 (커버까지 포함한 일체형 긴 이미지, 가로 1080~2160 권장)
     tools    : photoshop, figma, illustrator, aftereffects, premiere, rhino, keyshot, blender, higgsfield, claude, gpt, code(HTML·CSS·JS)
     hero     : 빌보드에 크게 보일 이미지 (featured 작품만, 1920 x 1080 권장)
     logo     : 빌보드 제목 위 작은 아이콘 (없으면 비워두기)
  ------------------------------------------------------------ */
  works: [
    {
      id: 'ours',
      category: 'mobile',
      featured: true,
      title: 'OURS — 우리의 시간을 맞추는 스케줄 앱',
      heroLabel: 'OURS',
      heroTitle: '우리의 시간을 맞추는\n스케줄 앱',
      summary: '대화에서 시작해 캘린더로 끝나는 일정 조율 앱. 모두의 시간을 모아 바로 일정을 확정합니다.',
      thumbnail: 'images/works/ours/thumb.jpg',
      hero: 'images/works/ours/hero.png',
      heroTheme: 'light',                       // 밝은 빌보드 이미지면 'light' (글자·버튼이 검정으로), 어두우면 지우기
      logo: 'images/works/ours/logo.png',
      detail: 'images/works/ours/detail.jpg',
      tools: ['figma', 'photoshop', 'illustrator'],
      period: '2026.10 – 2026.11 (5주)',
      role: 'UI/UX 디자인 100%\n기획 · 리서치 · 프로토타이핑',
      type: '개인 프로젝트 · Mobile App',
    },

    {
      id: 'portfolio',
      category: 'web',
      title: '채동엽 포트폴리오 웹사이트',
      summary: 'Figma로 설계하고 웹으로 구현한 개인 포트폴리오 사이트입니다.',
      thumbnail: 'images/works/portfolio/thumb.jpg',
      detail: 'images/works/portfolio/detail.jpg',
      tools: ['figma', 'code'],
      period: '2026.11',
      role: '기획 · UI 디자인 100%\n퍼블리싱 (AI 협업)',
      type: '개인 프로젝트 · Web',
    },

    {
      id: 'polytech-film',
      category: 'other',
      badge: 'Video',                           // 카드 제목 위 검정 라벨 (없으면 카테고리 이름이 나옴)
      featured: true,
      title: '늦은 출발선',
      heroLabel: '늦은 출발선',
      heroTitle: '캠퍼스의 순간,\n폴리텍의 이야기',
      heroVideo: 'images/works/polytech-film/hero.mp4',   // 빌보드 영상 (소리 없이 반복 재생)
      hero: 'images/works/polytech-film/hero.jpg',        // 영상 로딩 전에 보이는 첫 화면 (없어도 됨)
      summary: '청년의 늦은 재출발을 담은 AI 단편 드라마 (2분 15초)\n한국폴리텍대학 영상 공모전 출품작',
      thumbnail: 'images/works/polytech-film/thumb.jpg',
      detail: 'images/works/polytech-film/detail.jpg',
      tools: ['higgsfield', 'premiere', 'aftereffects', 'figma', 'claude', 'gpt'],
      period: '2026.11',
      role: '기획 · 시나리오 · 연출 100%\nAI 영상 생성 · 편집 · 모션',
      type: '개인 작업 · 공모전 출품 · AI 영상',
    },

    // 새 작품은 위 { ... }, 덩어리 하나를 통째로 복사해서 여기에 붙여넣고 내용을 바꾸세요.
    // 작품이 하나도 없는 카테고리는 메인 화면·메뉴·탭에서 자동으로 숨겨집니다.
  ],
};
