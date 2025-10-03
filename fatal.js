document.addEventListener("DOMContentLoaded", function () {
  // =======================================================
  // 1. SLIDER & LIGHTBOX SETUP
  // =======================================================
  const sliderContainers = document.querySelectorAll(".slider-container");

  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-image");
  const closeBtn = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  // Track the current image index when the lightbox is open
  let currentLightboxIndex = 0;
  let activeSlides = []; // Stores the array of links for the currently open gallery

  sliderContainers.forEach((container) => {
    const slides = container.querySelector(".slides");
    const slideLinks = container.querySelectorAll(".slides a"); // All clickable images
    const prevBtn = container.querySelector(".prev-btn");
    const nextBtn = container.querySelector(".next-btn");

    if (slideLinks.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slideLinks.length;

    // --- Slider Navigation Logic ---
    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      const offset = currentSlide * -100;
      slides.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    });

    // --- Image Click (Open Lightbox) Logic ---
    slideLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Set the current gallery context
        activeSlides = Array.from(container.querySelectorAll(".slides a"));

        // Get the index from the clicked element
        const index = parseInt(this.getAttribute("data-lightbox-index"));

        showLightboxSlide(index);
        modal.style.display = "block";
      });
    });
  });

  // --- Lightbox Functions ---
  function showLightboxSlide(index) {
    if (activeSlides.length === 0) return;

    // Loop logic for lightbox
    if (index < 0) {
      currentLightboxIndex = activeSlides.length - 1;
    } else if (index >= activeSlides.length) {
      currentLightboxIndex = 0;
    } else {
      currentLightboxIndex = index;
    }

    // Update the image source and alt text in the lightbox
    const imageElement =
      activeSlides[currentLightboxIndex].querySelector("img");
    modalImg.src = imageElement.src;
    modalImg.alt = imageElement.alt;
  }

  // --- Lightbox Event Listeners ---

  // Close button click
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Click outside the image to close the lightbox
  modal.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  // Next/Prev buttons in the lightbox
  lightboxNext.onclick = function (e) {
    e.stopPropagation(); // Prevents closing the modal when clicking the arrow
    showLightboxSlide(currentLightboxIndex + 1);
  };

  lightboxPrev.onclick = function (e) {
    e.stopPropagation();
    showLightboxSlide(currentLightboxIndex - 1);
  };

  // Keyboard navigation (Escape to close, arrows to switch)
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      if (e.key === "Escape") {
        modal.style.display = "none";
      } else if (e.key === "ArrowRight") {
        showLightboxSlide(currentLightboxIndex + 1);
      } else if (e.key === "ArrowLeft") {
        showLightboxSlide(currentLightboxIndex - 1);
      }
    }
  });
});
