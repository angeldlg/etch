// import html2canvas from 'html2canvas';

const container = document.querySelector(".container");
const rainbow = document.querySelector(".rainbow");
const palette = document.querySelector(".palette");
const slider = document.querySelector("#slider");
const eraser = document.querySelector(".eraser");
const create = document.querySelector(".new");
const grid = document.querySelector(".lines");
const paintPicker = document.querySelector(".picker");
const gridValue = document.querySelector("#gridValue");
const gridPicker = document.querySelector(".grid-linesPicker");
const backgroundPicker = document.querySelector(".background");
const paletteColors = document.querySelectorAll("#palette-color");
let lastPaint = paintPicker.value;
let gridSize = 16;

slider.value = gridSize;
gridPicker.value = "#000000";
paintPicker.value = "#4d81c3";
backgroundPicker.value = "#2f4e99";
gridValue.textContent = `${gridSize} x ${gridSize}`;

function makeGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const grid = document.createElement("div");
    container.appendChild(grid);
    grid.classList.add("square");
    grid.style.backgroundColor = backgroundPicker.value;
    grid.style.outline = backgroundPicker.value;
  }
}

function color(e) {
  container.classList.add("modified");
  if (
    rainbow.classList.contains("toggled-rainbow") &&
    eraser.classList.contains("toggled")
  ) {
    e.target.style.backgroundColor = backgroundPicker.value;
  } else if (rainbow.classList.contains("toggled-rainbow")) {
    rainbowRgb = rainbowMode();
    rainbowHex = rgbToHexadecimal(rainbowRgb);
    paintPicker.toggleAttribute("disabled");

    e.target.style.backgroundColor = rainbowHex;
  } else {
    e.target.style.backgroundColor = paintPicker.value;
  }
}
function recolor() {
  const gridSquares = document.querySelectorAll(".square");
  container.classList.remove("modified");
  gridSquares.forEach((gridSquares) => {
    gridSquares.style.backgroundColor = backgroundPicker.value;
  });
}

function remake() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  makeGrid(gridSize);
}

function unchooseColor() {
  paletteColors.forEach((paletteColor) => {
    paletteColor.classList.remove("chosen-color");
  });
}

function chooseColor(e) {
  unchooseColor();
  e.target.classList.add("chosen-color");
  const paletteColor = getComputedStyle(e.target).backgroundColor;
  const rgbValues = paletteColor.match(/\d+/g);
  const r = parseInt(rgbValues[0]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2]);

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const hexColor = rgbToHex(r, g, b);

  paintPicker.value = hexColor;
}

function rainbowMode() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function rgbToHexadecimal(rainbowValue) {
  const rgbValues = rainbowValue.match(/\d+/g);

  const r = parseInt(rgbValues[0]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2]);

  function converter(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  return converter(r, g, b);
}

container.addEventListener("mousedown", color);
container.addEventListener("mousedown", () => {
  container.addEventListener("mouseover", color);
});
window.addEventListener("mouseup", () => {
  container.removeEventListener("mouseover", color);
});

palette.addEventListener("mousedown", chooseColor);
palette.addEventListener("mousedown", () => {
  palette.addEventListener("mouseover", chooseColor);
});
window.addEventListener("mouseup", () => {
  palette.removeEventListener("mouseover", chooseColor);
});

slider.addEventListener("input", (e) => {
  gridValue.value = `${e.target.value} x ${e.target.value}`;
});
slider.addEventListener("mouseup", () => {
  if (slider.value === gridSize) return;
  gridSize = slider.value;
  remake();

  const gridSquares = document.querySelectorAll(".square");
  if (grid.classList.contains("toggled")) {
    gridSquares.forEach((gridSquares) => {
      gridSquares.style.outline = `1px solid ${gridPicker.value}`;
    });
  } else {
    gridSquares.forEach((gridSquares) => {
      gridSquares.style.removeProperty("outline");
    });
  }

  // makeGrid(gridSize)
});
backgroundPicker.addEventListener("input", () => {
  const gridSquares = document.querySelectorAll(".square");
  if (container.classList.contains("modified")) return;
  else {
    gridSquares.forEach((gridSquares) => {
      gridSquares.style.backgroundColor = backgroundPicker.value;
    });
  }
});
gridPicker.addEventListener("input", () => {
  const gridSquares = document.querySelectorAll(".square");
  gridSquares.forEach((gridSquares) => {
    gridSquares.style.outline = `1px solid ${gridPicker.value}`;
  });
});

grid.addEventListener("mousedown", () => {
  const gridSquares = document.querySelectorAll(".square");
  grid.classList.toggle("toggled");
  if (grid.classList.contains("toggled")) {
    gridSquares.forEach((gridSquares) => {
      gridSquares.style.outline = `1px solid ${gridPicker.value}`;
    });
  } else {
    gridSquares.forEach((gridSquares) => {
      gridSquares.style.removeProperty("outline");
    });
  }
});
eraser.addEventListener("mousedown", () => {
  eraser.classList.toggle("toggled");
  paintPicker.toggleAttribute("disabled");
  backgroundPicker.toggleAttribute("disabled");
  gridPicker.toggleAttribute("disabled");
  if (eraser.classList.contains("toggled")) {
    lastPaint = paintPicker.value;
    paintPicker.value = backgroundPicker.value;
  } else {
    paintPicker.value = lastPaint;
  }
});
create.addEventListener("mousedown", recolor);
rainbow.addEventListener("click", () => {
  rainbow.classList.toggle("toggled-rainbow");
});

makeGrid(gridSize);
