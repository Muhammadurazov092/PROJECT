const hamburger = document.querySelector('.hamburger');
const mobile = document.querySelector('.mobile-menu-panel');
const search = document.querySelector('.search-panel');

hamburger?.addEventListener('click', () => {
  const open = mobile.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

mobile?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  mobile.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.search-trigger')?.addEventListener('click', () => {
  search.classList.add('open');
  search.querySelector('input').focus();
});

document.querySelector('.search-close')?.addEventListener('click', () => search.classList.remove('open'));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    search.classList.remove('open');
    mobile?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
});

const carousel = document.querySelector('.ent-carousel');
const cards = [...document.querySelectorAll('.ent-card')];
const dots = [...document.querySelectorAll('.ent-dots button')];

dots.forEach((dot, index) => dot.addEventListener('click', () => {
  cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  dots.forEach((d) => d.classList.remove('active'));
  dot.classList.add('active');
}));

if ('IntersectionObserver' in window && carousel) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = cards.indexOf(entry.target);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      }
    });
  }, { root: carousel, threshold: 0.7 });
  cards.forEach((card) => observer.observe(card));
}
