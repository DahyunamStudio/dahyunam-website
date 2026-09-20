/* ===== استودیو نووا — منطق مشترک سایت ===== */

const ICONS = {
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 20c-.2 1-1 1.2-1.8.7l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6 12.5l-4.8-1.5c-1-.3-1-1 .2-1.5L20.6 2.9c.9-.3 1.6.2 1.3 1.4z"/></svg>`,
  rubika: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M9 8h4a2.5 2.5 0 0 1 0 5H9V8zm0 5 5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none"/></svg>`,
  aparat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 8.5v7l6-3.5z" fill="currentColor" stroke="none"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>`
};

async function loadSiteData(){
  if (window.__siteData) return window.__siteData;
  const res = await fetch('data.json');
  if (!res.ok) throw new Error('data.json not found');
  const data = await res.json();
  window.__siteData = data;
  return data;
}

function el(html){
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function typeLabel(type){
  return { game: 'بازی', app: 'برنامه', article: 'مقاله آموزشی' }[type] || type;
}

/* ---------- هدر و فوتر مشترک ---------- */
function renderChrome(data){
  document.querySelectorAll('[data-studio-logo]').forEach(n => n.src = data.studio.logo);
  document.querySelectorAll('[data-studio-name]').forEach(n => n.textContent = data.studio.name);
  document.querySelectorAll('[data-footer-text]').forEach(n => {
    n.textContent = `© ${new Date().getFullYear()} تمامی حقوق برای ${data.studio.name} محفوظ است.`;
  });
}

/* ---------- اسلایدر ---------- */
function initSlider(slides){
  const track = document.getElementById('slider-track');
  const dots = document.getElementById('slider-dots');
  if (!track || !slides || !slides.length) return;

  slides.forEach((s, i) => {
    track.appendChild(el(`<div class="slide ${i===0?'active':''}"><img src="${s.image}" alt="${s.alt || ''}" loading="${i===0?'eager':'lazy'}"></div>`));
    dots.appendChild(el(`<button aria-label="اسلاید ${i+1}" class="${i===0?'active':''}"></button>`));
  });

  let current = 0;
  const slideEls = track.querySelectorAll('.slide');
  const dotEls = dots.querySelectorAll('button');

  function goTo(idx){
    slideEls[current].classList.remove('active');
    dotEls[current].classList.remove('active');
    current = idx;
    slideEls[current].classList.add('active');
    dotEls[current].classList.add('active');
  }

  dotEls.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetTimer(); }));

  let timer = setInterval(() => goTo((current + 1) % slideEls.length), 5000);
  function resetTimer(){ clearInterval(timer); timer = setInterval(() => goTo((current + 1) % slideEls.length), 5000); }
}

/* ---------- کارت‌های محصول (بازی/برنامه) ---------- */
function productCard(item){
  return `
  <div class="product-card">
    <div class="cover"><img src="${item.cover}" alt="${item.title}" loading="lazy"></div>
    <div class="card-body">
      <span class="card-kind">${typeLabel(item.type)}</span>
      <h3>${item.title}</h3>
      <span class="card-date">${item.date}</span>
      <a class="card-view-btn" href="product.html?id=${encodeURIComponent(item.id)}">نمایش</a>
    </div>
  </div>`;
}

function articleCard(item){
  return `
  <div class="article-card">
    <div class="cover"><img src="${item.cover}" alt="${item.title}" loading="lazy"></div>
    <div class="card-body">
      <span class="card-kind">${typeLabel(item.type)}</span>
      <h3>${item.title}</h3>
      <span class="card-date">${item.date}</span>
      <a class="card-view-btn" href="product.html?id=${encodeURIComponent(item.id)}">نمایش</a>
    </div>
  </div>`;
}

/* ---------- صفحه اصلی ---------- */
async function initHomePage(){
  const data = await loadSiteData();
  renderChrome(data);
  initSlider(data.slider);

  document.getElementById('bio-title').textContent = data.studio.name;
  document.getElementById('bio-text').textContent = data.studio.bio;
  document.getElementById('about-logo').src = data.studio.logo;

  const latestProducts = [...data.products].slice(0, 4);
  document.getElementById('products-grid').innerHTML = latestProducts.map(productCard).join('');

  const latestArticles = [...data.articles].slice(0, 3);
  document.getElementById('articles-grid').innerHTML = latestArticles.map(articleCard).join('');

  const mailBtn = document.getElementById('mail-cta');
  mailBtn.href = `mailto:${data.studio.email}?subject=${encodeURIComponent('همکاری و ارتباط با استودیو')}`;

  const social = data.studio.social;
  const socialWrap = document.getElementById('social-row');
  const order = ['telegram','rubika','instagram','youtube','aparat','github'];
  const labels = {telegram:'تلگرام',rubika:'روبیکا',instagram:'اینستاگرام',youtube:'یوتیوب',aparat:'آپارات',github:'گیت‌هاب'};
  socialWrap.innerHTML = order
    .filter(k => social[k])
    .map(k => `<a class="social-btn" href="${social[k]}" target="_blank" rel="noopener" aria-label="${labels[k]}">${ICONS[k]}</a>`)
    .join('');
}

