// Flocon-réseau animé de la page d'accueil
(function () {
  var canvas = document.getElementById('flake');
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var segs = [], nodes = [], size = 0, colors = {}, start = null;

  // Un bras (vers le haut, coordonnées unité), puis 6 rotations : flocon = topologie réseau.
  function buildArm() {
    var s = [], n = [];
    s.push([0, 0.1, 0, 1]);
    n.push([0, 1, 1]);
    var branches = [[0.3, 0.34], [0.5, 0.28], [0.7, 0.2], [0.86, 0.11]];
    branches.forEach(function (b, i) {
      [-1, 1].forEach(function (side) {
        var a = side * Math.PI / 3;
        var x2 = Math.sin(a) * b[1], y2 = b[0] + Math.cos(a) * b[1];
        s.push([0, b[0], x2, y2]);
        n.push([x2, y2, 0.7]);
        if (i < 2) {
          var mx = Math.sin(a) * b[1] * 0.55, my = b[0] + Math.cos(a) * b[1] * 0.55;
          s.push([mx, my, mx, my + b[1] * 0.38]);
          n.push([mx, my + b[1] * 0.38, 0.5]);
        }
      });
      n.push([0, b[0], 0.6]);
    });
    return { s: s, n: n };
  }
  function build() {
    var arm = buildArm();
    segs = []; nodes = [];
    for (var k = 0; k < 6; k++) {
      var c = Math.cos(k * Math.PI / 3), sn = Math.sin(k * Math.PI / 3);
      var rot = function (x, y) { return [x * c - y * sn, x * sn + y * c]; };
      arm.s.forEach(function (q) { var a = rot(q[0], q[1]), b = rot(q[2], q[3]); segs.push([a[0], a[1], b[0], b[1]]); });
      arm.n.forEach(function (q) { var a = rot(q[0], q[1]); nodes.push([a[0], a[1], q[2]]); });
      var h1 = rot(0, 0.1), c2 = Math.cos((k + 1) * Math.PI / 3), s2 = Math.sin((k + 1) * Math.PI / 3);
      segs.push([h1[0], h1[1], -0.1 * s2, 0.1 * c2]);
    }
  }
  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors.accent = cs.getPropertyValue('--accent').trim();
    colors.line = cs.getPropertyValue('--muted').trim();
    colors.bg = cs.getPropertyValue('--bg').trim();
  }
  function resize() {
    var r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    size = r.width;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(t) {
    var R = size * 0.46, cx = size / 2, cy = size / 2;
    var grow = reduce ? 1 : Math.min(1, 0.35 + (t / 1600) * 0.65);
    ctx.clearRect(0, 0, size, size);
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(1, size / 300);
    ctx.strokeStyle = colors.line;
    segs.forEach(function (q) {
      var d1 = Math.hypot(q[0], q[1]), d2 = Math.hypot(q[2], q[3]);
      if (Math.min(d1, d2) > grow) return;
      var f = d2 > grow && d2 > d1 ? (grow - d1) / (d2 - d1) : 1;
      ctx.beginPath();
      ctx.moveTo(cx + q[0] * R, cy - q[1] * R);
      ctx.lineTo(cx + (q[0] + (q[2] - q[0]) * f) * R, cy - (q[1] + (q[3] - q[1]) * f) * R);
      ctx.stroke();
    });
    nodes.forEach(function (n) {
      if (Math.hypot(n[0], n[1]) > grow + 0.001) return;
      var rad = Math.max(2, size / 95) * n[2];
      ctx.beginPath();
      ctx.arc(cx + n[0] * R, cy - n[1] * R, rad, 0, Math.PI * 2);
      ctx.fillStyle = n[2] === 1 ? colors.accent : colors.bg;
      ctx.fill();
      ctx.strokeStyle = colors.accent;
      ctx.stroke();
      ctx.strokeStyle = colors.line;
    });
    if (!reduce && grow >= 1) {
      // Paquets qui remontent les six bras, un par un.
      for (var k = 0; k < 6; k++) {
        var p = ((t / 5200) + k * 0.37) % 1;
        var a = k * Math.PI / 3, r = 0.1 + p * 0.9;
        ctx.beginPath();
        ctx.arc(cx - Math.sin(a) * r * R, cy - Math.cos(a) * r * R, Math.max(2, size / 150), 0, Math.PI * 2);
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = Math.sin(p * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }
  function frame(ts) {
    if (start === null) start = ts;
    draw(ts - start);
    if (!reduce) requestAnimationFrame(frame);
  }
  function refresh() { readColors(); resize(); if (reduce) draw(0); }

  build(); readColors(); resize();
  if (reduce) draw(0); else requestAnimationFrame(frame);
  window.addEventListener('resize', refresh);
  new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refresh);
})();
