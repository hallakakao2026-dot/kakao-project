// Display names are planning labels. IDs are stable references used in answers and booths.
export const CONTENT_VERSION = 'campus-demo-1';
export const guide = { name: '지우', portrait: './assets/jiwoo.png' };

const catalog = [
  ['welfare', '사회복지학과', '이웃의 이야기', '마을 이야기 카드'],
  ['open-major', '자유전공학과', '관심 분야 탐색', '관심 분야 카드'],
  ['police', '경찰행정학과', '기록 속 단서', '관찰 기록 카드'],
  ['mobility', '미래모빌리티', '이동의 아이디어', '이동 장면 카드'],
  ['infrastructure', '도시인프라', '동네 공간 관찰', '동네 풍경 카드'],
  ['tourism', '문화관광', '작은 여행 기획', '여행 장면 카드'],
  ['fire-safety', '소방안전학과', '안전 전시 둘러보기', '전시 장면 카드'],
  ['rail', '철도운전시스템학과', '철도 풍경 탐색', '철도 풍경 카드'],
];

function choice(id, text, reaction, explanation) {
  return { id, text, reaction, explanation, preference: null };
}

function makeDemoQuestions(departmentId, activity, card) {
  function question(id, title, lesson, scene, prompt, choices, recommended) {
    return {
      id, course: '시연용 가상 활동', title, lesson, scene, prompt,
      background: departmentId === 'rail' ? './assets/postcard.webp' : './assets/intro-'+departmentId+'.webp', portrait: guide.portrait, choices, recommended,
    };
  }
  return [
    question('open', '첫 번째 탐색 카드', '오늘은 제목을 읽고 같은 이름의 자료를 찾는 카드 활동이야.',
      '지우가 봉투 세 개와 활동 수첩을 건넸다.', '어떤 봉투를 열어 볼까?',
      [choice('map', '캠퍼스 지도', '지도도 궁금하지!', '이번 활동에 쓰는 봉투에는 수첩과 같은 카드 이름이 적혀 있어.'),
       choice('card', card, '찾았다! 함께 열어 보자.', '수첩에 적힌 카드 이름과 봉투의 이름이 같아.'),
       choice('end', '완료 스티커', '마무리할 때 쓸 스티커야.', '지금은 활동 자료가 담긴 봉투를 찾는 차례야.')], 'card'),
    question('observe', '그림에서 발견한 것', '보이는 것과 상상한 것을 나누어 메모해 보자.',
      card + ' 한쪽에 파란 가방이 그려져 있다.', '그림에서 직접 확인한 것은?',
      [choice('bag', '파란 가방이 보여요', '나도 같은 걸 발견했어!', '가방의 모습과 색은 그림으로 확인할 수 있어.'),
       choice('new', '오늘 산 가방이에요', '새것처럼 보였구나.', '구입한 날짜는 그림에 나오지 않아.'),
       choice('gift', '친구에게 줄 선물이에요', '재미있는 상상이네.', '누구에게 줄 물건인지는 그림만 보고 알기 어려워.')], 'bag'),
    question('listen', '친구의 관심 듣기', '친구의 관심은 직접 물어보면 알 수 있어.',
      '두 사람이 같은 카드를 보다가 서로 다른 부분을 가리켰다.', '친구의 생각을 들으려면?',
      [choice('guess', '내가 대신 이유 말하기', '먼저 떠오른 생각이 있구나.', '친구의 생각을 알고 싶을 때는 친구에게 말할 기회를 줘.'),
       choice('skip', '다음 카드로 넘어가기', '다른 장면도 기다리고 있어.', '지금 궁금한 점을 물어보면 이 장면을 더 이야기할 수 있어.'),
       choice('ask', '어떤 점이 눈에 띄었어?', '좋아, 친구 이야기를 들어 보자.', '열린 질문을 하면 친구가 관심을 가진 이유를 자기 말로 들려줄 수 있어.')], 'ask'),
    question('sort', '메모 정리하기', '수첩에는 ‘관찰한 것’과 ‘궁금한 것’ 두 칸이 있어.',
      '친구와 이야기하다가 “이 장면 다음에는 무슨 일이 생길까?”라는 메모를 남겼다.', '이 메모는 어디에 둘까?',
      [choice('seen', '관찰한 것', '이미 본 장면을 모으는 곳이야.', '다음에 일어날 일은 아직 본 내용이 아니야.'),
       choice('wonder', '궁금한 것', '다음 탐색을 위한 질문이 생겼네!', '메모 속 문장은 아직 답을 찾아보지 않은 질문이야.'),
       choice('both', '두 칸 모두', '두 칸에 함께 적고 싶었구나.', '이번 메모의 역할은 궁금한 점을 남기는 것이야.')], 'wonder'),
    question('share', '짧은 소개 준비', '한 장을 골라 제목과 고른 이유를 소개해 보자.',
      '작은 발표 시간. 지우가 비어 있는 소개 카드를 내밀었다.', '어떻게 채울까?',
      [choice('reason', '카드 제목과 고른 이유 쓰기', '어떤 점이 좋았는지 들려줘!', '제목과 이유를 함께 적으면 선택한 장면을 친구에게 설명할 수 있어.'),
       choice('number', '카드 개수만 적기', '개수를 세어 봤구나.', '몇 장인지에 더해 어떤 장면을 골랐는지 알려 줘.'),
       choice('cover', '봉투 색만 적기', '봉투 색도 기억했네.', '친구가 장면을 떠올릴 수 있도록 제목과 이유를 더해 보자.')], 'reason'),
    question('finish', '다음 탐색을 위한 질문', '체험을 마치며 더 알고 싶은 점을 질문으로 남겨 보자.',
      '‘' + activity + '’ 활동 수첩의 마지막 칸이 비어 있다.', '어떤 메모를 남길까?',
      [choice('stamp', '체험을 마쳤어요', '끝까지 함께했네!', '완료 소감에 이어 다음에 알고 싶은 것도 적어 볼 수 있어.'),
       choice('title', '오늘의 활동 제목', '제목을 잘 기억했구나.', '제목에서 한 걸음 더 나아가 궁금한 점을 질문해 보자.'),
       choice('question', '어떤 활동을 더 해 볼 수 있을까?', '좋아, 상담 때도 물어보자!', '다음에 알아볼 내용을 질문으로 남기면 전공 탐색을 이어 갈 수 있어.')], 'question'),
  ];
}

