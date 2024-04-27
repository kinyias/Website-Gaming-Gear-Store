const searchInput = document.querySelector('.search');
const categories_menu = document.querySelector('.categories-menu');
const cart = document.querySelector('.cart');
const header_bottom = document.querySelector('.header-bottom');
const menu_bar = document.querySelector('.menu-bar');
const menu_close = document.querySelector('.menu-close')
const menu_mobile_nav = document.querySelector('.menu-mobile-nav')
//generateSearchKey
const messages = [
  'Bàn phím akko',
  'Bàn phím keychron',
  'Tai nghe gaming',
  'Ghế gaming',
  'Màn hình',
];

let currentMessageIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 100;
let placeholder = '';
let listProducts = [];
function initApp() {
  fetch('../data/Products.json')
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      generateProductList(listProducts);
      generateSearchKey();
      loadCartToHTML();
    });
}
//Xu ly header top fixed
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 150) {
    header_bottom.classList.add('sticky');
  } else {
    header_bottom.classList.remove('sticky');
  }
});
//Dong mo danh sach san pham
categories_menu.addEventListener('click', function () {
  const categories_content = document.querySelector('.categories-content');
  categories_content.classList.toggle('show');
});

//Dong mo gio hang
cart.addEventListener('click', function () {
  const mini_cart = document.querySelector('.mini-cart');
  mini_cart.classList.toggle('show');
});

//menu-mobile toggle
menu_bar.addEventListener('click', function(){
  menu_bar.classList.toggle('hidden')
  menu_close.classList.toggle('hidden')
  menu_mobile_nav.classList.toggle('show')
})
menu_close.addEventListener('click', function(){
  menu_bar.classList.toggle('hidden')
  menu_close.classList.toggle('hidden')
  menu_mobile_nav.classList.toggle('show')
})

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

//Tao placeholder tu dong cho input tim kiem
function generateSearchKey() {
  if (currentMessageIndex === messages.length) currentMessageIndex = 0;

  const message = messages[currentMessageIndex];

  if (currentCharIndex < message.length) {
    placeholder += message.charAt(currentCharIndex);
    searchInput.setAttribute('placeholder', placeholder);
    currentCharIndex++;
    setTimeout(generateSearchKey, typingSpeed);
  } else {
    // Add a pause after each message
    setTimeout(() => {
      currentCharIndex = 0;
      currentMessageIndex++;
      placeholder = '';
      searchInput.setAttribute('placeholder', placeholder);
      generateSearchKey();
    }, 1000);
  }
}

function generateProductList(listProducts) {
  const productList = document.querySelector(
    '.product-list .owl-stage-outer .owl-stage'
  );
  const listShow = listProducts.slice(0, 5);
  listShow.forEach((item) => {
    productList.innerHTML += `<div class="owl-item">
    <div class="product-item">
    <div class="product-thumb">
    <a href="#">
    <img
    src="${item.img}"
    alt="product-name"
    />
    </a>
    </div>
    <div class="product-caption">
    <div class="manufacture-product">
    <a href="#">${item.category}</a>
    </div>
    <div class="product-name">
    <a href="#">
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
  $(document.querySelector('.product-list')).owlCarousel({
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
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
}

function getProductById(id) {
  return listProducts.find((item) => item.id == id);
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  positionInCart = cart.findIndex((item) => item.productId == productId);
  if (cart.length <= 0) {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  } else if (positionInCart < 0) {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    cart[positionInCart].quantity += 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartToHTML();
}

function deleteCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.filter((item) => item.productId != id);
  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartToHTML();
}
function loadCartToHTML() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]');
  }
  let cart = JSON.parse(localStorage.getItem('cart'));
  const cart_count = document.querySelector('.cart-count');
  cart_count.textContent = cart.reduce((prev, current) => {
    return prev + current.quantity;
  }, 0);
  const cart_list = document.querySelector('.cart-list');
  const total_price = document.querySelector('.total-price');
  let sum = 0;
  cart_list.innerHTML = '';
  if (cart.length <= 0) {
    cart_list.textContent = 'Bạn chưa thêm sản phẩm';
  }
  cart.forEach((item) => {
    let product = getProductById(item.productId);
    let newHTML = `<li class="cart-item">
    <div class="cart-image">
      <a href="#">
        <img
          src="${product.img}"
        />
      </a>
    </div>
    <div class="cart-info">
      <h4><a href="#">${product.name} </a></h4>
      <span
        >${item.quantity} x
        <span>${formatVND(product.price)}</span>
      </span>
    </div>
    <div class="del-icon" onclick="deleteCart(${item.productId})">
      <i class="bi bi-x-circle"></i>
    </div>
  </li>`;
    cart_list.innerHTML += newHTML;
    sum += item.quantity * product.price;
  });
  total_price.textContent = formatVND(sum);
}

initApp();
