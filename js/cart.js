

var carts = []
let wrapper = document.querySelector('.items');
(async () => {
    var items = await (await fetch('items.json')).json()
    checkCart()
    showItems()
    function showItems() {
        for (key in carts) {
            wrapper.innerHTML += `<div class="items__product product">
 <img class="product__image" src="${items[key].image}" alt="no image found"></img>
 <p class="product__amount" data-id="${carts[key]}">количесво: ${carts[key]}<p>
 <button class="product__delete" data-id="${carts[key] * items[key].cost}"> &times;</button>
 <p class="product__price" >цена: ${carts[key] * items[key].cost}</p>
 <button class="product__purchase" data-id="${key}" onclick = "window.location.href ='purchase.html'"> купить</button>
                </div>`
        }
    }

    let counter = document.querySelector('#counter')
    counter.innerHTML = JSON.parse(localStorage.getItem('icounter'))

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product__delete')) {
            document.querySelector('.product__amount').dataset.id
            let articul = e.target.dataset.id
            console.log(articul)
            let itemPrice = e.target.dataset.id
            console.log('price', itemPrice)
            counter.innerHTML = counter.innerText - itemPrice
            document.querySelector('.items__product').remove()
            localStorage.removeItem('carts', JSON.stringify(carts))
            if (counter.innerText == 0) {
                wrapper.innerHTML += `<p class="empty">Корзина пуста.</p>`
            }
        }
    })
})()

function checkCart() {
    if (localStorage.getItem('carts') != null) {
        carts = JSON.parse(localStorage.getItem('carts'))
    } else {
        wrapper.innerHTML += `<p class="empty">Корзина пуста.</p>`
    }
}
