(() => {
  const points={
    dadaepo:{name:'다대포',high:'03:12',low:'20:42'},amnam:{name:'암남공원',high:'03:19',low:'20:49'},yeongdo:{name:'영도 흰여울',high:'03:25',low:'20:55'},haeundae:{name:'청사포',high:'03:32',low:'21:02'},gijang:{name:'기장 연화리',high:'03:39',low:'21:09'}
  };
  let selected='dadaepo';
  const header=document.querySelector('.single-head');
  if(!header)return;
  header.insertAdjacentHTML('beforeend','<section class="tide-depth-guide" aria-live="polite"><div class="depth-figure" id="depthFigure"><span aria-hidden="true">🧍</span><i></i></div><div><p>현재 예상 수심 · <b id="depthPoint">다대포</b></p><strong id="depthValue">계산 중…</strong><small id="depthHint">성인 170cm 기준 체감 위치입니다.</small></div></section>');
  const value=document.querySelector('#depthValue'),hint=document.querySelector('#depthHint'),pointName=document.querySelector('#depthPoint'),figure=document.querySelector('#depthFigure');
  const minutes=time=>{const [hour,minute]=time.split(':').map(Number);return hour*60+minute;};
  const update=()=>{
    const point=points[selected],now=new Date(),nowMinutes=now.getHours()*60+now.getMinutes()+now.getSeconds()/60;
    const high=minutes(point.high),cycle=12*60+25;
    const phase=((nowMinutes-high+1440)%1440)/cycle*Math.PI*2;
    const ratio=(Math.cos(phase)+1)/2;
    const depth=.3+ratio*1.8;
    const water=Math.round(Math.min(96,Math.max(4,(depth/1.7)*100)));
    const level=depth<.15?'발목':depth<.35?'종아리':depth<.55?'무릎':depth<.85?'허벅지':depth<1.1?'허리':depth<1.35?'가슴':depth<1.55?'어깨':'어깨 이상';
    figure.style.setProperty('--water-level',`${water}%`);
    pointName.textContent=point.name;
    value.textContent=`약 ${depth.toFixed(1)} m · ${level}`;
    hint.textContent=`성인 170cm 기준 · ${now.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})} 기준 · 파도·지형에 따라 실제 수심은 달라질 수 있어요.`;
  };
  document.addEventListener('click',event=>{
    const pin=event.target.closest('[data-p]');if(!pin||!points[pin.dataset.p])return;
    selected=pin.dataset.p;update();
  },true);
  update();setInterval(update,60000);
})();
