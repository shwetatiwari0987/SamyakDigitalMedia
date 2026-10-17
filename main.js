const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });

// development process + models (rendered into every .dp block)
const STEPS = [
  ['Requirement Analysis', 'We understand your business, goals, target audience and project requirements in detail.', ['Business Goals', 'Target Audience', 'Features & Functionality', 'Timeline & Budget']],
  ['Planning', 'We create a clear project plan with the right technology, resources and timeline.', ['Project Scope', 'Technology Stack', 'Timeline', 'Resource Allocation']],
  ['UI/UX Design', 'We design clean, modern and user-friendly interfaces for a smooth experience.', ['Wireframes', 'UI Design', 'User Experience', 'Prototype (if needed)']],
  ['Development', 'Our team builds your website, app or software using the latest technologies and best practices.', ['Frontend Development', 'Backend Development', 'Database Integration', 'API Integration']],
  ['Testing', 'We test everything to make sure your product is secure, fast and bug-free.', ['Functionality Testing', 'Performance Testing', 'Security Testing', 'Cross-Browser & Device Testing']],
  ['Deployment / Launch', 'We make your website or app live and ready for your users.', ['Live Server Setup', 'Domain & Hosting', 'Final Checks', 'Go Live']],
  ['Maintenance & Support', 'We provide ongoing support, updates and improvements for long-term success.', ['Bug Fixes', 'Updates & Upgrades', 'Security Monitoring', 'Technical Support']]
];
const MODELS = [
  ['≋', 'Waterfall', 'Best for clearly defined and stable requirements.'],
  ['⟲', 'Agile', 'Flexible, iterative development with continuous feedback.'],
  ['◈', 'Prototype', 'Useful when the product concept needs validation before full development.'],
  ['↻', 'Iterative', 'Build, review and continuously improve in multiple iterations.'],
  ['◎', 'Spiral', 'Suitable for complex projects where risk analysis is important.'],
  ['V', 'V-Model', 'Structured development with strong testing and validation.'],
  ['✦', 'Hybrid', 'A customized combination of approaches based on project needs.']
];
document.querySelectorAll('.dp').forEach(el => {
  el.innerHTML =
    '<div class="acc"><div class="dp-head"><div class="sdlc-ring"><b>SDLC</b><small>Life Cycle</small></div><div>' +
    '<h4>Our development process</h4><p>A structured and transparent process, so your website or app is built with the right strategy, technology and support.</p>' +
    '<button class="steps-btn" data-toggle aria-expanded="false">View 7 steps <span class="acc-ic">+</span></button></div></div>' +
    '<div class="collapse"><div class="collapse-in"><div class="step-grid">' +
    STEPS.map((s, i) => '<div class="step-card"><span>0' + (i + 1) + '</span><h5>' + s[0] + '</h5><p>' + s[1] + '</p><ul>' + s[2].map(b => '<li>' + b + '</li>').join('') + '</ul></div>').join('') +
    '</div></div></div></div>' +
    '<div class="sub-h">Development models</div>' +
    '<p class="wd-intro" style="margin-bottom:1.5rem;">Every project is unique. We choose or customize the right model based on your requirements, complexity, timeline and level of collaboration.</p>' +
    '<div class="m-grid">' + MODELS.map(m => '<div class="m-card"><div class="m-ico">' + m[0] + '</div><h5>' + m[1] + '</h5><p>' + m[2] + '</p></div>').join('') +
    '<div class="m-card tag">From Idea to Success<small>Your growth is our goal.</small></div></div>' +
    '<div class="m-foot">— You choose the approach. We build the solution. —</div>';
});

// open / close for service rows and "View 7 steps"
document.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', () => {
  const open = b.closest('.acc').classList.toggle('open');
  b.setAttribute('aria-expanded', open);
}));

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
document.querySelectorAll('.svc-row.reveal').forEach((row, i) => { row.style.transitionDelay = (i * 0.08) + 's'; });

// scroll bar, card spotlight, counters, tabs, mail-based forms
const bar = document.body.appendChild(Object.assign(document.createElement('div'), { id: 'prog' }));
addEventListener('scroll', () => { bar.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%'; });
document.querySelectorAll('.why-card, .m-card, .work-card, .model-card').forEach(c => c.addEventListener('mousemove', e => {
  const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));
const cnt = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cnt.unobserve(e.target);
  const el = e.target, end = +el.dataset.count, t0 = performance.now();
  (function step(t) { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * p) + el.dataset.suf; if (p < 1) requestAnimationFrame(step); })(t0);
}), { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cnt.observe(el));
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab, .tab-pane').forEach(x => x.classList.remove('on'));
  t.classList.add('on'); document.getElementById(t.dataset.tab).classList.add('on');
}));
if (new URLSearchParams(location.search).get('form') === 'project') document.querySelector('[data-tab="proj"]')?.click();
// Forms are static for now: they open the visitor's email app with the details filled in. Replace with an API later.
document.querySelectorAll('form[data-mail]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault(); const d = new FormData(f);
  const body = [...d].filter(x => x[1]).map(x => x[0] + ': ' + x[1]).join('\n');
  location.href = 'mailto:contact@samyakdigitalmedia.com?subject=' + encodeURIComponent(f.dataset.subject + ' - ' + (d.get('Name') || '')) + '&body=' + encodeURIComponent(body);
  f.querySelector('.form-note').textContent = 'Opening your email app… please press Send there to submit.';
}));