export const demoContent = Object.fromEntries(catalog.map(([id, , activity, card]) =>
  [id, makeDemoQuestions(id, activity, card)]));
function fireQuestion(id, title, scene, lesson, prompt, options, recommended) {
  return {
    id, title, scene, lesson, prompt, recommended,
    course: '소방안전 기초와 진로 탐색',
    background: './assets/fire-' + id + '.webp', portrait: guide.portrait,
    choices: options.map(([key, text, explanation]) =>
      choice(key, text, key === recommended ? '잘 짚었어!' : '이렇게 생각해 보자.', explanation)),
  };
}

export const finalContent = {
  'fire-safety': [
    fireQuestion('triangle', '불이 타는 세 가지 조건',
      '전시판의 삼각형에는 나무, 공기, 열을 나타내는 그림이 있어.',
      '삼각형에서 꼭짓점 하나가 사라지면 어떻게 될지 생각해 봐.',
      '불이 붙으려면 탈 물질, 산소, 열이 모두 있어야 한다. O일까, X일까?',
      [['o', 'O', '탈 물질, 산소, 열을 연소의 3요소라고 해. 하나를 제거하면 연소가 지속되지 않아.'],
       ['x', 'X', '연소의 3요소 모형에서는 세 가지가 모두 필요해. 탈 물질과 산소가 있어도 충분한 열이 없으면 불이 붙지 않아.']], 'o'),
    fireQuestion('pan', '뚜껑을 덮는 이유',
      '주방 모형에는 금속 뚜껑이 프라이팬을 빈틈없이 덮고 있어.',
      '뚜껑을 덮기 전과 후에 팬 안으로 들어갈 수 있는 것이 어떻게 달라질까?',
      '프라이팬에 난 불을 뚜껑으로 덮으면 무엇의 공급을 막을까?',
      [['fuel', '탈 물질', '뚜껑을 덮어도 팬 속 기름은 남아 있어. 달라지는 것은 공기가 들어올 수 있는지야.'],
       ['oxygen', '산소', '뚜껑이 공기를 차단하면 불에 산소가 공급되기 어려워져. 이를 질식소화라고 해.'],
       ['heat', '열', '뚜껑을 덮는다고 뜨거운 팬이 바로 식지는 않아. 주된 효과는 산소 공급을 막는 거야.'],
       ['power', '전기', '뚜껑은 전원을 끄는 장치가 아니야. 팬 안으로 들어오는 공기를 차단해.']], 'oxygen'),
    fireQuestion('careers', '안전을 지키는 진로',
      '진로 전시대에 소방 헬멧, 건물 점검표, 안전교육 자료가 놓여 있어.',
      '현장 대응, 화재 예방, 안전교육 중 어떤 일과 연결되는지 살펴봐.',
      '소방안전학과 졸업 후의 진로와 가장 관련이 적은 것은?',
      [['officer', '소방공무원', '소방공무원은 화재 진압과 구조 등 현장 안전 업무를 맡아 전공과 관련이 깊어.'],
       ['manager', '소방안전관리자', '건물의 화재 예방과 소방안전 관리는 소방안전 분야의 대표적인 업무야.'],
       ['institute', '한국소방안전원', '한국소방안전원은 소방안전 교육을 하는 기관이라 이 분야와 관련이 있어.'],
       ['gamer', '프로게이머', '프로게이머의 주된 활동은 게임 대회 출전이야. 나머지 세 가지는 화재 대응, 건물 안전관리, 안전교육과 이어져.']], 'gamer'),
    fireQuestion('exit', '대피할 길 살피기',
      '실내 훈련 공간에 소화기와 창문, 밖으로 통하는 출입문이 보여.',
      '불이 커져도 바로 빠져나갈 수 있는 방향을 생각해 봐. 실제 화재에서 연기가 많거나 위험하면 대피가 먼저야.',
      '건물 안에서 소화기를 쓸 때 어디를 등지고 서야 할까?',
      [['fire', '불', '불을 등지면 불의 상태를 살피기 어렵고 대피로를 놓칠 수 있어.'],
       ['door', '탈출할 문', '대피할 문을 등지고 있으면 상황이 위험해질 때 불을 지나지 않고 바로 빠져나갈 수 있어.'],
       ['window', '창문', '창문이 안전한 출구라는 보장은 없어. 밖으로 대피할 수 있는 문을 기준으로 서야 해.'],
       ['wall', '벽', '벽은 대피할 통로가 아니야. 뒤쪽에 대피할 문이 있는지 확인하는 게 중요해.']], 'door'),
  ],
};
export const finalIntros = { 'fire-safety': '오늘은 연소의 원리부터 대피로와 진로까지, 네 가지 소방안전 퀴즈를 함께 풀어 보자!' };

