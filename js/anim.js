// Micro-interactions : apparition au défilement, ombre du menu, dés qui se remplissent.
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var top = document.querySelector('.top');
  if (top) {
    var onScroll = function () { top.classList.toggle('scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  document.querySelectorAll('a.term').forEach(function (t) {
    var place = function () {
      var r = t.getBoundingClientRect();
      t.classList.toggle('tip-right', r.left + 290 > window.innerWidth);
      t.classList.toggle('tip-below', r.top < 140);
    };
    t.addEventListener('mouseenter', place);
    t.addEventListener('focus', place);
  });
  if (reduce || !('IntersectionObserver' in window)) return;
  root.classList.add('anim');
  // Terminal de l'accueil : les commandes se tapent, les réponses s'affichent ligne par ligne
  var term = document.querySelector('.console');
  if (term) {
    var lines = Array.prototype.slice.call(term.querySelectorAll('.ln'));
    var texts = lines.map(function (l) { var t = l.querySelector('.tx'); return t ? t.textContent : null; });
    term.classList.add('typing');
    var play = function () {
      var i = 0;
      var next = function () {
        if (i >= lines.length) return;
        var l = lines[i], t = l.querySelector('.tx'), full = texts[i];
        l.classList.add('shown');
        if (t && full) {
          t.textContent = ''; var c = 0;
          var tick = setInterval(function () {
            t.textContent = full.slice(0, ++c);
            if (c >= full.length) { clearInterval(tick); i++; setTimeout(next, 260); }
          }, 55);
        } else { i++; setTimeout(next, l.classList.contains('out') ? 140 : 300); }
      };
      next();
    };
    var to = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { to.disconnect(); setTimeout(play, 350); }
    }, { threshold: 0.3 });
    to.observe(term);
  }
  var sel = '.feat, .stats div, h2, .pagehead, .intro, .hint, .projects > li, .tile, .path li, .links a, .doors a';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  els.forEach(function (el) { el.classList.add('reveal'); });
  document.querySelectorAll('.tiles').forEach(function (ul) {
    Array.prototype.forEach.call(ul.children, function (li, i) {
      li.style.transitionDelay = (Math.min(i, 8) * 45) + 'ms';
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
  els.forEach(function (el) { io.observe(el); });
})();
