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
              </tr>`;
    });
    document.querySelector("#tbody").innerHTML = grp;
  })
  .catch(err => console.error("Fetch error:", err));
