(() => {
  const plans={
    '다대포 해수욕장':{deadline:'22:00',lat:35.0475,lng:128.966,route:['다대포 해수욕장 공영주차장 주변에서 화장실·조명을 먼저 확인합니다.','해변 산책로를 따라 내려가 갯벌의 가장자리까지만 이동합니다.','수로·물웅덩이 바깥을 따라 되돌아와 산책로로 귀환합니다.']},
    '암남공원':{deadline:'22:10',lat:35.0712,lng:129.015,route:['암남공원 입구에서 출입 통제와 파고 안내판을 확인합니다.','해안 산책로에서 가까운 바위 웅덩이만 관찰하고 바깥 암반으로 나가지 않습니다.','들어온 산책로를 그대로 따라 공원 입구로 돌아옵니다.']},
    '영도 흰여울':{deadline:'22:20',lat:35.0785,lng:129.044,route:['흰여울 문화마을의 밝은 산책로 진입 지점에서 시작합니다.','난간 안쪽의 안전 구간에서만 조간대 생물을 관찰합니다.','해안 계단과 산책로를 이용해 진입 지점으로 되돌아옵니다.']},
    '청사포':{deadline:'22:30',lat:35.158,lng:129.191,route:['청사포 다릿돌전망대·마을 주차장 주변에서 출입 가능 여부를 확인합니다.','방파제 바깥 대신 해안 산책로와 가까운 암반 가장자리에서만 관찰합니다.','청사포항 방향의 밝은 마을길을 따라 출발 지점으로 돌아옵니다.']},
    '해운대 청사포':{deadline:'22:30',lat:35.158,lng:129.191,route:['청사포 다릿돌전망대·마을 주차장 주변에서 출입 가능 여부를 확인합니다.','방파제 바깥 대신 해안 산책로와 가까운 암반 가장자리에서만 관찰합니다.','청사포항 방향의 밝은 마을길을 따라 출발 지점으로 돌아옵니다.']},
    '기장 연화리':{deadline:'22:40',lat:35.326,lng:129.267,route:['연화리 마을 진입로와 주차 위치를 먼저 확인합니다.','완만한 암반의 물 빠진 구간까지만 관찰하고 방파제 바깥으로 나가지 않습니다.','처음 내려온 마을길을 그대로 따라 귀환합니다.']}
  };
  const sheet=document.querySelector('#sheet');if(!sheet)return;
  let activeTimer;
  const minutes=time=>{const [hour,minute]=time.split(':').map(Number);return hour*60+minute;};
  const renderTimer=card=>{const deadline=card.dataset.deadline,now=new Date(),current=now.getHours()*60+now.getMinutes(),remaining=minutes(deadline)-current;card.querySelector('.return-countdown').textContent=remaining>0?`귀환 마감까지 약 ${remaining}분`:'오늘의 귀환 마감 시간이 지났어요';if(remaining<=0&&!card.dataset.alerted){card.dataset.alerted='1';if('Notification'in window&&Notification.permission==='granted')new Notification('CFN 귀환 마감 알림',{body:'안전한 곳으로 즉시 귀환하세요.'});}};
  const enrich=()=>{
    if(!sheet.classList.contains('show')||sheet.querySelector('.return-guide'))return;
    const name=sheet.querySelector('h2')?.textContent?.trim(),plan=plans[name];if(!plan)return;
    const route=plan.route.map((step,index)=>`<li><b>${index+1}</b>${step}</li>`).join(''),mapUrl=`https://www.google.com/maps/dir/?api=1&destination=${plan.lat},${plan.lng}&travelmode=walking`;
    sheet.insertAdjacentHTML('beforeend',`<section class="return-guide" data-deadline="${plan.deadline}"><p class="sheet-kicker">SAFE RETURN</p><h3>귀환 마감 알림</h3><strong>${plan.deadline}까지 안전 구간으로 귀환</strong><span class="return-countdown">귀환 시간을 계산하고 있어요.</span><button type="button" data-return-start="${plan.deadline}">귀환 타이머 시작</button></section><section class="beginner-route"><p class="sheet-kicker">BEGINNER ROUTE</p><h3>초보자용 해루질 루트</h3><ol>${route}</ol><a class="route-directions" href="${mapUrl}" target="_blank" rel="noopener">🧭 현재 위치에서 도보 길찾기</a><small>현장 출입 통제·파고·조명 상태가 우선입니다.</small></section>`);
    renderTimer(sheet.querySelector('.return-guide'));
  };
  new MutationObserver(()=>setTimeout(enrich,0)).observe(sheet,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',event=>{const button=event.target.closest('[data-return-start]');if(!button)return;const card=button.closest('.return-guide');button.textContent='귀환 타이머 작동 중';button.disabled=true;if('Notification'in window&&Notification.permission==='default')Notification.requestPermission();clearInterval(activeTimer);renderTimer(card);activeTimer=setInterval(()=>renderTimer(card),60000);});
})();
