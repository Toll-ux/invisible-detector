// Подсветка активный пунктов меню
document.addEventListener('DOMContentLoaded', () => {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});

// Тост-уведомление
function showToast(msg = 'Скопировано!', type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:999;
      padding:10px 18px; border-radius:10px; font-size:13px; font-weight:500;
      font-family:'DM Sans',sans-serif; opacity:0; transition:opacity .25s;
      pointer-events:none;
    `;
    document.body.appendChild(toast);
  }
  const colors = {
    success: 'background:#3ecfb0; color:#0d2820',
    error:   'background:#e8417a; color:#fff',
    info:    'background:#7c5cfc; color:#fff',
  };
  toast.style.cssText += colors[type] || colors.success;
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.style.opacity = '0', 2000);
}

window.showToast = showToast;
