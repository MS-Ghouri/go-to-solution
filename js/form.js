/* ==========================================================================
   Contact Form — AJAX Formspree Submission & Confirmation Modal Overlay
   ========================================================================== */

(function () {
  'use strict';

  // 1. DOM References
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const modal = document.getElementById('confirmation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');

  // Modal Control Functions
  function openModal() {
    if (!modal) return;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close modal event listeners
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (!form) return;

  // 2. Form Submission Handler
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (submitBtn) submitBtn.disabled = true;

    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        if (response.ok) {
          // Open customized dark confirmation modal
          openModal();
          form.reset();
        } else {
          alert('Oops! There was a problem submitting your form. Please try again.');
        }
      })
      .catch(function (error) {
        console.error('Form submission error:', error);
        alert('Oops! There was a problem submitting your form. Please try again.');
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
