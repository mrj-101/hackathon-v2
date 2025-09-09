let datas = [];

document.addEventListener('DOMContentLoaded', async function () {
    let url = 'http://54.169.154.143:3096/food-menus';
    // let url = './json/hotels.json';
    await fetch(url)
        .then(res => res.json())
        .then(json => {
            datas = json;
            renderFoods(json);
        })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
})

function showToast(message) {
    const toastLiveExample = document.getElementById('liveToast');
    const toastBody = toastLiveExample.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

function orderFood(id, name, price) {
    // 1. Retrieve the existing array or initialize an empty one
    let myDataArray = JSON.parse(sessionStorage.getItem('basket')) || [];

    // 2. Add new data to the array
    if (myDataArray.some(item => item.id === id)) {
        // If the item already exists, increment the amount
        myDataArray = myDataArray.map(item => {
            if (item.id === id) {
                return { ...item, amount: item.amount + 1 };
            }
            return item;
        });
    } else {
        // If the item does not exist, add it with amount 1
        myDataArray.push({ id: id, name: name, price: price, amount: 1 });
    }

    // 3. Store the updated array back into session storage
    sessionStorage.setItem('basket', JSON.stringify(myDataArray));
    showToast(`เพิ่ม ${name} ลงในตะกร้าเรียบร้อย`);

    // Optional: Verify the content
    // console.log(JSON.parse(sessionStorage.getItem('basket')));

    if (JSON.parse(sessionStorage.getItem('basket'))?.length == 1) {
        window.location.href = 'food.html';
    }

}

function showDetail(id) {
    // Find the food item by id from datas
    const food = datas.find(item => String(item.id) === String(id));
    if (food) {
        // Fill modal body with food details
        const modalBody = document.querySelector('#staticBackdrop .modal-body');
        modalBody.innerHTML = `
        <img src="${food.image}" alt="${food.name}" class="img-fluid mb-3 rounded">
        <h6 class="text-danger">ราคา ${food.price} บาท</h6>
        <h5>${food.name} (${food.name_en})</h5>
        <p>${food.description}</p><hr>
        <p><strong>ระดับความเผ็ดแซ่บ</strong> ${food.spice_level}</p>
        <p><strong>ส่วนประกอบ</strong> ${food.ingredients}</p>
      `;

        if (food.allergens.length) {
            modalBody.innerHTML += `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <span>⚠ ห้ามผู้ที่มีอาการแพ้ <strong>"${food.allergens}"</strong> รับประทานโดยเด็ดขาด</span>
        </div>`;
        }
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.show();
    }
}

function renderFoods(foods) {
    let data_area = document.querySelector('#data_area');
    if (foods.length > 0) {
        let data = ``
        foods.forEach(f => {
            data += `
              <div class="col col-6 col-md-3">
                <div class="card h-100" style="width: 18rem;">
                  <img src="${f.image}" class="card-img-top object-fit-cover" style="height: 240px;" alt="picture">
                  <div class="card-body">
                    <p class="card-text">
                      <strong>${f.name}</strong><br>
                      ${f.description}<br>
                      <strong>Price: </strong> ${f.price} Baht
                      <p class="mt-2 d-block text-center">
                        <button class="btn btn-primary text-white" onclick="showDetail('${f.id}')">รายละเอียด</button>
                        <button class="btn btn-secondary text-white" onclick="orderFood('${f.id}', '${f.name}', ${f.price})">สั่งอาหาร</button>
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            `
        });
        data_area.innerHTML = data
    } else {
        console.log(`No data`)
    }
}