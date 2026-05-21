// CopStopReady site nav. BC-SITE-NAV-1.
// Injects the nav into any page that contains <nav id="csr-nav"></nav>.
// Highlights the current page automatically based on window.location.pathname.

(function () {
  var NAV_LINKS = [
    { href: '/',         label: 'Home' },
    { href: '/features/', label: 'Features' },
    { href: '/pricing/',  label: 'Pricing' },
    { href: '/faq/',      label: 'FAQ' },
    { href: '/about/',    label: 'About' },
    { href: '/privacy/',  label: 'Privacy' },
    { href: '/contact/',  label: 'Contact' },
  ];

  function normalizePath(p) {
    if (!p) return '/';
    if (p === '/index.html') return '/';
    if (p.length > 1 && p.charAt(p.length - 1) !== '/') return p + '/';
    return p;
  }

  function buildNav() {
    var host = document.getElementById('csr-nav');
    if (!host) return;

    var currentPath = normalizePath(window.location.pathname);
    var linksHtml = NAV_LINKS.map(function (l) {
      var isCurrent = normalizePath(l.href) === currentPath;
      var ariaCur = isCurrent ? ' aria-current="page"' : '';
      return '<a class="csr-nav-link" href="' + l.href + '"' + ariaCur + '>' + l.label + '</a>';
    }).join('');

    host.innerHTML = [
      '<div class="csr-nav-inner">',
      '  <a class="csr-nav-brand" href="/">',
      '    <span class="copstop">COPSTOP</span><span class="ready">READY</span>',
      '  </a>',
      '  <button class="csr-nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="csr-nav-menu">',
      '    <span></span><span></span><span></span>',
      '  </button>',
      '  <div class="csr-nav-menu" id="csr-nav-menu" data-open="false">',
      linksHtml,
      '  </div>',
      '</div>',
    ].join('');

    var toggle = host.querySelector('.csr-nav-toggle');
    var menu   = host.querySelector('.csr-nav-menu');

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('data-open', open ? 'true' : 'false');
      document.body.setAttribute('data-nav-open', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    // Auto-close mobile menu when a link is tapped.
    menu.addEventListener('click', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('csr-nav-link')) {
        setOpen(false);
      }
    });

    // Close menu if viewport grows past mobile breakpoint.
    var mq = window.matchMedia('(min-width: 768px)');
    var onMq = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
