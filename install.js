(() => {
  'use strict';
  const tools = document.getElementById('app-tools');
  const button = document.getElementById('install-app');
  const help = document.getElementById('install-help');
  const text = document.getElementById('install-help-text');
  const standalone = window.matchMedia('(display-mode: standalone)');
  let installEvent = null;
  let installed = false;
  const sync = () => { tools.hidden = installed || standalone.matches || navigator.standalone === true; };
  const closeHelp = () => { help.hidden = true; button.setAttribute('aria-expanded', 'false'); };
  function showHelp() {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    text.textContent = ios
      ? 'In Safari, tap Share, then Add to Home Screen.'
      : 'Open your browser menu and choose Install app or Add to Home screen. If it is missing, open this page in Chrome, Edge, or Brave.';
    help.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  }
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installEvent = event;
    closeHelp();
    sync();
  });
  button.addEventListener('click', async () => {
    if (!installEvent) { if (help.hidden) showHelp(); else closeHelp(); return; }
    const prompt = installEvent;
    installEvent = null;
    button.disabled = true;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') { installed = true; closeHelp(); sync(); }
    } catch { showHelp(); }
    finally { button.disabled = false; }
  });
  window.addEventListener('appinstalled', () => { installed = true; installEvent = null; closeHelp(); sync(); });
  standalone.addEventListener('change', sync);
  document.getElementById('install-close').addEventListener('click', () => { closeHelp(); button.focus(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !help.hidden) { closeHelp(); button.focus(); } });
  document.addEventListener('click', event => { if (!tools.contains(event.target)) closeHelp(); });
  sync();
  if ('serviceWorker' in navigator && window.isSecureContext) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js', {scope: './'}).catch(() => {}); });
  }
})();
