$(document).ready(function () {
    $('.swiper').slick({
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    })
})

let wrapper = document.querySelector('.items')
if (window.XMLHttpRequest) {
    // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest()
} else {
    // для IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

xmlhttp.open('GET', 'items.xml', false)
xmlhttp.send()
xmlDoc = xmlhttp.responseXML
let items = xmlDoc.querySelectorAll('card')
let images = xmlDoc.querySelectorAll('img')
let name = xmlDoc.querySelectorAll('name')
for (let i = 0; i < items.length; i++) {
    wrapper.innerHTML += `<div class= "items__wrapper"><img class="items__product" src="${images[i].innerHTML}">
    <p class="items__product-name"> ${name[i].innerHTML}</p>
        </div>`
}

document.querySelector('#search').oninput = function () {
    let value = this.value.trim()
    let items = document.querySelectorAll('.items li')
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

const toggleButton = document.querySelector('.navbar__toggle-button')
const navbarLinks = document.querySelector('.navbar')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

let counter = document.querySelector('#counter')

counter.innerHTML = JSON.parse(localStorage.getItem('icounter'))
