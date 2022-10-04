const infobtn = document.querySelector('#boxbtn');
const infopopup = document.querySelector('#box');

function openinfo() {
    infopopup.style.maxHeight = "none";
    infopopup.style.maxWidth = "380px";
    infopopup.style.backgroundColor = "#00000022"
    infopopup.style.color = "#fff"
    infopopup.style.backdropFilter = "blur(15px)"
    infopopup.style.pointerEvents = "all";
}