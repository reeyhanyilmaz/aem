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
    // Create carousel container with infinite scroll
    const carouselHTML = `
      <div class="main-block home-carousel">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="carousel-container">
                <div class="carousel-track">
                  ${[...Array(2)]
                    .map(() =>
                      logos
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
                        .join("")
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .section.carousel-part .main-block{
          max-width: 100% !important;
        }

        .carousel-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
        }
        
        .carousel-track {
          display: flex;
          animation: scroll 30s linear infinite;
          width: calc(150px * ${logos.length * 2});
        }
        
        .carousel-item {
          flex: 0 0 150px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .carousel-item img {
          max-width: 100%;
          height: auto;
          transition: all 0.3s ease;
          opacity: 0.7;
        }
        
        .carousel-item img:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.1);
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-150px * ${logos.length}));
          }
        }
        
        @media (max-width: 767px) {
          .carousel-item {
            flex: 0 0 100px;
            padding: 0 10px;
          }
          
          .carousel-track {
            width: calc(100px * ${logos.length * 2});
          }
          
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100px * ${logos.length}));
            }
          }
        }
      </style>
    `;

    // Set the HTML
    section.innerHTML = carouselHTML;
  });

  // Initialize WOW.js if it's available
  if (window.WOW) {
    // eslint-disable-next-line no-new
    new WOW().init();
  }
}
