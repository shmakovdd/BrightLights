export default function burger() {
    let burger = document.querySelector('.burger');
    let hidden = document.querySelector('.hidden');
    let body = document.querySelector('body');
    let links = document.querySelectorAll("[data-hidden='hidden']");
    console.log(links);
    function toggleMenu() {
        burger.classList.toggle('burger--active');
        body.classList.toggle('body--active');
        hidden.classList.toggle('hidden--active');
    }
    hidden.addEventListener('click', (e)=>{
        console.log(e.target);
    })
        links.forEach(function(element) {  
            element.addEventListener( "click", toggleMenu );
        })
    
    burger.addEventListener('click', toggleMenu);


}





