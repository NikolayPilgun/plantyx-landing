document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.header__burger-btn');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__link');
  // Тень у хедера при скролле
  const handleScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  // Логика бургер-меню
  if (burgerBtn && nav) {
    const toggleMenu = () => {
      const isOpen = burgerBtn.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
      burgerBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    burgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) toggleMenu();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggleMenu();
        burgerBtn.focus();
      }
    });

    // Сброс состояния при переходе на десктоп
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && nav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  }
});
