let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  //每次啟動計時器前都要清空已經存在的計時器
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`
  document.title = display
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const adjustHour = hour > 12 ? `下午${hour - 12}` : `上午${hour}`
  const minutes = end.getMinutes()
  endTime.textContent = `Be Back At ${adjustHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`
}

function startTimer() {
  const seconds = parseInt(this.dataset.time) //string
  timer(seconds)
}

buttons.forEach((button) => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = parseInt(this.minutes.value) //string
  timer(mins * 60)
  this.reset()
})
