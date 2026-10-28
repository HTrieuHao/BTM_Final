document.addEventListener('DOMContentLoaded', function () {
  const nutLoc = document.querySelectorAll('.nut-loc');
  const theTraiNghiem = document.querySelectorAll('.the-trai-nghiem');

  if (nutLoc.length === 0 || theTraiNghiem.length === 0) return;

  nutLoc.forEach(function (nut) {
    nut.addEventListener('click', function () {
      const danhMucChon = nut.getAttribute('data-danh-muc');

      nutLoc.forEach(function (mucNut) {
        mucNut.classList.remove('dang-chon');
      });
      nut.classList.add('dang-chon');

      theTraiNghiem.forEach(function (the) {
        const cungDanhMuc = the.getAttribute('data-danh-muc') === danhMucChon;
        const hienThiThe = danhMucChon === 'tat-ca' || cungDanhMuc;
        the.classList.toggle('an', !hienThiThe);
      });
    });
  });
});
