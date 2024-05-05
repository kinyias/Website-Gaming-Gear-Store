//Validate form contact
const form_contact = document.querySelector('.form-contact');
const input_phone = document.getElementById('phone');
const input_email = document.getElementById('email');
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
