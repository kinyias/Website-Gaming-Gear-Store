function validatePassword() {
  var password = document.getElementById('password').value;

  // Define your password complexity requirements here
  var minLength = 8; // Minimum password length
  var hasUppercase = /[A-Z]/.test(password); // Check for uppercase letter
  var hasLowercase = /[a-z]/.test(password); // Check for lowercase letter
  var hasNumber = /[0-9]/.test(password); // Check for a number
  var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password); // Check for special character

  // Check if all requirements are met
  if (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  ) {
    return true; // Allow form submission
  } else {
    // Provide error messages for failed conditions
    var errorMessage = 'Mật khẩu phải:<br>';
    if (password.length < minLength) {
      errorMessage += '- Độ dài ít nhất ' + minLength + ' kí tự<br>';
    }
    if (!hasUppercase) {
      errorMessage += '- Có 1 ký tự in hoa<br>';
    }
    if (!hasLowercase) {
      errorMessage += '- Có 1 kí tự thường<br>';
    }
    if (!hasNumber) {
      errorMessage += '- Có 1 kí tự số<br>';
    }
    if (!hasSpecialChar) {
      errorMessage += '- Có 1 kí tự số<br>';
    }
    document.getElementById('validate-password').innerHTML = errorMessage;
    return false; // Prevent form submission
  }
}

// Attach the validation function to the form's submit event
document.querySelector('.btn-login').addEventListener('click', function (e) {
  if (!validatePassword()) e.preventDefault();
});
