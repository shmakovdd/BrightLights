
export default function slider() {
    let slider = document.querySelector(".slider__wrapper");
    let list = document.querySelector(".slider__list");
    let slides = document.querySelectorAll('.slider__item');
    let arrowRight = document.querySelector('.tours__arrow-right')
    let arrowLeft = document.querySelector('.tours__arrow-left')
    let step;
    let direction;
    function calcWidth() {    
        let margin = parseFloat(getComputedStyle(list.firstChild).getPropertyValue('margin-right'));
        let sliderWidth = slider.offsetWidth;
        list.style.width = `${sliderWidth * slides.length}px`
        let width = `${(sliderWidth - (parseFloat(margin) * 2)) / 3}px`;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = width;
        }
        step = margin + parseFloat(width)
    }   

    function moveRight() {
        direction = -1
        list.style.transform = `translateX(-${step}px)`

    }

    function moveLeft() {
        direction = 1
        list.style.transition = 'none';
        list.style.transform = `translateX(-${step}px)`
        list.prepend(list.lastElementChild)

        setTimeout(()=>{
        list.style.transition = 'all .4s'
        list.style.transform = `translateX(0)`

        },100)
    }

    arrowRight.addEventListener('click', moveRight)
    setTimeout(()=>{
        list.addEventListener('transitionend', function() {
            if (direction === -1) {
                list.appendChild(list.firstElementChild)
                list.style.transition = 'none';
                list.style.transform = 'translate(0)'
            setTimeout(()=>{
                list.style.transition = 'all .4s'
            })
            } 
    

        })
    
    },1000)

    arrowLeft.addEventListener('click', moveLeft)

    calcWidth()
}
