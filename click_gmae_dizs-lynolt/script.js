const container = document.getElementById('grid-container')
const numbers = Array.from({ length: 12 }, (_, index) => index + 1)
let clickedNumbers = []
let startTime
let timerInterval
const timerDisplay = document.createElement('h2')
const messageDisplay = document.createElement('div')
const restartButton = document.createElement('button')

restartButton.textContent = 'Újra indítás'
restartButton.addEventListener('click', restartGame)

document.body.append(timerDisplay, messageDisplay, restartButton)

// Shuffle numbers array
numbers.sort(() => Math.random() - 0.5)

let isGameOver = false

for (let i = 0; i < 12; i++) {
  const box = createBox(numbers[i])
  container.appendChild(box)
}

function createBox(number) {
  const box = document.createElement('div')
  box.classList.add('box')
  box.innerHTML = number

  box.addEventListener('click', () => handleBoxClick(box))

  return box
}

function handleBoxClick(box) {
  if (!startTime) {
    startTime = new Date()
    timerInterval = setInterval(updateTimer, 1000)
  }

  const currentNumber = parseInt(box.innerHTML)

  if (!isGameOver && currentNumber === clickedNumbers.length + 1) {
    clickedNumbers.push(currentNumber)
    box.style.visibility = 'hidden'

    if (clickedNumbers.length === numbers.length) {
      endGame('Gratulálok')
    }
  } else if (!isGameOver) {
    endGame('Sajnálom, hibás kattintás')
  }
}

function endGame(message) {
  isGameOver = true
  clearInterval(timerInterval)
  const endTime = new Date()
  const elapsedTime = (endTime - startTime) / 1000
  timerDisplay.textContent = `${message}! Idő: ${elapsedTime} másodperc`
  messageDisplay.textContent = ''
}

function updateTimer() {
  const currentTime = new Date()
  const elapsedTime = (currentTime - startTime) / 1000
  timerDisplay.textContent = `Idő: ${elapsedTime} másodperc`
}

function restartGame() {
  location.reload()
}
