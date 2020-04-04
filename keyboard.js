"use strict"

openCloseKeyboard();
switchLanguage();
dragKeybord();
clickKeys();


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

function switchLanguage() {
    let switchsLanguage = document.querySelectorAll(".switch-language");
    let keyboard = document.querySelector(".keyboard");
    let capslock = document.querySelector('.keyboard__key[data-key-name="capslock"');

    for (let switchLanguage of switchsLanguage) {
        switchLanguage.addEventListener("click", () => {
            if (keyboard.dataset.language == "ENG") {
                keyboard.dataset.language = "RUS";
            } else {
                keyboard.dataset.language = "ENG";
            }

            switchLanguageKeyboard(keyboard.dataset.language);

            if (capslock.classList.contains("keyboard__key_active")) {
                transformKeysByCapslock(true);
            }
        });
    }

    function switchLanguageKeyboard(language) {
        let keys = Array.from(document.querySelectorAll(".keyboard__key")).filter(key => key.dataset.keyEng && key.dataset.keyRus);

        switch (language) {
            case "ENG":
                keys.forEach(key => key.innerText = key.dataset.keyEng);
                break;
            case "RUS":
                keys.forEach(key => key.innerText = key.dataset.keyRus);
                break;
        }
    }
}


function clickKeys() {
    let keyboard = document.querySelector(".keyboard");
    let textarea = document.querySelector(".page__textarea");

    keyboard.addEventListener("click", (event) => {
        let key = event.target.closest(".keyboard__key");

        if (!key || event.target.classList.contains("switch-language")) {
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
                    transformKeysByCapslock(key.classList.contains("keyboard__key_active"));
                    break;
                case "shift":
                    key.classList.toggle("keyboard__key_active");
                    transformKeysByShift(keyboard.dataset.language, key.classList.contains("keyboard__key_active"));
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

function transformKeysByShift(language, shiftIsActive) {
    let keys = Array.from(document.querySelectorAll(".keyboard__key")).filter(key => key.dataset.shiftRus || key.dataset.shiftEng || key.dataset.shift);

    if (shiftIsActive) {
        switch (language) {
            case "RUS":
                keys.forEach(key => key.innerText = key.dataset.shiftRus || key.dataset.shift);
                break;
            case "ENG":
                keys.forEach(key => key.innerText = key.dataset.shiftEng || key.dataset.shift);
                break;
        }
    } else {
        switch (language) {
            case "RUS":
                keys.forEach(key => key.innerText = key.dataset.keyRus || key.dataset.key);
                break;
            case "ENG":
                keys.forEach(key => key.innerText = key.dataset.keyEng || key.dataset.key);
                break;
        }
    }

    transformKeysByCapslock(shiftIsActive);
}

function transformKeysByCapslock(capslockIsActive) {
    let keys = Array.from(document.querySelectorAll(".keyboard__key"));
    let letters = keys.filter(letter => {
        if ((letter.innerText.toLowerCase().charCodeAt() >= 97 && letter.innerText.toLowerCase().charCodeAt() <= 122 ||
            letter.innerText.toLowerCase().charCodeAt() >= 1072 && letter.innerText.toLowerCase().charCodeAt() <= 1103) &&
            letter.innerText.length == 1) {
            return letter;
        }
    });

    if (capslockIsActive) {
        letters.forEach(letter => letter.innerText = letter.innerText.toUpperCase());
    } else {
        letters.forEach(letter => letter.innerText = letter.innerText.toLowerCase());
    }
}

