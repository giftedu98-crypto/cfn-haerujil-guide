/* CFN 무료 사진 후보 찾기
   API 키 없이 브라우저에서 공개 CLIP 모델을 내려받아 사진과 생물 후보를 비교합니다.
   첫 실행은 모델 파일을 받기 때문에 Wi-Fi에서 시간이 걸릴 수 있습니다. */
(() => {
  const candidates=[
    ['전복','an abalone shellfish','species-abalone.jpg','암반에 붙어 사는 귀 모양의 복족류입니다.','각장 10 cm','9.1 — 10.31'],
    ['소라','a turban shell sea snail','species-turban-snail.jpg','암반 조간대에 사는 단단한 껍데기의 복족류입니다.','각장 5 cm','6.1 — 8.31'],
    ['고둥','a marine sea snail gastropod','species-gastropod.jpg','바위 표면에서 발견되는 복족류입니다.','없음','없음'],
    ['바지락','a Manila clam shellfish','species-clam.jpg','모래와 갯벌 속에 사는 대표적인 조개입니다.','각장 2 cm','없음'],
    ['맛조개','a razor clam shellfish','species-razor-clam.jpg','길쭉한 껍데기를 가진 갯벌 조개입니다.','없음','없음'],
    ['낙지','a mud octopus','species-octopus.jpg','갯벌과 바위틈에서 활동하는 두족류입니다.','없음','없음'],
    ['문어','a common octopus','species-common-octopus.jpg','바위와 암반 지대에 사는 두족류입니다.','없음','없음'],
    ['꽃게','a blue swimming crab','species-crab.jpg','모래 바닥과 갯벌에 사는 게입니다.','갑장 6.4 cm','6.21 — 8.20'],
    ['망둥어','a goby fish','species-goby.jpg','갯벌과 얕은 연안에 사는 소형 어류입니다.','없음','없음'],
    ['해삼','a sea cucumber','species-sea-cucumber.jpg','해저 바닥과 바위 주변에 사는 극피동물입니다.','체장 15 cm','7.1 — 7.31'],
    ['성게','a sea urchin','species-sea-urchin.jpg','암반에서 발견되는 가시 달린 극피동물입니다.','없음','없음'],
    ['불가사리','a sea star starfish','species-sea-star.jpg','조간대 바위와 모래에서 발견되는 극피동물입니다.','없음','없음'],
    ['멍게','a sea squirt tunicate','species-sea-squirt.jpg','바위나 구조물에 붙어 사는 피낭동물입니다.','없음','없음'],
    ['상어류','a shark','', '해루질 대상이 아닌 대형 해양 어류입니다. 가까이 가지 말고 즉시 안전한 거리로 이동하세요.','채취하지 마세요','종별 상이'],
    ['가오리류','a stingray ray fish','', '꼬리 가시에 다칠 수 있는 어류입니다. 밟지 말고 접근하지 마세요.','채취하지 마세요','종별 상이'],
    ['해파리류','a jellyfish','', '쏘임 위험이 있는 자포동물입니다. 맨손으로 만지지 마세요.','채취하지 마세요','종별 상이'],
    ['오징어류','a squid','', '빠르게 헤엄치는 두족류입니다.','종별 상이','종별 상이'],
    ['갑오징어류','a cuttlefish','', '납작한 몸과 내부 뼈를 가진 두족류입니다.','종별 상이','종별 상이'],
    ['소라게','a hermit crab','', '다른 조개껍데기에 들어가 사는 갑각류입니다.','없음','없음'],
    ['갯지렁이류','a marine polychaete worm','', '갯벌에 사는 환형동물입니다.','채취 비권장','없음']
  ];
  let classifier;
  async function getClassifier(){
    if(classifier)return classifier;
    const {pipeline,env}=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
    env.allowLocalModels=false;
    classifier=await pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32');
    return classifier;
  }
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function resultCard(best,photo,ranked){
    const [name,,reference,description,min,season]=best;
    const shown=reference||photo;
    const score=Math.round((ranked[0]?.score||0)*100);
    return `<p class="sheet-kicker">FREE PHOTO MATCH</p><h2>${escape(name)}</h2><img class="ai-preview" src="${shown}" alt="${escape(name)} 사진"><p class="analysis-badge">사진 유사도 ${score}% · 무료 브라우저 후보 비교</p><p>${escape(description)}</p><div class="reg-grid"><div><span>금지체장</span><b>${escape(min)}</b></div><div><span>금어기</span><b>${escape(season)}</b></div></div><p class="safety-note">다른 후보: ${ranked.slice(1,3).map(x=>escape(candidates[x.index][0])).join(' · ')||'없음'}<br>유사도는 정답 보증이 아닙니다. 보호종·위험 생물 또는 불확실한 경우 채취하지 마세요.</p>`;
  }
  document.querySelector('#singlePhoto').onchange=async e=>{
    const file=e.target.files[0]; if(!file)return;
    const box=document.querySelector('#bioText'),modal=document.querySelector('#bio');
    const photo=URL.createObjectURL(file); modal.classList.add('show');
    box.innerHTML='<p class="sheet-kicker">FREE PHOTO MATCH</p><h2>사진에서 특징을 비교하고 있어요…</h2><img class="ai-preview" src="'+photo+'" alt="촬영 사진"><p>처음 한 번만 무료 공개 모델을 내려받습니다. Wi-Fi에서는 1~3분 정도 걸릴 수 있어요.</p>';
    try{
      const model=await getClassifier();
      const output=await model(photo,candidates.map(x=>x[1]));
      const ranked=output.map(x=>({index:candidates.findIndex(c=>c[1]===x.label),score:x.score})).filter(x=>x.index>=0).sort((a,b)=>b.score-a.score);
      if(!ranked.length)throw Error('사진 후보를 비교하지 못했습니다.');
      box.innerHTML=resultCard(candidates[ranked[0].index],photo,ranked);
    }catch(err){
      box.innerHTML='<p class="sheet-kicker">FREE PHOTO MATCH</p><h2>무료 후보 모델을 불러오지 못했습니다</h2><img class="ai-preview" src="'+photo+'" alt="촬영 사진"><p>인터넷 연결을 확인한 뒤 다시 시도해 주세요. 첫 실행에는 모델 다운로드가 필요합니다.</p><p class="safety-note">오류: '+escape(err.message||'알 수 없음')+'</p>';
    }
  };
})();
