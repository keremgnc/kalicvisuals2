const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const images = document.querySelectorAll(".gallery img");
const wrapper = document.querySelector(".modal-content-wrapper");
const serviceItems = document.querySelectorAll(".service-list li");

let currentIndex = 0;
let isZoomed = false;

// Modal açma
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    modalImg.src = img.src;
    modalImg.alt = img.alt || "Portfolyo Fotoğrafı";
    currentIndex = index;
    resetZoom();
  });
});

// Modal kapatma
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === wrapper) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  resetZoom();
}

// Zoom tıklanan yere göre
modalImg.addEventListener("click", (e) => {
  if (!isZoomed) {
    const rect = modalImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const xPercent = (offsetX / rect.width) * 100;
    const yPercent = (offsetY / rect.height) * 100;

    modalImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    modalImg.style.transform = "scale(2)";
    modalImg.classList.add("zoomed");
    isZoomed = true;
  } else {
    resetZoom();
  }
});

function resetZoom() {
  modalImg.style.transform = "scale(1)";
  modalImg.style.transformOrigin = "center center";
  modalImg.classList.remove("zoomed");
  isZoomed = false;
}

// İleri & Geri
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateModalImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalImage();
});

function updateModalImage() {
  modalImg.src = images[currentIndex].src;
  modalImg.alt = images[currentIndex].alt || "Portfolyo Fotoğrafı";
  resetZoom();
}

// Hizmet listesi portfolyo bağlantısı
serviceItems.forEach(item => {
  item.addEventListener("click", () => {
    const index = parseInt(item.getAttribute("data-portfolio-index"));
    if (!isNaN(index) && images[index]) {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        smoothScroll(portfolioSection, 800);
        setTimeout(() => {
          images[index].click();
        }, 900);
      }
    }
  });
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });
});

// Menü yumuşak geçiş
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
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
