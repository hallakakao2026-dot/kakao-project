import { departments, guide } from './content.js'
import { summary, analysisText, saveCard } from './results.js'
import { showEvents, showBooths } from './events.js'

const root = document.querySelector('#app')
let nickname = '', dept, index = 0, answers = {}, png
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const icons = {play:'M7 3v18l14-9z',calendar:'M3 5h3V2h2v3h8V2h2v3h3v16H3zm2 6v8h14v-8z',pin:'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6'}
const icon = key => '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="'+icons[key]+'"/></svg>'
function view(html) {
  if (png) {URL.revokeObjectURL(png); png = null}
  root.innerHTML = html
  const heading = root.querySelector('h1')
  if (heading) {heading.tabIndex = -1; heading.focus({preventScroll:true})}
  window.scrollTo(0,0)
}
function button(id,label,primary=false) {
  return '<button type="button" class="btn '+(primary?'primary':'')+'" id="'+id+'">'+label+'</button>'
}
const on = (id,fn) => document.getElementById(id).onclick = fn
function home() {
  view('<section class="window cover"><h1 class="cover-title"><img src="./assets/cover.webp" alt="한라 학과 체험"></h1><div class="cover-menu"><p>선배 지우와 함께 한라대 학과를 체험해요!</p><div class="actions">'+button('start','체험 시작 '+icon('play'),true)+button('events',icon('calendar')+'오프라인 체험 일정')+'</div></div></section>')
  on('start',namePage); on('events',()=>showEvents(root,home))
}
function dialog(line,portrait=guide.portrait) {
  return '<div class="dialog"><img class="portrait" src="'+escape(portrait)+'" alt=""><div><strong>선배 '+escape(guide.name)+'</strong><p>'+escape(line)+'</p></div></div>'
}
function namePage() {
  view('<section class="panel inner"><img class="banner" src="./assets/welcome.webp" alt=""><h1>어떻게 불러 줄까?</h1>'+dialog('체험하는 동안 내가 뭐라고 불러 주면 좋을까? 닉네임을 정해 줘!')+'<form><label for="nickname">닉네임</label><input id="nickname" maxlength="24" required placeholder="닉네임 입력" autocomplete="off" value="'+escape(nickname)+'"><div class="nav">'+button('back','이전')+'<button class="primary">학과 선택</button></div></form></section>')
  on('back',home)
  root.querySelector('form').onsubmit = e => {e.preventDefault(); const field = document.querySelector('#nickname'); nickname=field.value.trim(); if(!nickname){field.value='';field.reportValidity();return} selectDept()}
}
function selectDept(){
  view('<section class="panel inner"><img class="banner" src="./assets/paths.webp" alt=""><h1>학과 선택</h1><p>'+escape(nickname)+'님, 어떤 학과를 체험해 볼까요?</p><div class="grid">'+departments.map(d=>'<button class="dept" data-id="'+escape(d.id)+'" '+(d.status==='unavailable'?'disabled':'')+'><img class="dept-icon" src="'+escape(d.icon)+'" alt="">'+escape(d.name)+(d.status==='unavailable'?' · 콘텐츠 준비 중':'')+'</button>').join('')+'</div><div class="nav">'+button('back','이전')+'</div></section>')
  root.querySelectorAll('.dept').forEach(b=>b.onclick=()=>{dept=departments.find(d=>d.id===b.dataset.id);restart()});on('back',namePage)
}
function restart(){index=0;answers={};intro()}
const status=()=>dept.status==='demo'?'시연용 임시 콘텐츠':'학과 체험'
function intro(){
  view('<section class="window inner"><div class="windowbar">'+status()+'</div><img class="scene" src="'+escape(dept.background)+'" alt="가상 캠퍼스"><div class="panelbody"><h1>'+escape(dept.name)+'</h1>'+dialog(dept.intro,dept.portrait)+'<div class="nav">'+button('back','학과 선택')+button('go','체험 시작',true)+'</div></div></section>')
  on('back',selectDept);on('go',play)
}
function play(){
  const q=dept.questions[index]
  view('<section class="panel"><div class="topline"><strong>'+escape(dept.name)+'</strong><span class="chip">'+(index+1)+' / '+dept.questions.length+'</span></div><p class="eyebrow">'+status()+'</p><h1>'+escape(q.title)+'</h1><div class="play"><div><img class="scene" src="'+escape(q.background)+'" alt="가상 캠퍼스"><p>'+escape(q.scene)+'</p>'+dialog(q.lesson,q.portrait)+'<small>연결 수업 · '+escape(q.course)+'</small></div><div><h2>'+escape(q.prompt)+'</h2>'+q.choices.map((c,i)=>'<button class="choice" aria-pressed="false" data-id="'+escape(c.id)+'">'+String(i+1).padStart(2,'0')+' &nbsp; '+escape(c.text)+'</button>').join('')+'<div id="response" aria-live="polite"></div><div class="nav">'+button('prev','이전')+button('next',index === dept.questions.length-1 ? '결과 보기' : '다음 문항',true)+'</div></div></div></section>')
  function sync(){
    const selected=q.choices.find(c=>c.id===answers[q.id])
    root.querySelectorAll('.choice').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===selected?.id)))
    const r=document.querySelector('#response')
    const next = document.querySelector('#next')
    r.replaceChildren()
    r.hidden = !selected
    if (selected) {
      const active = root.querySelector('.choice[aria-pressed="true"]')
      active.dataset.grade = selected.id === q.recommended ? 'correct' : 'incorrect'
      active.after(r)
      const correct = q.choices.find(choice => choice.id === q.recommended)
      const verdict = selected.id === correct.id ? '정답이에요!' : '오답이에요. 정답은 ‘'+correct.text+'’예요.'
      r.className = 'feedback'
      r.innerHTML = '<strong>'+escape(verdict)+'</strong><p>'+escape(selected.reaction)+'</p><p>'+escape(selected.explanation)+'</p>'
    }
    next.disabled = !selected
  }
  root.querySelectorAll('.choice').forEach(button => {
    button.onclick = () => {
      answers[q.id] = button.dataset.id
      sync()
    }
  })
  on('prev',e=>{if(!e.currentTarget.isConnected||e.detail>1)return;if(index){index--;play()}else intro()})
  on('next', e => {
    if (!e.currentTarget.isConnected || e.detail > 1 || !answers[q.id]) return
    if (index === dept.questions.length-1) result()
    else { index++; play() }
  })
  sync()
}
function result(){
  const rows=summary(dept,answers)
  view('<section class="panel inner"><img class="banner" src="./assets/complete.webp" alt=""><p class="eyebrow">'+status()+'</p><h1>'+escape(nickname)+'님의 체험 기록</h1><p><strong>'+escape(dept.name)+'</strong> · '+rows.length+' / '+dept.questions.length+'문항 완료</p>'+dialog('끝까지 함께해 줘서 고마워! 네가 고른 답을 돌아볼까?')+'<h2>나의 선택 내역</h2><ol class="resultlist">'+rows.map(r=>'<li><strong>'+escape(r.title)+'</strong>'+escape(r.text)+'</li>').join('')+'</ol><p class="feedback">'+escape(analysisText())+'</p><div class="sheet">'+button('save','결과 이미지 저장',true)+button('again','다시 체험')+button('other','다른 학과 선택')+button('booth','직접 상담해 보기')+'</div><div id="notice" role="status"></div></section>')
  on('again',restart);on('other',selectDept);on('booth',()=>showBooths(root,dept,result,answers))
  on('save',async e=>{
    const btn=e.currentTarget,notice=document.querySelector('#notice')
    btn.disabled=true;notice.textContent='이미지 저장 중…'
    try{const card=await saveCard(nickname,dept,answers);if(!btn.isConnected){URL.revokeObjectURL(card.url);return}if(png)URL.revokeObjectURL(png);png=card.url;const link=document.createElement('a');link.href=png;link.download=card.filename;link.click();link.removeAttribute('download');link.target='_blank';link.rel='noopener';link.textContent='결과 이미지 열어 저장하기';notice.replaceChildren(link)}
    catch{notice.textContent='이미지를 저장하지 못했어요. 다시 시도해 주세요.'}finally{btn.disabled=false}
  })
}
document.querySelector('#home').onclick=home
home()
