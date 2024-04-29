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
});
