window.addEventListener('load',()=>{
  if(!window.L)return;
  const root=document.querySelector('.mgn-single');
  root.insertAdjacentHTML('afterbegin','<div id="realBusanMap" aria-label="부산 해루질 포인트 지도"></div>');
  const bounds=L.latLngBounds([[34.99,128.88],[35.37,129.35]]);
  const map=L.map('realBusanMap',{zoomControl:false,attributionControl:false,maxBounds:bounds,maxBoundsViscosity:1,minZoom:9,maxZoom:15});
  map.fitBounds(bounds,{paddingTopLeft:[10,380],paddingBottomRight:[10,150]});
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:18}).addTo(map);
  const spots={
    dadaepo:['다대포',35.0475,128.966],amnam:['암남공원',35.0712,129.015],yeongdo:['영도 흰여울',35.0785,129.044],haeundae:['청사포',35.158,129.191],gijang:['기장 연화리',35.326,129.267]
  };
  const openPoint=id=>{
    const hiddenPin=document.querySelector(`.single-pin[data-p="${id}"]`);
    if(!hiddenPin)return;
    hiddenPin.click();
  };
  window.CFNOpenPoint=openPoint;
  root.insertAdjacentHTML('beforeend','<button class="gijang-fixed-point" type="button" aria-label="기장 연화리 포인트 열기" onclick="window.CFNOpenPoint(\'gijang\')"><span class="real-pin"></span><b>기장 연화리</b></button>');
  Object.entries(spots).forEach(([id,[name,lat,lng]])=>{
    if(id==='gijang')return;
    const icon=L.divIcon({
      className:'cfn-marker-wrap',
      html:`<button class="cfn-map-marker" type="button" aria-label="${name} 포인트 열기" onclick="window.CFNOpenPoint('${id}')"><span class="real-pin"></span><b class="point-name">${name}</b></button>`,
      iconSize:[170,42],iconAnchor:[12,21]
    });
    L.marker([lat,lng],{icon,keyboard:true}).addTo(map);
  });
  setTimeout(()=>{map.invalidateSize();map.fitBounds(bounds,{paddingTopLeft:[10,380],paddingBottomRight:[10,150]});},700);
});
