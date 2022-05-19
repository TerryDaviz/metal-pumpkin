const toggleButton = document.querySelector('.navbar__toggle-button')
const navbarLinks = document.querySelector('.navbar')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
    toggleButton.style.display('none')
})
