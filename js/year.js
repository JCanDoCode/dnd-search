const year = document.querySelector('#year')

document.addEventListener('DOMContentLoaded', () => {year.textContent = new Date().getFullYear();}) 