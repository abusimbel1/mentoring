import './style.scss'

// function sum(a: number, b: number) {
//   return a + b;
// }
const a = 1
const h1 = document.createElement('h1')
document.body.appendChild(h1)
const newH1 = document.querySelector('h1')
newH1?.setAttribute('id', 'title')
if (newH1) {
  newH1.innerHTML = 'Hello1222!'
}

// module.exports = sum;
