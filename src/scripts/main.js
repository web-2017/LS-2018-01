
const $ = require('jquery'); // если нужен

// Авторизация
let login = document.querySelector('.login__btn');
let authWrap = document.querySelector('#auth__wrap');
let authInp = document.querySelector('.auth__box-bg');

function authRotateHome() {
    if(login != undefined){
        login.onclick = function(e){
            e.preventDefault();
            
            document.querySelector('#auth__wrap').classList.toggle('dhover');

            if(authWrap.className == 'dhover'){
                document.querySelector('.auth__box').style.display = 'none';
                authInp.style.opacity = 1;
                authInp.style.display = 'block';
            } else{
                document.querySelector('.auth__box').style.display = 'block';
                authInp.style.opacity = 0;
                authInp.style.display = 'none';
            }
        }
    }
}

authRotateHome();

var aviatitle = {
    generate: function (string, block) {
        var wordsArray = string.split(' '),
            stringArray = string.split(''),
            sentence = [],
            word = '';
        console.log(wordsArray);
        console.log(stringArray);
        block.text('');

        wordsArray.forEach(function (currentWord) {
            var wordsArray = currentWord.split('');

            wordsArray.forEach(function (letter) {
                var letterHtml = '<span class="letter-span">' + letter + '</span>';

                word += letterHtml;
            });

            var wordHTML = '<span class="letter-word">' + word + '</span>'

            sentence.push(wordHTML);
            word = '';
        });

        block.append(sentence.join(' '));

        // анимация появления
        var
            letters = block.find('.letter-span'), // найдем все наши буквы
            duration = 500 / stringArray.length; // находим длительность для каждой буквы

        $.each(letters, function (item, elem) {
            setTimeout(function () {
                $(elem).addClass('active');
            }, duration * item);
        });

    }
};
var Slider = function (container) {
    var nextBtn = container.find('.works-slider__control-btn_left'), // левая  кнопка
        prevBtn = container.find('.works-slider__control-btn_right'), // правая кнопка
        items = nextBtn.find('.works-slider__control-item'), // слайды
        display = container.find('.works-slider__display'), // Витрина слайдера
        title = container.find('.subtitle'), // заголовок слайда
        skills = container.find('.works__content-desc'), // технологии
        link = container.find('.works__content-view'), // ссылка
        itemsLength = items.length, // количество слайдов
        duration = 500,
        flag = true;

    // var timeout;

    this.counter = 0;

    // private Генерация разметки кнопки следующий слайд
    var generateMarkups = function () {
        var list = nextBtn.find('.works-slider__control-list'),
            markups = list.clone();

        prevBtn
            .append(markups);
        // .find('.works-slider__control-item')
        // .removeClass('active')
        // .eq(this.counter + 1)
        // .addClass('active');
    }
    // Вытащить данные из дата атрибутов для левой части слайдера
    var getDataArrays = function () {
        var dataObject = {
            pics: [],
            title: [],
            skills: [],
            link: []
        };

        $.each(items, function () {
            var $this = $(this);

            dataObject
                .pics
                .push($this.data('full'));
            dataObject
                .title
                .push($this.data('title'));
            dataObject
                .skills
                .push($this.data('skills'));
            dataObject
                .link
                .push($this.data('link'));
        });

        return dataObject;
    }

    var slideInLeftBtn = function (slide) {
        var reqItem = items.eq(slide - 1),
            activeItem = items.filter('.active');

        activeItem
            .stop(true, true)
            .animate({
                'top': '100%'
            }, duration);

        reqItem
            .stop(true, true)
            .animate({
                'top': '0%'
            }, duration, function () {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                    .css('top', '-100%')
            });

    }

    var slideInRightBtn = function (slide) {
        var items = prevBtn.find('.works-slider__control-item'),
            activeItem = items.filter('.active'),
            reqSlide = slide + 1;

        if (reqSlide > itemsLength - 1) {
            reqSlide = 0;
        }

        var reqItem = items.eq(reqSlide);

        activeItem
            .stop(true, true)
            .animate({
                'top': '-100%'
            }, duration);

        reqItem
            .stop(true, true)
            .animate({
                'top': '0%'
            }, duration, function () {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                    .css('top', '100%')
            });
    };

    var changeMainPicture = function (slide) {
        var image = display.find('.works-slider__display-pic');
        var data = getDataArrays();

        image
            .stop(true, true)
            .fadeOut(duration / 2, function () {
                image.attr('src', data.pics[slide]);
                $(this).fadeIn(duration / 2);
            });
    }

    var changeTextData = function (slide) {
        var data = getDataArrays();

        // название работы
        aviatitle.generate(data.title[slide], title, 'ru');

        // описание технологий
        aviatitle.generate(data.skills[slide], skills, 'en');

        // ссылка
        link.attr('href', data.link[slide]);
    }

    // public
    this.setDefaults = function () {
        var _that = this,
            data = getDataArrays();
        console.log(data);
        // создаем разметку
        generateMarkups();

        // левая кнопка
        nextBtn
            .find('.works-slider__control-item')
            .eq(_that.counter - 1)
            .addClass('active');

        // правая кнопка
        prevBtn
            .find('.works-slider__control-item')
            .eq(_that.counter + 1)
            .addClass('active');

        // основное изображение
        display
            .find('.works-slider__display-pic')
            .attr('src', data.pics[_that.counter]);

        // текстовые описания
        changeTextData(_that.counter);

    };

    this.moveSlide = function (direction) {
        var _that = this;
        // if (direction === "next") {
        //   if (_that.counter < itemsLength - 1) {
        //     _that.counter++;
        //   } else {
        //     _that.counter = 0;
        //   }
        // } else {
        //   if (_that.counter > 0) {
        //     _that.counter--;
        //   } else {
        //     _that.counter = itemsLength - 1;
        //   }
        // }

        var directions = {
            next: function () {
                // закольцовывание слайдера
                if (_that.counter < itemsLength - 1) {
                    _that.counter++;
                } else {
                    _that.counter = 0;
                }
            },

            prev: function () {
                if (_that.counter > 0) {
                    _that.counter--;
                } else {
                    _that.counter = itemsLength - 1;
                }
            }
        };

        directions[direction]();

        if (flag) {
            flag = false;

            if (typeof timeout != 'undefined') {
                clearTimeout(timeout);
            }

            timeout = setTimeout(function () {
                flag = true;
            }, duration + 50);

            slideInLeftBtn(_that.counter);
            slideInRightBtn(_that.counter);
            changeMainPicture(_that.counter);
            changeTextData(_that.counter);
        }
    };
};

var slider = new Slider($('.works'));
slider.setDefaults();

$('.works-slider__control-btn_left').on('click', function (e) {
    e.preventDefault();
    slider.moveSlide('prev');
});

$('.works-slider__control-btn_right').on('click', function (e) {
    e.preventDefault();
    slider.moveSlide('next');
});

console.dir(slider);