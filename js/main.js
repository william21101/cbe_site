/**
 * Center for Bridge Education (CBE) - Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initStatCounters();
  initPhotoLightbox();
  initNewsletter();
});

/* -------------------------------------------------------------------------- */
/* Sticky Header Blur & Shadow on Scroll                                      */
/* -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------------------- */
/* Mobile Navigation Drawer                                                  */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* -------------------------------------------------------------------------- */
/* Animated Impact Counters                                                  */
/* -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.impact-number');
  if (!statNumbers.length) return;

  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const prefix = stat.getAttribute('data-prefix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);

        stat.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const impactSection = document.querySelector('.impact-section');
  if (impactSection) {
    observer.observe(impactSection);
  }
}

/* -------------------------------------------------------------------------- */
/* Photo Gallery Lightbox Modal                                              */
/* -------------------------------------------------------------------------- */
function initPhotoLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  if (!galleryItems.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const openLightbox = (src, title, sub) => {
    lightboxImg.src = src;
    lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="color: #fbbf24; font-size: 0.85rem;">${sub}</span>`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-caption-title')?.textContent || '';
      const sub = item.querySelector('.gallery-caption-sub')?.textContent || '';
      if (img) openLightbox(img.src, title, sub);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Newsletter Form Handling                                                  */
/* -------------------------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const feedback = document.getElementById('newsletter-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (input && input.value.trim()) {
      feedback.textContent = '🎉 Thank you for subscribing to CBE announcements!';
      feedback.className = 'newsletter-feedback success';
      input.value = '';
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 5000);
    }
  });
}
