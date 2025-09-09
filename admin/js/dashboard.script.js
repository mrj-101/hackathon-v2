fetch('http://54.169.154.143:3096/food-menus')
    .then(res => res.json())
    .then(data => {
        document.getElementById('food-count').textContent = Array.isArray(data) ? data.length : 'N/A';
    })
    .catch(() => {
        document.getElementById('food-count').textContent = 'N/A';
    });
fetch('http://54.169.154.143:3096/food-orders')
    .then(res => res.json())
    .then(data => {
        document.getElementById('order-count').textContent = Array.isArray(data) ? data.length : 'N/A';
    })
    .catch(() => {
        document.getElementById('order-count').textContent = 'N/A';
    });
