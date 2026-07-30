/* 포인트는 바로 정보 화면으로 열고, 안전수칙은 전용 버튼에서만 연다. */
document.querySelectorAll('.single-pin').forEach(pin=>{
  pin.addEventListener('click',()=>localStorage.setItem('mgnSkipSafety','1'),true);
});
