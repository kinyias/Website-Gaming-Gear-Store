function initDashBoardProduct() {
  fetch('./data/Categories.json')
    .then((response) => response.json())
    .then((response) => {
      listCategories = response;
      generateCategoriesDashBoard();
    });
}
function generateCategoriesDashBoard() {
  const table_body = document.getElementById('table-body');
  table_body.innerHTML = ''
  listCategories.forEach((item) => {
    table_body.innerHTML += `
        <tr>
                      <td>
                        <div class="product-image">
                          <a href="dashboard-edit-category.html?id=${item.id}">
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
                            ><h6><a href="dashboard-edit-category.html?id=${item.id}">${item.name}</a></h6></strong
                          >
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
function confirmDelete(id) {
  const btn_modal = document.getElementById('btnModal');
  btn_modal.click();
  const btn_delete = document.getElementById('btn-delete');
  btn_delete.onclick = function () {
    listCategories = listCategories.filter((item) => item.id != id);
    generateCategoriesDashBoard()
  };
}
initDashBoardProduct();
