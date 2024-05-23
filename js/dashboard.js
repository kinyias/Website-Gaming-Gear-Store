const menu_bar = document.querySelector('.menu-bar');
const admin_navigation = document.querySelector('.admin-navigation');
const image_uploaded = document.querySelector('.image-uploaded');
menu_bar.addEventListener('click', function () {
  admin_navigation.classList.toggle('show');
});


const btn_upload = document.querySelector('.btn-upload');
const file = document.getElementById('file');
//Nêu có button upload
if(btn_upload)
btn_upload.addEventListener('click', function () {
  file.click();
});

//Nếu có input file upload
if(file)
file.addEventListener('change', updateImageDisplay);
/**
 * Hàm này hiển thị hình ảnh sau khi upload ảnh
 */
function updateImageDisplay() {
  const curFiles = file.files; //File upload
  const imageUpload_icon = document.querySelector('.imageUpload-icon')
  const btn_upload = document.querySelector('.btn-upload')
  const imageUpload_description = document.querySelector('.imageUpload-description')
  image_uploaded.src = URL.createObjectURL(curFiles[0]); //Tạo url cho file upload và gán vào img
  image_uploaded.style.opacity = 1;
  //Ẩn nút upload và thông tin upload
  imageUpload_icon.style = 'visibility:hidden;'
  btn_upload.style = 'visibility:hidden;'
  imageUpload_description.style = 'visibility:hidden;'
}
//Nếu có hình upload khi click vào hình thì cho upload hình khác
if(image_uploaded)
image_uploaded.addEventListener('click', function () {
  file.click();
});
