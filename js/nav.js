//вроде работает, ничего менять не стоит
document.addEventListener('DOMContentLoaded', () => {
  const navHTML = `
    <nav>
      <a class="nav-logo" href="index.html">
        Ведьмочки с ключом на 9
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Главная</a></li>
        <li><a href="decode.html">Декодер</a></li>
        <li><a href="encode.html">Кодер</a></li>
        <li><a href="how-it-works.html">Как работает</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="about.html">О проекте</a></li>
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
