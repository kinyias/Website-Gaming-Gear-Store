$(document).ready(function () {
  $('.banner-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    singleItem: true,
    items: 1,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });
  $('.product-list').owlCarousel({
    loop: true,
    margin: 30,
    singleItem: true,
    items: 4,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    navContainer: '.best-seller-title .custom-nav',
    responsive: {
      0: {
        items: 4,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 4,
      },
    },
  });
});
