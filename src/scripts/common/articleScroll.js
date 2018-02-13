const $ = require('jquery');
function sidebar() {
  let listTitleArticles = document.querySelector(".sidebar-menu");
  let itemTitleArticles = document.querySelector(".sidebar-menu__item");
  let navArticle = document.querySelector(".sidebar-blog");
  listTitleArticles.addEventListener("click", function (e) {
    
    if (e.target.tagName == "LI") {
      // возьмем аттрибут в навигационного меню
      let numberItem = e.target.getAttribute("data-scroll");
      console.log(numberItem);
      // найдем в DOm коллекции тот элемент на который хотим перейти
      let articleItem = document.querySelectorAll(".blog-content_box")[
        numberItem
      ];
      // убираем меню
      // navArticle.classList.remove("articles-nav--swiped");
      // и перейдем к нему
      scrollIt(articleItem, 200, "linear", function () { });
    }
  });
}



sidebar();

module.exports = sidebar;