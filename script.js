// Menü linklerine tıklanınca yumuşak ve daha yavaş kaydırma
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      smoothScroll(targetSection, 1000); // 1000 ms = 1 saniye
    }
  });
});

// Yavaş kaydırma fonksiyonu
function smoothScroll(target, duration) {
  const start = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top + start - 60; // menü yüksekliği çıkar
  const startTime = performance.now();

  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, start, targetPosition - start, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // easing fonksiyonu (yumuşak hızlanma ve yavaşlama)
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
