
let funMenu = () => {
  let menuBtn =  document.querySelector('.menu__btn a');
  menuBtn.onclick = (e) => {
    e.preventDefault();
    
    document.querySelector('.menu__btn').classList.toggle('menu__btn_active');
  };
};

funMenu();
module.exports = funcMenu;