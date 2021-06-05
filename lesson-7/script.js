let shopItems = [
  { name: "Шорты", price: 250, img: "img/shorts.jpg" },
  { name: "Футболка", price: 300, img: "img/tshorts.jpg" },
  { name: "Очки", price: 180, img: "img/glasses.jpg" }
];

let shopBasket = [];
let imgFlag = true;


// Создает ассортимент товаров
function createItemDiv(arr) {
  let shopDiv = document.querySelector(".shopDiv");

  for (let elem in arr) {
    let div = document.createElement("div");
    div.className = "shopItem";
    div.innerHTML = `<img class="shopItemImg" src="${shopItems[elem].img}"></img><p class="shopItemName">${shopItems[elem].name}</p><p class="shopItemPrice">${shopItems[elem].price} рублей</p><button class="shopItemBtn">Добавить в корзину</button>`
    shopDiv.append(div);
  }
  addButtonListener();
  addPrevNextBtnListener();
}


// Скрыть / показать кнопку Далее в корзине
function showBasketNextBtn() {
  let btn = document.querySelector(".basketNextBtn");
  if (shopBasket.every(elem => elem !== undefined) && shopBasket.length != 0) {
    btn.classList.add("visible");
  }
  if (shopBasket.every(elem => elem === undefined)) {
    btn.classList.remove("visible");
  }
}


// Слушатели для кнопки Добавить в корзину и переключения картинок товаров
function addButtonListener() {
  let shopDiv = document.querySelectorAll(".shopItem");
  shopDiv.forEach(elem => elem.addEventListener("click", function (e) {
    if (e.target.className == "shopItemBtn") {
      let name = this.querySelector(".shopItemName").innerHTML;
      let price = +(this.querySelector(".shopItemPrice").innerHTML.split(" ")[0]);
      let img = this.querySelector(".shopItemImg").getAttribute("src");

      shopBasket.push({ name: name, price: price, img: img });
      updateBasketDiv();

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


// Добавление товаров в корзину
function updateBasketDiv() {
  let basketDiv = document.querySelector(".basketDiv");

  updateBasketItems();

  let newItem = shopBasket[shopBasket.length - 1];
  let basketItemDiv = document.createElement("div");
  basketItemDiv.className = "basketItem";
  basketItemDiv.setAttribute("id", shopBasket.length - 1);
  basketItemDiv.innerHTML = `<img class="basketItemImg" src="${newItem.img}"></img><p class="basketItemName">${newItem.name}</p><p class="basketItemPrice">${newItem.price} рублей</p><button class="basketItemBtn">Удалить</button>`;
  basketDiv.append(basketItemDiv);

  addBasketItemListener();
  showBasketNextBtn();
}


// Обновление количества вещей в корзине и стоимости
function updateBasketItems() {
  let basketItems = document.querySelector(".basketItems");

  let items = 0;
  for (let i = 0; i < shopBasket.length; i++) {
    if (shopBasket[i]) {
      items++
    }
  }

  if (items == 0) {
    basketItems.innerHTML = "Корзина пуста"
  } else basketItems.innerHTML = "В корзине: " + items + " товаров на сумму " + countBasketPrice(shopBasket) + " рублей";
}


// Слушатель для кнопки Удалить в корзине
function addBasketItemListener() {
  let basketItem = document.querySelectorAll(".basketItem");
  basketItem.forEach(elem => elem.addEventListener("click", function (e) {
    if (e.target.className == "basketItemBtn") {
      let id = parseInt(this.getAttribute("id"));
      this.remove();
      delete shopBasket[id];
      countBasketPrice(shopBasket);
      updateBasketItems();
      showBasketNextBtn();
    }
  }))
}


// Слушатели для кнопок Далее , Назад и Офрмить Заказ
function addPrevNextBtnListener() {
  let basketDiv = document.querySelector(".basketDiv")
  let basketNext = document.querySelector(".basketNextBtn");

  let adressDiv = document.querySelector(".adressDiv");
  let adressPrev = document.querySelector(".adressPrevBtn");
  let adressNext = document.querySelector(".adressNextBtn");

  let commentDiv = document.querySelector(".commentDiv")
  let commentPrev = document.querySelector(".commentPrevBtn");
  let commentBuy = document.querySelector(".commentBuyBtn");

  basketNext.addEventListener("click", e => {
    // basketDiv.classList.add("hidden");
    adressDiv.classList.add("visible");
  })

  adressPrev.addEventListener("click", e => {
    basketDiv.classList.remove("hidden");
    adressDiv.classList.remove("visible");
    commentDiv.classList.remove("visible");
  })

  adressNext.addEventListener("click", e => {
    // adressDiv.classList.remove("visible");
    commentDiv.classList.add("visible");
  })

  commentPrev.addEventListener("click", e => {
    commentDiv.classList.remove("visible");
    adressDiv.classList.add("visible");
  })

  commentBuy.addEventListener("click", e => {
    alert(`Ваш заказ на сумму ${countBasketPrice(shopBasket)} рублей оформлен. Спасибо за заказ!`)
  })
}


// Подсчет стоимости корзины
function countBasketPrice(arr) {
  let sum = 0;

  for (elem of arr) {
    if (elem === undefined) {
      continue;
    }
    sum += elem.price;
  }
  return sum;
}



function init() {
  createItemDiv(shopItems);
  // createBasketDiv()
}

window.onload = init