function preloader() {
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
}

window.addEventListener('load', preloader);

module.exports = preloader;