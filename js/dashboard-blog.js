function initDashBoardProduct() {
    fetch('../data/Blogs.json')
      .then((response) => response.json())
      .then((response) => {
        listBlogs = response;
        generateBlogsDashBoard();
      });
  }
function generateBlogsDashBoard(){
    const table_body = document.getElementById('table-body')
    listBlogs.forEach((item)=>{
        table_body.innerHTML +=`
        <tr>
                      <td>
                        <div class="product-image">
                          <a href="dashboard-edit-category.html?id=${item.id}">
                            <img
                              src="${item.img}"
                              alt="${item.title}"
                            />
                          </a>
                        </div>
                      </td>
                      <td>
                        <div class="product-td">
                          <strong
                            ><h6><a href="dashboard-edit-category.html?id=${item.id}">${item.title}</a></h6></strong
                          >
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