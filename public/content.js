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
export const finalContent = {};
export const finalIntros = {};
// Set each department independently to 'final' when approved questions are ready.
export const contentMode = Object.fromEntries(catalog.map(([id]) => [id, 'demo']));

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
      if (!Array.isArray(q.choices) || q.choices.length !== 3) throw new Error('선택지 3개 필요: ' + path);
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
