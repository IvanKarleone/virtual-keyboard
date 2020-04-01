"use strict"

openCloseKeyboard();

function openCloseKeyboard() {
    let btnKeyboard = document.querySelector(".page__keyboard-btn");
    let keyboard = document.querySelector(".keyboard");

    btnKeyboard.addEventListener("click", () => {
        keyboard.classList.toggle("keyboard_hidden");
    });
}