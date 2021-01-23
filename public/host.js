const socket = io()
const active = document.querySelector('.js-active')
const disconnect = document.querySelector('.js-disconnect')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0], team: p[1] }
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('')
})

socket.on('user-disconnect', () => {
  disconnect.innerText = `Someone disconnected`
})

clear.addEventListener('click', () => {
  socket.emit('clear')
  disconnect.innerText = ``
})

