/* global jQuery, WOW */

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
    // Create carousel container
    const carouselHTML = `
      <div class="main-block home-carousel">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="lightSlider" id="logo-carousel">
                ${logos
                  .map(
                    (logo, index) => `
                  <figure class="item wow fadeInUp" data-wow-duration="1s" data-wow-delay="${
                    (index + 1) * 0.1
                  }s">
                    <img 
                      data-alt-src="/assets/images/hover/logo-${logo.name}.png" 
                      src="/assets/images/logo/logo-${logo.name}.png" 
                      class="img-fluid" 
                      alt="${logo.alt}"
                      onmouseover="this.src=this.getAttribute('data-alt-src')"
                      onmouseout="this.src=this.src.replace('hover/', '')"
                    />
                  </figure>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Set the HTML
    section.innerHTML = carouselHTML;

    // Initialize lightSlider if it's available
    if (window.jQuery && window.jQuery.fn.lightSlider) {
      jQuery("#logo-carousel").lightSlider({
        item: 5,
        loop: true,
        slideMove: 1,
        easing: "cubic-bezier(0.25, 0, 0.25, 1)",
        speed: 600,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              item: 4,
              slideMove: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              item: 3,
              slideMove: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              item: 2,
              slideMove: 1,
            },
          },
        ],
        auto: true,
        pauseOnHover: true,
        controls: false,
        pager: false,
      });
    }
  });

  // Initialize WOW.js if it's available
  if (window.WOW) {
    // eslint-disable-next-line no-new
    new WOW().init();
  }
}
