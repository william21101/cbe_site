/**
 * Center for Bridge Education (CBE) - Anti-Scraping Email Protection
 *
 * Prevents automated web spiders, crawlers, and scrapers from harvesting
 * the organization's email address from raw static HTML responses.
 */
(function() {
  const user = atob('Q0JFU0ZtYWlu'); // CBESFmain
  const domain = atob('Z21haWwuY29t'); // gmail.com
  const email = user + '@' + domain;

  function renderProtectedEmails() {
    // 1. Interactive email links
    document.querySelectorAll('.cbe-email-link').forEach(el => {
      el.textContent = email;
      el.href = 'mailto:' + email;
    });

    // 2. Text-only elements (e.g. Venmo/Zelle recipient boxes)
    document.querySelectorAll('.cbe-email-text').forEach(el => {
      el.textContent = email;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProtectedEmails);
  } else {
    renderProtectedEmails();
  }

  // Global helper for copy buttons
  window.copyCBEProtectedEmail = function(buttonTextElementId) {
    navigator.clipboard.writeText(email).then(() => {
      if (buttonTextElementId) {
        const btnText = document.getElementById(buttonTextElementId);
        if (btnText) {
          const original = btnText.textContent;
          btnText.textContent = 'Copied!';
          setTimeout(() => {
            btnText.textContent = original;
          }, 2000);
        }
      }
    });
  };
})();
