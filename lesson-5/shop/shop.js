//Задание 2 и 3

function shop() {
  let shopBasket = [];

  let basket = document.querySelector(".basket");
  let priceSpan = document.createElement("div");
  priceSpan.className = "price";
  priceSpan.innerText = countBasketPrice(shopBasket);
  basket.append(priceSpan);

  let btn = document.createElement("button");
  btn.innerText = "Заполнить корзину";
  basket.append(btn);
  btn.addEventListener("click", function () {

    priceSpan.innerHTML = basketItemsList(shopBasket) + "В корзине: " + shopBasket.length + " товаров на сумму " + countBasketPrice(shopBasket) + " рублей";
  })

  shopBasket = [
    { name: "Шорты", price: 250 },
    { name: "Футболка", price: 300 },
    { name: "Очки", price: 180 }
  ]

  function countBasketPrice(arr) {
    let sum = 0;

    if (arr.length == 0) {
      return "Корзина пуста";
    }

    for (elem of arr) {
      sum += elem.price;
    }
    return sum
  }
}

function basketItemsList(arr) {
  let str = "";
  for (elem of arr) {
    str += elem.name + " - цена : " + elem.price + "<br>";
  }
  return str;
}

function init() {
  shop()
}

window.onload = init;