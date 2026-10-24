
(function () {
    'use strict';
  
    var menuBtn = document.getElementById('menuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
  
    function setMenu(open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      mobileMenu.classList.toggle('open', open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
  
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function () {
        setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
      });
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth >= 900) setMenu(false);
      });
    }
  
    var accordion = document.getElementById('hardAccordion');
    if (accordion) {
      accordion.querySelectorAll('.acc-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = btn.closest('.acc-item');
          var willOpen = !item.classList.contains('open');
  
          accordion.querySelectorAll('.acc-item.open').forEach(function (other) {
            if (other !== item) {
              other.classList.remove('open');
              other.querySelector('.acc-btn').setAttribute('aria-expanded', 'false');
            }
          });
  
          item.classList.toggle('open', willOpen);
          btn.setAttribute('aria-expanded', String(willOpen));
        });
      });
    }
  
    var slider = document.getElementById('softSlider');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
  
    if (slider && prevBtn && nextBtn) {
      function step() {
        var slide = slider.querySelector('.slide');
        return slide ? slide.getBoundingClientRect().width + 20 : 300;
      }
      function updateButtons() {
        var max = slider.scrollWidth - slider.clientWidth - 2;
        prevBtn.disabled = slider.scrollLeft <= 2;
        nextBtn.disabled = slider.scrollLeft >= max;
      }
      prevBtn.addEventListener('click', function () {
        slider.scrollBy({ left: -step(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', function () {
        slider.scrollBy({ left: step(), behavior: 'smooth' });
      });
      slider.addEventListener('scroll', updateButtons, { passive: true });
      window.addEventListener('resize', updateButtons);
      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevBtn.click(); }
      });
      updateButtons();
    }
  
    var revealEls = document.querySelectorAll('.reveal');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  })();