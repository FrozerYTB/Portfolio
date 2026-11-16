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
  document.querySelectorAll('.term').forEach(function (t) {
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
  var sel = 'h2, .pagehead, .intro, .hint, .projects > li, .tile, .path li, .links a, .doors a';
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
