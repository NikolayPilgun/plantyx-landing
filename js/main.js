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

// ---------- Горизонтальная лента Shop ----------
const rail = document.querySelector('.shop__rail');

if (rail) {
  // Прокрутка колесом мыши по горизонтали (десктоп)
  rail.addEventListener(
    'wheel',
    (e) => {
      // Если контент реально скроллится по X и пользователь крутит вертикально
      if (rail.scrollWidth > rail.clientWidth && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        rail.scrollBy({ left: e.deltaY, behavior: 'auto' });
      }
    },
    { passive: false },
  );
}

// ---------- Newsletter: простая валидация ----------
const newsletterForm = document.querySelector('.newsletter__form');

if (newsletterForm) {
  const input = newsletterForm.querySelector('.newsletter__input');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

    // удалить старое сообщение
    const existingError = newsletterForm.parentElement.querySelector('.newsletter__error');
    if (existingError) {
      existingError.remove();
    }
    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
      const error = document.createElement('p');
      error.className = 'newsletter__error';
      error.setAttribute('role', 'alert');
      error.textContent = 'Please enter a valid email address.';
      newsletterForm.after(error);
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    newsletterForm.reset();
  });
}
