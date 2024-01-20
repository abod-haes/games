let showsetting = document.querySelector(".showsetting");
showsetting.addEventListener("click", (e) => {
    document.querySelector(".setting").style.left = "0px";
    document.querySelector(".overlay").style.right = "0px";
});
document.querySelector(".overlay").addEventListener("click", (e) => {
    document.querySelector(".setting").style.left = "-150%";
    document.querySelector(".overlay").style.right = "-150%   ";
});

document.querySelector(".setting").addEventListener("click", (e) => {
    document.querySelector(".setting").style.left = "-150%";
    document.querySelector(".overlay").style.right = "-150%   ";
});

document
    .querySelector("header nav .connect i ")
    .addEventListener("click", (e) => {
        document.querySelector("header .secondry").classList.toggle("view");
        e.classList.toggle("fas fa-bars showsetting");
    });

let counter = document.querySelectorAll(".counter .box .text  .count ");
let end = document.querySelector(".end");
let start = false;

window.onscroll = () => {
    if (window.scrollY >= end.offsetTop) {
        if (!start) counter.forEach((e) => startCounter(e));
        start = true;
    }

    if (window.scrollY >= 1) {
        document.querySelector("header").style.backgroundColor = "#1b0831";
        document.querySelector("header").style.position = "fixed";
    } else {
        document.querySelector("header").style.backgroundColor = "transparent";
        document.querySelector("header").style.position = "relative";
    }
    if (window.scrollY >= 10) {
        document.querySelector(".main-up ").style.right = "30px";
    } else {
        document.querySelector(".main-up ").style.right = "-100px";
    }
};
document.querySelector(".main-up ").addEventListener("click", (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function startCounter(a) {
    let goal = a.dataset.goal;
    let count = setInterval(() => {
        a.textContent++;
        if (a.textContent == goal) clearInterval(count);
    }, 5000 / goal);
}

let img = document.querySelectorAll(".collection .row img");

setInterval(() => {
    let rand1 = Math.floor(Math.random() * img.length);
    let rand2 = Math.floor(Math.random() * img.length);
    img[rand1].style.animationName = "rotateimg";
    img[rand2].style.animationName = "rotateimg";
}, 2500);

setInterval(() => {
    img.forEach((e) => {
        e.style.animationName = "a";
    });
}, 3500);

let imgabout2 = document.querySelector(".about2 .img img");
imgabout2.addEventListener("click", (e) => {
    let overlayabout2 = (document.querySelector(".overlayabout2").style.left =
        "0");
});
document.querySelector(".overlayabout2").addEventListener("click", (e) => {
    document.querySelector(".overlayabout2").style.left = "-150%";
});
