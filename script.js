const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    refreshBtn = document.querySelector(".refresh"),
    inputField = document.querySelector("input"),
    checkBtn = document.querySelector(".check-word"),
    timeText = document.querySelector(".time span b"),
    alertText = document.querySelector('.centered-alert p');

let correctWord, timer;
alertText.innerHTML = "Click on Close Button to Start the game...";

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerHTML = maxTime;
        }
        clearInterval(timer);
        alertText.innerHTML = `Oops! Time Over! Correct word was ${correctWord.toUpperCase()}`;
        openAlert();
        initGame();
    }, 1000)
}

const initGame = () => {
    initTimer(30);
    inputField.focus();
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    correctWord = randomObj.word.toLowerCase();
    wordText.innerHTML = wordArray.join("");
    hintText.innerHTML = randomObj.hint;
    
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.setAttribute("minlength", correctWord.length);
}

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();

    if (!userWord){
        alertText.innerHTML = "Please enter a word";
        openAlert();
        inputField.focus();
        return;
    }
    if (userWord !== correctWord) {
        alertText.innerHTML = `Sorry, ${userWord.toUpperCase()} is not correct. Try again.`;
        openAlert();
        inputField.focus();
        return;
    }
    alertText.innerHTML = "Congratulations! You found the correct word.";
    openAlert();

    initGame();
    inputField.focus();
}

function closeAlert() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.centered-alert').style.display = 'none';
    inputField.focus();
    if(alertText.innerHTML == "Click on Close Button to Start the game..."){
        initGame();
    }
}

function openAlert(){
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.centered-alert').style.display = 'block';
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
alertText.addEventListener("click", closeAlert);
