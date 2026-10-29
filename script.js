document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const menuButton = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  if (menuButton && navbar) {
    menuButton.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
  }

  // Simple English/Arabic text toggle for the labels and content carrying data-en/data-ar.
  let language = 'en';
  document.querySelectorAll('.language-toggle').forEach(button => {
    button.addEventListener('click', () => {
      language = language === 'en' ? 'ar' : 'en';
      document.documentElement.lang = language;
      document.body.classList.toggle('rtl', language === 'ar');
      document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        el.textContent = el.dataset[language];
      });
      document.querySelectorAll('.language-toggle').forEach(btn => {
        btn.textContent = language === 'en' ? 'EN / AR' : 'AR / EN';
      });
    });
  });

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const status = document.querySelector('#form-status');
      const submit = form.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(form).entries());
      status.textContent = 'Sending your enquiry…';
      submit.disabled = true;
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Unable to send your enquiry right now.');
        status.textContent = 'Thank you. Your enquiry has been sent.';
        form.reset();
      } catch (error) {
        status.textContent = 'The form could not be sent. Please try again later or contact us directly.';
      } finally {
        submit.disabled = false;
      }
    });
  }
});