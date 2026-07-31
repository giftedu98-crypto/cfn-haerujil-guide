(() => {
  const recipes={
    '전복':'버터구이 또는 죽 · 솔로 껍데기를 충분히 세척하세요.',
    '소라':'삶아서 초장과 곁들이기 · 내장은 제거하는 방식이 일반적입니다.',
    '바지락':'해감 후 칼국수·된장국 · 입이 벌어진 것은 제외하세요.',
    '맛조개':'해감 후 소금물 데치기 · 완전히 익혀 드세요.',
    '낙지':'연포탕 또는 볶음 · 충분히 가열 조리하세요.',
    '문어':'삶아서 숙회 · 중심부까지 충분히 익히세요.',
    '꽃게':'찜 또는 탕 · 죽은 게는 섭취하지 마세요.',
    '굴':'굴국 또는 구이 · 생식은 위생 상태를 확인하세요.',
    '홍합':'탕 또는 찜 · 입이 닫힌 것은 가열 후에도 열리지 않으면 제외하세요.',
    '피조개':'구이 또는 초무침 · 충분히 익혀 드세요.',
    '새꼬막':'삶아서 양념무침 · 해감과 세척이 필요합니다.',
    '동죽':'칼국수 또는 탕 · 해감 후 충분히 가열하세요.',
    '백합':'맑은 탕 · 해감 후 충분히 가열하세요.',
    '키조개':'관자 버터구이 · 내장과 모래를 잘 제거하세요.',
    '골뱅이':'무침 또는 숙회 · 종류를 정확히 확인하세요.'
  };
  const list=document.querySelector('#albumList');if(!list)return;
  const enrich=()=>list.querySelectorAll('.album-item').forEach(item=>{
    if(item.querySelector('.album-recipe'))return;
    const name=item.querySelector('b')?.textContent?.trim(),recipe=recipes[name]||'추천 조리법 없음 · 식용 여부가 불확실하면 채취·섭취하지 마세요.';
    const search=`https://search.naver.com/search.naver?query=${encodeURIComponent(`${name} 조리법 레시피`)}`;
    item.querySelector('div')?.insertAdjacentHTML('beforeend',`<p class="album-recipe">🍳 ${recipe}</p><a class="recipe-search" href="${search}" target="_blank" rel="noopener">인터넷 조리법 더 보기 ↗</a>`);
  });
  new MutationObserver(enrich).observe(list,{childList:true,subtree:true});enrich();
})();
