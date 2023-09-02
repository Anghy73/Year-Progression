const form = document.querySelector("#form");
const list = document.querySelector(".list");
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();
const input = document.querySelector("#inputGoal");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const date = new Date();
const year = date.getFullYear();

const goals = {};
const starGoal = {};

list.addEventListener("click", (e) => {
  btnAction(e);
});

form.addEventListener("submit", addGoal);

function addGoal(e) {
  e.preventDefault();
  createGoal(e);
}

const createGoal = (e) => {
  const text = e.target.querySelector("input").value;

  if (text.trim() === "") {
    return;
  }

  const goal = {
    id: Date.now(),
    text: text,
    date: `${months[date.getMonth()]} ${date.getDate()}, ${year}`,
    status: false,
  };

  goals[goal.id] = goal;

  paintGoal();

  form.reset();
  e.target.querySelector("input").focus();
};

const paintGoal = () => {
  list.innerHTML = "";

  Object.values(goals).forEach((goal) => {
    const clone = template.cloneNode(true);
    clone.querySelectorAll("p")[1].textContent = goal.text;
    clone.querySelectorAll("p")[0].textContent = goal.date;

    if (goal.status) {
      clone
        .querySelectorAll(".fa-solid")[0]
        .classList.replace("fa-check", "fa-rotate-left");
        clone.querySelectorAll("p")[1].style.textDecoration = "line-through";
    }

    clone.querySelectorAll(".fa-solid")[0].setAttribute("data-id", goal.id);
    clone.querySelectorAll(".fa-solid")[1].setAttribute("data-id", goal.id);
    clone.querySelectorAll(".fa-solid")[2].setAttribute("data-id", goal.id);

    clone.querySelector(".fa-star").addEventListener("click", (e) => {
      starGoal[goal.id] = goal;
      e.target.classList.add('star')
    });

    fragment.appendChild(clone);
  });

  list.appendChild(fragment);
};

function btnAction(e) {
  if (e.target.classList.contains("fa-check")) {
    goals[e.target.getAttribute("data-id")].status = true;
    paintGoal();
  }

  if (e.target.classList.contains("fa-x")) {
    delete goals[e.target.getAttribute("data-id")];
    paintGoal();
  }

  if (e.target.classList.contains("fa-rotate-left")) {
    goals[e.target.getAttribute("data-id")].status = false;
    paintGoal();
  }

  if (e.target.classList.contains("fa-pen")) {
    input.value = goals[e.target.getAttribute('data-id')].text
    delete goals[e.target.getAttribute('data-id')]
    input.focus()
    paintGoal();
  }

  e.stopPropagation();
}