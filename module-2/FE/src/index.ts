import './style.scss'
import { io } from 'socket.io-client'

const compleateButton = document.createElement('button')
document.body.appendChild(compleateButton)
// const newH1 = document.querySelector('h1');
compleateButton?.setAttribute('id', 'compleateButton')
compleateButton.innerHTML = 'Compleate challenge!'

// const compleateButton = document.getElementById('compleateButton');

const socked = io('http://localhost:3333')

socked.on('connected', () => {})

socked.on('achieventsStatuses', (data) => {
  console.log('Current statuses is:', data)
})

compleateButton?.addEventListener('click', () => {
  socked.emit('taskCompleated', 'challenge id')
})
