(() => {
  const fab=document.querySelector('.camera-fab'),root=document.querySelector('.mgn-single');
  if(!fab||!root)return;
  root.insertAdjacentHTML('beforeend','<div class="single-modal" id="photoSourceModal"><div class="dialog photo-source-dialog"><button class="dialog-close" id="photoSourceX" aria-label="닫기">×</button><div class="safety-icon">📷</div><p class="sheet-kicker">PHOTO ANALYSIS</p><h2>사진 가져오기</h2><p>생물이 잘 보이도록 밝고 가까운 사진을 선택하세요.</p><div class="photo-source-actions"><label for="cameraPhoto">📸 카메라로 촬영</label><label for="filePhoto">🖼️ 파일에서 선택</label></div><input id="cameraPhoto" type="file" accept="image/*" capture="environment" hidden><input id="filePhoto" type="file" accept="image/*" hidden></div></div>');
  const modal=document.querySelector('#photoSourceModal'),close=()=>modal.classList.remove('show');
  fab.addEventListener('click',event=>{event.preventDefault();modal.classList.add('show');},true);
  document.querySelector('#photoSourceX').onclick=close;
  ['cameraPhoto','filePhoto'].forEach(id=>document.querySelector(`#${id}`).onchange=event=>{
    const handler=document.querySelector('#singlePhoto').onchange;
    if(event.target.files[0]&&handler)handler({target:{files:event.target.files}});
    close();event.target.value='';
  });
})();
