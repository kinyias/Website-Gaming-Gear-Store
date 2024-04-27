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
        items: 1,
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
