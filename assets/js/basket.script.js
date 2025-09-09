const items = JSON.parse(sessionStorage.getItem('basket'));
let i = 1;
if (items && items.length > 0) {
    let html = `
          <table class="table table-striped table-bordered mt-2">
            <thead class="table-dark">
              <tr>
                <th>#</th>
                <th>รายการอาหาร</th>
                <th>ราคา/หน่วย</th>
                <th>จำนวน</th>
                <th>รวม</th>
              </tr>
            </thead>
            <tbody>`;
    items.forEach(item => {
        html += `
              <tr>
                <td>${i}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.amount}</td>
                <td>${item.price * item.amount}</td>
              </tr>`;
        i++;
    });
    html += `
            </tbody>
          </table>`;

    html += `<div class="alert alert-info text-center" role="alert">
                  รวมทั้งหมด ${items.reduce((total, item) => total + (item.price * item.amount), 0)} บาท
                  <div class="mt-2">
                    <a href="food.html" class="btn btn-primary text-white">เลือกอาหารเพิ่ม</a>
                    <a href="order.html" class="btn btn-secondary text-white">สั่งซื้อ</a>
                  </div>
                </div>`;
    document.getElementById('data_area').innerHTML = html;
} else {
    document.getElementById('data_area').innerHTML = `<div class="alert alert-warning text-center mt-2" role="alert">## ไม่พบสินค้าในตะกร้า ##</div>`;
}