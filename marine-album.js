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
  root.insertAdjacentHTML('beforeend','<button class="album-fab" id="albumFab" aria-label="내 해양생물 사진첩"><span>📚</span><small>사진첩</small></button><div class="single-modal" id="albumModal"><div class="dialog album-dialog"><button class="dialog-close" id="albumX" aria-label="사진첩 닫기">×</button><p class="sheet-kicker">MY MARINE ALBUM</p><h2>내 해양생물 사진첩</h2><p>저장한 사진은 이 기기에만 보관됩니다.</p><div class="album-list" id="albumList"></div></div></div>');
  const list=document.querySelector('#albumList'),modal=document.querySelector('#albumModal');
  const render=async()=>{
    const all=(await entries()).sort((a,b)=>b.savedAt-a.savedAt),groups=new Map();
    all.forEach(item=>{const name=normalizedName(item.name),group=groups.get(name)||{name,items:[]};group.items.push(item);groups.set(name,group)});
    list.innerHTML=groups.size?[...groups.values()].map(group=>{
      const newest=group.items[0],count=group.items.length;
      const photos=group.items.map((item,index)=>`<img src="${URL.createObjectURL(item.photo)}" alt="${group.name} 사진 ${index+1}">`).join('');
      return `<article class="album-item album-species"><div class="album-photos ${count>1?'multiple':''}">${photos}</div><div class="album-meta"><b>${group.name}</b><small>사진 ${count}장 · 최근 저장 ${new Date(newest.savedAt).toLocaleString('ko-KR')}</small></div><button type="button" data-album-delete="${newest.id}" aria-label="${group.name} 최근 사진 삭제">×</button></article>`;
    }).join(''):'<p class="album-empty">아직 저장한 사진이 없어요.</p>';
  };
  document.querySelector('#albumFab').onclick=async()=>{await render();modal.classList.add('show')};
  document.querySelector('#albumX').onclick=()=>modal.classList.remove('show');
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
  document.addEventListener('click',async event=>{const button=event.target.closest('[data-album-delete]');if(!button)return;await remove(button.dataset.albumDelete);render();});
})();

