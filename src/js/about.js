if (window.location.pathname === "/about.html") {
    let carouselImages = document.querySelector('.carousel__images');
    let carouselButton = document.querySelectorAll('.carousel__button');
    let numberOfImages = document.querySelectorAll('.carousel__images img').length;
    let imageIndex = 1;
    let translateX = 0;

    carouselButton.forEach(button =>{
        button.addEventListener('click', event =>{
            if(event.target.id === 'previous'){
                if(imageIndex !== 1){
                    imageIndex--;
                    translateX += 800;
                }
            } else {
                if(imageIndex !== numberOfImages){
                    imageIndex++;
                    translateX -= 800;
                }
            }
            carouselImages.style.transform = `translateX(${translateX}px)`;
        });
    });
}