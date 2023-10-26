import { menuArray } from "./data.js"

function getProductList() {
  menuArray.forEach((product) => {
    console.log(product)
  })
}

function render() {
  getProductList()
}

render()