"use strict"

openCloseKeyboard();
dragKeybord();
clickKeyboard();

function openCloseKeyboard() {
    let btnKeyboard = document.querySelector(".page__keyboard-btn");
    let keyboard = document.querySelector(".keyboard");
    let textarea = document.querySelector(".page__textarea");

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

function clickKeyboard() {
    let keyboard = document.querySelector(".keyboard");
    let textarea = document.querySelector(".page__textarea");

    keyboard.addEventListener("click", (event) => {
        let key = event.target.closest(".keyboard__key");

        if (!key) {
            return;
        }

        if (key.dataset.keyName) {
            switch (key.dataset.keyName) {
                case "backspace":
                    textarea.value = textarea.value.slice(0, -1);
                    break;
                case "return":
                    textarea.value += "\n";
                    break;
                case "capslock":
                    key.classList.toggle("keyboard__key_active");
                    break;
                case "shift": 
                    key.classList.toggle("keyboard__key_active");
                    break;
                case "space_bar":
                    textarea.value += "\0";
                    break;
            }
        } else {
            textarea.value += key.innerText;
        }
        
        textarea.focus();
    });
}