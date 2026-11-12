/**
 * Center for Bridge Education (CBE) - Anti-Scraping Email Protection
 *
 * Prevents automated web spiders, crawlers, and scrapers from harvesting
 * the organization's email address from raw static HTML responses.
 */
(function() {
  const user = atob('Q0JFU0ZtYWlu'); // CBESFmain
  const paymentUser = atob('Y2hyaXNjaGVuLmNiZQ=='); // chrischen.cbe
  const domain = atob('Z21haWwuY29t'); // gmail.com
  const email = user + '@' + domain;
  const paymentEmail = paymentUser + '@' + domain;

  function renderProtectedEmails() {
    // 1. Interactive general contact email links
    document.querySelectorAll('.cbe-email-link').forEach(el => {
      if (!el.dataset.keepLabel) {
        el.textContent = email;
      }
      el.href = 'mailto:' + email;
    });

    // 2. Venmo & Zelle recipient email text elements
    document.querySelectorAll('.cbe-email-text').forEach(el => {
      el.textContent = paymentEmail;
    });

    // 3. Venmo payment links
    document.querySelectorAll('.cbe-venmo-link').forEach(el => {
      el.href = 'https://account.venmo.com/pay?recipients=' + encodeURIComponent(paymentEmail);
    });
  }

  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.navbar-nav');
    if (!toggleBtn || !navList || toggleBtn.dataset.bound) return;
    toggleBtn.dataset.bound = 'true';

    const hamburgerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    const setMenuOpen = (isOpen) => {
      navList.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleBtn.innerHTML = isOpen ? closeIcon : hamburgerIcon;
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

  // Global helpers for copy buttons
  function copyTextWithFeedback(text, buttonTextElementId) {
    navigator.clipboard.writeText(text).then(() => {
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
  }

  window.copyCBEProtectedEmail = function(buttonTextElementId) {
    copyTextWithFeedback(email, buttonTextElementId);
  };

  window.copyCBEPaymentEmail = function(buttonTextElementId) {
    copyTextWithFeedback(paymentEmail, buttonTextElementId);
  };
})();
