const startButton = document.querySelector('#start')
const gameArea = document.querySelector('#game')
let score = 0

startButton.addEventListener('click', startGame)
gameArea.addEventListener('click', handleBoxClick)

function startGame() {
  startButton.classList.add('hide')
  gameArea.style.backgroundColor = '#fff'

  renderBox()
}

function renderBox() {
  gameArea.innerHTML = ''

  const box = document.createElement('div')
  const boxSize = getRandom(30, 100)
  const gameAreaSize = gameArea.getBoundingClientRect()
  const maxTop = gameAreaSize.height - boxSize;
  const maxLeft = gameAreaSize.width - boxSize;

  box.style.height = box.style.width = `${boxSize}px`
  box.style.position = 'absolute'
  box.style.backgroundColor = '#000'
  box.style.top = `${getRandom(0, maxTop)}px`
  box.style.left = `${getRandom(0, maxLeft)}px`
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  gameArea.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event) {
  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
