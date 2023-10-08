const container = document.querySelector(".container");
const clear = document.querySelector(".clear");
const slider = document.querySelector("#slider");
const gridValue = document.querySelector("#gridValue");
let gridSize = 16
gridValue.textContent = `${slider.value} x ${slider.value}`;

function makeGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const grid = document.createElement("div");
    container.appendChild(grid);

    container.addEventListener("mousedown", color);
    container.addEventListener("mousedown", () => {
      container.addEventListener("mouseover", color);
    });
    window.addEventListener("mouseup", () => {
      container.removeEventListener("mouseover", color);
    });
    grid.classList.add("square");
  }
}
function color(e) {
  e.target.style.backgroundColor = "black";
}
function erase() {
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
  erase();
  makeGrid(gridSize);
});

makeGrid(gridSize);

clear.addEventListener("click", erase);
