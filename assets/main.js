(function(){
  // Suppress browser extension errors
  window.addEventListener('error', function(e) {
    // Suppress errors from browser extensions
    if (e.filename && (
      e.filename.includes('content-all.js') ||
      e.filename.includes('extension://') ||
      e.filename.includes('chrome-extension://') ||
      e.filename.includes('moz-extension://')
    )) {
      e.preventDefault();
      return true;
    }
    // Suppress specific extension-related errors
    if (e.message && (
      e.message.includes('Cannot find menu item') ||
      e.message.includes('save-page')
    )) {
      e.preventDefault();
      return true;
    }
  }, true);

  // Suppress unhandled promise rejections from extensions
  window.addEventListener('unhandledrejection', function(e) {
    // Suppress AbortError from media autoplay (usually from extensions)
    if (e.reason && (
      e.reason.name === 'AbortError' ||
      (e.reason.message && e.reason.message.includes('play() request was interrupted'))
    )) {
      e.preventDefault();
      return true;
    }
  });

  // Mobile navigation toggle
  (function initMobileNav() {
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) {
      console.warn('Mobile nav elements not found');
      return;
    }
    
    // Set initial aria-expanded state
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('type', 'button');
    
    // Toggle menu on button click
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isCurrentlyOpen = navLinks.classList.contains('show');
      
      if (isCurrentlyOpen) {
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navLinks.classList.add('show');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Close menu when clicking on a nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && navLinks.classList.contains('show')) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }, true);
    
    // Close menu on window resize if switching to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  // Contact forms -> mailto
  document.querySelectorAll('[data-contact-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const status = form.querySelector('[data-status]');
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const subject = formData.get('subject') || 'Project enquiry';
      const message = formData.get('message') || '';
      const mailto = `mailto:kiranmohiteassociates@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;
      if(status){
        status.textContent = 'Opening your email client to finish sending...';
      }
      window.location.href = mailto;
    });
  });

  // Lightbox for project images
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = ()=> lightbox?.classList.remove('show');

  document.querySelectorAll('[data-lightbox]').forEach(item=>{
    item.addEventListener('click',()=>{
      if(!lightbox || !lightboxImg) return;
      const src = item.getAttribute('data-lightbox');
      const caption = item.getAttribute('data-caption') || '';
      lightboxImg.src = src;
      if(lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.classList.add('show');
    });
  });

  lightbox?.addEventListener('click',e=>{
    if(e.target === lightbox) closeLightbox();
  });
  document.querySelector('[data-lightbox-close]')?.addEventListener('click',closeLightbox);

  // Scroll reveal for feature cards / sections
  const revealItems = document.querySelectorAll('[data-reveal],[data-rotate]');
  if(revealItems.length){
    const showAll = () => revealItems.forEach(el => el.classList.add('show'));

    if('IntersectionObserver' in window){
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },{threshold:0.18});
      revealItems.forEach(el=>observer.observe(el));
    }else{
      // Fallback for older browsers
      showAll();
    }
  }
})();

