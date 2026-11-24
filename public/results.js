// All result views use the current questions and resolve stable choice IDs.
export function summary(dept, answers) {
  return dept.questions.flatMap(question => {
    const choice = question.choices.find(item => item.id === answers[question.id])
    return choice ? [{ title: question.title, text: choice.text }] : []
  })
}

export function analysisText() {
  return '성향 분석 기준 준비 중'
}

const fontStack = 'system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
const cardWidth = 720
const pad = 54

function wrappedLines(context, value, maxWidth) {
  const lines = []
  for (const paragraph of String(value).split(/\r?\n/)) {
    let current = ''
    for (const character of paragraph) {
      if (current && context.measureText(current + character).width > maxWidth) {
        lines.push(current.trimEnd())
        current = ''
      }
      if (current || character !== ' ') current += character
    }
    lines.push(current)
  }
  return lines
}

export async function saveCard(nickname, dept, answers) {
  await document.fonts?.ready
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) throw new Error('결과 이미지를 만들 수 없습니다.')
  const rows = summary(dept, answers)
  const blocks = []
  const banner = new Image()
  banner.src = './assets/complete.webp'
  await banner.decode()
  const bannerHeight = Math.round((cardWidth - 44) * banner.height / banner.width)
  let y = 45 + bannerHeight
  function addText(value, { size, bold = false, color = '#152956', gap = 0 }) {
    const font = (bold ? '700 ' : '400 ') + size + 'px ' + fontStack
    context.font = font
    const lineHeight = Math.ceil(size * 1.53)
    for (const line of wrappedLines(context, value, cardWidth - 2 * pad)) {
      blocks.push({ line, font, color, y })
      y += lineHeight
    }
    y += gap
  }
  addText('한라 학과 체험  /  학생 프로젝트', { size: 19, bold: true, color: '#2455a8', gap: 17 })
  addText(nickname + '님의 체험 기록', { size: 38, bold: true })
  addText(dept.name, { size: 28, bold: true, gap: 10 })
  if (dept.status === 'demo') addText('시연용 임시 콘텐츠', { size: 19, color: '#2455a8' })
  addText(rows.length + ' / ' + dept.questions.length + '문항 완료', { size: 21, gap: 24 })
  const dividerY = y - 11
  addText('나의 선택 내역', { size: 24, bold: true, gap: 10 })
  rows.forEach(({ title, text }, i) => {
    addText(String(i + 1).padStart(2, '0') + '   ' + title, { size: 19, bold: true, color: '#2455a8' })
    addText(text, { size: 23, gap: 14 })
  })
  addText(analysisText(), { size: 19, color: '#435875' })
  canvas.width = cardWidth
  canvas.height = y + 49
  context.fillStyle = '#e2f2ff'
  context.fillRect(0, 0, cardWidth, canvas.height)
  context.fillStyle = '#265db9'
  context.fillRect(18, 18, cardWidth - 36, canvas.height - 36)
  context.fillStyle = '#fff'
  context.fillRect(22, 22, cardWidth - 44, canvas.height - 44)
  context.drawImage(banner, 22, 22, cardWidth - 44, bannerHeight)
  context.fillStyle = '#c6e2ff'
  context.fillRect(pad, dividerY, cardWidth - 2 * pad, 3)
  context.textBaseline = 'top'
  for (const block of blocks) {
    context.fillStyle = block.color
    context.font = block.font
    context.fillText(block.line, pad, block.y)
  }
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(result => result ? resolve(result) : reject(new Error('PNG 파일을 생성할 수 없습니다.')), 'image/png')
  })
  return { url: URL.createObjectURL(blob), filename: '한라학과체험-' + dept.id + '.png' }
}
