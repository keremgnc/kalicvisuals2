// Menü yumuşak geçiş aynı
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      smoothScroll(targetSection, 1000);
    }
  });
});

function smoothScroll(target, duration) {
  const start = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top + start - 60;
  const startTime = performance.now();

  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, start, targetPosition - start, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// === Galeri Modal === //
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalWrapper = document.querySelector(".modal-content-wrapper");
const close = document.querySelector(".close");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const images = document.querySelectorAll(".gallery img");

let currentIndex = 0;
let isZoomed = false;

// Modal aç
function openModal(index) {
  currentIndex = index;
  modalImg.src = images[index].src;
  modal.classList.add("show");
  modal.style.display = "block";

  // Reset zoom
  modalImg.classList.remove("zoomed");
  modalImg.style.transform = "scale(1)";
  modalImg.style.transformOrigin = "center center";

  // Geçiş efekti
  setTimeout(() => {
    modalWrapper.classList.add("show");
  }, 10);
}

// Modal kapat
function closeModal() {
  modal.classList.remove("show");
  modalWrapper.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Tıklanınca modal aç
images.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Navigasyonlar
prev.onclick = () => openModal((currentIndex - 1 + images.length) % images.length);
next.onclick = () => openModal((currentIndex + 1) % images.length);
close.onclick = closeModal;

// Dışa tıklanırsa kapat
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === modalWrapper) {
    closeModal();
  }
});

// === Gelişmiş Zoom: mouse konumuna göre ===
modalImg.addEventListener("click", (e) => {
  if (!isZoomed) {
    const rect = modalImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;

    modalImg.style.transformOrigin = `${originX}% ${originY}%`;
    modalImg.style.transform = "scale(2)";
    modalImg.classList.add("zoomed");
    isZoomed = true;
  } else {
    modalImg.style.transform = "scale(1)";
    modalImg.classList.remove("zoomed");
    isZoomed = false;
  }
});
