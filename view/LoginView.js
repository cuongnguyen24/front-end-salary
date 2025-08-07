export default class LoginView {
  constructor() {
    // DOM elements
    this.form = document.querySelector('#loginForm');
    this.usernameInput = document.querySelector('#username');
    this.passwordInput = document.querySelector('#password');
    this.errorContainer = document.querySelector('#errorMessage');
    this.submitBtn = document.querySelector('#loginBtn');
    this.loadingIndicator = document.querySelector('#loadingIndicator'); // Optional

    // Fallback nếu thiếu ID
    if (!this.form || !this.usernameInput || !this.passwordInput || !this.submitBtn) {
      console.error('Thiếu phần tử trong LoginView');
    }
  }

  bindSubmit(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;
      handler(username, password);
    });
  }

  showError(message) {
    if (this.errorContainer) {
      this.errorContainer.textContent = message;
      this.errorContainer.style.display = 'block';
    } else {
      alert(message); // fallback
    }
  }

  clearError() {
    if (this.errorContainer) {
      this.errorContainer.textContent = '';
      this.errorContainer.style.display = 'none';
    }
  }

  setLoading(isLoading) {
    if (this.submitBtn) {
      this.submitBtn.disabled = isLoading;
      this.submitBtn.textContent = isLoading ? 'Đang đăng nhập...' : 'Đăng nhập';
    }
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = isLoading ? 'inline-block' : 'none';
    }
  }

  resetForm() {
    this.form.reset();
    this.clearError();
  }

  clearPassword() {
    if (this.passwordInput) {
      this.passwordInput.value = '';
    }
  }

  focusUsername() {
    if (this.usernameInput) {
      this.usernameInput.focus();
    }
  }

  focusPassword() {
    if (this.passwordInput) {
      this.passwordInput.focus();
    }
  }
}
