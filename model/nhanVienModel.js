export default class NhanVienModel {
  async fetchAllNhanVien(token) {
    const response = await fetch("https://salarymanagementapi-production.up.railway.app/api/NhanVien", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Không lấy được danh sách nhân viên");
    }

    const data = await response.json();

    if (!data.thanhCong) {
      throw new Error(data.thongBao || "Lỗi từ server");
    }

    return data.duLieu; // array nhân viên
  }
}
