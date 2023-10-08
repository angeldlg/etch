const container = document.querySelector(".container");
const clear = document.querySelector(".clear");
const slider = document.querySelector("#slider");
const gridValue = document.querySelector("#gridValue");
let gridSize = 16;
gridValue.textContent = `${slider.value} x ${slider.value}`;

function makeGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const grid = document.createElement("div");
    container.appendChild(grid);
    grid.classList.add("square");
  }
}

container.addEventListener("mousedown", color);
container.addEventListener("mousedown", () => {
  container.addEventListener("mouseover", color);
});
window.addEventListener("mouseup", () => {
  container.removeEventListener("mouseover", color);
});

function color(e) {
  e.target.style.backgroundColor = "black";
}
function remake() {
  container.innerHTML = "";
  makeGrid(gridSize);
}
function decolor() {
  const gridSquares = document.querySelectorAll(".square");

  gridSquares.forEach((square) => {
    square.removeAttribute("style");
  });
}
slider.addEventListener("input", (e) => {
  gridValue.value = `${e.target.value} x ${e.target.value}`;
});
slider.addEventListener("mouseup", () => {
  gridSize = slider.value;
  remake();
  //   makeGrid(gridSize);
});

makeGrid(gridSize);

clear.addEventListener("click", decolor);
