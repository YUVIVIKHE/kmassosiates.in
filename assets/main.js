(function(){
  // Mobile nav removed (static nav)

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

