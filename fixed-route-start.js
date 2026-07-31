(() => {
  const starts={'35.0475,128.966':'35.0487,128.9687','35.0712,129.015':'35.0740,129.0190','35.0785,129.044':'35.0789,129.0445','35.158,129.191':'35.1590,129.1918','35.326,129.267':'35.3269,129.2677'};
  const setRoutes=()=>document.querySelectorAll('.route-directions').forEach(link=>{
    const url=new URL(link.href),destination=url.searchParams.get('destination'),origin=starts[destination];
    if(!origin)return;url.searchParams.set('origin',origin);link.href=url.toString();link.textContent='🧭 권장 시작지 → 관찰 포인트 길찾기';
  });
  const sheet=document.querySelector('#sheet');if(sheet)new MutationObserver(setRoutes).observe(sheet,{childList:true,subtree:true});setRoutes();
})();
