export default class NhanVienView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  renderTable(data) {
    const container = document.getElementById(this.containerId);

    new Handsontable(container, {
      data: data,
      colHeaders: [
        "Mã NV", "Họ tên", "Giới tính", "Ngày sinh", "Địa chỉ",
        "Điện thoại", "Email", "Mã phòng", "Mã chức vụ"
      ],
      columns: [
        { data: 'maNV' },
        { data: 'hoTen' },
        { data: 'gioiTinh' },
        { data: 'ngaySinh' },
        { data: 'diaChi' },
        { data: 'dienThoai' },
        { data: 'email' },
        { data: 'maPhong' },
        { data: 'maChucVu' }
      ],
      width: '100%',
      height: 400,
      licenseKey: 'non-commercial-and-evaluation'
    });
  }
}
