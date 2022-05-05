const COPY_EVENT = new Event('copy-to-clipboard');

// Copy to clipboard toast
function createToast() {
  const toastNode = document.createElement('div');
  toastNode.classList.add('toast');
  toastNode.innerHTML = `<span>Copied to clipboard!</span>`;

  document.addEventListener('copy-to-clipboard', () => {
    console.log('show toast');
    toastNode.classList.toggle('shown');
    setTimeout(() => {
      toastNode.classList.toggle('shown');
    }, 2000);
  })

  document.body.appendChild(toastNode);
}

//TODO Create a fallback function just in case the user's browser doesn't support the clipboard API.
const fallbackCopyToClipboard = () => {
  console.log('Not supported');
}

// Helper function that copies the content passed into the user's clipboard.
function copyToClipboard(content) {
  if (!navigator.clipboard) {
    fallbackCopyToClipboard();
    return;
  }

  navigator.clipboard.writeText(content).then(() => {
    console.log('Copied to clipboard');
    // Emit event to show the user the content has been copied.
    document.dispatchEvent(COPY_EVENT);
  }).catch(error => console.warn(error));
}

/**
 * @description A function that handles the copying of JSON to the user's clipboard.
 * @param {string} format - The format of the tokens.
 * @param {Object} tokens - The object of the tokens.
 */
function handleCopyToClipboard(content) {
  typeof content === 'object' ? copyToClipboard(JSON.stringify(content, null, 2)) : copyToClipboard(content)
}

createToast();