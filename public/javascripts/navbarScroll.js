window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-modern');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

