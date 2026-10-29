(()=>{
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const selectors=['.exhibition-option','.hero-copy','.hero-system','.hero-map','.section-heading','.data-card','.idea-card','.script-card','.workflow li','.strength','.review-card','.observation','.audience-grid article','.strategy-path article','.month-card','.content-format','.sample-portal','.scene','.frame-card','.design-layout','.design-explanation','.next-destination'];
 const elements=[...new Set(document.querySelectorAll(selectors.join(',')))].filter(el=>!el.classList.contains('reveal')&&!el.closest('dialog'));
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;observer.unobserve(e.target);if(e.target.getBoundingClientRect().top<0)continue;e.target.animate([{opacity:.82,translate:'0 14px'},{opacity:1,translate:'0 0'}],{duration:560,easing:'cubic-bezier(.2,.7,.2,1)'});}}, {threshold:.12});
 elements.forEach(el=>observer.observe(el));
})();
