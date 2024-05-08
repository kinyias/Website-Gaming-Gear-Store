const menu_bar = document.querySelector('.menu-bar')
const admin_navigation = document.querySelector('.admin-navigation')
const btn_upload =document.querySelector('.btn-upload')
const file = document.getElementById('file')
const image_uploaded = document.querySelector('.image-uploaded')
menu_bar.addEventListener('click', function(){
    admin_navigation.classList.toggle('show')
})

btn_upload.addEventListener('click', function(){
  file.click()
})

file.addEventListener("change", updateImageDisplay);
function updateImageDisplay() {
  const curFiles = file.files;
  image_uploaded.src = URL.createObjectURL(curFiles[0]);
  image_uploaded.style.opacity = 1;
}