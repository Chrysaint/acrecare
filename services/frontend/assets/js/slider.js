$(document).ready(function(){
    const sliderTrack = document.querySelector('.slider__track');
    let slides = Array.from(sliderTrack.children);
    const nextBtn = document.querySelector('.slider__arrow_right');
    const prevBtn = document.querySelector('.slider__arrow_left');
    const slideWidth = slides[0].getBoundingClientRect().width;
    const firstClone = slides[0].cloneNode(true);
    const secondClone = slides[1].cloneNode(true);
    const thirdClone = slides[slides.length-1].cloneNode(true);
    const fourthClone = slides[slides.length-2].cloneNode(true);


    // Добавляем скопированные элементы и задаем им айди
    firstClone.id = 'first-clone';
    secondClone.id = 'second-clone';
    thirdClone.id = 'third-clone';
    fourthClone.id = 'fourth-clone';
    
    sliderTrack.append(firstClone);
    sliderTrack.append(secondClone);
    sliderTrack.prepend(thirdClone);
    sliderTrack.prepend(fourthClone);


    let cardBottomArray = document.querySelectorAll('.cleaning__card_after');
    let cardImages = document.querySelectorAll('.cleaning__card-img_top');

    // Задаем начальный активный слайд и добавляем ему классы активного
    slides = Array.from(sliderTrack.children);
    let midIndex = Math.round(slides.length/2);
    var sliderPosition = (midIndex-1)*slideWidth;
    slides[midIndex].classList.add('current-slide');
    slides[midIndex].firstElementChild.classList.add('current-slide-img')
    slides[midIndex].firstElementChild.classList.remove('background-slide')

    // Устанавливаем позицию объектов
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    }
    slides.forEach(setSlidePosition);
    sliderTrack.style.transform = 'translateX(-'+(midIndex-1)*slideWidth+'px)';
    
    // Перемещение по слайдам
    const moveToSlide = (sliderTrack, currentSlide, targetSlide, sliderPosition, targetSlideChild, currentSlideChild) => {
        sliderTrack.style.transform = 'translateX(-' + sliderPosition+'px)';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        targetSlideChild.classList.remove('background-slide');
        currentSlideChild.classList.remove('current-slide-img');
        currentSlideChild.classList.add('background-slide');
        targetSlideChild.classList.add('current-slide-img');
    }

    // Задержка кликов слайдера
    let clickable = true;
    const clickDelay = function() {
        clickable = false;
        setTimeout(() => {
            clickable = true;
        }, 600)
    }

    let isLoop = true;
    const sliderContainer = document.querySelector('.slider');
    const sliderLoop = () => {
        setInterval(() => {
            if (isLoop){
                nextSlide();
            }               
        }, 2000)
    }

    sliderLoop();
    
    sliderContainer.addEventListener('mouseover', () => {
        isLoop = false;
    })
    sliderContainer.addEventListener('mouseout', () => {
        isLoop = true;
    })
    // 
    // 

    const nextSlide = () => {
        if (clickable) {
            const currentSlide = document.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            const currentSlideChild = currentSlide.firstElementChild;
            const nextSlideChild = nextSlide.firstElementChild;

            sliderTrack.style.transition = '300ms ease';
            slides[2].firstElementChild.style.transition = '200ms ease-in-out';
            midIndex++;
            sliderPosition = sliderPosition + slideWidth;
            const nextIndex = slides.findIndex(slide => slide === nextSlide);
            moveToSlide (sliderTrack, currentSlide, nextSlide, sliderPosition, nextSlideChild, currentSlideChild);
            clickDelay();
        }
    } 

    // Функция скролла слайдера по клику
    prevBtn.addEventListener('click', e => {
        console.log('1', clickable);
        if (clickable){
            const currentSlide = document.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            const currentSlideChild = currentSlide.firstElementChild;
            const prevSlideChild = prevSlide.firstElementChild;

            sliderTrack.style.transition = '300ms ease';
            slides[slides.length-3].firstElementChild.style.transition = '200ms ease-in-out';
            cardBottomArray[slides.length-3].style.transition = 'opacity 400ms ease-in-out';
            cardImages[slides.length-3].style.transition = 'transform 300ms ease-in-out';
            midIndex--;
            sliderPosition = sliderPosition - slideWidth;
            moveToSlide (sliderTrack, currentSlide, prevSlide, sliderPosition, prevSlideChild, currentSlideChild);
            clickDelay();
        }
    })
    
    nextBtn.addEventListener('click', e => {
        // nextSlide();
        if (clickable) {
            const currentSlide = document.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            const currentSlideChild = currentSlide.firstElementChild;
            const nextSlideChild = nextSlide.firstElementChild;
            sliderTrack.style.transition = '300ms ease';
            cardBottomArray[2].style.transition = 'opacity 400ms ease-in-out';
            cardImages[2].style.transition = 'transform 300ms ease-in-out';
            slides[2].firstElementChild.style.transition = '200ms ease-in-out';
            midIndex++;
            sliderPosition = sliderPosition + slideWidth;
            const nextIndex = slides.findIndex(slide => slide === nextSlide);
            moveToSlide (sliderTrack, currentSlide, nextSlide, sliderPosition, nextSlideChild, currentSlideChild);
            clickDelay();
        }
    })

    // Цикличность слайдера
    sliderTrack.addEventListener('transitionend', () => {
        if(slides[midIndex].id === firstClone.id || slides[midIndex].id === secondClone.id){
            cardBottomArray[2].style.transition = 'none';
            cardImages[2].style.transition = 'none';
            cardBottomArray[1].style.transition = 'none';
            cardImages[1].style.transition = 'none';
            slides[2].firstElementChild.style.transition = 'none';
            slides[1].firstElementChild.style.transition = 'none';
            slides[1].firstElementChild.classList.add('current-slide-img');
            slides[1].firstElementChild.classList.remove('background-slide');
            setTimeout(() => {
                sliderTrack.style.transition = 'none';
                slides[midIndex].classList.remove('current-slide');
                slides[midIndex].firstElementChild.classList.remove('current-slide-img');
                slides[midIndex].firstElementChild.classList.add('background-slide');
                midIndex = 2;
                sliderPosition = slideWidth * (midIndex-1);
                sliderTrack.style.transform = 'translateX(-'+slideWidth * (midIndex-1)+'px)';
                slides[1].firstElementChild.classList.remove('current-slide-img');
                slides[1].firstElementChild.classList.add('background-slide');
                slides[midIndex].classList.add('current-slide');
                slides[midIndex].firstElementChild.classList.add('current-slide-img');
                slides[midIndex].firstElementChild.classList.remove('background-slide');
            }, 300)
        } else {
            cardBottomArray[1].style.transition = 'opacity 400ms ease-in-out';
            cardImages[1].style.transition = 'transform 300ms ease-in-out';
            cardBottomArray[2].style.transition = 'opacity 400ms ease-in-out';
            cardImages[2].style.transition = 'transform 300ms ease-in-out';
            slides[2].firstElementChild.style.transition = '200ms ease-in-out';
            slides[1].firstElementChild.style.transition = '200ms ease-in-out';
        }
        if(slides[midIndex].id === thirdClone.id || slides[midIndex].id === fourthClone.id){
            cardBottomArray[slides.length-2].style.transition = 'none';
            cardImages[slides.length-2].style.transition = 'none';
            cardBottomArray[slides.length-3].style.transition = 'none';
            cardImages[slides.length-3].style.transition = 'none';
            slides[slides.length-3].firstElementChild.style.transition = 'none';
            slides[slides.length-2].firstElementChild.style.transition = 'none';
            slides[slides.length-2].firstElementChild.classList.add('current-slide-img');
            slides[slides.length-2].firstElementChild.classList.remove('background-slide');
            setTimeout (() => {
                sliderTrack.style.transition = 'none';
                slides[midIndex].classList.remove('current-slide');
                slides[midIndex].firstElementChild.classList.remove('current-slide-img');
                slides[midIndex].firstElementChild.classList.add('background-slide');
                midIndex = slides.length-3;
                sliderPosition = slideWidth * (midIndex-1);
                sliderTrack.style.transform = 'translateX(-'+slideWidth * (midIndex-1)+'px)';
                slides[slides.length-2].firstElementChild.classList.remove('current-slide-img');
                slides[slides.length-2].firstElementChild.classList.add('background-slide');
                slides[midIndex].classList.add('current-slide');
                slides[midIndex].firstElementChild.classList.add('current-slide-img');
                slides[midIndex].firstElementChild.classList.remove('background-slide');
            }, 300)      
        } else {
            cardBottomArray[slides.length-2].style.transition = 'opacity 400ms ease-in-out';
            cardImages[slides.length-2].style.transition = 'transform 300ms ease-in-out';
            cardBottomArray[slides.length-3].style.transition = 'opacity 400ms ease-in-out';
            cardImages[slides.length-3].style.transition = 'transform 300ms ease-in-out';
            slides[slides.length-2].firstElementChild.style.transition = '200ms ease-in-out';
            slides[slides.length-3].firstElementChild.style.transition = '200ms ease-in-out';
        }
    })
})