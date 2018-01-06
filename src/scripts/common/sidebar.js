const $ = require('jquery');


let sb = () =>  document.getElementById('sidebar-link').onclick = function (e){
    e.preventDefault();

    document.querySelector('.sidebar').classList.toggle('linkActive');
    
  }

sb();
module.exports = sb;