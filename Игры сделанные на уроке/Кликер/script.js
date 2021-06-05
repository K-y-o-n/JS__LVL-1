var state = {
  money: 0,
  costOfOneCookie: 1,
  costOfUpgrade: 20,
}

function updateStats() {
  var moneySpan = document.getElementById('money')
  moneySpan.innerHTML = state.money

  var cookieCostSpan = document.getElementById('costOfCookie')
  cookieCostSpan.innerHTML = state.costOfOneCookie

  var upgradeSpan = document.getElementById('costOfUpgrade')
  upgradeSpan.innerHTML = state.costOfUpgrade
}

function init() {
  updateStats()

  document.getElementById('sellCookie').addEventListener('click', function () {
    state.money += state.costOfOneCookie
    updateStats()
  })

  document.getElementById('upgradeCookie').addEventListener('click', function () {
    if (state.money < state.costOfUpgrade) {
      alert('Не хватает денег')
    } else {
      state.money -= state.costOfUpgrade
      // state.costOfOneCookie = state.costOfOneCookie + state.costOfOneCookie*0.25
      state.costOfOneCookie += state.costOfOneCookie * 0.25
      state.costOfUpgrade += state.costOfUpgrade * 0.25
    }
    updateStats()
  })
}

window.onload = init