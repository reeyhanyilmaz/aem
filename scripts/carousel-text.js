/* global WOW */
/* eslint-disable */
// Logo list - you can add more logos here
const logos = [
  { name: "pfizer", alt: "Pfizer" },
  { name: "abbvie", alt: "AbbVie" },
  { name: "janssen", alt: "Janssen" },
  { name: "abbott", alt: "Abbott" },
  { name: "bristol-myers", alt: "Bristol Myers Squibb" },
  { name: "lilly", alt: "Lilly" },
  { name: "bayer", alt: "Bayer" },
  { name: "teva", alt: "Teva" },
  { name: "novo-nordisk", alt: "Novo Nordisk" },
  { name: "johnson-johnson", alt: "Johnson & Johnson" },
];

// Create carousel HTML
export default function initCarousel() {
  const carouselSections = document.querySelectorAll(".section.carousel-part");

  carouselSections.forEach((section) => {
    // Create carousel container with sliding items
    const carouselHTML = `
      <div class="main-block home-carousel">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="carousel-container">
                <div class="carousel-track">
                  ${logos
                    .map(
                      (logo, index) => `
                    <div class="carousel-item">
                      <img 
                        src="/assets/images/logo-${logo.name}.png" 
                        class="img-fluid" 
                        alt="${logo.alt}"
                        onmouseover="this.src='/assets/images/hover/logo-${logo.name}.png'"
                        onmouseout="this.src='/assets/images/logo-${logo.name}.png'"
                      />
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <div class="carousel-nav">
                  <button class="carousel-arrow carousel-prev" aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="carousel-arrow carousel-next" aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .section.carousel-part .main-block {
          max-width: 100% !important;
          background-color: #eaeef2 !important;
          padding: 0 !important;
        }

        .carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
        }
        
        .carousel-nav {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          padding: 0 20px;
          z-index: 10;
        }
        
        .carousel-arrow {
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
          padding: 0;
          margin: 0;
          outline: none;
          pointer-events: auto;
        }
        
        .carousel-arrow:hover {
          background: #f5f5f5;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .carousel-arrow:active {
          transform: scale(0.98);
        }
        
        .carousel-arrow svg {
          width: 20px;
          height: 20px;
        }
        
        @media (max-width: 767px) {
          .carousel-nav {
            padding: 0 10px;
          }
          
          .carousel-arrow {
            width: 36px;
            height: 36px;
          }
          
          .carousel-arrow svg {
            width: 18px;
            height: 18px;
          }
        }
        
        .carousel-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
        
        .carousel-item {
          flex: 0 0 150px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .carousel-item img:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.1);
        }
        
        @media (max-width: 767px) {
          .carousel-item {
            flex: 0 0 100px;
            padding: 0 10px;
          }
        }
      </style>
    `;

    // Set the HTML
    section.innerHTML = carouselHTML;

    // Get the carousel track element
    const track = section.querySelector(".carousel-track");
    const items = section.querySelectorAll(".carousel-item");
    const itemWidth = 150; // Width of each item including padding
    let currentIndex = 0;
    let isTransitioning = false;

    // Clone all items and append to end for infinite effect
    const clonedItems = Array.from(items).map((item) => item.cloneNode(true));
    clonedItems.forEach((item) => track.appendChild(item));

    // Set initial position
    track.style.transform = "translateX(0)";

    // Function to move to next slide
    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;

      currentIndex++;
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      // If we've reached the cloned items, reset position without animation
      if (currentIndex >= items.length) {
        setTimeout(() => {
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
          // Force reflow
          track.offsetHeight;
          currentIndex = 0;
          isTransitioning = false;
        }, 500);
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    }

    // Start the carousel
    let slideInterval = setInterval(nextSlide, 2000);

    // Navigation functions
    function goToPrev() {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = items.length - 1;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        // Force reflow
        track.offsetHeight;
      }
      
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
    
    function goToNext() {
      nextSlide();
    }

    // Pause on hover
    const container = section.querySelector(".carousel-container");
    const prevButton = section.querySelector(".carousel-prev");
    const nextButton = section.querySelector(".carousel-next");
    
    const pauseCarousel = () => {
      clearInterval(slideInterval);
    };

    const resumeCarousel = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 2000);
    };
    
    // Event listeners
    container.addEventListener("mouseenter", pauseCarousel);
    container.addEventListener("mouseleave", resumeCarousel);
    prevButton.addEventListener("click", goToPrev);
    nextButton.addEventListener("click", goToNext);

    // Cleanup on section unload
    section.cleanup = () => {
      clearInterval(slideInterval);
      container.removeEventListener("mouseenter", pauseCarousel);
      container.removeEventListener("mouseleave", resumeCarousel);
      prevButton.removeEventListener("click", goToPrev);
      nextButton.removeEventListener("click", goToNext);
    };
  });

  // Initialize WOW.js if it's available
  if (window.WOW) {
    // eslint-disable-next-line no-new
    new WOW().init();
  }
}
