let shopItems = [
  { name: "Шорты", price: 250, img: "img/shorts.jpg" },
  { name: "Футболка", price: 300, img: "img/tshorts.jpg" },
  { name: "Очки", price: 180, img: "img/glasses.jpg" }
];

let shopBasket = [];
let imgFlag = true;

function createItemDiv(arr) {
  let shopDiv = document.querySelector(".shopDiv");

  for (let elem in arr) {
    let div = document.createElement("div");
    div.className = "shopItem";
    div.innerHTML = `<img class="shopItemImg" src="${shopItems[elem].img}"></img><p class="shopItemName">${shopItems[elem].name}</p><p class="shopItemPrice">${shopItems[elem].price} рублей</p><button class="shopItemBtn">Купить</button>`
    shopDiv.append(div);
  }
  addButtonListener();
}

function addButtonListener() {
  let shopDiv = document.querySelectorAll(".shopItem");
  shopDiv.forEach(elem => elem.addEventListener("click", function (e) {
    if (e.target.className == "shopItemBtn") {
      let name = this.querySelector(".shopItemName").innerHTML;
      let price = +(this.querySelector(".shopItemPrice").innerHTML.split(" ")[0]);
      let img = this.querySelector(".shopItemImg").getAttribute("src");

      shopBasket.push({ name: name, price: price, img: img });
      addItemToBasket();

    } else if (e.target.className == "shopItemImg") {
      let img = this.querySelector(".shopItemImg");
      let src = this.querySelector(".shopItemImg").getAttribute("src");

      if (imgFlag) {
        img.setAttribute("src", src.split(".")[0] + "2.jpg");
        imgFlag = false;
      } else if (imgFlag == false) {
        img.setAttribute("src", src.split("2")[0] + ".jpg");
        imgFlag = true;
      }
    }
  }))
}

function addItemToBasket() {
  let basketDiv = document.querySelector(".basketDiv");

  if (shopBasket.length == 0) {
    basketDiv.innerHTML = "Корзина пуста"
  } else {
    basketDiv.innerHTML = "В корзине: " + shopBasket.length + " товаров на сумму " + countBasketPrice(shopBasket) + " рублей";
  }
}

function countBasketPrice(arr) {
  let sum = 0;

  for (elem of arr) {
    sum += elem.price;
  }
  return sum;
}



function init() {
  createItemDiv(shopItems);
  addItemToBasket();
}

window.onload = init