const secondHand = document.querySelector('.second-hand')
const minHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

function setDate() {
  const now = new Date()

  const seconds = now.getSeconds()
  const secondsDegree = (seconds / 60) * 360 + 90
  secondHand.style.transform = `rotate(${secondsDegree}deg)`

  const mins = now.getMinutes()
  const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90
  minHand.style.transform = `rotate(${minsDegrees}deg)`

  const hour = now.getHours()
  const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90
  hourHand.style.transform = `rotate(${hourDegrees}deg)`
}

setInterval(setDate, 1000)
setDate()
