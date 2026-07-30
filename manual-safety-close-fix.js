let manualSafetyOpen=false;
const manualSafety=document.querySelector('#manualSafety');
const safetyClose=document.querySelector('#safeX');
const pointSafetyClose=safetyClose.onclick;
manualSafety.onclick=()=>{manualSafetyOpen=true;document.querySelector('#skipSafety').style.display='none';document.querySelector('#safe').classList.add('show')};
safetyClose.onclick=function(event){if(manualSafetyOpen){manualSafetyOpen=false;document.querySelector('#safe').classList.remove('show');document.querySelector('#skipSafety').style.display='block';return;}return pointSafetyClose.call(this,event)};
