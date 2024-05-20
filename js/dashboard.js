const menu_bar = document.querySelector('.menu-bar');
const admin_navigation = document.querySelector('.admin-navigation');
const btn_upload = document.querySelector('.btn-upload');
const file = document.getElementById('file');
const image_uploaded = document.querySelector('.image-uploaded');
menu_bar.addEventListener('click', function () {
  admin_navigation.classList.toggle('show');
});

if(btn_upload)
btn_upload.addEventListener('click', function () {
  file.click();
});

if(file)
file.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
  const curFiles = file.files;
  const imageUpload_icon = document.querySelector('.imageUpload-icon')
  const btn_upload = document.querySelector('.btn-upload')
  const imageUpload_description = document.querySelector('.imageUpload-description')
  image_uploaded.src = URL.createObjectURL(curFiles[0]);
  image_uploaded.style.opacity = 1;
  imageUpload_icon.style = 'visibility:hidden;'
  btn_upload.style = 'visibility:hidden;'
  imageUpload_description.style = 'visibility:hidden;'
}

if(image_uploaded)
image_uploaded.addEventListener('click', function () {
  file.click();
});
