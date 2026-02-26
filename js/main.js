(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var visionToggle = document.getElementById('vision-toggle');
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  var year = document.getElementById('current-year');
  var modeStatus = document.getElementById('mode-status');

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

  var storedTheme = localStorage.getItem('bpr-theme');
  var storedVision = localStorage.getItem('bpr-vision');
  var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(storedTheme || (systemDark ? 'dark' : 'light'));
  applyVision(storedVision || 'default');

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
