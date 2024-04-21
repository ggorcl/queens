document.getElementById("multiAttackedColor").addEventListener("input", function () {
  document.documentElement.style.setProperty('--multi-attacked-color', this.value);
});

document.getElementById("attackedColor").addEventListener("input", function () {
  document.documentElement.style.setProperty('--attacked-color', this.value);
});

document.getElementById("queenColor").addEventListener("input", function () {
  document.documentElement.style.setProperty('--queen-color', this.value);
});
