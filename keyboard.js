"use strict"

openCloseKeyboard();
dragKeybord();

function openCloseKeyboard() {
    let btnKeyboard = document.querySelector(".page__keyboard-btn");
    let keyboard = document.querySelector(".keyboard");

    btnKeyboard.addEventListener("click", () => {
        keyboard.classList.toggle("keyboard_hidden");
    });
}

function dragKeybord() {
    let keyboard = document.querySelector(".keyboard");

    keyboard.addEventListener("mousedown", (event) => {
        let shiftX = event.clientX - keyboard.getBoundingClientRect().left;
        let shiftY = event.clientY - keyboard.getBoundingClientRect().top;

        document.addEventListener("mousemove", moveElement);

        keyboard.onmouseup = () => {
            document.removeEventListener("mousemove", moveElement);
            keyboard.onmouseup = null;
        };

        function moveElement(event) {
            let coordsX = event.pageX - shiftX;
            let coordsY = event.pageY - shiftY;

            fitCoordinates();

            keyboard.style.left = coordsX + "px";
            keyboard.style.top = coordsY + "px";

            function fitCoordinates() {
                if (coordsX < 0) {
                    coordsX = 0;
                }
                if ((coordsX + keyboard.clientWidth) >= document.documentElement.clientWidth) {
                    coordsX = document.documentElement.clientWidth - keyboard.clientWidth;
                }
                if (coordsY < 0) {
                    coordsY = 0;
                }
                if ((coordsY + keyboard.clientHeight) >= document.documentElement.clientHeight) {
                    coordsY = document.documentElement.clientHeight - keyboard.clientHeight;
                }
            }
        }
    });
}