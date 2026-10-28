document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formGopY') || document.getElementById('bieu-mau-lien-he');
  if (!form) return;

  const truong = [
    {
      oNhap: document.getElementById('hoTen'),
      idLoi: 'loiHoTen',
      loiTrong: 'Vui lòng nhập họ và tên của bạn.',
      loiSai: 'Họ và tên phải có ít nhất 2 ký tự.',
      kiemTra: function (giaTri) { return giaTri.length >= 2; }
    },
    {
      oNhap: document.getElementById('email'),
      idLoi: 'loiEmail',
      loiTrong: 'Vui lòng nhập địa chỉ email.',
      loiSai: 'Email không đúng định dạng (ví dụ: ban@domain.com).',
      kiemTra: function (giaTri) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giaTri); }
    },
    {
      oNhap: document.getElementById('dienThoai'),
      idLoi: 'loiDienThoai',
      loiTrong: 'Vui lòng nhập số điện thoại liên hệ.',
      loiSai: 'Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0.',
      kiemTra: function (giaTri) { return /^0[0-9]{9}$/.test(giaTri); }
    },
    {
      oNhap: document.getElementById('chuDe'),
      idLoi: 'loiChuDe',
      loiTrong: 'Vui lòng chọn một chủ đề góp ý.'
    },
    {
      oNhap: document.getElementById('noiDung'),
      idLoi: 'loiNoiDung',
      loiTrong: 'Vui lòng nhập nội dung ý kiến hoặc câu hỏi của bạn.',
      loiSai: 'Nội dung góp ý cần chi tiết hơn (tối thiểu 10 ký tự).',
      kiemTra: function (giaTri) { return giaTri.length >= 10; }
    }
  ];
  const hopThongBao = document.getElementById('hopThanhCong');

  function hienThiLoi(mucTruong, thongDiep) {
    if (!mucTruong.oNhap) return;

    mucTruong.oNhap.classList.add('co-loi');
    mucTruong.oNhap.classList.remove('hop-le');

    const noiDungLoi = document.getElementById(mucTruong.idLoi);
    if (noiDungLoi) {
      noiDungLoi.textContent = thongDiep;
      noiDungLoi.classList.add('hien-thi');
    }
  }

  function xoaLoi(mucTruong) {
    if (!mucTruong.oNhap) return;

    mucTruong.oNhap.classList.remove('co-loi');
    mucTruong.oNhap.classList.add('hop-le');

    const noiDungLoi = document.getElementById(mucTruong.idLoi);
    if (noiDungLoi) {
      noiDungLoi.textContent = '';
      noiDungLoi.classList.remove('hien-thi');
    }
  }

  function kiemTraTruong(mucTruong) {
    if (!mucTruong.oNhap) return true;

    const giaTri = mucTruong.oNhap.value.trim();
    if (!giaTri) {
      hienThiLoi(mucTruong, mucTruong.loiTrong);
      return false;
    }

    if (mucTruong.kiemTra && !mucTruong.kiemTra(giaTri)) {
      hienThiLoi(mucTruong, mucTruong.loiSai);
      return false;
    }

    xoaLoi(mucTruong);
    return true;
  }

  truong.forEach(function (mucTruong) {
    if (!mucTruong.oNhap) return;

    mucTruong.oNhap.addEventListener('input', function () { xoaLoi(mucTruong); });
    mucTruong.oNhap.addEventListener('change', function () { xoaLoi(mucTruong); });
  });

  form.addEventListener('submit', function (suKien) {
    suKien.preventDefault();

    let formHopLe = true;
    truong.forEach(function (mucTruong) {
      if (!kiemTraTruong(mucTruong)) formHopLe = false;
    });
    if (!formHopLe) return;

    const hoTen = document.getElementById('hoTen');
    const email = document.getElementById('email');
    const chuDe = document.getElementById('chuDe');
    const tenNguoiGui = hoTen ? hoTen.value.trim() : 'bạn';
    const tenChuDe = chuDe && chuDe.selectedIndex >= 0
      ? chuDe.options[chuDe.selectedIndex].text
      : '';
    const emailNguoiGui = email ? email.value.trim() : '';

    if (hopThongBao) {
      hopThongBao.innerHTML = `
        <strong>Cảm ơn bạn ${tenNguoiGui}!</strong><br>
        Ý kiến đóng góp về chủ đề <em>"${tenChuDe}"</em>
        đã được ghi nhận thành công. Nhóm sinh viên MMC403 sẽ phản hồi đến email
        <strong>${emailNguoiGui}</strong> trong thời gian sớm nhất!
      `;
      hopThongBao.style.display = 'block';
      hopThongBao.classList.add('hien-thi');
    }

    form.reset();
    truong.forEach(function (mucTruong) {
      if (mucTruong.oNhap) mucTruong.oNhap.classList.remove('hop-le');
    });

    if (hopThongBao) {
      hopThongBao.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

