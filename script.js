const counter = document.getElementById("counter");
const bar = document.getElementById("bar");

const startYear = new Date("01/01/2023");
const nextYear = new Date("01/01/2024");
const dateToday = new Date();
const milisegundos = 24 * 60 * 60 * 1000;

let totalTimeEnd = Math.abs(nextYear.getTime() - dateToday.getTime());
let totalTimeStart = Math.abs(startYear.getTime() - dateToday.getTime());
let daysToFinish = Math.round(totalTimeEnd / milisegundos);
let daysElapsed = Math.round(totalTimeStart / milisegundos);

const yeardays = 365;
let advance = Math.round((daysElapsed * 100) / yeardays);

bar.setAttribute("data-target", String(advance));
let barValue = bar.getAttribute("data-target");

function showInfo() {
  const interval = daysToFinish / 100;
  const intervalPro = barValue / 100;
  function updateInfo() {
    const value = Number(counter.innerHTML);
    const valueBar = Number(bar.innerHTML);
    if (value < daysToFinish) {
      counter.innerHTML = Math.round(value + interval);
      setTimeout(() => {
        updateInfo();
      }, 30);
    }
    if (valueBar < advance) {
      bar.innerHTML = `${Math.round(valueBar + intervalPro)}`;
      bar.style.width = `${Number(bar.innerHTML)}%`;

      setTimeout(() => {
        updateInfo();
      }, 1000);
    }
  }
  updateInfo();
}

document.addEventListener("DOMContentLoaded", showInfo);