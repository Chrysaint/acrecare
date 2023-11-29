const burger = document.querySelector('.burger');
const nav = document.querySelector('.burger-nav');
const blackOut = document.querySelector('.black-out');
const body = document.querySelector('body');
let burgerFlag = "closed";

function burgerMenu (state) {
    const burgerBtn = document.querySelector('.burger');
    nav.setAttribute("data-state", state);
    burgerBtn.setAttribute("data-state", state);
    blackOut.setAttribute("data-state", state);
}

blackOut.addEventListener('click', () => {
    burgerFlag = "closed";
    burgerMenu(burgerFlag);
})

burger.addEventListener('click', () => {
    console.log("hola")
    if (burgerFlag == "closed") {
        burgerFlag = "opened";
        nav.style.display = "block"
        body.style.overflow = "hidden";
        setTimeout(() => {
            burgerMenu(burgerFlag);
        }, 100)
    } else {
        burgerFlag = "closed";
        burgerMenu(burgerFlag);
        body.style.overflow = "auto";
        setTimeout(() => {
            nav.style.display = "none";
        }, 300)
    }   
})