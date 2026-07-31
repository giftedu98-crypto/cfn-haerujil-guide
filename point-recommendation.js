(() => {
  const labels={dadaepo:'다대포',amnam:'암남공원',yeongdo:'영도 흰여울',haeundae:'청사포',gijang:'기장 연화리'};
  let state='good';
  const judgement=()=>{
    const base=state==='risky'?['자제','오늘은 기상·파고 조건으로 해루질을 권하지 않아요.']:state==='caution'?['주의','물때·파고·현장 출입 통제를 확인한 뒤 짧게 이용하세요.']:['추천','현재 조건에서는 물때와 안전수칙을 확인한 뒤 이용하기 좋아요.'];
    const result={};Object.keys(labels).forEach(id=>result[id]=[...base]);
    if(state==='good'){result.dadaepo=['추천','오늘의 가장 추천 포인트예요. 갯벌 가장자리에서만 관찰하고 귀환 시간을 지키세요.'];result.amnam=['주의','암반이 미끄러울 수 있어 미끄럼 방지 장화를 꼭 착용하세요.'];result.yeongdo=['주의','난간 안쪽의 안전 구간에서만 관찰하세요.'];result.haeundae=['주의','방파제 바깥으로 나가지 말고 해안 산책로 가까이에서 관찰하세요.'];result.gijang=['주의','마을 진입로와 조명 상태를 확인한 뒤 이용하세요.'];}
    return result;
  };
  const decorate=()=>{
    const data=judgement();
    Object.entries(labels).forEach(([id,name])=>{
      const marker=[...document.querySelectorAll('.cfn-map-marker')].find(el=>el.getAttribute('aria-label')===`${name} 포인트 열기`);if(!marker)return;
      const level=data[id][0],tone=level==='추천'?'good':level==='주의'?'caution':'risk',color=tone==='good'?'#159a63':tone==='caution'?'#ef8b20':'#d63d39';
      marker.classList.remove('point-good','point-caution','point-risk');marker.classList.add(`point-${tone}`);marker.dataset.recommendation=tone;marker.querySelector('.point-name').dataset.judgement=level;marker.querySelector('.real-pin').style.setProperty('background-color',color,'important');marker.querySelector('.real-pin').style.setProperty('box-shadow','0 0 0 3px #ffffff, 0 3px 10px '+color+'99','important');
    });
  };
  const enrichSheet=()=>{
    const sheet=document.querySelector('#sheet');if(!sheet||!sheet.classList.contains('show')||sheet.querySelector('.point-judgement'))return;
    const name=sheet.querySelector('h2')?.textContent?.trim(),id=Object.keys(labels).find(key=>labels[key]===name||(key==='dadaepo'&&name==='다대포 해수욕장')||(key==='haeundae'&&name==='해운대 청사포'));if(!id)return;
    const [level,text]=judgement()[id];sheet.querySelector('.sheet-desc')?.insertAdjacentHTML('afterend',`<div class="point-judgement point-${level==='추천'?'good':level==='주의'?'caution':'risk'}"><b>오늘의 판단 · ${level}</b><span>${text}</span></div>`);
  };
  const refresh=()=>{decorate();enrichSheet();};
  window.addEventListener('load',()=>setTimeout(refresh,850));
  document.addEventListener('cfn:point-opened',()=>enrichSheet());
  const weatherUrl='https://api.open-meteo.com/v1/forecast?latitude=35.1796&longitude=129.0756&current=precipitation,wind_speed_10m,weather_code&timezone=Asia%2FSeoul';
  const marineUrl='https://marine-api.open-meteo.com/v1/marine?latitude=35.1796&longitude=129.0756&current=wave_height&timezone=Asia%2FSeoul';
  const weatherRequest=window.__cfnBusanWeatherPromise||(window.__cfnBusanWeatherPromise=Promise.all([fetch(weatherUrl).then(r=>r.json()),fetch(marineUrl).then(r=>r.json())]));
  weatherRequest.then(([weather,marine])=>{const now=weather.current||{},sea=marine.current||{},wind=Number(now.wind_speed_10m||0),rain=Number(now.precipitation||0),wave=Number(sea.wave_height||0),code=Number(now.weather_code||0);state=rain>=.5||wind>=10||wave>=1||code>=80?'risky':rain>0||wind>=7||wave>=.6||code>=61?'caution':'good';refresh()}).catch(refresh);
})();