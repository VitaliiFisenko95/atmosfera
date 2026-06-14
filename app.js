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
})();
