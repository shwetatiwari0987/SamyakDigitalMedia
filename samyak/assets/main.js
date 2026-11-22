
// 1. Mobile menu
const nav = document.getElementById('nav');
const toggle = nav.querySelector('.nav-toggle');
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', nav.classList.toggle('open')));

// 2. Desktop: email links copy the address instead of opening a blank mail tab.
//    Phones/tablets keep the normal mailto: behaviour (opens the mail app).
if (matchMedia('(hover: hover) and (pointer: fine)').matches && navigator.clipboard) {
  const toast = Object.assign(document.createElement('div'), { className: 'toast' });
  document.body.append(toast);
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    e.preventDefault();
    const mail = link.getAttribute('href').slice(7).split('?')[0];
    navigator.clipboard.writeText(mail).then(() => {
      toast.textContent = 'Email copied: ' + mail;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }).catch(() => { location.href = link.href; });   // clipboard blocked → normal mailto
  });
}

// Opened by double-click (file://)? Folder links need index.html to open.
if (location.protocol === 'file:') {
  document.querySelectorAll('a[href]').forEach(a => {
    const [path, hash] = a.getAttribute('href').split('#');
    if (!/^(https?:|mailto:)/.test(path) && path.endsWith('/')) a.setAttribute('href', path + 'index.html' + (hash ? '#' + hash : ''));
  });
}
