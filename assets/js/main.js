/* Live The Day Holidays — livetheday.nz */
(function () {
  'use strict';

  /* mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }

  /* current year in footer */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* enquiry form — no backend required.
     Set data-endpoint on the <form> to a Formspree/Netlify URL to collect leads.
     Until then it falls back to opening the visitor's mail client. */
  var form = document.querySelector('form[data-enquiry]');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var MAILTO = form.getAttribute('data-mailto') || 'travel@livetheday.nz';

  function say(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var required = form.querySelectorAll('[required]');
    for (var i = 0; i < required.length; i++) {
      if (!required[i].value.trim()) {
        say('Please fill in every required field.', false);
        required[i].focus();
        return;
      }
    }

    var data = new FormData(form);
    var lines = [];
    data.forEach(function (v, k) {
      if (v) lines.push(k + ': ' + v);
    });
    var body = lines.join('\n');

    var endpoint = form.getAttribute('data-endpoint');
    if (endpoint) {
      say('Sending your enquiry…', true);
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          form.reset();
          say('Thank you — your enquiry is with our team. We reply within one business day.', true);
        })
        .catch(function () {
          say('Something went wrong. Please email us directly at ' + MAILTO + '.', false);
        });
      return;
    }

    var subject = encodeURIComponent('Website enquiry — ' + (data.get('name') || 'Traveller'));
    window.location.href = 'mailto:' + MAILTO + '?subject=' + subject + '&body=' + encodeURIComponent(body);
    say('Opening your email app to send this to ' + MAILTO + '.', true);
  });
})();
