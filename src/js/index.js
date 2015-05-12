var qrjs = require('qrjs');

document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementsByTagName('input')[0];
  var qr = document.getElementById('qr');

  var whenInputChanges = function() {
    while (qr.hasChildNodes()) {
      qr.removeChild(qr.lastChild);
    }
    var value = input.value;
    if (value) {
      qr.appendChild(qrjs.generateSVG(value, {margin: 4}));
    }
  };
  input.addEventListener('keyup', whenInputChanges);
  input.addEventListener('change', whenInputChanges);
  window.addEventListener('focus', function() {
    input.select();
  });
  input.focus();
});