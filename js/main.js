/* ==========================================================================
   Main JavaScript
   Navigation, scroll effects, FAQ accordion, scroll-reveal animations.
   ========================================================================== */

(function () {
  'use strict';

  // ---- DOM references ----
  const nav = document.getElementById('site-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navLinks = document.querySelectorAll('.nav-link');
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  const revealElements = document.querySelectorAll('.reveal');
  const yearEl = document.getElementById('current-year');
  const sections = document.querySelectorAll('section[id]');

  // ---- Current year ----
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Navigation: scroll state ----
  function updateNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });
  updateNavScroll();

  // ---- Mobile menu toggle ----
  function openMobileMenu() {
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    navMobile.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus trap: focus first link
    const firstLink = navMobile.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navMobile.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navMobile.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close mobile menu on link click
  navMobile.addEventListener('click', function (e) {
    if (e.target.matches('.nav-link') || e.target.matches('.btn')) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMobile.classList.contains('is-open')) {
      closeMobileMenu();
      navToggle.focus();
    }
  });

  // Focus trap inside mobile menu
  navMobile.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = navMobile.querySelectorAll('a, button');
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ---- Active nav link on scroll ----
  const navObserverOptions = {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === '#' + id
          );
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(function (section) {
    navObserver.observe(section);
  });

  // ---- FAQ accordion ----
  faqTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      const contentId = this.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      if (!content) return;

      if (isOpen) {
        this.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
      } else {
        // Close other open items
        faqTriggers.forEach(function (other) {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false');
            var otherId = other.getAttribute('aria-controls');
            var otherContent = document.getElementById(otherId);
            if (otherContent) otherContent.style.maxHeight = '0';
          }
        });

        this.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ---- Scroll reveal (Intersection Observer) ----
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // If reduced motion preferred, show all elements immediately
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---- Smooth scroll for anchor links (fallback for older browsers) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Package buttons: pre-select service in contact form ----
  document.querySelectorAll('[data-package]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const serviceSelect = document.getElementById('contact-service');
      if (!serviceSelect) return;

      const packageMap = {
        standard: 'custom-theme',
        custom: 'full-website',
        advanced: 'woocommerce',
      };

      const serviceValue = packageMap[this.dataset.package];
      if (serviceValue) {
        serviceSelect.value = serviceValue;
      }
    });
  });

  // ---- Portfolio Carousel Slider ----
  document.querySelectorAll('.portfolio-carousel').forEach(function (carousel) {
    const track = carousel.querySelector('.portfolio-carousel-track');
    const slides = carousel.querySelectorAll('.portfolio-carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn--prev');
    const nextBtn = carousel.querySelector('.carousel-btn--next');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    const total = slides.length;

    if (!track || total <= 1) return;

    function goToSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;

      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

      dots.forEach(function (dot, i) {
        if (i === currentIndex) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(i);
      });
    });

    // Touch swipe support
    let startX = 0;
    carousel.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
      }
    }, { passive: true });
  });
})();
