const form = document.querySelector("#form");
const list = document.querySelector(".list");
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const date = new Date();
const year = date.getFullYear();

const goals = {}

form.addEventListener('submit', addGoal)

function addGoal(e) {
  e.preventDefault()
  createGoal(e)
}

const createGoal = (e) => {
  const text = e.target.querySelector('input').value

  const goal = {
    id: Date.now(),
    text: text,
    date: `${months[date.getMonth()]} ${date.getDay()}, ${year}`,
    status: false
  }

  goals[goal.id] = goal

  paintGoal()

  form.reset()
  e.target.querySelector('input').focus()
}

const paintGoal = () => {
  list.innerHTML = ''

  Object.values(goals).forEach((goal) => {
    const clone = template.cloneNode(true)
    clone.querySelectorAll('p')[1].textContent = goal.text
    clone.querySelectorAll('p')[0].textContent = goal.date


    fragment.appendChild(clone)

  })

  list.appendChild(fragment)
}