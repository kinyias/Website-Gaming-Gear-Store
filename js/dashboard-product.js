function initDashBoardProduct() {
    fetch('../data/Products.json')
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
function generateProductsDashBoard(){
    const table_body = document.getElementById('table-body')
    listProducts.forEach((item)=>{
        table_body.innerHTML +=`
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
                            ><h6><a href="dashboard-edit-product.html?id=${item.id}">${item.name}</a></h6></strong
                          >
                        </div>
                      </td>
                      <td>
                        <div class="product-td">
                          <span style="font-weight: 500;">${formatVND(item.price)}</span>
                          <del class="px-1">${item.price_old? formatVND(item.price_old) : ''}</del>
                        </div>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger">
                          <i class="bi bi-x"></i>
                        </button>
                      </td>
                    </tr>`
    })
}

initDashBoardProduct()