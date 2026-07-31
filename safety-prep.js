(() => {
  const root=document.querySelector('.mgn-single');
  if(!root)return;
  root.insertAdjacentHTML('beforeend','<button class="prep-fab" id="prepFab" aria-label="해루질 준비물"><span>🎒</span><small>준비물</small></button><div class="single-modal" id="prepModal"><div class="dialog"><button class="dialog-close" id="prepX" aria-label="준비물 닫기">×</button><div class="safety-icon">🎒</div><p class="sheet-kicker">BEFORE YOU GO</p><h2>해루질 준비물</h2><p>출발 전 아래 준비물을 챙겼는지 확인하세요.</p><section class="safety-prep"><div class="prep-grid"><span>🦺 구명조끼</span><span>🥾 미끄럼 방지 장화</span><span>🔦 방수 랜턴</span><span>📱 휴대전화·보조배터리</span><span>🧤 방수 장갑</span><span>🧴 식수·구급품</span></div></section></div></div>');
  const modal=document.querySelector('#prepModal');
  document.querySelector('#prepFab').onclick=()=>modal.classList.add('show');
  document.querySelector('#prepX').onclick=()=>modal.classList.remove('show');
})();
