import NhanVienModel from "../model/nhanVienModel.js";
import NhanVienView from "../view/nhanVienView.js";
import LoginModel from "../model/LoginModel.js"; // Để lấy token

export default class NhanVienController {
  constructor() {
    this.model = new NhanVienModel();
    this.view = new NhanVienView("nhanVienTable");
    this.auth = new LoginModel(); // để dùng isTokenValid() & getToken()
  }

  async init() {
    if (!this.auth.isTokenValid()) {
      window.location.href = "index.html";
      return;
    }

    try {
      const token = this.auth.getToken();
      const nhanVienList = await this.model.fetchAllNhanVien(token);
      this.view.renderTable(nhanVienList);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể tải danh sách nhân viên. Vui lòng đăng nhập lại.");
      window.location.href = "index.html";
    }
  }
}
