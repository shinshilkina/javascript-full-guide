const startButton = document.querySelector('#start')
const gameArea = document.querySelector('#game')
const score = 0

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

  box.style.height = box.style.width = '50px'
  box.style.position = 'absolute'
  box.style.backgroundColor = '#000'
  box.style.top = '50px'
  box.style.left = '70px'
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
