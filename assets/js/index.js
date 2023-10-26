import { menuArray } from "./data.js"

const productSectionEl = document.getElementById('products')
let orderSectionEl = document.getElementById('order')
let totalPriceEl = document.getElementById('total-price')
const modalEl = document.getElementById('modal')
const modalFormEl = document.getElementById('modal-form')
const closeModalBtn = document.getElementById('close-btn')
const confirmationEl = document.getElementById('confirmation')
const usernameInput = document.getElementById('username')

let totalPrice = 0

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove)
  }
})

closeModalBtn.addEventListener('click', handleCloseModal)
modalFormEl.addEventListener('submit', (e) => {
  e.preventDefault()

  clearOrderAfterPay()

  confirmationEl.innerHTML = `
    <div class="order-thanks">
      <h2>Thanks, ${usernameInput.value}! Your order is on its way!</h2>
    </div>
  `


  closeModal()
})

function clearOrderAfterPay() {
  totalPriceEl.innerHTML = ""
  orderSectionEl.innerHTML = ""
  totalPrice = 0
}

function closeModal() {
  modalEl.classList.add('hidden')
}

function handleCloseModal() {
  modalEl.classList.toggle('hidden')
}

function handleAddClick(productId) {

  orderSectionEl.classList.remove('hidden')


  const selectedProduct = menuArray.filter(product => product.id === parseInt(productId))

  if (selectedProduct.length > 0) {

    if (totalPriceEl) {
      totalPriceEl.classList.remove('hidden');
    }

    renderOrder(selectedProduct, productId)
  }
}

function handleRemoveClick(productId) {
  const divToRemove = document.querySelector(`[data-remove="${productId}"]`).closest('.order-container')

  if (divToRemove) {
    const removedProduct = menuArray.find(product => product.id === parseInt(productId))
    totalPrice -= removedProduct.price;

    renderTotalPrice();

    divToRemove.remove()
  }
}

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
        <p class="prod-add-btn" data-add="${product.id}">+</p>
      </div>
    `
  })
}

function renderOrder(selectedProduct, productId) {
  selectedProduct.forEach((product) => {
    orderSectionEl.innerHTML += `
        <div class="order-container">
          <div class="order-wrapper">
            <h3>${product.name}</h3>
            <p data-remove="${productId}">remove</p>
          </div>
          
          <h3>$${product.price}</h3>
        </div>
      `

    totalPrice += product.price

    renderTotalPrice()
  })
}

function renderTotalPrice() {

  if (totalPriceEl) {
    totalPriceEl.innerHTML = `
    <div class="total-price">
      <h3>Total price: </h3>
      <h3>$${totalPrice}</h3>
    </div>
    <div class="complete-order">
      <button class="order-btn btn" id="order-btn">Complete order</button>
    </div>
    `
  }

  const orderBtn = document.getElementById('order-btn')
  orderBtn.addEventListener('click', openOrderConfirmationModal)
}

function openOrderConfirmationModal() {
  modalEl.classList.toggle('hidden')
}

function render() {
  getProductList()
}

render()