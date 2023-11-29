$(document).ready(function(){
    delay = 100;
    textArray = ['refresh your ', 'обнови свои '];
    spanArray = ['kicks', 'кроссы'];
    textStatus = 0;
    createBr = false;
    loop();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function textDelete(textFirst, textSpan){
    arrayCount = textFirst.length;
    arrayCount2 = textSpan.length;
    for (let i = 0; i < arrayCount2; i++){
        textSpan = textSpan.substr(0, textSpan.length-1);
        $('.hero__title_accent').text(textSpan);
        await sleep(delay);
    }
    for (let i = 0; i < arrayCount; i++){
        textFirst = textFirst.substr(0, textFirst.length-1);
        $('.hero__title-base').text(textFirst);
        await sleep(delay);
    }
}

async function textAdd(textFirst, textSpan){
    textResult = "";
    arrayCount = textFirst.length;
    arrayCount2 = textSpan.length;
    for (let i = 0; i < arrayCount; i++){
        textResult = textResult + textFirst[i];
        $('.hero__title-base').text(textResult);
        await sleep(delay);
    }
    spanResult = "";
    for (let i = 0; i < arrayCount2; i++){
        spanResult = spanResult + textSpan[i];
        $('#heroTitleAccent').text(spanResult);
        await sleep(delay);
    }
}

async function loop() {
    await sleep(1000);
        textDelete(textArray[textStatus], spanArray[textStatus]).then (function(){
            if(textStatus == 0){
                textStatus = 1;
            } else {
                textStatus = 0;
            }
            textAdd(textArray[textStatus], spanArray[textStatus]).then (function(){
                return loop();
            })
        })
    }

// КАРТОЧКИ ПРОДУКТОВ ПО КЛИКУ
let productCards = document.querySelectorAll('.products__item');
const productDescriptionFoam = document.querySelector('.products__description-foam');
const productDescriptionCleaner = document.querySelector('.products__description-cleaner');
const productDescriptionBasic = document.querySelector('.products__description-basic');
const productButtons = document.querySelectorAll('.products__button');
let activeFoamCard = 0;
let activeCleanerCard = 0;
let activeBasicCard = 0;

productButtons[0].addEventListener('click', () => {
    if (activeCleanerCard == 0){
        productCards[1].classList.remove('products__item_active');
        productCards[2].classList.remove('products__item_active');
        productCards[0].classList.add('products__item_active');
        productDescriptionBasic.style.display = "none";
        productDescriptionFoam.style.display = "none";
        productDescriptionBasic.style.opacity = "0";
        productDescriptionFoam.style.opacity = "0";
        productDescriptionCleaner.style.display = "block";
        setTimeout (() => {
            productDescriptionCleaner.style.opacity = "1";
        }, 30)
        activeCleanerCard = 1;
        activeFoamCard = 0;
        activeBasicCard = 0;
    } else {
        productCards[0].classList.remove('products__item_active');
        productDescriptionCleaner.style.opacity = "0";
        setTimeout (() => {
            productDescriptionCleaner.style.display = "none";
        }, 400)
        activeCleanerCard = 0; 
    }
})
productButtons[1].addEventListener('click', () => {
    if (activeFoamCard == 0){
        productCards[0].classList.remove('products__item_active');
        productCards[2].classList.remove('products__item_active');
        productCards[1].classList.add('products__item_active');
        productDescriptionBasic.style.display = "none";
        productDescriptionFoam.style.display = "block";
        productDescriptionCleaner.style.display = "none";
        productDescriptionCleaner.style.opacity = "0";
        productDescriptionBasic.style.opacity = "0";
        setTimeout (() => {
            productDescriptionFoam.style.opacity = "1";
        }, 30)
        activeFoamCard = 1;
        activeCleanerCard = 0;
        activeBasicCard = 0;
    } else {
        productCards[1].classList.remove('products__item_active');
        productDescriptionFoam.style.opacity = "0";
        setTimeout (() => {
            productDescriptionFoam.style.display = "none";
        }, 400)
        activeFoamCard = 0; 
    }
})
productButtons[2].addEventListener('click', () => {
    if (activeBasicCard == 0){
        productCards[0].classList.remove('products__item_active');
        productCards[1].classList.remove('products__item_active');
        productCards[2].classList.add('products__item_active');
        productDescriptionBasic.style.display = "block";
        productDescriptionFoam.style.display = "none";
        productDescriptionCleaner.style.display = "none";
        productDescriptionFoam.style.opacity = "0";
        productDescriptionCleaner.style.opacity = "0";
        setTimeout (() => {
            productDescriptionBasic.style.opacity = "1";
        }, 30)
        activeBasicCard = 1;
        activeCleanerCard = 0;
        activeFoamCard = 0;
    } else {
        productCards[2].classList.remove('products__item_active');
        productDescriptionBasic.style.opacity = "0";
        setTimeout (() => {
            productDescriptionBasic.style.display = "none";
        }, 400)
        activeBasicCard = 0; 
    }
})

    // Ботинок
    const switchBottom = document.querySelector('.about__kick-switch_bottom');
    const switchMiddle = document.querySelector('.about__kick-switch_middle');
    const switchTop = document.querySelector('.about__kick-switch_top');
    const switchAll = document.querySelector('.about__kick-switch_all');
    const kickNone = document.querySelector('.about__kick-img_none');
    const kickBottom = document.querySelector('.about__kick-img_bottom');
    const kickMiddle = document.querySelector('.about__kick-img_middle');
    const kickTop = document.querySelector('.about__kick-img_top');
    const kickAll = document.querySelector('.about__kick-img_all');
    const kickBlock = document.querySelector('.about__kick');
    let isActive = false;

    function articleBottom() {
        return '<p id="article-bottom" class="about__kick-article about__kick-article_bottom">Эффективно очищает подошву.</p>';
    }
    function articleMid() {
        return '<p class="about__kick-article about__kick-article_middle">Продлевает жизнь вашей обуви.</p>';
    }
    function articleTop() {
        return '<p class="about__kick-article about__kick-article_top">Безопасен для кожи рук.</p>';
    }
    function articleAll() {
        return '<p class="about__kick-article about__kick-article_all">Подходит для большинства  материалов.</p>';
    }

    function removeArticle () {
        const article = document.querySelector('.about__kick-article');
        if (article){
            article.remove();
        }
    }

    switchBottom.addEventListener("click", () => {
        removeArticle();
        const currentActiveKick = document.querySelector('.about__kick-img_active');
        if (isActive){
            if (isActive === kickBottom){
                isActive.classList.remove('about__kick-img_active');
                kickNone.classList.add('about__kick-img_active');
                const articleBottomText = document.querySelector('.about__kick-article_bottom');
                isActive = false;
                articleBottomText.remove();
            }  else {
                isActive.classList.remove('about__kick-img_active');
                kickBottom.classList.add('about__kick-img_active');
                kickBlock.insertAdjacentHTML("beforeend", articleBottom());
                isActive = kickBottom;
            }
        } else {
            currentActiveKick.classList.remove('about__kick-img_active');
            kickBottom.classList.add('about__kick-img_active');
            kickBlock.insertAdjacentHTML("beforeend", articleBottom());
            isActive = kickBottom;
        }
    })
    switchMiddle.addEventListener('click', () => {
        removeArticle();
        const currentActiveKick = document.querySelector('.about__kick-img_active');
        if (isActive){
            if (isActive === kickMiddle){
                isActive.classList.remove('about__kick-img_active');
                kickNone.classList.add('about__kick-img_active');
                const articleMiddleText = document.querySelector('.about__kick-article_middle');
                isActive = false;
                articleMiddleText.remove();
            }  else {
                isActive.classList.remove('about__kick-img_active');
                kickMiddle.classList.add('about__kick-img_active');
                kickBlock.insertAdjacentHTML("beforeend", articleMid());
                isActive = kickMiddle;
            }
        } else {
            currentActiveKick.classList.remove('about__kick-img_active');
            kickMiddle.classList.add('about__kick-img_active');
            kickBlock.insertAdjacentHTML("beforeend", articleMid());
            isActive = kickMiddle;
        }
    })
    switchTop.addEventListener('click', () => {
        removeArticle();
        const currentActiveKick = document.querySelector('.about__kick-img_active');
        if (isActive){
            if (isActive === kickTop){
                isActive.classList.remove('about__kick-img_active');
                kickNone.classList.add('about__kick-img_active');
                const articleTopText = document.querySelector('.about__kick-article_top');
                isActive = false;
                articleTopText.remove();
            }  else {
                isActive.classList.remove('about__kick-img_active');
                kickTop.classList.add('about__kick-img_active');
                kickBlock.insertAdjacentHTML("beforeend", articleTop());
                isActive = kickTop;
            }
        } else {
            currentActiveKick.classList.remove('about__kick-img_active');
            kickTop.classList.add('about__kick-img_active');
            kickBlock.insertAdjacentHTML("beforeend", articleTop());
            isActive = kickTop;
        }
    })
    switchAll.addEventListener('click', () => {
        console.log(isActive);
        removeArticle();
        const currentActiveKick = document.querySelector('.about__kick-img_active');
        if (isActive){
            if (isActive == kickAll){
                isActive.classList.remove('about__kick-img_active');
                kickNone.classList.add('about__kick-img_active');
                const articleAllText = document.querySelector('.about__kick-article_all');
                isActive = false;
                articleAllText.remove();
            }  else {
                isActive.classList.remove('about__kick-img_active');
                kickAll.classList.add('about__kick-img_active');
                kickBlock.insertAdjacentHTML("beforeend", articleAll());
                isActive = kickAll;
            }
        } else {
            currentActiveKick.classList.remove('about__kick-img_active');
            kickAll.classList.add('about__kick-img_active');
            kickBlock.insertAdjacentHTML("beforeend", articleAll());
            isActive = kickAll;
        }
    })

    alertBlock = document.querySelector('.buy__alert');
    successAlert = '<p class="buy__alert-text buy__alert_success">Сообщение успешно отправлено</p>';
    function errorAlert(alertText) {
        if (alertText) {
            return `<p class="buy__alert-text buy__alert_danger">${alertText}</p>`;
        }
        return '<p class="buy__alert-text buy__alert_danger">Ошибка при попытке отправить сообщение.</p>';
    } 
    function alertTextChecker () {
        const alertText = document.querySelector('.buy__alert-text');
        if (alertText){
            alertText.remove()
        }
    }

    $('.buy__form-btn').click(function (e) {
        e.preventDefault();
        alertTextChecker ();
        let name = $('input[name = "name"]').val(),
            email = $('input[name = "email"]').val(),
            phone = $('input[name = "phone"]').val(),
            company = $('input[name = "company"]').val(),
            message = $('input[name = "message"]').val();
        $.ajax({
            url: 'http://acrecare.api.loc/partnership',
            type: 'POST',
            dataType: 'json',
            data: {
                name: name,
                email: email,
                phone: phone,
                company: company,
                message: message
            },
            success(data) {
                if (data.status){
                    alertBlock.insertAdjacentHTML("beforeend", successAlert);
                } else {
                    alertBlock.insertAdjacentHTML("beforeend", errorAlert(data.message));
                }
            }
        });
    });