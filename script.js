// ══════════════════════════════════════════
// CELESTAR — Interactions & Effects
// ══════════════════════════════════════════

(function () {
  'use strict';

  // ── CURSOR GLOW ──
  var cursorGlow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', function (e) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ── RIPPLE ON BUTTONS ──
  var buttons = document.querySelectorAll('.btn-download, .btn-discord');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var r = document.createElement('span');
      r.classList.add('ripple');
      var rect = this.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left - size / 2) + 'px';
      r.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(r);
      setTimeout(function () { r.remove(); }, 550);
    });
  });

  // ── TEXT SCRAMBLE ON TITLE HOVER ──
  var titleText = document.querySelector('.hero-title .title-text');
  var titleShine = document.querySelector('.hero-title .title-shine');
  var titleEl = document.querySelector('.hero-title');
  var orig = 'CELESTAR';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var si;

  titleEl.addEventListener('mouseenter', function () {
    var iter = 0;
    clearInterval(si);
    si = setInterval(function () {
      var scrambled = orig.split('').map(function (c, i) {
        return i < iter ? orig[i] : chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      titleText.textContent = scrambled;
      titleShine.textContent = scrambled;
      if (iter >= orig.length) clearInterval(si);
      iter += 0.5;
    }, 35);
  });

  titleEl.addEventListener('mouseleave', function () {
    clearInterval(si);
    titleText.textContent = orig;
    titleShine.textContent = orig;
  });

  // ── PARTICLE SYSTEM ──
  var canvas = document.getElementById('particle-canvas');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var COUNT = 50;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 1.3 + 0.4,
      sx: (Math.random() - 0.5) * 0.25,
      sy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.35 + 0.08,
      h: Math.random() > 0.5 ? '143,214,232' : '212,255,157',
      p: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.018 + 0.004
    };
  }

  for (var i = 0; i < COUNT; i++) {
    particles.push(createParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connection lines
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(143,214,232,' + (0.025 * (1 - d / 110)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(function (pt) {
      pt.x += pt.sx;
      pt.y += pt.sy;
      pt.p += pt.ps;

      if (pt.x < 0 || pt.x > canvas.width || pt.y < 0 || pt.y > canvas.height) {
        var fresh = createParticle();
        pt.x = fresh.x; pt.y = fresh.y;
        pt.s = fresh.s; pt.sx = fresh.sx; pt.sy = fresh.sy;
        pt.o = fresh.o; pt.h = fresh.h; pt.p = fresh.p; pt.ps = fresh.ps;
      }

      var op = pt.o * (0.5 + 0.5 * Math.sin(pt.p));
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.s, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + pt.h + ',' + op + ')';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();

})();