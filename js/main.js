const searchInput = document.querySelector('.search');
const categories_menu = document.querySelector('.categories-menu');
const cart = document.querySelector('.cart');
const header_bottom = document.querySelector('.header-bottom');
const menu_bar = document.querySelector('.menu-bar');
const menu_close = document.querySelector('.menu-close');
const menu_mobile_nav = document.querySelector('.menu-mobile-nav');
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
let listCategories = [];
let listBlogs = [];
function initApp() {
  const request1 = fetch('../data/Products.json').then((response) =>
    response.json()
  );
  const request2 = fetch('../data/Categories.json').then((response) =>
    response.json()
  );
  const request3 = fetch('../data/Blogs.json').then((response) =>
    response.json()
  );
  Promise.all([request1, request2, request3])
    .then(([data1, data2, data3]) => {
      listProducts = data1;
      listCategories = data2;
      listBlogs = data3;
      generateSearchKey();
      generateCategories(listCategories);
      generatefeaturedCategoriesList(listCategories);
      generateProductList(listProducts);
      generateCollections(listProducts);
      generateBlogs(listBlogs);
      toastMessage();
      loadCartToHTML();
    })
    .catch((error) => {
      console.error(error);
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
menu_bar.addEventListener('click', function () {
  menu_bar.classList.toggle('hidden');
  menu_close.classList.toggle('hidden');
  menu_mobile_nav.classList.toggle('show');
});
menu_close.addEventListener('click', function () {
  menu_bar.classList.toggle('hidden');
  menu_close.classList.toggle('hidden');
  menu_mobile_nav.classList.toggle('show');
});

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

function generateCategories(listCategories) {
  const categories_list = document.querySelector('.categories-list');
  listCategories.forEach((item) => {
    categories_list.innerHTML += `
    <li class="categories-item">
    <a href="store.html?idCategory=${item.id}"> ${item.name} </a>
   </li>
    `;
  });
}

function getCountProductsOfCategories(id) {
  let sum = 0;
  listProducts.forEach((p) => {
    if (p.category == id) {
      sum++;
    }
  });
  return sum;
}

function generatefeaturedCategoriesList(listCategories) {
  const featured_categories_list = document.querySelector(
    '.featured-categories-list'
  );
  if (featured_categories_list) {
    listCategories.forEach((item) => {
      featured_categories_list.innerHTML += `
        <div class="category-item">
        <div class="category-item-info">
          <h4 class="category-item-name">
            <a href="store.html?idCategory=${item.id}"> ${item.name} </a>
          </h4>
          <div class="total-items">${getCountProductsOfCategories(
            item.id
          )} sản phẩm</div>
          <a href="" class="shop-btn">+ Xem thêm</a>
        </div>
        <div class="category-item-thumb">
          <a href="store.html?idCategory=${item.id}">
            <img
              src="${item.img}"
              alt="${item.name}"
            />
          </a>
        </div>
      </div>`;
    });
  }
}
function generateProductList(listProducts) {
  const productList = document.querySelector(
    '.product-list .owl-stage-outer .owl-stage'
  );
  if (productList) {
    const listShow = listProducts.slice(0, 5);
    listShow.forEach((item) => {
      productList.innerHTML += `<div class="owl-item">
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
}

function generateCollections(listProducts) {
  const collections = document.querySelector('.collections-list');
  if (collections) {
    const listShow = listProducts.slice(0, 10);
    listShow.forEach((item) => {
      collections.innerHTML += `<li class="collections-item">
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
            <a hrefproduct-detail.html?id=${item.id}">${item.brand}</a>
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
    </li>`;
    });
  }
}

function generateBlogs(listBlogs) {
  const blog_list = document.querySelector('.blog-list');
  const blog_main = document.querySelector('.blog-main');
  let blogMain = listBlogs.slice(0, 1)[0];
  let blogList = listBlogs.slice(1, 5);
  if (blog_list && blog_main) {
    blog_main.innerHTML = `
   <div class="blog-image">
   <a href="blog-detail.html?id=${blogMain.id}">
     <img src="${blogMain.img}" alt="${blogMain.title}" />
   </a>
 </div>
 <div class="blog-title">
   <h4>
     <a href="blog-detail.html?id=${blogMain.id}"> ${blogMain.title}</a>
   </h4>
 </div>
 <div class="blog-date">${blogMain.date}</div>
   `;
    blogList.forEach((item) => {
      blog_list.innerHTML += `
     <li class="blog-item">
     <div class="blog-item-image">
       <a href="blog-detail.html?id=${item.id}">
         <img src="${item.img}" alt="${item.title}" />
       </a>
     </div>
     <div class="blog-item-detail">
       <div class="blog-item-title">
         <a href="blog-detail.html?id=${item.id}"> ${item.title}</a>
       </div>
       <div class="blog-item-date">${item.date}</div>
     </div>
   </li>
     `;
    });
  }
}

function getProductById(id) {
  return listProducts.find((item) => item.id == id);
}

function addToCart(productId) {
  console.log(productId);
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
      <a href="product-detail.html?id=${product.id}">
        <img
          src="${product.img}"
        />
      </a>
    </div>
    <div class="cart-info">
      <h4><a href="product-detail.html?id=${product.id}">${
      product.name
    } </a></h4>
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
