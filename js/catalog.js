let wrapper = document.querySelector('.items')
;(async () => {
    let items = await (await fetch('items.json')).json()
    for (key in items) {
        wrapper.innerHTML += `
        <div class="card" >
        <img class="card__product" src="${items[key].image}" alt="unable to load the image"></img>
            <p class="card__caption">${items[key].name}</p> 
            <p class="card__price">${items[key].cost} руб.</p>
            <button  class="card__button" data-action="add" data-articul="${key}" data-price="${items[key].cost}">В корзину</button></div>`
    }
})()

let button = document.querySelector('.card__button')
const counterWrapper = document.querySelector('.menu__counter')
let counter = 0
let icounter = 0
let totalPrice = document.querySelector('#counter')
var carts = {}

window.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'add') {
        const cart = event.target.closest('.card')
        const productInfo = {
            name: cart.querySelector('.card__caption').innerText,
            price: cart.querySelector('.card__price'),
            image: cart.querySelector('.card__product').getAttribute('src'),
        }
        let parsed = productInfo.price.innerText
        console.log(parsed)
        let fparsed = parseFloat(parsed)
        var price = parseFloat(totalPrice.innerText)
        price += fparsed
        icounter = price
        totalPrice.innerText = icounter

        articul = cart.querySelector('.card__button').dataset.articul
        price = cart.querySelector('.card__button').dataset.price
        console.log(articul)
        if (carts[articul] != undefined) {
            carts[articul]++
        } else {
            carts[articul] = 1
        }
        localStorage.setItem('carts', JSON.stringify(carts))
    }
    localStorage.setItem('icounter', JSON.stringify(icounter))
})

document.querySelector('#search').oninput = function () {
    let value = this.value.trim()
    let items = document.querySelectorAll('.card')
    if (value != '') {
        items.forEach((element) => {
            if (element.innerText.search(value) == -1) {
                element.classList.add('hide')
                let arrItems = Array.from(items)
                let isHidden = arrItems.every((element) => {
                    return element.className == 'hide'
                })
            } else {
                element.classList.remove('hide')
            }
        })
    } else {
        items.forEach((element) => {
            element.classList.remove('hide')
        })
    }
}
