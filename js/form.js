/* ==========================================================================
   Contact Form — AJAX Formspree Submission (Prevents Page Redirect)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Select the contact form
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit');

  // 2. Add event listener for submit event
  form.addEventListener('submit', function (event) {
    // 3. Prevent the default browser redirect to Formspree
    event.preventDefault();

    // Disable submit button while request is in flight
    if (submitBtn) submitBtn.disabled = true;

    // 4. Send FormData to Formspree via Fetch API
    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        // 5. Crucial: Request JSON response so Formspree responds silently
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        // 6. On success: alert user and reset form fields
        if (response.ok) {
          alert('Your response has been submitted. I will contact you shortly!');
          form.reset();
        } else {
          // 7. On response error: show error alert
          alert('Oops! There was a problem submitting your form. Please try again.');
        }
      })
      .catch(function (error) {
        // Network or fetch failure: show generic error alert
        console.error('Form submission error:', error);
        alert('Oops! There was a problem submitting your form. Please try again.');
      })
      .finally(function () {
        // Re-enable submit button
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
