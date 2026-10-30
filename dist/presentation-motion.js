/* Transform/opacity only. Animate each content group once per crossing, never its descendants. */
(() => {
  'use strict';
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const groups = 'article:not(.scene),.compare-row,.closing-card,figure,.hero-preview,.route,table,details,.actions,.reel-hero-actions,.intro-preview';
  const candidates = [...document.querySelectorAll(`main :is(${groups}),main h1,main h2,main h3,main p,main blockquote,main li,main .scene-timing,main .action-link`)];
  const selected = new Set(candidates);
  const nodes = candidates.filter(el => {
    if (el.closest('dialog')) return false;
    for (let parent = el.parentElement; parent && parent.tagName !== 'MAIN'; parent = parent.parentElement) {
      if (selected.has(parent)) return false;
    }
    return true;
  });
  const states = new WeakMap(), running = new Map();
  let lastY = scrollY, direction = 1;
  // Read scroll position once per observer batch, without a scroll-event handler.
  const play = (el, state, inside) => {
    running.get(el)?.cancel();
    running.delete(el);
    if (reduced.matches || document.hidden) return;
    // Keep a small compositor budget when jumping between distant sections.
    if (running.size >= 10) {
      const [oldEl, oldAnimation] = running.entries().next().value;
      oldAnimation.cancel(); running.delete(oldEl);
    }
    const visual = el.matches('figure,.intro-preview,.hero-preview');
    const card = el.matches('article,.compare-row,.closing-card,details');
    const offset = direction * (visual ? 16 : 12);
    const frames = inside
      ? [{opacity: .65, transform: `translate3d(${card ? state.side * 8 : 0}px,${offset}px,0) scale(${visual ? .99 : 1})`}, {opacity: 1, transform: 'translate3d(0,0,0) scale(1)'}]
      : [{opacity: 1, transform: 'translate3d(0,0,0)'}, {opacity: .88, transform: `translate3d(0,${-direction * 6}px,0)`}];
    const animation = el.animate(frames, {
      duration: inside ? 420 : 160,
      delay: inside ? state.order * 35 : 0,
      easing: 'cubic-bezier(.22,1,.36,1)'
    });
    running.set(el, animation);
    animation.onfinish = () => { if (running.get(el) === animation) running.delete(el); };
  };
  const observer = new IntersectionObserver(entries => {
    if (scrollY !== lastY) direction = scrollY > lastY ? 1 : -1;
    lastY = scrollY;
    let order = 0;
    for (const entry of entries) {
      const el = entry.target, state = states.get(el);
      const inside = entry.isIntersecting && entry.boundingClientRect.width > 0;
      if (inside === state.inside) continue;
      state.inside = inside;
      clearTimeout(state.timer);
      if (inside) {
        state.order = order++ % 3;
        state.seen = true;
        el.dataset.motionState = 'in';
        play(el, state, true);
      } else if (state.seen) {
        // Ignore rapid edge crossings caused by touch scrolling or image layout changes.
        state.timer = setTimeout(() => {
          if (!state.inside) { el.dataset.motionState = 'out'; play(el, state, false); }
        }, 140);
      }
    }
  }, {rootMargin: '40px 0px', threshold: 0});
  nodes.forEach((el, i) => { states.set(el, {inside: false, seen: false, side: i % 2 ? -1 : 1}); observer.observe(el); });
  const reset = () => {
    running.forEach(a => a.cancel()); running.clear();
    nodes.forEach(el => clearTimeout(states.get(el).timer));
  };
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', reset);
  addEventListener('beforeprint', reset);
})();
