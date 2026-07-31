(() => {
  const header=document.querySelector('.single-head');
  if(!header)return;
  header.insertAdjacentHTML('beforeend','<section class="weather-spot" aria-live="polite"><span class="weather-kicker">TODAY\'S WEATHER PICK</span><strong id="weatherSpot">날씨를 확인하고 있어요…</strong><small id="weatherReason">부산 연안의 비·바람·파고를 불러오는 중입니다.</small></section>');
  const spot=document.querySelector('#weatherSpot'),reason=document.querySelector('#weatherReason');
  const weatherUrl='https://api.open-meteo.com/v1/forecast?latitude=35.1796&longitude=129.0756&current=temperature_2m,precipitation,wind_speed_10m,weather_code&timezone=Asia%2FSeoul';
  const marineUrl='https://marine-api.open-meteo.com/v1/marine?latitude=35.1796&longitude=129.0756&current=wave_height&timezone=Asia%2FSeoul';
  const weatherRequest=window.__cfnBusanWeatherPromise||(window.__cfnBusanWeatherPromise=Promise.all([fetch(weatherUrl).then(r=>r.json()),fetch(marineUrl).then(r=>r.json())]));
  weatherRequest.then(([weather,marine])=>{
    const now=weather.current||{},sea=marine.current||{};
    const wind=Number(now.wind_speed_10m||0),rain=Number(now.precipitation||0),wave=Number(sea.wave_height||0),code=Number(now.weather_code||0);
    const risky=rain>=0.5||wind>=10||wave>=1||code>=80;
    const caution=!risky&&(rain>0||wind>=7||wave>=0.6||code>=61);
    if(risky){spot.textContent='오늘 가도 될까요? 자제 권장';reason.textContent=`비 ${rain.toFixed(1)} mm · 바람 ${wind.toFixed(1)} km/h · 파고 ${wave.toFixed(1)} m — 현장 통제·특보를 우선 확인하세요.`;return;}
    spot.textContent=caution?'오늘 가도 될까요? 주의 필요 · 다대포':'오늘 가도 될까요? 추천 · 다대포';
    reason.textContent=`비 ${rain.toFixed(1)} mm · 바람 ${wind.toFixed(1)} km/h · 파고 ${wave.toFixed(1)} m — 물때와 출입 통제를 확인한 뒤 이용하세요.`;
  }).catch(()=>{spot.textContent='날씨 정보를 불러오지 못했어요';reason.textContent='인터넷 연결 후 다시 열면 오늘의 추천 포인트를 안내합니다.';});
})();

