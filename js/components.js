// ============================
// Shared Components: Header, Footer, Breadcrumbs, Scroll-to-top, Callback Modal
// Runs synchronously — must be loaded BEFORE main.js
// ============================

(function () {
  var base = document.body.dataset.base || '';
  var page = document.body.dataset.page || '';

  // ---- SVG icons ----
  var phoneSvg =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 ' +
    '19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 ' +
    '2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 ' +
    '2.81.7A2 2 0 0122 16.92z"/></svg>';

  var arrowUpSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';

  var emailSvg =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>' +
    '<polyline points="22,6 12,13 2,6"/></svg>';

  var telegramSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' +
    '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';

  var vkSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' +
    '<path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.788 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.856 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.168-3.624 2.168-3.624.119-.254.305-.491.745-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z"/></svg>';

  // ---- Navigation config ----
  var navLinks = [
    { label: 'О парке',         href: 'about.html',          page: 'about' },
    { label: 'Инфраструктура',  href: 'infrastructure.html', page: 'infrastructure' },
    { label: 'Помещения',       href: 'catalog.html',        page: 'catalog' },
    { label: 'Резиденты',       href: 'residents.html',      page: 'residents' },
    { label: 'Инвесторам',      href: 'investor.html',       page: 'investor' },
    { label: 'Новости',         href: 'news.html',           page: 'news' },
    { label: 'Контакты',        href: 'contacts.html',       page: 'contacts' }
  ];

  // ---- Footer link subset ----
  var footerLinks = [
    { label: 'О парке',        href: 'about.html' },
    { label: 'Инфраструктура', href: 'infrastructure.html' },
    { label: 'Помещения',      href: 'catalog.html' },
    { label: 'Резиденты',      href: 'residents.html' },
    { label: 'Инвесторам',     href: 'investor.html' },
    { label: 'Новости',        href: 'news.html' },
    { label: 'Контакты',       href: 'contacts.html' }
  ];

  // ---- Helper: build link href ----
  function href(file) {
    return base + file;
  }

  // ---- Helper: active class ----
  function activeClass(linkPage) {
    return linkPage === page ? ' header__link--active' : '';
  }

  // ======================
  // HEADER
  // ======================
  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    var navHtml = '';
    for (var i = 0; i < navLinks.length; i++) {
      var n = navLinks[i];
      navHtml +=
        '<a href="' + href(n.href) + '" class="header__link' + activeClass(n.page) + '">' +
        n.label + '</a>';
    }

    headerEl.innerHTML =
      '<header class="header" id="header">' +
        '<div class="container header__inner">' +
          '<a href="' + href('index.html') + '" class="header__logo">' +
            '<img src="https://static.tildacdn.com/tild3465-3836-4965-b332-633632636566/__.png" ' +
              'alt="ИП Красный Яр" class="header__logo-img">' +
          '</a>' +
          '<nav class="header__nav" id="nav">' + navHtml + '</nav>' +
          '<div class="header__contacts">' +
            '<a href="mailto:red-yar@mail.ru" class="header__email">' + emailSvg + ' red-yar@mail.ru</a>' +
            '<a href="tel:+73919899949" class="header__phone">' + phoneSvg + ' +7 (391) 989-99-49</a>' +
            '<div class="header__socials">' +
              '<a href="https://t.me/krasniyyar" target="_blank" rel="noopener" class="header__social" aria-label="Telegram">' + telegramSvg + '</a>' +
              '<a href="https://vk.com/krasniyyar" target="_blank" rel="noopener" class="header__social" aria-label="VK">' + vkSvg + '</a>' +
            '</div>' +
            '<button class="btn btn--primary btn--sm" id="callbackBtn">Обратный звонок</button>' +
          '</div>' +
          '<button class="header__burger" id="burger" aria-label="Меню">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</header>';
  }

  // ======================
  // FOOTER (expanded 3-column)
  // ======================
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    var fLinksHtml = '';
    for (var j = 0; j < footerLinks.length; j++) {
      var fl = footerLinks[j];
      fLinksHtml += '<li><a href="' + href(fl.href) + '">' + fl.label + '</a></li>';
    }

    var currentYear = new Date().getFullYear();

    footerEl.innerHTML =
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer__grid">' +
            // Column 1: Logo + description + socials
            '<div class="footer__col">' +
              '<a href="' + href('index.html') + '" class="footer__logo">' +
                '<img src="https://static.tildacdn.com/tild3465-3836-4965-b332-633632636566/__.png" alt="ИП Красный Яр">' +
              '</a>' +
              '<p class="footer__desc">Индустриальный парк «Красный Яр» — современная производственно-складская площадка в Красноярске с полной инфраструктурой.</p>' +
              '<div class="footer__socials">' +
                '<a href="https://t.me/krasniyyar" target="_blank" rel="noopener" class="footer__social-link" aria-label="Telegram">' + telegramSvg + '</a>' +
                '<a href="https://vk.com/krasniyyar" target="_blank" rel="noopener" class="footer__social-link" aria-label="VK">' + vkSvg + '</a>' +
              '</div>' +
            '</div>' +
            // Column 2: Navigation
            '<div class="footer__col">' +
              '<div class="footer__col-title">Навигация</div>' +
              '<ul class="footer__nav">' + fLinksHtml + '</ul>' +
            '</div>' +
            // Column 3: Contacts
            '<div class="footer__col">' +
              '<div class="footer__col-title">Контакты</div>' +
              '<div class="footer__contact-list">' +
                '<a href="tel:+73919899949" class="footer__contact-item">' + phoneSvg + ' +7 (391) 989-99-49</a>' +
                '<a href="mailto:red-yar@mail.ru" class="footer__contact-item">' + emailSvg + ' red-yar@mail.ru</a>' +
                '<div class="footer__contact-item">' +
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' +
                  ' г. Красноярск, вблизи Р-255 «Сибирь»' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer__bottom">' +
            '<div class="footer__copy">&copy; ' + currentYear + ' ИП &laquo;Красный Яр&raquo;. Все права защищены.</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  // ======================
  // CALLBACK MODAL
  // ======================
  var modalHtml =
    '<div class="modal-overlay" id="callbackModal">' +
      '<div class="modal">' +
        '<button class="modal__close" id="modalClose" aria-label="Закрыть">&times;</button>' +
        '<h3 class="modal__title">Заказать обратный звонок</h3>' +
        '<p class="modal__desc">Оставьте номер телефона и мы перезвоним вам в ближайшее время</p>' +
        '<form id="callbackForm" class="modal__form">' +
          '<div class="form-group">' +
            '<input type="text" class="form-input" name="name" placeholder="Ваше имя" required>' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="tel" class="form-input" name="phone" placeholder="+7 (___) ___-__-__" required>' +
          '</div>' +
          '<div class="form-privacy">' +
            '<label><input type="checkbox" required> Согласен на обработку персональных данных</label>' +
          '</div>' +
          '<button type="submit" class="btn btn--primary btn--full">Позвоните мне</button>' +
        '</form>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // ======================
  // SCROLL-TO-TOP BUTTON
  // ======================
  var scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.setAttribute('aria-label', 'Наверх');
  scrollBtn.innerHTML = arrowUpSvg;
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('scroll-top--visible');
    } else {
      scrollBtn.classList.remove('scroll-top--visible');
    }
  });

  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
