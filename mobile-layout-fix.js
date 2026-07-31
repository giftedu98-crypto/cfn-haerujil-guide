(() => {
  const header=document.querySelector('.single-head');
  if(!header)return;
  header.insertAdjacentHTML('beforeend','<button class="mobile-map-info" id="mobileMapInfo" type="button" aria-expanded="false">오늘의 해루질 정보 보기</button>');
  const button=document.querySelector('#mobileMapInfo');
  button.onclick=()=>{const open=header.classList.toggle('mobile-info-open');button.setAttribute('aria-expanded',String(open));button.textContent=open?'지도 크게 보기':'오늘의 해루질 정보 보기';};
})();