/* ---------- صفحه مقالات ---------- */
async function initArticlesPage(){
  const data = await loadSiteData();
  renderChrome(data);

  const grid = document.getElementById('all-articles-grid');
  const empty = document.getElementById('articles-empty');
  const searchInput = document.getElementById('article-search');

  function render(list){
    if (!list.length){
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = list.map(articleCard).join('');
  }

  render(data.articles);

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = data.articles.filter(a => a.title.toLowerCase().includes(q));
    render(filtered);
  });
}

/* ---------- لایت‌باکس (ویدئو و تصویر گالری) ---------- */
function ensureLightbox(){
  let overlay = document.getElementById('lightbox-overlay');
  if (overlay) return overlay;
  overlay = el(`
    <div class="lightbox-overlay" id="lightbox-overlay">
      <button class="lightbox-close" id="lightbox-close" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
      <div class="lightbox-content" id="lightbox-content"></div>
    </div>`);
  document.body.appendChild(overlay);
  const close = () => { overlay.classList.remove('open'); overlay.querySelector('#lightbox-content').innerHTML = ''; };
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('#lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  overlay._close = close;
  return overlay;
}

function openLightbox(type, src, alt){
  const overlay = ensureLightbox();
  const content = overlay.querySelector('#lightbox-content');
  if (type === 'video'){
    content.innerHTML = `<div class="video-wrap"><iframe src="${src}" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
  } else {
    content.innerHTML = `<img src="${src}" alt="${alt || ''}">`;
  }
  overlay.classList.add('open');
}

/* ---------- صفحه نمایش محصول/مقاله ---------- */
async function initProductPage(){
  const data = await loadSiteData();
  renderChrome(data);

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const all = [...data.products, ...data.articles];
  const item = all.find(x => x.id === id);

  const container = document.getElementById('product-content');
  if (!item){
    container.innerHTML = `<div class="empty-state">موردی با این مشخصات پیدا نشد.</div>`;
    return;
  }

  document.title = `${item.title} — ${data.studio.name}`;

  const metaParts = [typeLabel(item.type), item.date].filter(Boolean);

  let html = `
  <div class="product-hero-center">
    <div class="poster"><img src="${item.cover}" alt="${item.title}"></div>
    <h1>${item.title}</h1>
    <div class="meta-line">${metaParts.map((p, i) => i === 0 ? `<span>${p}</span>` : `<span class="dot-sep"></span><span>${p}</span>`).join('')}</div>
  </div>`;

  const hasGallery = item.gallery && item.gallery.length;
  const hasVideo = item.video && item.video.url;

  if (hasGallery || hasVideo){
    const galleryItems = [];
    if (hasVideo){
      galleryItems.push(`
        <button type="button" class="gallery-item" data-type="video" data-src="${item.video.url}">
          <img src="${item.video.thumbnail || item.cover}" alt="پخش ویدئو">
          <span class="play-badge"><span>${ICONS.play}</span></span>
        </button>`);
    }
    (item.gallery || []).forEach(src => {
      galleryItems.push(`<button type="button" class="gallery-item" data-type="image" data-src="${src}"><img src="${src}" alt="تصویر گالری"></button>`);
    });
    html += `
    <div class="product-section">
      <h2 class="section-label">گالری تصاویر</h2>
      <div class="gallery-strip">${galleryItems.join('')}</div>
    </div>`;
  }

  html += `
  <div class="product-section">
    <div class="description-card">${item.description || ''}</div>
  </div>`;

  if (item.links && item.links.length){
    html += `
    <div class="product-section">
      <div class="links-card">
        <h2 class="section-label">لینک‌ها</h2>
        <div class="links-row">
          ${item.links.map(l => `<a class="link-btn" href="${l.url}" target="_blank" rel="noopener">${ICONS.link}${l.title}</a>`).join('')}
        </div>
      </div>
    </div>`;
  }

  container.innerHTML = html;

  container.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', () => {
      openLightbox(btn.dataset.type, btn.dataset.src, item.title);
    });
  });
}

/* ---------- دکمه بازگشت ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-back]');
  if (btn){
    e.preventDefault();
    if (document.referrer && document.referrer.includes(location.host)) history.back();
    else location.href = 'index.html';
  }
});
