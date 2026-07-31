(() => {
  const plans={
    '다대포 해수욕장':{deadline:'22:00',route:['주차장·화장실 위치 확인','해변 산책로를 따라 갯벌 가장자리로 이동','밝은 길을 따라 출발 지점으로 귀환']},
    '암남공원':{deadline:'22:10',route:['공원 입구의 출입 통제 확인','바위 웅덩이 주변만 짧게 관찰','왔던 산책로로 되돌아가기']},
    '영도 흰여울':{deadline:'22:20',route:['해안 산책로 진입 전 파고 확인','난간 안쪽의 안전 구간에서 관찰','계단·산책로를 통해 귀환']},
    '청사포':{deadline:'22:30',route:['주차·방파제 출입 가능 여부 확인','암반 가장자리에서만 관찰','등대 방향의 밝은 길로 귀환']},
    '기장 연화리':{deadline:'22:40',route:['마을 진입로와 주차 위치 확인','완만한 암반 구간에서 관찰','출발했던 마을길로 귀환']}
  };
  const sheet=document.querySelector('#sheet');if(!sheet)return;
  let activeTimer;
  const minutes=time=>{const [hour,minute]=time.split(':').map(Number);return hour*60+minute;};
  const renderTimer=card=>{
    const deadline=card.dataset.deadline,now=new Date(),current=now.getHours()*60+now.getMinutes();
    const remaining=minutes(deadline)-current;
    const text=remaining>0?`귀환 마감까지 약 ${remaining}분`:`오늘의 귀환 마감 시간이 지났어요`;
    card.querySelector('.return-countdown').textContent=text;
    if(remaining<=0&&!card.dataset.alerted){card.dataset.alerted='1';if('Notification'in window&&Notification.permission==='granted')new Notification('CFN 귀환 마감 알림',{body:'안전한 곳으로 즉시 귀환하세요.'});}
  };
  const enrich=()=>{
    if(!sheet.classList.contains('show')||sheet.querySelector('.return-guide'))return;
    const name=sheet.querySelector('h2')?.textContent?.trim(),plan=plans[name];if(!plan)return;
    const route=plan.route.map((step,index)=>`<li><b>${index+1}</b>${step}</li>`).join('');
    sheet.insertAdjacentHTML('beforeend',`<section class="return-guide" data-deadline="${plan.deadline}"><p class="sheet-kicker">SAFE RETURN</p><h3>귀환 마감 알림</h3><strong>${plan.deadline}까지 안전 구간으로 귀환</strong><span class="return-countdown">귀환 시간을 계산하고 있어요.</span><button type="button" data-return-start="${plan.deadline}">귀환 타이머 시작</button></section><section class="beginner-route"><p class="sheet-kicker">BEGINNER ROUTE</p><h3>초보자용 해루질 루트</h3><ol>${route}</ol><small>현장 출입 통제·파고·조명 상태가 우선입니다.</small></section>`);
    renderTimer(sheet.querySelector('.return-guide'));
  };
  new MutationObserver(()=>setTimeout(enrich,0)).observe(sheet,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-return-start]');if(!button)return;
    const card=button.closest('.return-guide');button.textContent='귀환 타이머 작동 중';button.disabled=true;
    if('Notification'in window&&Notification.permission==='default')Notification.requestPermission();
    clearInterval(activeTimer);renderTimer(card);activeTimer=setInterval(()=>renderTimer(card),60000);
  });
})();
