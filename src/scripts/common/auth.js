    let login = document.querySelector('.login__btn');
    let authWrap = document.querySelector('#auth__wrap');
    let authInp = document.querySelector('.auth__box-bg');
    let log =  document.getElementById('home');

function authRotateHome() {
    
    if(log != undefined){
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
        };
    }
}

authRotateHome();

module.exports = authRotateHome;