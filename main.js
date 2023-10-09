const container = document.querySelector(".container");
const clear = document.querySelector(".clear");
const gridLines = document.querySelector(".lines");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");
const palette = document.querySelector(".palette");
const paintPicker = document.querySelector(".picker");
const backgroundPicker = document.querySelector(".background");
const gridLinesPicker = document.querySelector(".grid-linesPicker");
const gridValue = document.querySelector("#gridValue");
const slider = document.querySelector("#slider");
const paletteColors = document.querySelectorAll("#paletteColor");

let lastPaint = paintPicker.value;
let gridSize = 16;
paintPicker.value = "#cbcdcf";
backgroundPicker.value = "#7f8286";
gridLinesPicker.value = "#000000";

gridValue.textContent =
  `${gridSize} x ${gridSize}` || `${slider.value} x ${slider.value}`;

slider.value = gridSize;

function makeGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const grid = document.createElement("div");
    container.appendChild(grid);
    grid.classList.add("square");
    grid.style.backgroundColor = backgroundPicker.value;
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
  container.classList.add("modified");
  if (rainbow.classList.contains("toggled")) {
    rainbowRgb = rainbowMode();
    rainbowHex = rgbToHexadecimal(rainbowRgb);
    e.target.style.backgroundColor = rainbowHex;
    paintPicker.value = rainbowHex;
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
  // gridSquares.style.backgroundColor = backgroundPicker.value;
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
gridLinesPicker.addEventListener("input", () => {
  const gridSquares = document.querySelectorAll(".square");
  gridSquares.forEach((gridSquares) => {
    gridSquares.style.outline = `1px solid ${gridLinesPicker.value}`;
  });
});
gridLines.addEventListener("mousedown", () => {
  const gridSquares = document.querySelectorAll(".square");
  gridLines.classList.toggle("toggled");
  if (gridLines.classList.contains("toggled")) {
    gridSquares.forEach((gridSquares) => {
      gridSquares.style.outline = `1px solid ${gridLinesPicker.value}`;
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
  gridLinesPicker.toggleAttribute("disabled");
  if (eraser.classList.contains("toggled")) {
    lastPaint = paintPicker.value;
    paintPicker.value = backgroundPicker.value;
  } else {
    paintPicker.value = lastPaint;
  }
});
clear.addEventListener("mousedown", recolor);
rainbow.addEventListener("click", () => {
  rainbow.classList.toggle("toggled");
});
makeGrid(gridSize);
