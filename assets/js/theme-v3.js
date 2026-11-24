(() => {
  const preferenceKey = 'hguo-color-theme';
  const themes = ['system', 'light', 'dark'];
  const root = document.documentElement;
  let theme = 'system';

  try {
    const savedTheme = localStorage.getItem(preferenceKey);
    if (themes.includes(savedTheme)) theme = savedTheme;
  } catch {
    // A blocked storage API still allows use of the current page's theme.
  }

  function applyTheme(value) {
    if (value === 'system') delete root.dataset.theme;
    else root.dataset.theme = value;
  }

  applyTheme(theme);

  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.querySelector('#color-theme');
    picker.value = theme;
    picker.closest('label').hidden = false;
    picker.addEventListener('change', () => {
      theme = picker.value;
      applyTheme(theme);
      try {
        localStorage.setItem(preferenceKey, theme);
      } catch {
        // The current selection remains active until navigation.
      }
    });
  });
})();
