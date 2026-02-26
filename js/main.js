(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var visionToggle = document.getElementById('vision-toggle');
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  var year = document.getElementById('current-year');
  var modeStatus = document.getElementById('mode-status');
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAccept = document.getElementById('cookie-accept');
  var cookieReject = document.getElementById('cookie-reject');
  var leadForm = document.getElementById('lead-form');
  var formStatus = document.getElementById('form-status');
  var gaMeta = document.querySelector('meta[name="ga4-id"]');

  var CONSENT_KEY = 'bpr-cookie-consent';
  var gaId = gaMeta ? gaMeta.getAttribute('content') : '';

  if (year) year.textContent = String(new Date().getFullYear());

  function announce(message) {
    if (modeStatus) {
      modeStatus.textContent = message;
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      var active = theme === 'dark';
      var label = themeToggle.querySelector('.mode-btn-text');
      themeToggle.setAttribute('aria-pressed', String(active));
      themeToggle.setAttribute('aria-label', active ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      if (label) {
        label.textContent = active ? 'Oscuro' : 'Claro';
      }
    }
  }

  function applyVision(mode) {
    root.setAttribute('data-vision', mode);
    if (visionToggle) {
      var active = mode === 'colorblind';
      visionToggle.setAttribute('aria-pressed', String(active));
      visionToggle.textContent = active ? 'Color estandar' : 'Modo colorblind';
      visionToggle.setAttribute('aria-label', active ? 'Cambiar a paleta de color estandar' : 'Activar paleta de color amigable para daltonismo');
    }
  }

  function closeNav() {
    if (menuToggle && nav) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      nav.classList.remove('is-open');
    }
  }

  function loadAnalytics() {
    if (!gaId || gaId === 'G-XXXXXXXXXX' || window.__bprGaLoaded) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      anonymize_ip: true,
      transport_type: 'beacon'
    });

    window.__bprGaLoaded = true;
  }

  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }

  function setCookieBannerVisible(visible) {
    if (!cookieBanner) return;
    cookieBanner.classList.toggle('is-hidden', !visible);
  }

  function persistConsent(consentValue) {
    localStorage.setItem(CONSENT_KEY, consentValue);
    if (consentValue === 'accepted') {
      loadAnalytics();
      trackEvent('cookie_consent', { consent: 'accepted' });
    }
    setCookieBannerVisible(false);
  }

  function initConsent() {
    if (!cookieBanner) return;

    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      loadAnalytics();
      setCookieBannerVisible(false);
      return;
    }

    if (consent === 'rejected') {
      setCookieBannerVisible(false);
      return;
    }

    setCookieBannerVisible(true);
  }

  function initCtaTracking() {
    var trackedElements = document.querySelectorAll('[data-track]');
    trackedElements.forEach(function (element) {
      element.addEventListener('click', function () {
        var label = element.getAttribute('data-track') || 'cta';
        trackEvent('cta_click', {
          cta_label: label,
          cta_text: (element.textContent || '').trim().slice(0, 80)
        });
      });
    });
  }

  function initLeadForm() {
    if (!leadForm || !formStatus) return;

    leadForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!leadForm.checkValidity()) {
        formStatus.textContent = 'Revisa los campos obligatorios antes de enviar.';
        return;
      }

      var data = new FormData(leadForm);
      var name = String(data.get('name') || '').trim();
      var email = String(data.get('email') || '').trim();
      var company = String(data.get('company') || '').trim();
      var service = String(data.get('service') || '').trim();
      var budget = String(data.get('budget') || '').trim();
      var goal = String(data.get('goal') || '').trim();

      trackEvent('generate_lead', {
        lead_service: service,
        lead_budget: budget
      });

      var subject = encodeURIComponent('Nuevo lead web - ' + company);
      var body = encodeURIComponent(
        'Nombre: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Empresa: ' + company + '\n' +
        'Servicio: ' + service + '\n' +
        'Presupuesto: ' + budget + '\n\n' +
        'Objetivo:\n' + goal
      );

      formStatus.textContent = 'Gracias. Abriremos tu cliente de correo para completar el envio.';
      window.location.href = 'mailto:hola@bprsoluciones.com?subject=' + subject + '&body=' + body;
      leadForm.reset();
    });
  }

  var storedTheme = localStorage.getItem('bpr-theme');
  var storedVision = localStorage.getItem('bpr-vision');
  var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(storedTheme || (systemDark ? 'dark' : 'light'));
  applyVision(storedVision || 'default');
  initConsent();
  initCtaTracking();
  initLeadForm();

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      persistConsent('accepted');
      announce('Cookies de medicion aceptadas');
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', function () {
      persistConsent('rejected');
      announce('Cookies de medicion rechazadas');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('bpr-theme', next);
      applyTheme(next);
      announce(next === 'dark' ? 'Tema oscuro activado' : 'Tema claro activado');
    });
  }

  if (visionToggle) {
    visionToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-vision');
      var next = current === 'colorblind' ? 'default' : 'colorblind';
      localStorage.setItem('bpr-vision', next);
      applyVision(next);
      announce(next === 'colorblind' ? 'Modo colorblind activado' : 'Modo colorblind desactivado');
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menuToggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Cerrar menu');
      nav.classList.toggle('is-open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    document.addEventListener('click', function (event) {
      var isOpen = nav.classList.contains('is-open');
      if (!isOpen) return;
      var clickedInsideNav = nav.contains(event.target);
      var clickedMenuButton = menuToggle.contains(event.target);
      if (!clickedInsideNav && !clickedMenuButton) {
        closeNav();
      }
    });
  }

  var revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach(function (item) {
        item.classList.add('in-view');
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    }
  }
})();
