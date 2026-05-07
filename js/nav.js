//вроде работает, ничего менять не стоит
document.addEventListener('DOMContentLoaded', () => {
  const navHTML = `
    <nav>
      <a class="nav-logo" href="index.html">
        Invisible Detector
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Главная</a></li>
        <li><a href="invisible-detector.html">Детектор</a></li>
        <li><a href="how-it-works-about.html">О проекте и работе InvisibleDetector</a></li>
        <li><a href="faq.html">FAQ</a></li>
      </ul>
    </nav>
  `;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.outerHTML = navHTML;

  // подсветка активной ссылки
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});
