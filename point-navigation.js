(() => {
  const destinations={
    '다대포 해수욕장':[35.0475,128.966],
    '암남공원':[35.0712,129.015],
    '영도 흰여울':[35.0785,129.044],
    '청사포':[35.158,129.191],
    '해운대 청사포':[35.158,129.191],
    '기장 연화리':[35.326,129.267]
  };
  const sheet=document.querySelector('#sheet');
  if(!sheet)return;
  const addNavigation=event=>{
    const name=event.detail?.name,destination=destinations[name];
    if(!destination||sheet.querySelector('.point-navigation'))return;
    sheet.insertAdjacentHTML('beforeend','<section class="point-navigation"><p class="sheet-kicker">POINT NAVIGATION</p><button type="button" data-point-navigation>🧭 현재 위치에서 이 포인트 길찾기</button><small class="point-navigation-status" aria-live="polite"></small></section>');
    const button=sheet.querySelector('[data-point-navigation]'),status=sheet.querySelector('.point-navigation-status');
    button.onclick=()=>{
      if(!navigator.geolocation){status.textContent='이 기기에서는 현재 위치 기능을 지원하지 않습니다.';return;}
      button.disabled=true;status.textContent='현재 위치를 확인하고 있어요…';
      navigator.geolocation.getCurrentPosition(position=>{
        const {latitude,longitude}=position.coords;
        const url=`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination[0]},${destination[1]}&travelmode=walking`;
        window.open(url,'_blank','noopener');
        button.disabled=false;status.textContent='구글 지도에서 길찾기를 열었습니다.';
      },()=>{button.disabled=false;status.textContent='위치 권한이 필요합니다. 브라우저 설정에서 위치를 허용한 뒤 다시 눌러 주세요.';},{enableHighAccuracy:true,timeout:10000,maximumAge:30000});
    };
  };
  document.addEventListener('cfn:point-opened',addNavigation);
})();