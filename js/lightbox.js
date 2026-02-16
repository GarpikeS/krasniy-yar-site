(function() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="lightbox__close" aria-label="Закрыть">&times;</button>
    <button class="lightbox__prev" aria-label="Назад">&#8249;</button>
    <button class="lightbox__next" aria-label="Вперёд">&#8250;</button>
    <img class="lightbox__img" src="" alt="">
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.lightbox__img');
  const closeBtn = overlay.querySelector('.lightbox__close');
  const prevBtn = overlay.querySelector('.lightbox__prev');
  const nextBtn = overlay.querySelector('.lightbox__next');

  let images = [];
  let currentIndex = 0;

  function open(src, gallery) {
    images = gallery || [src];
    currentIndex = images.indexOf(src);
    if (currentIndex === -1) currentIndex = 0;
    img.src = images[currentIndex];
    overlay.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
    updateNav();
  }

  function close() {
    overlay.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    img.src = '';
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      img.src = images[currentIndex];
      updateNav();
    }
  }

  function next() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      img.src = images[currentIndex];
      updateNav();
    }
  }

  function updateNav() {
    prevBtn.style.display = images.length > 1 && currentIndex > 0 ? '' : 'none';
    nextBtn.style.display = images.length > 1 && currentIndex < images.length - 1 ? '' : 'none';
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function(e) {
    if (!overlay.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Attach to all images with data-lightbox attribute
  document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-lightbox] img, img[data-lightbox]');
    if (!target) return;
    e.preventDefault();
    const container = target.closest('[data-lightbox]') || target;
    const galleryName = container.getAttribute('data-lightbox') || target.getAttribute('data-lightbox');

    // Collect all images in the same gallery
    let galleryImages;
    if (galleryName) {
      galleryImages = Array.from(document.querySelectorAll('[data-lightbox="' + galleryName + '"] img, img[data-lightbox="' + galleryName + '"]')).map(function(i) { return i.src; });
    } else {
      galleryImages = [target.src];
    }

    open(target.src, galleryImages);
  });
})();