// Set each department independently to 'final' when approved questions are ready.
export const contentMode = Object.fromEntries(catalog.map(([id]) => [id, id === 'fire-safety' ? 'final' : 'demo']));

export const departments = catalog.map(([id, name, activity, card]) => {
  const mode = contentMode[id];
  if (!['demo', 'final'].includes(mode)) throw new Error('알 수 없는 콘텐츠 모드: ' + id);
  const questions = (mode === 'demo' ? demoContent : finalContent)[id] ?? [];
  const intro = mode === 'demo'
    ? '오늘은 ‘' + activity + '’ 활동이야. 수첩에 적힌 ‘' + card + '’부터 찾아보자!'
    : finalIntros[id] ?? '반가워! 함께 ' + name + ' 체험을 시작해 보자.';
  return { id, name, intro,
    icon: './assets/icon-'+id+'.webp', background: './assets/intro-'+id+'.webp', portrait: guide.portrait,
    status: questions.length ? mode : 'unavailable', questions };
});

export const events = [];
export const booths = [];

function requireText(value, path) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('빈 항목: ' + path);
}

function checkIds(items, path) {
  const seen = new Set();
  for (const item of items) {
    requireText(item?.id, path + '.id');
    if (seen.has(item.id)) throw new Error('중복 ID: ' + path + '/' + item.id);
    seen.add(item.id);
  }
}

export function validateContent(items = departments) {
  checkIds(items, '학과');
  for (const dept of items) {
    for (const key of ['name', 'intro', 'background', 'portrait']) requireText(dept[key], dept.id + '.' + key);
    if (!Array.isArray(dept.questions) || !['demo', 'final', 'unavailable'].includes(dept.status))
      throw new Error('학과 콘텐츠 상태 오류: ' + dept.id);
    if ((dept.questions.length === 0) !== (dept.status === 'unavailable'))
      throw new Error('문항 수와 상태 불일치: ' + dept.id);
    checkIds(dept.questions, dept.id);
    for (const q of dept.questions) {
      const path = dept.id + '/' + q.id;
      for (const key of ['course', 'title', 'lesson', 'scene', 'prompt', 'background', 'portrait'])
        requireText(q[key], path + '.' + key);
      if (!Array.isArray(q.choices) || ![2, 3, 4].includes(q.choices.length)) throw new Error('선택지 2~4개 필요: ' + path);
      checkIds(q.choices, path);
      for (const c of q.choices) {
        for (const key of ['text', 'reaction', 'explanation']) requireText(c[key], path + '/' + c.id + '.' + key);
      }
      if (!q.choices.some(c => c.id === q.recommended)) throw new Error('권장 답 참조 오류: ' + path);
    }
  }
  return true;
}
validateContent();
