function initProductDetail() {
  fetch('../data/Products.json')
    .then((response) => response.json())
    .then((response) => {
      listProducts = response;
      generateProductByIdQueryParam();
    });
}
//Format number sang VND
function formatVND(number) {
  let formatted_number = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(number)
    .replaceAll('.', ',');
  return formatted_number;
}

//Add toast animation
function toastMessage() {
  const btn_carts = document.querySelectorAll('.btn-cart');
  btn_carts.forEach((btn) => {
    btn.addEventListener('click', () => {
      Toastify({
        text: 'Đã thêm vào giỏ hàng',
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
        duration: 3000,
      }).showToast();
    });
  });
}
function generateProductByIdQueryParam() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let idProduct = params.id;
  let product = listProducts.filter((p) => p.id == idProduct)[0];
  const product_detail = document.querySelector('.product-detail');
  const description_content = document.querySelector('.description-content');
  product_detail.innerHTML = `<div class="row">
  <div class="col-lg-4 col-12">
    <div class="product-detail-image">
      <img src="${product.img}" alt="${product.name}" class="zoom" />
    </div>
  </div>
  <div class="col-lg-5 col-12">
    <div class="product-detail-content">
      <div class="product-detail-name">
        <h3>${product.name}</h3>
      </div>
      <div class="product-detail-brand">
        <strong style="font-weight: 600">Thương hiệu:</strong> ${product.brand}
      </div>
      <div class="product-detail-price">
        <span class="price-title">Giá: </span>
        <span class="price ${product.price_old ? 'sale' : ''}">${formatVND(
    product.price
  )}</span>
        <del class="price-old">${
          product.price_old ? formatVND(product.price_old) : ''
        }</del>
      </div>
      <div class="product-detail-actions">
        <div class="product-detail-quantity">
          <div class="quantity-title">Số lượng:</div>
          <button class="btn-qty" onclick="minusProduct()">-</button>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value="1"
            min="1"
            class="quantity-input"
          />
          <button class="btn-qty" onclick="plusProduct()">+</button>
        </div>
        <div class="product-detail-addToCart mt-3">
          <button class="btn btn-cart" onclick="addToCart(${
            product.id
          })">Thêm vào giỏ</button>
          <button class="btn btn-buynow"><a href="cart-detail.html">Mua ngay</a></button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  description_content.innerHTML = product.description;
  generateProductRelateList(listProducts, product.category, product.id);
  toastMessage();
  mediumZoom('.zoom', {
    margin: 50,
    background: '#000',
  });
}

function generateProductRelateList(listProducts, idCategory, idProduct) {
  const productRelateList = document.querySelector(
    '.product-relate-list .owl-stage-outer .owl-stage'
  );
  if (productRelateList) {
    let productsRelate = listProducts.filter(
      (item) => item.category == idCategory && item.id != idProduct
    );
    productsRelate.forEach((item) => {
      productRelateList.innerHTML += `<div class="owl-item">
        <div class="product-item">
        <div class="product-thumb">
        <a href="product-detail.html?id=${item.id}">
        <img
        src="${item.img}"
        alt="product-name"
        />
        </a>
        </div>
        <div class="product-caption">
        <div class="manufacture-product">
        <a href="product-detail.html?id=${item.id}">${item.brand}</a>
        </div>
        <div class="product-name">
        <a href="product-detail.html?id=${item.id}">
        <h4>
        ${item.name}
        </h4>
        </a>
        </div>
        <div class="price-box">
              <span class="regular-price ${
                item.price_old ? 'sale' : ''
              }">${formatVND(item.price)}</span>
              <span class="old-price">${
                item.price_old ? formatVND(item.price_old) : ''
              }</span>
              </div>
              <button class="btn-cart" onclick="addToCart(${
                item.id
              })" type="button">
              Thêm vào giỏ
            </button>
            </div>
            </div>
      </div>`;
    });
    $(document.querySelector('.product-relate-list')).owlCarousel({
      loop: true,
      margin: 10,
      singleItem: true,
      items: 4,
      dots: false,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      navContainer: '.box-title .custom-product-relate',
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 5,
        },
      },
    });
  }
}

function plusProduct() {
  const quantity_input = document.getElementById('quantity');
  quantity_input.value = Number(quantity_input.value) + 1;
}

function minusProduct() {
  const quantity_input = document.getElementById('quantity');
  if (Number(quantity_input.value) > 1)
    quantity_input.value = Number(quantity_input.value) - 1;
}
initProductDetail();
