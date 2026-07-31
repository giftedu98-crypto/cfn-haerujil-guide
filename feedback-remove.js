(() => {
  const removeFeedback=()=>document.querySelectorAll('.analysis-feedback').forEach(el=>el.remove());
  new MutationObserver(removeFeedback).observe(document.querySelector('#bioText'),{childList:true,subtree:true});
  removeFeedback();
})();
