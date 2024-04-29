listBlogs = [];
function initBlog() {
  fetch('../data/Blogs.json')
    .then((response) => response.json())
    .then((data) => {
      listBlogs = data;
      generateBlogList(listBlogs);
      generateBlogListLastets(listBlogs) 
    });
}

function generateBlogList(listBlogs) {
    const blog_list = document.querySelector('.blog-list');
    if(blog_list){
        const listShow = listBlogs.slice(0, 4);
        listShow.forEach((item)=>{
            blog_list.innerHTML += `
            <div class="blog-item col-6 mb-3">
                    <div class="blog-item-inner">
                      <div class="blog-image">
                        <a href="#">
                          <img src="${item.img}" alt="${item.title}" />
                        </a>
                      </div>
                      <div class="blog-detail">
                        <div class="blog-title">
                          <h3>
                            <a href="#"> ${item.title} </a>
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
            `
        })
    }
}

function generateBlogListLastets(listBlogs) {
    const blog_list = document.querySelector('.blog-list-lastest');
    if(blog_list){
        const listShow = listBlogs.slice(2, 6);
        listShow.forEach((item)=>{
            blog_list.innerHTML += `
            <li class="blog-item-lastest">
                        <div class="blog-image-lastest">
                          <a href="#">
                            <img src="${item.img}" alt="" />
                          </a>
                        </div>
                        <div class="blog-detail-lastest">
                          <div class="blog-title-lastest">
                            <h3>
                              <a href="#">${item.title}</a>
                            </h3>
                          </div>
                          <div class="blog-post-meta">
                            <span class="date">${item.date}</span>
                          </div>
                        </div>
                      </li>
            `
        })
    }
}
initBlog()