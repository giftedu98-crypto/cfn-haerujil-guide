(() => {
  const fallback=label=>{
    const safe=String(label||'해양생물').replace(/[<>&"']/g,'');
    return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420"><defs><linearGradient id="sea" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#08384f"/><stop offset="1" stop-color="#168b94"/></linearGradient></defs><rect width="720" height="420" fill="url(#sea)"/><path d="M0 280c80-44 160 44 240 0s160 44 240 0 160 44 240 0v140H0z" fill="#8fd5d2" opacity=".5"/><circle cx="360" cy="176" r="82" fill="#e8bd61"/><path d="M278 176h164M360 94v164M302 118l116 116M418 118L302 234" stroke="#88593a" stroke-width="13" stroke-linecap="round"/><text x="360" y="365" fill="white" font-family="sans-serif" font-size="30" font-weight="700" text-anchor="middle">${safe} 참고 이미지</text></svg>`);
  };
  document.addEventListener('error',event=>{
    const image=event.target;
    if(!(image instanceof HTMLImageElement)||!image.classList.contains('ai-preview')||image.dataset.fallbackApplied)return;
    image.dataset.fallbackApplied='1';
    image.src=fallback(image.alt.replace(/ 실사풍 이미지| 사진|촬영한 생물 사진/g,''));
  },true);
})();