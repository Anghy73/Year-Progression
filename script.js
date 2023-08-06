const counter = document.getElementById("counter");
const bar = document.getElementById("bar");

const nextYear = new Date("01/01/2024");
const dateToday = new Date();
const milisegundos = 24 * 60 * 60 * 1000;
let totalTime = Math.abs(nextYear.getTime() - dateToday.getTime());
let days = Math.round(totalTime / milisegundos);

const yeardays = 365;
let advance = Math.round((days * 100) / yeardays);


function showInfo() {
  let countOne = 0;
  let countTwo = 0;

  const progress = setInterval(() => {
    countTwo++

    bar.textContent = `${countTwo}%`;
    bar.style.width = `${countTwo}%`

    if (countTwo == advance) {
      clearInterval(progress)
    }
  }, 60);

  const time = setInterval(() => {
    countOne++;
    counter.textContent = `${countOne}`;

    if (countOne == days) {
      clearInterval(time);
    }
  }, 17);
}

document.addEventListener("DOMContentLoaded", showInfo);

// TODO: Crear un crud para las metas