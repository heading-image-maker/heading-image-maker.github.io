import hello from "hello-color";

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColorInt() {
  return randomInt(0, 255);
}

function randomColor() {
  return {
    r: randomColorInt(),
    g: randomColorInt(),
    b: randomColorInt(),
  };
}

function toColorCode(color) {
  return '#' +
    ('00' + color.r.toString(16)).slice(-2) +
    ('00' + color.g.toString(16)).slice(-2) +
    ('00' + color.b.toString(16)).slice(-2);
}

function randomColorCode() {
  return toColorCode(randomColor());
}

export default function randomColorCodes() {
  const result = hello(randomColorCode());
  return {
    color: result.color,
    backgroundColor: result.base,
  }
}