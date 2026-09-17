/* ==========================================================================
   Contact Form — HTML5 Validation + EmailJS Integration
   ========================================================================== */

// ========================================================================
// EMAILJS CONFIGURATION
// Paste your EmailJS credentials into these variables:
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an email service (e.g. Gmail) -> get YOUR_SERVICE_ID
// 3. Create an email template -> get YOUR_TEMPLATE_ID
// 4. Account Settings -> API Keys -> get YOUR_PUBLIC_KEY
// ========================================================================
const YOUR_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const YOUR_SERVICE_ID = 'YOUR_SERVICE_ID';
const YOUR_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

(function () {
  'use strict';

  // ---- DOM references ----
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const statusLoading = document.getElementById('form-loading');
  const statusSuccess = document.getElementById('form-success');
  const statusError = document.getElementById('form-error');

  if (!form) return;

  // Initialize EmailJS if public key is configured
  if (typeof emailjs !== 'undefined' && YOUR_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(YOUR_PUBLIC_KEY);
  }

  // ---- Rate limiting ----
  let lastSubmitTime = 0;
  const SUBMIT_COOLDOWN = 10000; // 10 seconds between submissions

  // ---- UI Helpers ----
  function hideAllStatuses() {
    if (statusLoading) statusLoading.classList.remove('is-visible');
    if (statusSuccess) statusSuccess.classList.remove('is-visible');
    if (statusError) statusError.classList.remove('is-visible');
  }

  function setFormState(state) {
    hideAllStatuses();

    const btnText = submitBtn.querySelector('.btn-text');

    switch (state) {
      case 'loading':
        submitBtn.disabled = true;
        if (btnText) btnText.textContent = 'Sending…';
        if (statusLoading) statusLoading.classList.add('is-visible');
        break;
      case 'success':
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (statusSuccess) statusSuccess.classList.add('is-visible');
        break;
      case 'error':
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (statusError) statusError.classList.add('is-visible');
        break;
      default:
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
    }
  }

  // ---- Form submission ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. Native HTML5 validation — prevents empty submissions
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    hideAllStatuses();

    // 2. Honeypot check for bots
    const honeypot = document.getElementById('contact-website');
    if (honeypot && honeypot.value.trim() !== '') {
      // Bot detected — fake success silently
      setFormState('success');
      return;
    }

    // 3. Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
      if (statusError) {
        statusError.textContent = 'Please wait a moment before submitting again.';
      }
      setFormState('error');
      return;
    }

    // 4. Verify EmailJS configuration
    if (
      typeof emailjs === 'undefined' ||
      YOUR_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
      YOUR_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      YOUR_TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
    ) {
      console.warn(
        'EmailJS is not yet configured. Please insert your credentials at the top of js/form.js.'
      );
      if (statusError) {
        statusError.innerHTML =
          'Contact form keys are pending configuration. In the meantime, please reach out directly via WhatsApp or email.';
      }
      setFormState('error');
      return;
    }

    // 5. Submit form directly using EmailJS sendForm
    setFormState('loading');
    lastSubmitTime = now;

    emailjs
      .sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form, YOUR_PUBLIC_KEY)
      .then(function () {
        setFormState('success');
        form.reset();
      })
      .catch(function (error) {
        console.error('EmailJS sendForm error:', error);
        if (statusError) {
          statusError.textContent =
            'Something went wrong while sending your message. Please try again or reach out via WhatsApp.';
        }
        setFormState('error');
      });
  });
})();
