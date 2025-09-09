fetch("http://54.169.154.143:3096/food-orders")
  .then((response) => response.json())
  .then((res) => {
    console.log(res); // ดูโครงสร้างจริง
    let grp = "";
    res.forEach(order => {
      grp += `<tr>
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.address}</td>
                <td>${order.phone}</td>
                <td>${order.date}</td>
                <td><i class="fa-solid fa-trash text-danger" role="button" onclick="deleteGroup('${order.id}')"></i></td>
              </tr>`;
    });
    document.querySelector("#tbody").innerHTML = grp;
  })
  .catch(err => console.error("Fetch error:", err));

function deleteGroup(id) {
  let url = `http://54.169.154.143:3096/food-orders/${id}`
  // alert(url)
  // return

  if (confirm("ท่านต้องการลบจริงไหม") == true) {
    fetch(`${url}`, { method: "DELETE" })
      .then(response => response.json())
      .then(row => {
        if (row) {
          window.location.reload()
        } else {
          console.log(row)
          alert("ลบผิดพลาดนะจ๊ะ")
        }
      })
      .catch(error => {
        console.log("ผิดพลาด")
      })
  }
}