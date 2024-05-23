import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const element = document.getElementById('mode-switch');

  element.addEventListener('click', function switchMode() {
    const isDark = document.body.dataset.mode === 'dark';
    document.body.dataset.mode = isDark ? 'light' : 'dark';
  });
}