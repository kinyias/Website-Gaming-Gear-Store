listBlogs = [];
function initBlog() {
  fetch('../data/Blogs.json')
    .then((response) => response.json())
    .then((data) => {
      listBlogs = data;
      generateBlogList(listBlogs);
      generateBlogListLastets(listBlogs);
      generateBlogByIdQueryParams();
    });
}

function generateBlogList(listBlogs) {
  const blog_list = document.querySelector('.blog-list');
  if (blog_list) {
    const listShow = listBlogs.slice(0, 4);
    listShow.forEach((item) => {
      blog_list.innerHTML += `
            <div class="blog-item col-6 mb-3">
                    <div class="blog-item-inner">
                      <div class="blog-image">
                        <a href="detail-blog.html?id=${item.id}">
                          <img src="${item.img}" alt="${item.title}" />
                        </a>
                      </div>
                      <div class="blog-detail">
                        <div class="blog-title">
                          <h3>
                            <a href="detail-blog.html?id=${item.id}"> ${item.title} </a>
                          </h3>
                        </div>
                        <div class="blog-content">
                          ${item.content}
                        </div>
                        <div class="blog-post-meta">
                          <span class="author">Bởi: ${item.author}</span>
                          <span class="date">${item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
            `;
    });
  }
}

function generateBlogListLastets(listBlogs) {
  const blog_list = document.querySelector('.blog-list-lastest');
  if (blog_list) {
    const listShow = listBlogs.slice(2, 6);
    listShow.forEach((item) => {
      blog_list.innerHTML += `
            <li class="blog-item-lastest">
                        <div class="blog-image-lastest">
                          <a href="detail-blog.html?id=${item.id}">
                            <img src="${item.img}" alt="" />
                          </a>
                        </div>
                        <div class="blog-detail-lastest">
                          <div class="blog-title-lastest">
                            <h3>
                              <a href="detail-blog.html?id=${item.id}">${item.title}</a>
                            </h3>
                          </div>
                          <div class="blog-post-meta">
                            <span class="date">${item.date}</span>
                          </div>
                        </div>
                      </li>
            `;
    });
  }
}

function generateBlogByIdQueryParams() {
  const blog_info_detail = document.querySelector('.blog-info-detail');
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let idBlog = params.id;
  let blog = listBlogs.filter((item) => item.id == idBlog)[0];
  blog_info_detail.innerHTML = `
      <div class="heading-blog my-3"><h3>${blog.title}</h3></div>
      <div class="blog-post-meta">
      <span class="author">Bởi: ${blog.author}</span>
      <span class="date">${blog.date}</span>
    </div>
      <div class="blog-info-image mt-2">
          <img src="${blog.img}" alt="${blog.title}">
      </div>
      <div class="blog-info-content my-3">
          ${blog.content}
      </div>`;
}
initBlog();
