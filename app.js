/* Atmosféra Nails Studio — shared behaviour (loaded with defer) */
(function () {
  // current year in footer
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // mobile hamburger menu
  var t = document.getElementById('menuToggle');
  var n = document.getElementById('navLinks');
  if (t && n) {
    t.addEventListener('click', function () {
      var open = n.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
    n.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        n.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // close language dropdown when clicking outside
  document.addEventListener('click', function (e) {
    var lp = document.querySelector('.lang-pick');
    if (lp && lp.open && !lp.contains(e.target)) lp.removeAttribute('open');
  });

  /* ---------- live ratings ----------
     Fills every [data-rev="<source>.<field>"] from reviews.json.
     The values already in the HTML are the fallback: if the fetch fails,
     the page keeps showing them, so nothing ever renders blank. */
  var hooks = document.querySelectorAll('[data-rev]');
  if (!hooks.length || !window.fetch) return;

  // resolve next to app.js itself, so it works at "/" and at "/<lang>/" alike
  var self = document.currentScript || document.querySelector('script[src$="app.js"]');
  if (!self) return;
  var url = new URL('reviews.json', self.src);

  var lang = document.documentElement.lang || 'sk';

  function fmt(value, field) {
    if (typeof value !== 'number' || !isFinite(value)) return null;
    if (field !== 'rating') return String(Math.round(value));
    try {
      return value.toLocaleString(lang, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    } catch (err) {
      // Intl unavailable / unknown locale — mirror the separator already on the page
      return value.toFixed(1).replace('.', lang === 'en' ? '.' : ',');
    }
  }

  fetch(url.href, { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data) return;
      Array.prototype.forEach.call(hooks, function (el) {
        var path = el.getAttribute('data-rev').split('.');
        var source = data[path[0]];
        if (!source) return;
        var text = fmt(source[path[1]], path[1]);
        if (text) el.textContent = text;
      });
    })
    .catch(function () { /* keep the fallback markup */ });
})();
