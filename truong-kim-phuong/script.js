
document.addEventListener('DOMContentLoaded', function () { //dòng này là để đảm bảo rằng mã JavaScript sẽ chạy sau khi toàn bộ nội dung của trang đã được tải xong
  const nutFaq = document.querySelectorAll('.faq-nut-hoi'); //lấy tất cả các phần tử có lớp 'faq-nut-hoi' và lưu chúng vào biến nutFaq
  const cacMucFaq = document.querySelectorAll('.faq-muc'); //lấy tất cả các phần tử có lớp 'faq-muc' và lưu chúng vào biến cacMucFaq

  if (nutFaq.length === 0) return; //nếu không có phần tử nào được tìm thấy, hàm sẽ kết thúc và không thực hiện các bước tiếp theo

  // Thêm sự kiện click cho từng nút FAQ
  nutFaq.forEach(function (nut) {
    nut.addEventListener('click', function () {
      const mucDuocChon = nut.parentElement; 
      const seMoMuc = !mucDuocChon.classList.contains('dang-mo'); 

      // Đóng tất cả các mục FAQ khác
      cacMucFaq.forEach(function (muc) {
        muc.classList.remove('dang-mo');
        capNhatDauCong(muc, '+');
      });

      // Mở hoặc đóng mục FAQ được chọn
      if (seMoMuc) {
        mucDuocChon.classList.add('dang-mo');
        capNhatDauCong(mucDuocChon, '−');
      }
    });
  });
});

// Cập nhật ký hiệu dấu cộng hoặc dấu trừ cho mục FAQ
function capNhatDauCong(mucFaq, kyHieu) {
  const dauCong = mucFaq.querySelector('.faq-icon-trang-thai');
  if (dauCong) dauCong.textContent = kyHieu;
}
