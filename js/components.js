// ============================
// Shared Components: Header, Footer, Breadcrumbs, Scroll-to-top
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
    { label: 'О парке',    href: 'about.html' },
    { label: 'Помещения',  href: 'catalog.html' },
    { label: 'Резиденты',  href: 'residents.html' },
    { label: 'Инвесторам', href: 'investor.html' },
    { label: 'Контакты',   href: 'contacts.html' }
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
          '<a href="tel:+73919899949" class="header__phone">' +
            phoneSvg +
            ' +7 (391) 989-99-49' +
          '</a>' +
          '<button class="header__burger" id="burger" aria-label="Меню">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</header>';
  }

  // ======================
  // FOOTER
  // ======================
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    var fLinksHtml = '';
    for (var j = 0; j < footerLinks.length; j++) {
      var fl = footerLinks[j];
      fLinksHtml += '<a href="' + href(fl.href) + '">' + fl.label + '</a>';
    }

    footerEl.innerHTML =
      '<footer class="footer">' +
        '<div class="container footer__inner">' +
          '<div class="footer__logo">' +
            '<a href="' + href('index.html') + '">' +
              '<img src="https://static.tildacdn.com/tild3465-3836-4965-b332-633632636566/__.png" ' +
                'alt="ИП Красный Яр">' +
            '</a>' +
          '</div>' +
          '<div class="footer__links">' + fLinksHtml + '</div>' +
          '<a href="tel:+73919899949" class="footer__phone">' +
            phoneSvg +
            ' +7 (391) 989-99-49' +
          '</a>' +
          '<div class="footer__copy">' +
            '&copy; 2024 ИП &laquo;Красный Яр&raquo;. Все права защищены.' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

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
