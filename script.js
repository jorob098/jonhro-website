document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu ul');

  toggle.addEventListener('click', function() {
    menu.classList.toggle('show');
  });
});
