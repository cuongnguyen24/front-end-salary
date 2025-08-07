export default class LoginModel {
  // Validation methods
  validateUsername(username) {
    if (!username || !username.trim()) {
      throw new Error('Tên đăng nhập không được để trống');
    }
    if (username.trim().length < 3) {
      throw new Error('Tên đăng nhập phải có ít nhất 3 ký tự');
    }
    if (username.trim().length > 50) {
      throw new Error('Tên đăng nhập không được quá 50 ký tự');
    }
    // Kiểm tra ký tự đặc biệt
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username.trim())) {
      throw new Error('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới');
    }
  }

  validatePassword(password) {
    if (!password || !password.trim()) {
      throw new Error('Mật khẩu không được để trống');
    }
    if (password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }
    if (password.length > 100) {
      throw new Error('Mật khẩu không được quá 100 ký tự');
    }
  }

  validateLoginData(username, password) {
    this.validateUsername(username);
    this.validatePassword(password);
  }

  async login(username, password) {
    // Validate input trước khi gọi API
    this.validateLoginData(username, password);

    const response = await fetch('https://localhost:7179/api/Auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        tenDangNhap: username.trim(),
        matKhau: password
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Xử lý các lỗi HTTP cụ thể
      if (response.status === 401) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
      } else if (response.status === 400) {
        throw new Error('Dữ liệu đăng nhập không hợp lệ');
      } else if (response.status === 500) {
        throw new Error('Lỗi server, vui lòng thử lại sau');
      } else if (response.status === 0) {
        throw new Error('Không thể kết nối đến server, vui lòng kiểm tra kết nối mạng');
      } else {
        throw new Error(errorText || 'Có lỗi xảy ra, vui lòng thử lại');
      }
    }

    const result = await response.json();
    
    // Validate response data - API trả về cấu trúc: { thanhCong, thongBao, duLieu: { token } }
    if (!result || !result.thanhCong) {
      throw new Error(result?.thongBao || 'Đăng nhập thất bại');
    }
    
    if (!result.duLieu || !result.duLieu.token) {
      throw new Error('Dữ liệu phản hồi không hợp lệ - thiếu token');
    }

    // Trả về object với token ở root level để tương thích với code hiện tại
    return {
      token: result.duLieu.token,
      message: result.thongBao,
      success: result.thanhCong
    };
  }

  saveToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Token không hợp lệ');
    }
    localStorage.setItem('token', token);
    // Lưu thời gian đăng nhập
    localStorage.setItem('loginTime', new Date().toISOString());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;
    
    // Kiểm tra thời gian đăng nhập (optional - có thể set 24h)
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
      if (hoursDiff > 24) {
        this.clearToken();
        return false;
      }
    }
    
    return true;
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  }

  // Xóa thông tin nhạy cảm khỏi memory
  clearSensitiveData() {
    // Trong thực tế, có thể cần clear các biến chứa password
    // Đây chỉ là placeholder
  }
}
