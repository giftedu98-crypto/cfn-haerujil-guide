(() => {
  const bioText=document.querySelector('#bioText'),root=document.querySelector('.mgn-single');
  if(!bioText||!root)return;
  let pendingFile=null,db;
  const database=()=>db?Promise.resolve(db):new Promise((resolve,reject)=>{const request=indexedDB.open('cfnMarineAlbum',1);request.onupgradeneeded=()=>request.result.createObjectStore('entries',{keyPath:'id',autoIncrement:true});request.onsuccess=()=>{db=request.result;resolve(db)};request.onerror=()=>reject(request.error)});
  const transaction=(mode,work)=>database().then(store=>new Promise((resolve,reject)=>{const request=work(store.transaction('entries',mode).objectStore('entries'));request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)}));
  const entries=()=>transaction('readonly',store=>store.getAll());
  const save=entry=>transaction('readwrite',store=>store.add(entry));
  const remove=id=>transaction('readwrite',store=>store.delete(Number(id)));
  const normalizedName=name=>String(name||'').replace(/^분석 결과\s*:\s*/,'').replace(/\s*\([^)]*\)\s*/g,'').trim()||'이름을 확인 중인 생물';
  const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  root.insertAdjacentHTML('beforeend','<button class="album-fab" id="albumFab" aria-label="내 해양생물 사진첩"><span>📚</span><small>사진첩</small></button><div class="single-modal" id="albumModal"><div class="dialog album-dialog"><button class="dialog-close" id="albumX" aria-label="사진첩 닫기">×</button><p class="sheet-kicker">MY MARINE ALBUM</p><h2>내 해양생물 사진첩</h2><p>저장한 사진은 이 기기에만 보관됩니다.</p><p class="album-safety">⚠ 사진 분석 결과는 식용 판정이 아닙니다.<br><b>정확한 종을 확인해 식용이 확실한 경우에만</b> 조리법을 참고하세요.</p><div class="album-list" id="albumList"></div></div></div><div class="single-modal" id="albumPhotoModal"><div class="dialog album-photo-dialog"><button class="dialog-close" id="albumPhotoX" aria-label="사진 닫기">×</button><p class="sheet-kicker">SAVED PHOTO</p><h2 id="albumPhotoName"></h2><img id="albumPhotoFull" alt="저장한 해양생물 사진"></div></div><div class="single-modal" id="albumDeleteModal"><div class="dialog album-delete-dialog"><button class="dialog-close" id="albumDeleteX" aria-label="삭제 선택 닫기">×</button><p class="sheet-kicker">DELETE PHOTO</p><h2>삭제할 사진을 선택하세요</h2><p>선택한 사진만 삭제됩니다.</p><div class="album-delete-choices" id="albumDeleteChoices"></div></div></div>');
  const list=document.querySelector('#albumList'),modal=document.querySelector('#albumModal'),viewer=document.querySelector('#albumPhotoModal'),deleteModal=document.querySelector('#albumDeleteModal');
  const render=async()=>{
    const all=(await entries()).sort((a,b)=>b.savedAt-a.savedAt),groups=new Map();
    all.forEach(item=>{const name=normalizedName(item.name),group=groups.get(name)||{name,items:[]};group.items.push(item);groups.set(name,group)});
    list.innerHTML=groups.size?[...groups.values()].map(group=>{
      const newest=group.items[0],count=group.items.length,ids=group.items.map(item=>item.id).join(',');
      const photos=group.items.map((item,index)=>'<button type="button" class="album-photo" data-album-view="'+item.id+'" aria-label="'+escape(group.name)+' 사진 '+(index+1)+' 크게 보기"><img src="'+URL.createObjectURL(item.photo)+'" alt="'+escape(group.name)+' 사진 '+(index+1)+'"></button>').join('');
      return '<article class="album-item album-species"><div class="album-photos '+(count>1?'multiple':'')+'">'+photos+'</div><div class="album-meta"><b>'+escape(group.name)+'</b><small>사진 '+count+'장 · 사진을 누르면 크게 볼 수 있어요</small><small>최근 저장 '+new Date(newest.savedAt).toLocaleString('ko-KR')+'</small></div><button type="button" data-album-delete="'+ids+'" aria-label="'+escape(group.name)+' 사진 삭제">×</button></article>';
    }).join(''):'<p class="album-empty">아직 저장한 사진이 없어요.</p>';
  };
  const showPhoto=async id=>{const item=(await entries()).find(entry=>Number(entry.id)===Number(id));if(!item)return;document.querySelector('#albumPhotoName').textContent=normalizedName(item.name);document.querySelector('#albumPhotoFull').src=URL.createObjectURL(item.photo);viewer.classList.add('show')};
  const chooseDelete=async ids=>{
    const selected=(await entries()).filter(item=>ids.split(',').map(Number).includes(Number(item.id)));
    document.querySelector('#albumDeleteChoices').innerHTML=selected.map((item,index)=>'<button type="button" class="album-delete-choice" data-album-remove="'+item.id+'"><img src="'+URL.createObjectURL(item.photo)+'" alt="'+escape(normalizedName(item.name))+' 사진 '+(index+1)+'"><span>사진 '+(index+1)+' 삭제</span></button>').join('');
    deleteModal.classList.add('show');
  };
  const removeWithConfirm=async id=>{
    const item=(await entries()).find(entry=>Number(entry.id)===Number(id));if(!item)return;
    if(!window.confirm('선택한 '+normalizedName(item.name)+' 사진을 사진첩에서 삭제할까요?'))return;
    await remove(item.id);deleteModal.classList.remove('show');await render();
  };
  document.querySelector('#albumFab').onclick=async()=>{await render();modal.classList.add('show')};
  document.querySelector('#albumX').onclick=()=>modal.classList.remove('show');
  document.querySelector('#albumPhotoX').onclick=()=>viewer.classList.remove('show');
  document.querySelector('#albumDeleteX').onclick=()=>deleteModal.classList.remove('show');
  document.addEventListener('change',event=>{if(['singlePhoto','cameraPhoto','filePhoto'].includes(event.target.id)&&event.target.files?.[0])pendingFile=event.target.files[0]},true);
  document.addEventListener('cfn-photo-picked',event=>{if(event.detail?.file)pendingFile=event.detail.file});
  const addSaveButton=()=>{
    if(!pendingFile||bioText.querySelector('.album-save'))return;
    if(!bioText.textContent.includes('FREE PHOTO MATCH')||!bioText.querySelector('.analysis-badge'))return;
    const name=bioText.querySelector('h2')?.textContent?.trim();if(!name)return;
    bioText.insertAdjacentHTML('beforeend','<button type="button" class="album-save" id="albumSave">📚 이 결과를 사진첩에 저장</button><small class="album-save-status" id="albumSaveStatus"></small>');
    document.querySelector('#albumSave').onclick=async event=>{event.currentTarget.disabled=true;await save({name,photo:pendingFile,savedAt:Date.now()});document.querySelector('#albumSaveStatus').textContent='이 기기의 사진첩에 저장했어요.';};
  };
  new MutationObserver(()=>setTimeout(addSaveButton,0)).observe(bioText,{childList:true,subtree:true});
  document.addEventListener('click',async event=>{
    const view=event.target.closest('[data-album-view]');if(view){await showPhoto(view.dataset.albumView);return;}
    const choose=event.target.closest('[data-album-delete]');if(choose){const ids=choose.dataset.albumDelete.split(',');if(ids.length===1)await removeWithConfirm(ids[0]);else await chooseDelete(choose.dataset.albumDelete);return;}
    const removeButton=event.target.closest('[data-album-remove]');if(!removeButton)return;
    await removeWithConfirm(removeButton.dataset.albumRemove);
  });
})();
