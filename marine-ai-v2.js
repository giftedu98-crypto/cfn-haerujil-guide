/* CFN 무료 사진 후보 찾기
   API 키 없이 브라우저에서 공개 CLIP 모델을 내려받아 사진과 생물 후보를 비교합니다.
   첫 실행은 모델 파일을 받기 때문에 Wi-Fi에서 시간이 걸릴 수 있습니다. */
(() => {
  const candidates=[
    ['전복','an abalone shellfish','species-abalone.png','암반에 붙어 사는 귀 모양의 복족류입니다.','각장 10 cm','9.1 — 10.31'],
    ['소라','a turban shell sea snail','species-turban-snail.png','암반 조간대에 사는 단단한 껍데기의 복족류입니다.','각장 5 cm','6.1 — 8.31'],
    ['고둥','a marine sea snail gastropod','species-gastropod.png','바위 표면에서 발견되는 복족류입니다.','없음','없음'],
    ['바지락','a Manila clam shellfish','species-clam.png','모래와 갯벌 속에 사는 대표적인 조개입니다.','각장 2 cm','없음'],
    ['맛조개','a razor clam shellfish','species-razor-clam.png','길쭉한 껍데기를 가진 갯벌 조개입니다.','없음','없음'],
    ['낙지','a mud octopus','species-octopus.png','갯벌과 바위틈에서 활동하는 두족류입니다.','없음','없음'],
    ['문어','a common octopus','species-common-octopus.png','바위와 암반 지대에 사는 두족류입니다.','없음','없음'],
    ['꽃게','a blue swimming crab','species-crab.png','모래 바닥과 갯벌에 사는 게입니다.','갑장 6.4 cm','6.21 — 8.20'],
    ['망둥어','a goby fish','species-goby.png','갯벌과 얕은 연안에 사는 소형 어류입니다.','없음','없음'],
    ['해삼','a sea cucumber','species-sea-cucumber.png','해저 바닥과 바위 주변에 사는 극피동물입니다.','체장 15 cm','7.1 — 7.31'],
    ['성게','a sea urchin','species-sea-urchin.png','암반에서 발견되는 가시 달린 극피동물입니다.','없음','없음'],
    ['불가사리','a sea star starfish','species-sea-star.png','조간대 바위와 모래에서 발견되는 극피동물입니다.','없음','없음'],
    ['멍게','a sea squirt tunicate','species-sea-squirt.png','바위나 구조물에 붙어 사는 피낭동물입니다.','없음','없음'],
    ['주꾸미','a webfoot octopus','', '봄철 연안과 갯벌에서 관찰되는 작은 두족류입니다.','종별 상이','종별 상이'],
    ['꼴뚜기류','a small squid','', '얕은 연안에서 관찰되는 소형 오징어류입니다.','종별 상이','종별 상이'],
    ['가리비','a scallop shellfish','', '부채 모양 껍데기를 가진 이매패류입니다.','종별 상이','종별 상이'],
    ['새조개','a pen shell clam','', '긴 발을 가진 이매패류로 모래 바닥에 삽니다.','종별 상이','종별 상이'],
    ['가무락조개','a hard clam shellfish','', '단단한 껍데기를 가진 갯벌 조개류입니다.','종별 상이','종별 상이'],
    ['개조개','a surf clam shellfish','', '모래 갯벌에 사는 큰 조개류입니다.','종별 상이','종별 상이'],
    ['개량조개','a venus clam shellfish','', '모래 바닥에서 관찰되는 이매패류입니다.','종별 상이','종별 상이'],
    ['비단조개','a venus clam shellfish','', '매끈한 무늬의 작은 조개류입니다.','종별 상이','종별 상이'],
    ['모시조개','a clam shellfish','', '갯벌과 모래 바닥에 사는 조개류입니다.','종별 상이','종별 상이'],
    ['재첩','a freshwater brackish clam','', '하구의 기수역에서 관찰되는 작은 조개류입니다.','종별 상이','종별 상이'],
    ['대수리','a murex sea snail','', '암반에 붙어 사는 육식성 고둥류입니다.','종별 상이','종별 상이'],
    ['피뿔고둥','a horned sea snail','', '뿔 모양 돌기가 있는 고둥류입니다.','종별 상이','종별 상이'],
    ['삿갓조개','a limpet sea snail','', '바위에 단단히 붙어 사는 복족류입니다.','종별 상이','종별 상이'],
    ['군소','a sea hare mollusk','', '부드러운 몸을 가진 해양 복족류입니다.','채취 비권장','종별 상이'],
    ['박하지','a mud crab','', '바위틈과 갯벌에서 관찰되는 작은 게류입니다.','종별 상이','종별 상이'],
    ['풀게','a shore crab','', '갯벌과 돌 틈을 빠르게 이동하는 게류입니다.','종별 상이','종별 상이'],
    ['민꽃게','a swimming crab','', '연안 모래 바닥에 사는 꽃게과 게류입니다.','종별 상이','종별 상이'],
    ['털게','a hairy crab','', '털이 난 집게발을 가진 게류입니다.','종별 상이','종별 상이'],
    ['새우류','a marine shrimp','', '연안 갯벌과 해초 주변에 사는 갑각류입니다.','종별 상이','종별 상이'],
    ['대하','a king prawn shrimp','', '큰 몸집의 연안 새우류입니다.','종별 상이','종별 상이'],
    ['보리새우','a kuruma prawn shrimp','', '모래 바닥에 사는 새우류입니다.','종별 상이','종별 상이'],
    ['광어','a flounder fish','', '모래 바닥에 몸을 숨기는 넙치류입니다.','종별 상이','종별 상이'],
    ['도다리','a flounder fish','', '연안 모래 바닥에 사는 가자미류입니다.','종별 상이','종별 상이'],
    ['숭어','a grey mullet fish','', '하구와 연안에서 무리 지어 다니는 어류입니다.','종별 상이','종별 상이'],
    ['노래미','a greenling rockfish','', '암반 조간대에서 관찰되는 어류입니다.','종별 상이','종별 상이'],
    ['망상어','a sea perch fish','', '방파제와 암초 주변에서 관찰되는 어류입니다.','종별 상이','종별 상이'],
    ['학공치','a halfbeak fish','', '수면 가까이를 헤엄치는 길쭉한 어류입니다.','종별 상이','종별 상이'],
    ['전어','a gizzard shad fish','', '연안에서 계절에 따라 관찰되는 어류입니다.','종별 상이','종별 상이'],
    ['미더덕','a sea squirt tunicate','', '바위나 양식 시설에 붙어 사는 피낭동물입니다.','종별 상이','종별 상이'],
    ['파래','a green seaweed algae','', '갯벌과 암반에 붙어 자라는 녹조류입니다.','종별 상이','종별 상이'],
    ['청각','a green seaweed algae','', '가느다란 가지 모양의 녹조류입니다.','종별 상이','종별 상이'],
    ['다시마','a kelp brown seaweed','', '넓고 긴 잎을 가진 갈조류입니다.','종별 상이','종별 상이'],
    ['상어류','a shark','', '해루질 대상이 아닌 대형 해양 어류입니다. 가까이 가지 말고 즉시 안전한 거리로 이동하세요.','채취하지 마세요','종별 상이'],
    ['가오리류','a stingray ray fish','', '꼬리 가시에 다칠 수 있는 어류입니다. 밟지 말고 접근하지 마세요.','채취하지 마세요','종별 상이'],
    ['해파리류','a jellyfish','', '쏘임 위험이 있는 자포동물입니다. 맨손으로 만지지 마세요.','채취하지 마세요','종별 상이'],
    ['오징어류','a squid','', '빠르게 헤엄치는 두족류입니다.','종별 상이','종별 상이'],
    ['갑오징어류','a cuttlefish','', '납작한 몸과 내부 뼈를 가진 두족류입니다.','종별 상이','종별 상이'],
    ['소라게','a hermit crab','', '다른 조개껍데기에 들어가 사는 갑각류입니다.','없음','없음'],
    ['갯지렁이류','a marine polychaete worm','', '갯벌에 사는 환형동물입니다.','채취 비권장','없음'],
    ['굴','an oyster shellfish','', '바위나 구조물에 붙어 사는 이매패류입니다.','종별 상이','종별 상이'],
    ['홍합','a mussel shellfish','', '군집을 이루어 붙어 사는 이매패류입니다.','종별 상이','종별 상이'],
    ['피조개','an ark shellfish','', '붉은 혈색소를 가진 조개류입니다.','종별 상이','종별 상이'],
    ['새꼬막','a blood cockle shellfish','', '갯벌에 사는 작은 조개류입니다.','종별 상이','종별 상이'],
    ['동죽','a surf clam shellfish','', '모래 갯벌에 사는 조개류입니다.','종별 상이','종별 상이'],
    ['백합','a venus clam shellfish','', '모래 바닥에 사는 큰 조개류입니다.','종별 상이','종별 상이'],
    ['키조개','a pen shell shellfish','', '부채 모양의 큰 조개류입니다.','종별 상이','종별 상이'],
    ['골뱅이','a whelk sea snail','', '나선형 껍데기를 가진 복족류입니다.','종별 상이','종별 상이'],
    ['따개비','a barnacle crustacean','', '바위에 단단히 붙어 사는 갑각류입니다.','채취 비권장','없음'],
    ['돌게','a rock crab','', '암반 조간대에서 발견되는 게류입니다.','종별 상이','종별 상이'],
    ['칠게','a shore crab','', '갯벌 표면을 빠르게 이동하는 게류입니다.','종별 상이','종별 상이'],
    ['농게','a fiddler crab','', '한쪽 집게발이 큰 갯벌 게류입니다.','채취 비권장','없음'],
    ['짱뚱어','a mudskipper fish','', '갯벌 위를 뛰어다니는 어류입니다.','종별 상이','종별 상이'],
    ['베도라치','a blenny fish','', '바위 웅덩이에 사는 소형 어류입니다.','종별 상이','종별 상이'],
    ['쏨뱅이','a scorpionfish fish','', '등지느러미 가시에 주의해야 하는 어류입니다.','채취 비권장','종별 상이'],
    ['우럭','a rockfish fish','', '암초 주변에 사는 대표적인 연안 어류입니다.','종별 상이','종별 상이'],
    ['복어류','a pufferfish fish','', '독성이 있을 수 있으므로 맨손 취급과 섭취를 피하세요.','채취하지 마세요','종별 상이'],
    ['해마','a seahorse fish','', '보호가 필요한 희귀 해양생물일 수 있습니다.','채취하지 마세요','종별 상이'],
    ['미역','a brown seaweed','', '암반에 붙어 자라는 갈조류입니다.','종별 상이','종별 상이'],
    ['톳','a hijiki seaweed','', '조간대 암반에 붙어 자라는 갈조류입니다.','종별 상이','종별 상이']
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
    return `<p class="sheet-kicker">FREE PHOTO MATCH · BUSAN COAST</p><h2>${escape(name)}</h2><img class="ai-preview" src="${shown}" alt="${escape(name)} 사진"><p class="analysis-badge">가장 가능성이 높은 대상 · 사진 유사도 ${score}% · 부산 연안 후보 ${candidates.length}종 비교</p><p>${escape(description)}</p><div class="reg-grid"><div><span>금지체장</span><b>${escape(min)}</b></div><div><span>금어기</span><b>${escape(season)}</b></div></div><p class="safety-note">다른 후보: ${ranked.slice(1,3).map(x=>escape(candidates[x.index][0])).join(' · ')||'없음'}<br>유사도는 정답 보증이 아닙니다. 보호종·위험 생물 또는 불확실한 경우 채취하지 마세요.</p><div class="analysis-feedback"><strong>도움이 됐나요?</strong><button type="button" data-feedback="yes">Yes</button><button type="button" data-feedback="no">No</button><small id="feedbackStatus"></small></div>`;
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
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-feedback]');if(!button)return;
    const answer=button.dataset.feedback;
    const history=JSON.parse(localStorage.getItem('cfnPhotoFeedback')||'[]');
    history.push({answer,at:new Date().toISOString()});
    localStorage.setItem('cfnPhotoFeedback',JSON.stringify(history.slice(-50)));
    document.querySelector('#feedbackStatus').textContent=answer==='yes'?'감사합니다. 결과 개선에 참고할게요.':'알려주셔서 감사합니다. 불확실한 생물은 채취하지 마세요.';
    document.querySelectorAll('[data-feedback]').forEach(b=>b.disabled=true);
  });
})();

