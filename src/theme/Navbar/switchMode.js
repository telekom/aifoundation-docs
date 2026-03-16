import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  function bindSwitchMode() {
    const element = document.getElementById('mode-switch');
    if (element && !element._switchBound) {
      element._switchBound = true;
      element.addEventListener('click', function switchMode() {
        const isDark = document.body.dataset.mode === 'dark';
        const newMode = isDark ? 'light' : 'dark';
        document.body.dataset.mode = newMode;
        document.documentElement.setAttribute('data-theme', newMode);
      });
    }
  }

  // Try binding immediately, on DOMContentLoaded, and via MutationObserver
  // since React may render the button after DOMContentLoaded
  document.addEventListener('DOMContentLoaded', bindSwitchMode);

  const observer = new MutationObserver(() => {
    if (document.getElementById('mode-switch')) {
      bindSwitchMode();
      observer.disconnect();
    }
  });
  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
}