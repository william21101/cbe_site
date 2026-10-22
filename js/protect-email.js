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
      if (!el.dataset.keepLabel) {
        el.textContent = email;
      }
      el.href = 'mailto:' + email;
    });

    // 2. Text-only elements (e.g. Venmo/Zelle recipient boxes)
    document.querySelectorAll('.cbe-email-text').forEach(el => {
      el.textContent = email;
    });
  }

  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.navbar-nav');
    if (!toggleBtn || !navList || toggleBtn.dataset.bound) return;
    toggleBtn.dataset.bound = 'true';

    const setMenuOpen = (isOpen) => {
      navList.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !navList.classList.contains('open');
      setMenuOpen(isOpen);
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (navList.classList.contains('open') && !navList.contains(e.target) && !toggleBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        setMenuOpen(false);
        toggleBtn.focus();
      }
    });
  }

  function initAll() {
    renderProtectedEmails();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
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
