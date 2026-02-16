// ============================
// Header scroll effect
// ============================
const header = document.getElementById('header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  });
}

// ============================
// Mobile burger menu
// ============================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu on link click
  nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// ============================
// Callback modal
// ============================
const callbackBtn = document.getElementById('callbackBtn');
const callbackModal = document.getElementById('callbackModal');
const modalClose = document.getElementById('modalClose');

function openModal() {
  if (callbackModal) {
    callbackModal.classList.add('modal-overlay--open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (callbackModal) {
    callbackModal.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
  }
}

if (callbackBtn) callbackBtn.addEventListener('click', openModal);
if (modalClose) modalClose.addEventListener('click', closeModal);

if (callbackModal) {
  callbackModal.addEventListener('click', (e) => {
    if (e.target === callbackModal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================
// Intersection Observer for fade-up animations
// ============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============================
// Counter animation
// ============================
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.round(current).toLocaleString('ru-RU');
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ============================
// Phone input mask
// ============================
document.querySelectorAll('input[type="tel"]').forEach(phoneInput => {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('8')) {
      value = '7' + value.slice(1);
    }

    if (!value.startsWith('7')) {
      value = '7' + value;
    }

    let formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.slice(1, 4);
    if (value.length > 4) formatted += ') ' + value.slice(4, 7);
    if (value.length > 7) formatted += '-' + value.slice(7, 9);
    if (value.length > 9) formatted += '-' + value.slice(9, 11);

    e.target.value = formatted;
  });
});

// ============================
// Form submit
// ============================
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const originalText = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Заявка отправлена!';
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';

      // Close modal if callback form
      if (form.id === 'callbackForm') {
        setTimeout(() => closeModal(), 1500);
      }

      setTimeout(() => {
        form.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1000);
  });
});

// ============================
// Smooth scroll for anchor links
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerEl = document.querySelector('.header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ============================
// Residents filter
// ============================
const filterBtns = document.querySelectorAll('.filter-bar__btn');
const residentCards = document.querySelectorAll('.resident-card[data-category]');

if (filterBtns.length > 0 && residentCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-bar__btn--active'));
      btn.classList.add('filter-bar__btn--active');
      const filter = btn.dataset.filter;
      residentCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================
// Resident logo fallback
// ============================
document.querySelectorAll('.resident-card__logo img').forEach(img => {
  img.addEventListener('error', () => {
    const alt = img.getAttribute('alt') || '?';
    const initial = alt.charAt(0).toUpperCase();
    const span = document.createElement('span');
    span.className = 'resident-card__initial';
    span.textContent = initial;
    img.parentElement.replaceChild(span, img);
  });
});

// ============================
// Toast notification
// ============================
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============================
// Share / Copy URL button
// ============================
const shareBtn = document.createElement('button');
shareBtn.className = 'share-btn';
shareBtn.setAttribute('aria-label', 'Поделиться');
shareBtn.innerHTML =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
  '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' +
  '<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
document.body.appendChild(shareBtn);

shareBtn.addEventListener('click', () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Ссылка скопирована');
    });
  } else {
    // Fallback for older browsers
    const input = document.createElement('input');
    input.value = window.location.href;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    showToast('Ссылка скопирована');
  }
});

// ============================
// Cookie consent banner
// ============================
(function() {
  if (localStorage.getItem('cookieConsent')) return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML =
    '<div class="cookie-banner__text">' +
      'Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с ' +
      '<a href="#">политикой конфиденциальности</a>.' +
    '</div>' +
    '<button class="btn btn--primary btn--sm cookie-banner__accept">Принять</button>';
  document.body.appendChild(banner);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      banner.classList.add('cookie-banner--visible');
    });
  });

  banner.querySelector('.cookie-banner__accept').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', '1');
    banner.classList.remove('cookie-banner--visible');
    setTimeout(() => banner.remove(), 300);
  });
})();
