const startButton = document.querySelector('#start')
const gameArea = document.querySelector('#game')
const time = document.querySelector('#time')
const result = document.getElementById('result')
const timeHeader = document.getElementById('time-header')
const resultHeader = document.getElementById('result-header')
const timeInput = document.getElementById('game-time')
let score = 0
let isGameStarted = false

startButton.addEventListener('click', startGame)
gameArea.addEventListener('click', handleBoxClick)
timeInput.addEventListener('input', setGameTime)

function show(element) {
  element.classList.remove('hide')
}

function hide(element) {
  element.classList.add('hide')
}

function startGame() {
  score = 0
  setGameTime()
  timeInput.setAttribute('disabled', 'true')
  hide(startButton)
  isGameStarted = true
  gameArea.style.backgroundColor = '#fff'

  const interval = setInterval(function() {
    let timeValue = parseFloat(time.textContent)
    
    if (timeValue <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      time.textContent = (timeValue - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function endGame() {
  isGameStarted = false
  setGameScore()
  show(startButton)
  gameArea.innerHTML = ''
  gameArea.style.backgroundColor = '#ccc'
  hide(timeHeader)
  show(resultHeader)
  timeInput.removeAttribute('disabled')
}

function setGameScore() {
  result.textContent = score.toString()
}

function setGameTime() {
  time.textContent = +timeInput.value
  show(timeHeader)
  hide(resultHeader)
}

function renderBox() {
  gameArea.innerHTML = ''

  const color = Math.floor(Math.random()*16777215).toString(16);
  console.log("🚀 ~ file: index.js ~ line 70 ~ renderBox ~ color", color)
  const box = document.createElement('div')
  const boxSize = getRandom(30, 100)
  const gameAreaSize = gameArea.getBoundingClientRect()
  const maxTop = gameAreaSize.height - boxSize;
  const maxLeft = gameAreaSize.width - boxSize;

  box.style.height = box.style.width = `${boxSize}px`
  box.style.position = 'absolute'
  box.style.backgroundColor = `#${color}`
  box.style.boxShadow = '1px 6px 10px grey'
  box.style.borderRadius = '4px'
  box.style.top = `${getRandom(0, maxTop)}px`
  box.style.left = `${getRandom(0, maxLeft)}px`
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  gameArea.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event) {
  if (!isGameStarted) return
  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
