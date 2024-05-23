//Validate form contact
const form_contact = document.querySelector('.form-contact');
const input_email = document.getElementById('email');
const btn_modal = document.getElementById('btnModal');
const btn_submit = document.getElementById('btn-submit');
input_email.addEventListener('change', function () {
  if (input_email.value) {
    const regexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      input_email.value
    );
    if (!regexMatch) {
      input_email.setCustomValidity(`Cần một kí tự '@' trong email của bạn`);
    }
  } else if (input_email.value == '') {
    input_email.setCustomValidity('Vui lòng nhập email của bạn');
  }
});
btn_submit.addEventListener('click', function () {
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  //Form valid thì hiển thị modal thành công và xoá các field đã nhập
  if (name != '' && phone != '' && subject != '' && message != '' && validEmail(email)) {
    btn_modal.click();
    document.getElementById('phone').value = ''
    document.getElementById('email').value = ''
    document.getElementById('name').value = ''
    document.getElementById('subject').value = ''
    document.getElementById('message').value = ''
  }
});

/**
 * Hàm này để valid email
 * @param {*} email 
 * @returns boolean
 */
function validEmail(email) {
  const regexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  return regexMatch;
}
