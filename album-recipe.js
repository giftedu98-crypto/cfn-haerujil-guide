(() => {
  const recipes={
    '전복':'버터구이 또는 전복죽 · 솔로 껍데기를 세척하고 내장은 제거한 뒤 충분히 익히세요.',
    '소라':'삶아서 초장과 곁들이기 · 내장은 제거하고 중심부까지 충분히 가열하세요.',
    '고둥':'삶아 무침 또는 탕 · 정확한 종을 확인하고, 식용이 확인된 고둥만 충분히 익히세요.',
    '바지락':'해감 후 칼국수·된장국 · 입이 벌어지거나 냄새가 나는 것은 제외하세요.',
    '맛조개':'해감 후 소금물 데치기 · 모래를 완전히 빼고 충분히 익히세요.',
    '낙지':'연포탕 또는 볶음 · 손질 뒤 중심부까지 충분히 가열하세요.',
    '문어':'숙회 또는 문어볶음 · 삶은 뒤 속까지 익었는지 확인하세요.',
    '꽃게':'찜 또는 탕 · 살아 있거나 신선한 것만 사용하고 죽은 게는 먹지 마세요.',
    '망둥어':'매운탕 또는 구이 · 비늘·내장을 손질한 뒤 속까지 익히세요.',
    '해삼':'해삼무침 또는 탕 · 식용 종인지 확인하고 깨끗이 세척하세요.',
    '성게':'성게알 비빔밥 또는 미역국 · 식용 성게인지 확인하고 신선한 것만 사용하세요.',
    '멍게':'멍게비빔밥 또는 찜 · 흐르는 물에 세척하고 이상한 냄새가 나면 버리세요.',
    '오징어류':'볶음 또는 데침 · 내장·연골을 제거하고 충분히 가열하세요.',
    '갑오징어류':'숙회 또는 볶음 · 먹물주머니와 내장을 제거하고 충분히 익히세요.',
    '소라게':'조리법을 권하지 않아요 · 종 구분이 어렵고 채취보다 관찰을 권장합니다.',
    '굴':'굴국 또는 구이 · 노로바이러스 등 위해를 줄이기 위해 충분히 가열하세요.',
    '홍합':'탕 또는 찜 · 가열해도 입이 열리지 않는 것은 버리세요.',
    '피조개':'구이 또는 초무침 · 해감 후 충분히 가열하고 신선한 것만 사용하세요.',
    '새꼬막':'삶아서 양념무침 · 해감·세척 후 속까지 익히세요.',
    '동죽':'칼국수 또는 맑은 탕 · 해감 후 충분히 가열하세요.',
    '백합':'맑은 탕 또는 찜 · 해감 후 충분히 가열하세요.',
    '키조개':'관자 버터구이 · 내장과 모래를 제거한 뒤 충분히 익히세요.',
    '골뱅이':'무침 또는 숙회 · 정확한 식용 종을 확인하고 충분히 가열하세요.',
    '돌게':'된장국 또는 찜 · 신선한 개체만 사용하고 충분히 가열하세요.',
    '칠게':'튀김 또는 탕 · 식용 목적 채취 전 지역 규정을 확인하고 충분히 익히세요.',
    '짱뚱어':'매운탕 또는 구이 · 내장을 손질하고 충분히 가열하세요.',
    '베도라치':'구이 또는 매운탕 · 가시·내장을 손질하고 충분히 익히세요.',
    '우럭':'매운탕 또는 구이 · 비늘과 내장을 제거하고 속까지 익히세요.',
    '미역':'국 또는 무침 · 깨끗한 해역에서 채취한 것만 세척해 사용하세요.',
    '톳':'무침 또는 밥 · 불린 물은 버리고 충분히 삶아 드세요.',
    '주꾸미':'샤부샤부 또는 볶음 · 내장과 먹물주머니를 제거한 뒤 충분히 익히세요.',
    '꼴뚜기류':'데침 또는 볶음 · 내장과 투명한 연골을 제거하고, 짧게 데친 뒤 중심부까지 충분히 가열하세요.',
    '가리비':'버터구이 또는 찜 · 가열해도 입이 열리지 않는 것은 버리세요.',
    '새조개':'샤부샤부 또는 데침 · 해감 후 짧게 익혀 드세요.',
    '가무락조개':'칼국수 또는 찜 · 해감 후 충분히 가열하세요.',
    '개조개':'맑은 탕 또는 찜 · 해감 후 충분히 가열하세요.',
    '개량조개':'칼국수 또는 된장국 · 해감 후 충분히 가열하세요.',
    '비단조개':'맑은 탕 또는 칼국수 · 해감 후 충분히 가열하세요.',
    '모시조개':'된장국 또는 탕 · 해감 후 충분히 가열하세요.',
    '재첩':'국 또는 된장국 · 하구 채취물은 깨끗이 해감하고 충분히 가열하세요.',
    '대수리':'삶아서 무침 · 식용 종을 정확히 확인하고 충분히 가열하세요.',
    '피뿔고둥':'삶아서 무침 · 내장을 제거하고 식용 종만 충분히 가열하세요.',
    '박하지':'된장국 또는 찜 · 살아 있거나 신선한 개체만 충분히 익히세요.',
    '풀게':'탕 또는 찜.',
    '민꽃게':'찜 또는 탕 · 살아 있거나 신선한 개체만 충분히 익히세요.',
    '털게':'찜 또는 탕 · 살아 있거나 신선한 개체만 충분히 익히세요.',
    '새우류':'소금구이 또는 탕 · 식용 종을 확인하고 중심부까지 익히세요.',
    '대하':'소금구이 또는 찜 · 내장을 손질하고 충분히 익히세요.',
    '보리새우':'소금구이 또는 볶음 · 깨끗이 세척하고 충분히 익히세요.',
    '광어':'구이 또는 매운탕 · 비늘과 내장을 제거하고 속까지 익히세요.',
    '도다리':'쑥국 또는 구이 · 비늘과 내장을 제거하고 충분히 익히세요.',
    '숭어':'구이 또는 매운탕 · 내장을 손질하고 충분히 익히세요.',
    '노래미':'매운탕 또는 구이 · 가시와 내장을 손질하고 속까지 익히세요.',
    '망상어':'구이 또는 매운탕 · 비늘과 내장을 제거하고 충분히 익히세요.',
    '학공치':'구이 또는 튀김 · 내장을 손질하고 충분히 익히세요.',
    '전어':'구이 또는 조림 · 비늘·내장을 손질하고 충분히 익히세요.',
    '미더덕':'된장국 또는 찜 · 깨끗이 세척하고 충분히 익히세요.',
    '파래':'무침 또는 전 · 깨끗한 해역의 것만 세척해 사용하세요.',
    '청각':'무침 또는 국 · 깨끗한 해역의 것만 세척해 사용하세요.',
    '다시마':'국물 또는 조림 · 이물질을 세척한 뒤 충분히 가열하세요.',
    '불가사리':'조리법을 제공하지 않아요 · 식용 여부가 불분명하므로 채취·섭취하지 마세요.',
    '상어류':'조리법을 제공하지 않아요 · 해루질 대상이 아니므로 거리를 두고 안전하게 이동하세요.',
    '가오리류':'조리법을 제공하지 않아요 · 꼬리 가시에 다칠 수 있으니 접근하거나 밟지 마세요.',
    '해파리류':'조리법을 제공하지 않아요 · 쏘임 위험이 있으므로 맨손으로 만지지 마세요.',
    '갯지렁이류':'조리법을 제공하지 않아요 · 식용 확인이 어려워 채취·섭취하지 마세요.',
    '따개비':'조리법을 제공하지 않아요 · 채취보다 관찰을 권장합니다.',
    '농게':'조리법을 제공하지 않아요 · 갯벌 생태계 관찰 대상으로 남겨 두세요.',
    '쏨뱅이':'조리법을 제공하지 않아요 · 가시에 독이 있을 수 있어 맨손 취급을 피하세요.',
    '복어류':'조리법을 제공하지 않아요 · 독성이 있어 전문가가 아닌 경우 절대 섭취하지 마세요.',
    '해마':'조리법을 제공하지 않아요 · 보호가 필요한 생물일 수 있으니 채취하지 마세요.'
  };
  const aliases={'분석 결과:':'','분석 결과':'','바지락조개':'바지락','참소라':'소라','문어류':'문어','망둑어':'망둥어','성게류':'성게','해삼류':'해삼','꽃게류':'꽃게','상어':'상어류','가오리':'가오리류','해파리':'해파리류','오징어':'오징어류','살오징어':'오징어류','한치':'오징어류','갑오징어':'갑오징어류','꼴뚜기':'꼴뚜기류','꼴뚜기류':'꼴뚜기류','복어':'복어류'};
  const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const canonical=value=>{
    let name=String(value||'').replace(/^분석 결과\s*:\s*/,'').replace(/\s*\([^)]*\)\s*/g,'').trim();
    if(/꼴뚜기/.test(name))return '꼴뚜기류';
    if(/갑오징어/.test(name))return '갑오징어류';
    if(/오징어|한치/.test(name))return '오징어류';
    return aliases[name]||name;
  };
  const list=document.querySelector('#albumList'),root=document.querySelector('.mgn-single');if(!list||!root)return;
  const description=name=>{
    const groups={shell:['전복','소라','고둥','바지락','맛조개','가리비','새조개','가무락조개','개조개','개량조개','비단조개','모시조개','재첩','대수리','피뿔고둥','굴','홍합','피조개','새꼬막','동죽','백합','키조개','골뱅이'],crab:['꽃게','박하지','풀게','민꽃게','털게','돌게','칠게','새우류','대하','보리새우'],fish:['망둥어','광어','도다리','숭어','노래미','망상어','학공치','전어','짱뚱어','베도라치','우럭'],cephalopod:['낙지','문어','주꾸미','꼴뚜기류','오징어류','갑오징어류'],seaweed:['파래','청각','다시마','미역','톳']};
    if(groups.shell.includes(name))return '부산 연안의 모래·갯벌 또는 암반 주변에서 관찰되는 조개·고둥류예요. 비슷한 종이 많으므로 사진 분석만으로 식용 여부를 단정하면 안 됩니다.';
    if(groups.crab.includes(name))return '연안 바닥과 갯벌에서 활동하는 갑각류예요. 집게와 가시에 다칠 수 있으니 맨손으로 다루지 마세요.';
    if(groups.fish.includes(name))return '부산 연안의 얕은 바다와 암초·갯벌 주변에서 볼 수 있는 물고기예요. 종별 채취 규정과 크기를 확인하세요.';
    if(groups.cephalopod.includes(name))return '연안의 모래 바닥과 바위틈을 이용하는 두족류예요. 계절과 산란기에 따라 관찰·채취 조건이 달라질 수 있습니다.';
    if(groups.seaweed.includes(name))return '부산 연안의 암반에 붙어 자라는 해조류예요. 채취 해역의 위생 상태와 지역 규정을 확인하세요.';
    return '부산 바다에서 관찰되는 해양생물이에요. 사진 분석 결과만으로는 정확한 종과 식용 여부를 확정할 수 없습니다.';
  };
  root.insertAdjacentHTML('beforeend','<div class="single-modal" id="dexDetailModal"><div class="dialog dex-detail-dialog"><button class="dialog-close" id="dexDetailX" aria-label="도감 상세 닫기">×</button><p class="sheet-kicker">REGISTERED MARINE DEX</p><h2 id="dexDetailName"></h2><img class="dex-detail-photo" id="dexDetailPhoto" alt="등록한 해양생물 사진"><h3>생물 설명</h3><p id="dexDetailDescription"></p><div class="dex-recipe" id="dexDetailRecipe"></div></div></div>');
  const detail=document.querySelector('#dexDetailModal');
  const enrich=()=>list.querySelectorAll('.album-item.registered').forEach(item=>{item.dataset.dexDetail=canonical(item.querySelector('b')?.textContent?.trim());item.setAttribute('tabindex','0');item.setAttribute('role','button');item.setAttribute('aria-label',item.dataset.dexDetail+' 도감 상세 보기')});
  const openDetail=item=>{
    const name=item.dataset.dexDetail||canonical(item.querySelector('b')?.textContent?.trim()),recipe=recipes[name]||'조리법을 제공하지 않아요 · 식용 여부가 확인되지 않은 후보는 채취·섭취하지 마세요.',edible=Object.prototype.hasOwnProperty.call(recipes,name)&&!recipe.startsWith('조리법을 제공하지 않아요'),search='https://search.naver.com/search.naver?query='+encodeURIComponent((name||'해양생물')+' 안전 조리법'),photo=item.querySelector('.album-photo img')?.src;
    document.querySelector('#dexDetailName').textContent=name;document.querySelector('#dexDetailPhoto').src=photo||'';document.querySelector('#dexDetailPhoto').style.display=photo?'block':'none';document.querySelector('#dexDetailDescription').textContent=description(name);document.querySelector('#dexDetailRecipe').innerHTML='<h3>'+(edible?'추천 조리법':'안전 안내')+'</h3><p>'+escape(recipe)+'</p>'+(edible?'<a class="recipe-search" href="'+search+'" target="_blank" rel="noopener">인터넷 조리법 더 보기 ↗</a>':'');detail.classList.add('show');
  };
  new MutationObserver(enrich).observe(list,{childList:true,subtree:true});enrich();
  document.querySelector('#dexDetailX').onclick=()=>detail.classList.remove('show');
  document.addEventListener('click',event=>{const item=event.target.closest('.album-item.registered[data-dex-detail]');if(item&&!event.target.closest('button'))openDetail(item)});
  document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&document.activeElement?.matches('.album-item.registered[data-dex-detail]')){event.preventDefault();openDetail(document.activeElement)}});
})();
