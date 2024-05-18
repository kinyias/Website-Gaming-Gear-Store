function initDashBoardProduct() {
  fetch('./data/Products.json')
    .then((response) => response.json())
    .then((response) => {
      listProducts = response;
      generateProductDashBoardByQueryParams();
    });
}
function generateProductDashBoardByQueryParams() {
  const name = document.getElementById('name');
  const price = document.getElementById('price');
  const price_sale = document.getElementById('price-sale');
  const editor = document.getElementById('editor');
  const image_uploaded = document.querySelector('.image-uploaded');
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let idProduct = params.id;
  let product = listProducts.filter((p) => p.id == idProduct)[0];
  name.value = product.name;
  price.value = product.price;
  price_sale.value = product.price_old;
  editor.innerHTML = product.description;
  image_uploaded.src = product.img;
}

initDashBoardProduct();
