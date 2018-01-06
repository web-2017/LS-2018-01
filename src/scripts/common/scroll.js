const $ = require('jquery');

let arrowDown = $('#arrow__down');
let arrowUp = $('#btn__up');

if(arrowDown){
  arrowDown.on('click', function scroll(e) {
    e.preventDefault();
   
    $('html, body').animate({
      scrollTop: 750
    }, 800)
    return false;
  });
}

if(arrowUp != undefined){
  arrowUp.on('click', function scroll(e) {
    e.preventDefault();
   
    $('html, body').animate({
      scrollTop: 0
    }, 800)
    return false;
  });
}


module.exports = scroll;