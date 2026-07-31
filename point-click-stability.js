/* 포인트 클릭은 이 파일에서 한 번만 처리한다. 기존 보정 스크립트의 중복 클릭 처리를 막아 멈춤을 방지한다. */
(() => {
  const points={
    dadaepo:{name:'다대포 해수욕장',high:'03:12',low:'20:42',best:'18:50 — 22:20',desc:'모래와 갯벌이 드러나는 완만한 해안입니다.',species:['바지락','낙지','고둥','맛조개','망둥어','꽃게']},
    amnam:{name:'암남공원',high:'03:19',low:'20:49',best:'19:00 — 22:30',desc:'바위틈을 관찰하기 좋은 암반 조간대입니다.',species:['소라','멍게','고둥','전복','성게','불가사리']},
    yeongdo:{name:'영도 흰여울',high:'03:25',low:'20:55',best:'19:10 — 22:40',desc:'자갈과 암반이 이어지는 해안입니다.',species:['소라','낙지','해삼','성게','고둥','문어']},
    haeundae:{name:'해운대 청사포',high:'03:32',low:'21:02',best:'19:20 — 22:50',desc:'자갈·암반 지대의 관찰 포인트입니다.',species:['멍게','소라','바지락','해삼','꽃게','망둥어']},
    gijang:{name:'기장 연화리',high:'03:39',low:'21:09',best:'19:25 — 23:00',desc:'완만한 암반과 모래가 만나는 해안입니다.',species:['멍게','바지락','전복','성게','해삼','고둥']}
  };
  const sheet=document.querySelector('#sheet');
  if(!sheet)return;
  let opening=false;
  const open=id=>{
    const point=points[id];if(!point||opening)return;
    opening=true;
    sheet.innerHTML='<button class="sheet-close" id="sheetX" aria-label="포인트 정보 닫기">×</button><p class="sheet-kicker">SELECTED POINT</p><h2>'+point.name+'</h2><p class="sheet-desc">'+point.desc+'</p><div class="time-cards"><div><span>▲ 밀물</span><b>'+point.high+'</b></div><div><span>▼ 썰물</span><b>'+point.low+'</b></div><div class="best"><span>해루질 적정 시간</span><b>'+point.best+'</b></div></div><h3 class="species-heading">이곳에서 만날 수 있는 생물</h3><div class="species-chips">'+point.species.map(name=>'<button type="button" data-life="'+name+'">'+name+' ›</button>').join('')+'</div>';
    sheet.classList.add('show');
    document.querySelector('#sheetX').onclick=()=>sheet.classList.remove('show');
    document.dispatchEvent(new CustomEvent('cfn:point-opened',{detail:{id,name:point.name}}));
    requestAnimationFrame(()=>{opening=false;});
  };
  document.addEventListener('click',event=>{
    const pin=event.target.closest('.single-pin[data-p]');
    if(!pin||!document.querySelector('.mgn-single')?.contains(pin))return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open(pin.dataset.p);
  },true);
  window.CFNOpenPointStable=open;
  window.CFNOpenPoint=open;
})();