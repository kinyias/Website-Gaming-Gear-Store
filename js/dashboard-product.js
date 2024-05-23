function initDashBoardProduct() {
  //Fetch dữ liệu từ file json
  fetch('./data/Products.json')
    .then((response) => response.json())
    .then((response) => {
      listProducts = response;
      generateProductsDashBoard();
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
/**
 * Hàm này render giao diện dashboard danh sách sản phẩm
 */
function generateProductsDashBoard() {
  const table_body = document.getElementById('table-body');
  table_body.innerHTML = ''
  listProducts.forEach((item) => {
    table_body.innerHTML += `
        <tr>
                      <td>
                        <div class="product-image">
                          <a href="dashboard-edit-product.html?id=${item.id}">
                            <img
                              src="${item.img}"
                              alt="${item.name}"
                            />
                          </a>
                        </div>
                      </td>
                      <td>
                        <div class="product-td">
                          <strong
                            ><h6><a href="dashboard-edit-product.html?id=${
                              item.id
                            }">${item.name}</a></h6></strong
                          >
                        </div>
                      </td>
                      <td>
                        <div class="product-td">
                          <span style="font-weight: 500;">${formatVND(
                            item.price
                          )}</span>
                          <del class="px-1">${
                            item.price_old ? formatVND(item.price_old) : ''
                          }</del>
                        </div>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger" onclick="confirmDelete(${
                          item.id
                        })">
                          <i class="bi bi-x"></i>
                        </button>
                      </td>
                    </tr>`;
  });
}

/**
 * Hàm này gọi modal xác nhận trước khi xoá 
 * @param id 
 */
function confirmDelete(id) {
  const btn_modal = document.getElementById('btnModal');
  btn_modal.click();
  const btn_delete = document.getElementById('btn-delete');
  //Nhấn nút xoá
  btn_delete.onclick = function () {
    listProducts = listProducts.filter((item) => item.id != id);
    generateProductsDashBoard()
  };
}

initDashBoardProduct();
