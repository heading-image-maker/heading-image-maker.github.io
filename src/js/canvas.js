import randomColorCodes from "./color";

const propertyType = {
  'headline': {
    inputSelector: function () { return document.querySelector('#input-headline'); },
    reflect: function (value) {
      const processedValue = value.replace(/\r?\n/g, '<br />');
      document.querySelector('#canvas h1').innerHTML = processedValue;
    },
  },

  'strapline': {
    inputSelector: function () { return document.querySelector('#input-strapline'); },
    reflect: function (value) {
      const processedValue = value.replace(/\r?\n/g, '<br />');
      document.querySelector('#canvas p.strapline').innerHTML = processedValue;
    },
  },

  'headline-font': {
    inputSelector: function () { return document.querySelector('#input-headline-font'); },
    reflect: function (value) {
      const options = document.querySelector("#input-headline-font").options;
      for (var i = 0; i < options.length; i++) {
        document.querySelector("#canvas h1").classList.remove(options[i].value)
      }
      document.querySelector('#canvas h1').classList.add(value);
    },
  },

  'strapline-font': {
    inputSelector: function () { return document.querySelector('#input-strapline-font'); },
    reflect: function (value) {
      const options = document.querySelector("#input-strapline-font").options;
      for (var i = 0; i < options.length; i++) {
        document.querySelector("#canvas p.strapline").classList.remove(options[i].value)
      }
      document.querySelector('#canvas p.strapline').classList.add(value);
    },
  },

  'headline-size': {
    inputSelector: function () { return document.querySelector('#input-headline-size'); },
    reflect: function (value) {
      document.querySelector('#canvas h1').style.fontSize = value + 'px';
    },
  },

  'strapline-size': {
    inputSelector: function () { return document.querySelector('#input-strapline-size'); },
    reflect: function (value) {
      document.querySelector('#canvas p.strapline').style.fontSize = value + 'px';
    },
  },

  'headline-bold': {
    inputSelector: function () { return document.querySelector('#input-headline-bold'); },
    reflect: function (value) {
      document.querySelector('#canvas h1').style.fontWeight = value ? 'bold': 'normal';
    },
  },

  'strapline-bold': {
    inputSelector: function () { return document.querySelector('#input-strapline-bold'); },
    reflect: function (value) {
      document.querySelector('#canvas p.strapline').style.fontWeight = value ? 'bold': 'normal';
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
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      property.reflect(value);
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
