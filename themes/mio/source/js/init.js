window.addEventListener('DOMContentLoaded', function () {
  var cr = document.getElementById('copyright')
  cr.innerText = cr.innerText.replace('[year]', new Date().getFullYear())
})
