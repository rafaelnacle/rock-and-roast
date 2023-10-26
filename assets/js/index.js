import { menuArray } from "./data.js"

const productSectionEl = document.getElementById('products')


function getProductList() {
  menuArray.forEach((product) => {
    productSectionEl.innerHTML += `
      <div class="product-container">
        <div class="prod-wrapper">
          <p class="prod-emoji">${product.emoji}</p>
          <div class="prod-info">
            <h2>${product.name}</h2>
            <p class="prod-description">${product.ingredients}</p>
            <h3>${product.price} $</h3>
          </div>
        </div>
        <p class="prod-add-btn" id="prod-add-btn">+</p>
      </div>
    `
  })

  const prodAddBtn = document.getElementById("prod-add-btn")

  prodAddBtn.addEventListener('click', () => console.log('click'))
}

function render() {
  getProductList()
}

render()