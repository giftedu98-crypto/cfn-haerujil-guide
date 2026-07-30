(() => {
  const schedule={
    dadaepo:['다대포','18:50 — 22:20','20:42'],amnam:['암남공원','19:00 — 22:30','20:49'],yeongdo:['영도 흰여울','19:10 — 22:40','20:55'],haeundae:['청사포','19:20 — 22:50','21:02'],gijang:['기장 연화리','19:25 — 23:00','21:09']
  };
  const header=document.querySelector('.single-head');
  header.insertAdjacentHTML('beforeend','<section class="prime-tide" aria-label="오늘의 해루질 적정 시간"><span>오늘의 해루질 적정 시간</span><strong id="primeTime">18:50 — 22:20</strong><small id="primeDetail">다대포 · 썰물 20:42 전후</small></section>');
  document.querySelector('.mgn-single').insertAdjacentHTML('beforeend','<button class="emergency-fab" id="emergencyFab" aria-label="긴급 신고 및 위치 공유"><span>✚</span><b>긴급<br>신고</b></button><div class="single-modal" id="emergencyModal"><div class="dialog emergency-dialog"><button class="dialog-close" id="emergencyX" aria-label="닫기">×</button><div class="safety-icon">🛟</div><p class="sheet-kicker">EMERGENCY</p><h2>긴급 신고</h2><p>위험하거나 귀환이 어려우면 즉시 119에 연락하세요. 현재 위치를 함께 전달하면 구조에 도움이 됩니다.</p><a class="call-119" href="tel:119">119에 전화하기</a><button class="share-location" id="shareLocation">현재 위치 공유하기</button><p class="location-status" id="locationStatus">위치 공유는 사용자의 허용 후에만 실행됩니다.</p><div class="safety-note">파도·밀물·고립 위험이 있으면 장비를 챙기려 하지 말고 높은 곳으로 이동하세요.</div></div></div>');
  const primeTime=document.querySelector('#primeTime'),primeDetail=document.querySelector('#primeDetail');
  document.querySelectorAll('[data-p]').forEach(pin=>pin.addEventListener('click',()=>{const p=schedule[pin.dataset.p];if(!p)return;primeTime.textContent=p[1];primeDetail.textContent=`${p[0]} · 썰물 ${p[2]} 전후`;},{capture:true}));
  const modal=document.querySelector('#emergencyModal');
  document.querySelector('#emergencyFab').onclick=()=>modal.classList.add('show');
  document.querySelector('#emergencyX').onclick=()=>modal.classList.remove('show');
  document.querySelector('#shareLocation').onclick=()=>{
    const status=document.querySelector('#locationStatus');
    if(!navigator.geolocation){status.textContent='이 기기에서는 위치 기능을 지원하지 않습니다.';return;}
    status.textContent='현재 위치를 확인하고 있어요…';
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude,longitude}=pos.coords;
      const link=`https://maps.google.com/?q=${latitude},${longitude}`;
      const text=`CFN 긴급 위치 공유: ${link}`;
      if(navigator.share) navigator.share({title:'CFN 긴급 위치',text,url:link}).then(()=>status.textContent='위치 공유 창을 열었습니다.').catch(()=>status.textContent='공유가 취소되었습니다.');
      else navigator.clipboard?.writeText(text).then(()=>status.textContent='현재 위치 링크를 복사했습니다. 119 또는 보호자에게 붙여넣어 보내세요.').catch(()=>status.textContent=link);
    },()=>status.textContent='위치 권한이 허용되지 않았습니다. 브라우저에서 위치 권한을 허용해 주세요.',{enableHighAccuracy:true,timeout:10000});
  };
})();
