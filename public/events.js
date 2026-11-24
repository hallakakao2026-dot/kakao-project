import { events, booths, departments } from './content.js';

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function action(label, handler, primary = false) {
  const node = element('button', label, 'btn' + (primary ? ' primary' : ''));
  node.type = 'button';
  node.addEventListener('click', handler);
  return node;
}

function page(root, title, backLabel, back) {
  const section = element('section', undefined, 'panel event-view');
  const heading = element('h1', title);
  heading.tabIndex = -1;
  const banner = element('img', undefined, 'banner');
  banner.src = title === '학과 상담 부스 안내' ? './assets/paths.webp' : './assets/schedule.webp';
  banner.alt = '';
  section.append(banner, heading);
  root.replaceChildren(section);
  heading.focus();
  const body = element('div', undefined, 'event-body');
  section.append(body, action(backLabel, back));
  return body;
}

function byDate(a, b) {
  return Date.parse(a.start) - Date.parse(b.start);
}

const dateFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric',
  hour: '2-digit', minute: '2-digit'
});
const monthFormat = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit'
});
function dateRange(item) {
  const start = dateFormat.format(new Date(item.start));
  return item.end ? start + ' ~ ' + dateFormat.format(new Date(item.end)) : start;
}

function details(rows) {
  const list = element('dl', undefined, 'event-facts');
  for (const [name, value] of rows) {
    list.append(element('dt', name), element('dd', value || '공개 예정'));
  }
  return list;
}

function officialLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

export function showEvents(root, back) {
  let month = '';
  const available = [...events].sort(byDate);
  function showList() {
    const body = page(root, '오프라인 체험 일정', '시작 화면으로', back);
    const label = element('label', '행사 월');
    const filter = element('select');
    filter.append(new Option('전체 월', ''));
    for (const key of new Set(available.map(item => monthFormat.format(new Date(item.start))))) {
      filter.append(new Option(key.replace('-', '년 ') + '월', key));
    }
    filter.value = month;
    label.append(filter);
    const list = element('div', undefined, 'event-list');
    list.setAttribute('aria-live', 'polite');
    function updateList() {
      month = filter.value;
      list.replaceChildren();
      const matching = available.filter(item => !month || monthFormat.format(new Date(item.start)) === month);
      if (!matching.length) list.append(element('p', '현재 공개된 체험 일정이 없습니다.', 'event-empty'));
      for (const item of matching) {
        const card = element('article', undefined, 'event-card');
        card.append(element('h2', item.name), element('p', dateRange(item)), element('p', item.location),
          action('행사 상세 보기', () => showDetail(item)));
        list.append(card);
      }
    }
    filter.addEventListener('change', updateList);
    body.append(label, list);
    updateList();
  }

  function showDetail(item) {
    const body = page(root, item.name, '행사 목록으로', showList);
    const related = departments.filter(dept => item.departmentIds?.includes(dept.id));
    body.append(details([
      ['운영 일시', dateRange(item)], ['장소', item.location], ['참가 대상', item.audience],
      ['관련 학과', related.map(dept => dept.name).join(', ')], ['신청 상태', item.applicationStatus]
    ]));
    const href = officialLink(item.applicationUrl);
    if (href) {
      const link = element('a', '공식 신청 페이지로 이동', 'btn primary');
      Object.assign(link, { href, target: '_blank', rel: 'noopener noreferrer' });
      body.append(link);
    }
  }
  showList();
}

export function showBooths(root, dept, back, answers = {}) {
  const body = page(root, '학과 상담 부스 안내', '체험 결과로', back);
  body.append(element('h2', dept.name));
  const related = booths.filter(booth => booth.departmentId === dept.id);
  const available = [...events].filter(item => related.some(booth => booth.eventId === item.id)).sort(byDate);
  if (!available.length) {
    body.append(element('p', '현재 공개된 상담 부스 정보가 없습니다.', 'event-empty'));
    return;
  }
  const label = element('label', '행사 선택');
  const select = element('select');
  select.append(new Option('행사를 선택해 주세요', ''));
  for (const item of available) select.append(new Option(item.name, item.id));
  label.append(select);
  const display = element('div', undefined, 'event-list');
  display.setAttribute('aria-live', 'polite');
  body.append(label, display);
  select.addEventListener('change', () => {
    display.replaceChildren();
    const item = available.find(candidate => candidate.id === select.value);
    if (!item) return;
    for (const booth of related.filter(entry => entry.eventId === item.id)) {
      const card = element('article', undefined, 'event-card');
      card.append(details([
        ['행사명', item.name], ['부스 운영 일시', booth.start ? dateRange(booth) : dateRange(item)],
        ['건물', booth.building], ['층', booth.floor], ['부스 번호', booth.number]
      ]));
      if (booth.map?.src) {
        const figure = element('figure', undefined, 'booth-map');
        const image = element('img');
        image.src = booth.map.src;
        image.alt = booth.map.alt || (dept.name + ' 상담 행사장 배치도');
        figure.append(image);
        const { x, y } = booth.map;
        if ([x, y].every(n => Number.isFinite(n) && n >= 0 && n <= 100)) {
          const point = element('span', '●', 'booth-pin');
          point.title = dept.name + ' 상담 부스';
          point.style.left = x + '%';
          point.style.top = y + '%';
          figure.append(point);
        }
        image.addEventListener('error', () => figure.replaceWith(element('p', '행사장 배치도를 불러올 수 없습니다.')));
        card.append(figure);
      } else {
        card.append(element('p', '현재 공개된 행사장 배치도가 없습니다.'));
      }
      const prompt = booth.prompts?.find(entry => answers[entry.questionId] === entry.choiceId);
      card.append(element('h3', '상담할 때 이렇게 물어보세요'), element('p', prompt?.text || '이 학과를 처음 접하는 학생이 참여할 수 있는 체험은 무엇인가요?'));
      display.append(card);
    }
  });
}
