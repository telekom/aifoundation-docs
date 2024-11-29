import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('mode-switch');
    if (element) {
      element.addEventListener('click', function switchMode() {
        const isDark = document.body.dataset.mode === 'dark';
        document.body.dataset.mode = isDark ? 'light' : 'dark';
      });
    }
  });
}