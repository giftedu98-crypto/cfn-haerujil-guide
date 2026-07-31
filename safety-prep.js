(() => {
  const list=document.querySelector('#safe .safety-list');
  if(!list)return;
  list.insertAdjacentHTML('beforebegin','<section class="safety-prep"><h3>해루질 준비물</h3><div class="prep-grid"><span>🦺 구명조끼</span><span>🥾 미끄럼 방지 장화</span><span>🔦 방수 랜턴</span><span>📱 휴대전화·보조배터리</span></div></section>');
})();
