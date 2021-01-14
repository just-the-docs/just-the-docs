window.addEventListener('load', () => {
  const dropdownEl = document.getElementById('dropdown');
  dropdownEl.addEventListener('click', (e) => {
    dropdownEl.classList.toggle('active');
  });
  window.addEventListener('click', (e) => {
    if(e.target.parentNode != dropdownEl) dropdownEl.classList.remove('active');
  });

  const menuBtn = document.getElementById('home-menu-button');
  if(menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      menuBtn.parentNode.classList.toggle('open');
    });
  }
});