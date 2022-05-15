const seats       = document.querySelectorAll('.row .seat:not(.occupied)')
const container   = document.querySelector('.container')
const count       = document.querySelector('#count')
const total       = document.querySelector('#total')
const movieSelect = document.querySelector('#movie')

let storedPrice = localStorage.getItem('movieValue')

let ticketPrice = storedPrice ? storedPrice : parseInt(movieSelect.value)

populateUI()
totalAndPriceUpdate()

// Retrieve data from local storage and populate UI

function populateUI() {

    const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(storedSeats) {storedSeats.forEach(index => seats[index].classList.toggle('selected'))}

    const movieIndex = localStorage.getItem('movieIndex')
    movieSelect.selectedIndex = movieIndex
}

// Store selected movie and ticket price.

function storeSelectedMovieData(index, value) {

    value = +value

    localStorage.setItem('movieIndex', index)
    localStorage.setItem('movieValue', value)
}

// Update count and total. Store indexes of selected seats.

function totalAndPriceUpdate() {

    const selectedSeats = document.querySelectorAll('.row .selected')

    const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex))

    count.innerHTML = selectedSeats.length
    total.innerHTML = selectedSeats.length * ticketPrice
}

movieSelect.addEventListener('change', event => {

    ticketPrice = +movieSelect.value

    totalAndPriceUpdate()
    storeSelectedMovieData(event.target.selectedIndex, event.target.value)
})

container.addEventListener('click', event => {

    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {

        event.target.classList.toggle('selected')

        totalAndPriceUpdate()
    }
})





