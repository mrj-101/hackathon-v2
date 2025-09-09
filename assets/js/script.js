const ilinks = document.querySelectorAll('.nav-link');
const pathname = window.location.pathname.substring(1);

ilinks.forEach((l) => {
  const href = l.getAttribute('href');
  if ((href === pathname) || (href === '/' && pathname === '/')) {
    l.classList.add('active');
  } else {
    l.classList.remove('active');
  }
});

let my_basket = document.getElementById('my-basket');
if (JSON.parse(sessionStorage.getItem('basket'))?.length > 0) {
  my_basket.src = 'assets/images/basket-full.png';
} 

