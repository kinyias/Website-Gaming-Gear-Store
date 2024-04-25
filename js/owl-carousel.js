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
    navContainer: '.box-title .custom-nav-best-seller',
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  });
  $('.featured-categories-list').owlCarousel({
    loop: true,
    margin: 30,
    singleItem: true,
    items: 3,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    navContainer: '.box-title .custom-nav-featured-categories',
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});
