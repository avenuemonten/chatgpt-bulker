'use strict';
document.getElementById('version').textContent = `v${chrome.runtime.getManifest().version}`;
document.getElementById('open-chatgpt').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  if (button.disabled) return;
  button.disabled = true;
  const status = document.getElementById('action-status');
  status.hidden = true;
  try {
    await chrome.tabs.create({ url: 'https://chatgpt.com/' });
  } catch {
    status.textContent = 'Could not open ChatGPT. Please try again.';
    status.hidden = false;
  } finally {
    button.disabled = false;
  }
});
