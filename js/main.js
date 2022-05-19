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

let wrapper = document.querySelector('.items') //здесь в переменную запихиваешь тот элемент, в который будешь выводить данные,наример , у меня это div с классам items
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest()
} else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
}

xmlhttp.open('GET', 'items.xml', false)
xmlhttp.send()
xmlDoc = xmlhttp.responseXML
let items = xmlDoc.querySelectorAll('card') //выкавыриваем данные из xml
let images = xmlDoc.querySelectorAll('img')
let name = xmlDoc.querySelectorAll('name')
//в этом цикле выводим данные на страницу
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
