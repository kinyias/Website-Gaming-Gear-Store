function initDashBoardCategory() {
    fetch('../data/Categories.json')
      .then((response) => response.json())
      .then((response) => {
        listCategories = response;
        generateCategoryDashBoardByQueryParams();
      });
  }
function generateCategoryDashBoardByQueryParams(){
    const name = document.getElementById('name')
    const editor = document.getElementById('editor')
    const image_uploaded = document.querySelector('.image-uploaded')
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let idCategory = params.id;
      let Category = listCategories.filter((p) => p.id == idCategory)[0];
    name.value = Category.name
    editor.innerHTML = Category.description
    image_uploaded.src = Category.img
}

initDashBoardCategory()