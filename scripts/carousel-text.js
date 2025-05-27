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
                  ${logos.map((logo, index) => `
                    <div class="carousel-item">
                      <img 
                        src="/assets/images/logo-${logo.name}.png" 
                        class="img-fluid" 
                        alt="${logo.alt}"
                        onmouseover="this.src='/assets/images/hover/logo-${logo.name}.png'"
                        onmouseout="this.src='/assets/images/logo-${logo.name}.png'"
                      />
                    </div>
                  `).join('')}
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
        }

        .carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
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
          opacity: 0.7;
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
    const track = section.querySelector('.carousel-track');
    const items = section.querySelectorAll('.carousel-item');
    const itemWidth = 150; // Width of each item including padding
    let currentIndex = 0;
    
    // Clone first few items and append to end for infinite effect
    const firstItems = Array.from(items).slice(0, 5).map(item => item.cloneNode(true));
    firstItems.forEach(item => track.appendChild(item));
    
    // Function to move to next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % (items.length + 1);
      
      // If we've reached the cloned items, reset position without animation
      if (currentIndex === items.length) {
        setTimeout(() => {
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          // Force reflow
          track.offsetHeight;
          currentIndex = 0;
          // Re-enable transition
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
          }, 50);
        }, 500);
      }
      
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // Start the carousel
    const slideInterval = setInterval(nextSlide, 2000);
    
    // Pause on hover
    const container = section.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    container.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 2000);
    });
  });

  // Initialize WOW.js if it's available
  if (window.WOW) {
    // eslint-disable-next-line no-new
    new WOW().init();
  }
}
