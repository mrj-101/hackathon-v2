// ดึงจำนวนอาหาร
fetch('http://54.169.154.143:3096/food-menus')
    .then(response => response.json())
    .then(data => {
        let numberOfItems = data.length;
        document.getElementById('food-count').innerHTML =
            `<h2 class="text-center text-danger">${numberOfItems} รายการ</h2>`;
    });

// ดึงจำนวนออร์เดอร์
fetch('http://54.169.154.143:3096/food-orders')
    .then(response => response.json())
    .then(data => {
        let numberOfOrders = data.length;
        document.getElementById('order-count').innerHTML =
            `<h2 class="text-center text-success">${numberOfOrders} ออร์เดอร์</h2>`;
    });
