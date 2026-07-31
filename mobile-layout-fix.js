(() => {
  const header=document.querySelector('.single-head');if(!header)return;
  header.insertAdjacentHTML('beforeend','<button class="mobile-map-info" id="mobileMapInfo" type="button" aria-expanded="false"></button>');
  const button=document.querySelector('#mobileMapInfo'),mobile=matchMedia('(max-width:640px)').matches;
  const paint=open=>{header.classList.toggle('mobile-info-open',mobile&&open);header.classList.toggle('desktop-info-collapsed',!mobile&&!open);button.setAttribute('aria-expanded',String(open));button.textContent=mobile?(open?'지도 크게 보기':'오늘의 해루질 정보 보기'):(open?'정보 접기':'오늘의 해루질 정보 펼치기');};
  let open=!mobile;paint(open);button.onclick=()=>{open=!open;paint(open)};
})();
