
function initCartDetail() {
  fetch('../data/Products.json')
    .then((response) => response.json())
    .then((response) => {
      listProducts = response;
      loadCartDetail();
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

function getProductById(id) {
  return listProducts.find((item) => item.id == id);
}
function deleteCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter((item) => item.productId != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartDetail();
  }
function loadCartDetail() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '[]');
  }
  let cart = JSON.parse(localStorage.getItem('cart'));
  const table_cart = document.querySelector('.table-cart');
  const title_number_cart = document.querySelector('.title-number-cart');
  title_number_cart.innerHTML = `Bạn đang có <strong> ${cart.reduce(
    (prev, current) => {
      return prev + current.quantity;
    },
    0
  )} sản phẩm </strong> trong giỏ hàng`;
  const summary_total_number = document.querySelector('.summary-total-number');
  let sum = 0;
  table_cart.innerHTML = '';
  cart.forEach((item) => {
    let product = getProductById(item.productId);
    let newHTML = `<div class="media-line-item line-item">
      <div class="media-left">
        <div class="item-img">
        <a href="/product-detail.html?id=${product.id}"> <img
        src="${product.img}"
        alt="${product.name}"
      /></a>
         
        </div>
        <div class="item-remove" onclick="deleteCart(${item.productId})">
        <i class="bi bi-x"></i>
        </div>
      </div>
      <div class="media-right">
        <div class="item-info">
          <a href="/product-detail.html?id=${product.id}">${product.name}</a>
        </div>
        <div class="item-price">
          <span>${formatVND(product.price)}</span>
          <del>${product.price_old ? formatVND(product.price_old) : ''}</del>
        </div>
      </div>
      <div class="media-total">
        <div class="item-total-price">
          <span>${formatVND(item.quantity * product.price)}</span>
        </div>
        <div class="item-qty">
          <div class="qty">
            <button type="button" onclick="minusQuantity(${item.productId})" class="btn-qty">-</button>
            <input
              type="text"
              class="quantity-input"
              value="${item.quantity}"
              min="1"
            />
            <button type="button" onclick="plusQuantity(${item.productId})" class="btn-qty">+</button>
          </div>
        </div>
      </div>
    </div>`;
    table_cart.innerHTML += newHTML;
    sum += item.quantity * product.price;
  });
  summary_total_number.textContent = formatVND(sum);
}

function minusQuantity(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart[cart.findIndex(item => item.productId == id)].quantity > 1)
    cart[cart.findIndex(item => item.productId == id)].quantity -= 1
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartDetail()
}

function plusQuantity(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[cart.findIndex(item => item.productId == id)].quantity += 1
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartDetail()
}

initCartDetail();
