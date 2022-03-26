import randomColorCodes from "./color";

const propertyType = {
  'heading': {
    inputSelector: function () { return document.querySelector('#input-heading'); },
    reflect: function (value) {
      const processedValue = value.replace(/\r?\n/g, '<br />');
      document.querySelector('#canvas h1').innerHTML = processedValue;
    },
  },

  'description': {
    inputSelector: function () { return document.querySelector('#input-description'); },
    reflect: function (value) {
      const processedValue = value.replace(/\r?\n/g, '<br />');
      document.querySelector('#canvas p.description').innerHTML = processedValue;
    },
  },

  'heading-size': {
    inputSelector: function () { return document.querySelector('#input-heading-size'); },
    reflect: function (value) {
      document.querySelector('#canvas h1').style.fontSize = value + 'px';
    },
  },

  'description-size': {
    inputSelector: function () { return document.querySelector('#input-description-size'); },
    reflect: function (value) {
      document.querySelector('#canvas p.description').style.fontSize = value + 'px';
    },
  },

  'color': {
    inputSelector: function () { return document.querySelector('#input-color'); },
    reflect: function (value) {
      document.querySelector('#canvas').style.color = value;
    },
  },

  'background-color': {
    inputSelector: function () { return document.querySelector('#input-background-color'); },
    reflect: function (value) {
      document.querySelector('#canvas').style.backgroundColor = value;
    },
  },
}

function initInputHandlers() {
  Object.keys(propertyType).forEach(function (key) {
    const property = propertyType[key];
    property.inputSelector().addEventListener('input', function (e) {
      property.reflect(e.target.value);
    });
  });
}

function initColorPaletteHandlers() {
  document.querySelectorAll('#form .color-palette').forEach(function (el) {
    el.addEventListener('click', function (e) {
      reflectAndRest('color', e.target.dataset.color);
      reflectAndRest('background-color', e.target.dataset.backgroundColor);
    });
  });
}

function initRandomColorHandler() {
  document.querySelector('#random-color').addEventListener('click', function() {
    const colorCodes = randomColorCodes();
    reflectAndRest('color', colorCodes.color);
    reflectAndRest('background-color', colorCodes.backgroundColor);
  });
}

function reflectAndRest(key, value) {
  propertyType[key].reflect(value);
  propertyType[key].inputSelector().value = value;
}

export default function initCanvas() {
  initInputHandlers();
  initColorPaletteHandlers();
  initRandomColorHandler();
}
