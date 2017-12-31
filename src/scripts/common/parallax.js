let parallax = () => {
    const parallaxContainer = document.getElementById('parallax');

    if(parallaxContainer){

        const layers = parallaxContainer.children;
            // функция движения мыши
        const moveLayer = e => {
            const initialX = (window.innerWidth / 2) - e.pageX;
            const initialY = (window.innerHeight / 2) - e.pageY;

            let i = 0;

            for(let layer of layers){
                const divider = i / 50;
                const positionX = initialX * divider;
                const positionY = initialY * divider;

                layer.style.transform = `translate(${positionX}px, ${positionY}px)`;

                i++;
            }
        }

        window.addEventListener('mousemove', moveLayer);
    }
};
parallax();

module.exports = parallax;