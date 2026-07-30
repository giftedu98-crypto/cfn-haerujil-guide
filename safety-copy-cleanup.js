(() => {
  const removeHint = () => document.querySelector('#safe .safety-note')?.remove();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', removeHint, { once: true });
  else removeHint();
})();
