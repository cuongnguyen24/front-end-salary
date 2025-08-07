import LoginModel from '../model/LoginModel.js';
import LoginView from '../view/LoginView.js';

export default class LoginController {
  constructor() {
    this.model = new LoginModel();
    this.view = new LoginView();
    this.isProcessing = false; // Ngăn người dùng gửi nhiều lần
  }

  init() {
    this.view.bindSubmit(this.handleLogin.bind(this));
    
    // Nếu đã đăng nhập thì chuyển sang trang chính
    this.checkExistingLogin();

    // Focus vào username khi load trang
    setTimeout(() => this.view.focusUsername(), 100);
  }

  checkExistingLogin() {
    if (this.model.isTokenValid()) {
      window.location.href = 'main.html';
    }
  }

  async handleLogin(username, password) {
    if (this.isProcessing) return;

    this.isProcessing = true;
    this.view.setLoading(true);
    this.view.clearError();

    try {
      const result = await this.model.login(username, password);
      this.model.saveToken(result.token);

      this.view.clearPassword();
      this.model.clearSensitiveData();

      window.location.href = 'main.html';
    } catch (error) {
      console.error('Login error:', error);
      this.view.showError(error.message);
      this.view.clearPassword();

      // Nếu lỗi liên quan đến mật khẩu thì focus vào password
      if (error.message.toLowerCase().includes('mật khẩu')) {
        setTimeout(() => this.view.focusPassword(), 100);
      }
    } finally {
      this.isProcessing = false;
      this.view.setLoading(false);
    }
  }

  logout() {
    this.model.clearToken();
    this.view.resetForm();
    window.location.href = 'index.html';
  }

  isLoggedIn() {
    return this.model.isTokenValid();
  }
}
