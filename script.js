(() => {
  const dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') {
    document.querySelectorAll('[data-photo]').forEach(button => {
      button.addEventListener('click', () => window.open(button.dataset.photo, '_blank', 'noopener,noreferrer'));
    });
    return;
  }
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  const close = dialog.querySelector('button');
  let returnTo;
  let previousOverflow;
  document.querySelectorAll('[data-photo]').forEach(button => {
    button.addEventListener('click', () => {
      returnTo = button;
      image.src = button.dataset.photo;
      image.alt = button.querySelector('img').alt;
      caption.textContent = button.dataset.caption;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    returnTo?.focus({ preventScroll: true });
  });
})();
