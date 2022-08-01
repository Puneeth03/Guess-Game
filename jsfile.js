let rangeEl = document.getElementById("rangeEl");
let chancesEl = document.getElementById("chancesEl");
let enteredEl = document.getElementById("enteredEl");
let resultEl = document.getElementById("resultEl");
let resetBtn = document.getElementById("refresh");
let numberOfChances = document.getElementById("numberOfChances");
let ans = document.getElementById("ans");
let pId = document.getElementById("pId");
let lightningImage = document.getElementById("lightningImage");
let textPara = document.getElementById("textPara");
let expPara = document.getElementById("expPara");
let chancesHint = document.getElementById("chancesHint");

let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let play = document.getElementById("play");

let arr = [0,2,3,4];

let by = null;

let range = null;

let counter = null;

let randomNumber = null;

let chances = null;

function generateBy(){
    by = arr[Math.ceil(Math.random()*3)];
}

function generateRandNum(event) {

    range = rangeEl.value;
    range = parseInt(range);

    if (event.key === "Enter") {
        console.log(range);
        randomNumber = Math.ceil(Math.random() * range);
        console.log(randomNumber);

        chancesHint.textContent = "The maximum you can enter is " + parseInt(range / 4);
        chancesHint.classList.remove("d-none");

        generateBy();
    }
}

rangeEl.addEventListener("keydown", function(event) {
    generateRandNum(event);
});

function setChances(event) {
    if (event.key === "Enter") {

        chances = chancesEl.value;
        chances = parseInt(chances);

        console.log(chances);

        console.log(parseInt(range / 4));

        if (chances > range / 4) {
            alert("Check Note!!!! Try to decrease the chances");
        } else {
            counter = chances;
            numberOfChances.classList.remove("d-none");
            numberOfChances.textContent = counter + " chances left";
        }
    }

}

chancesEl.addEventListener("keydown", function(event) {
    setChances(event);
});

chancesEl.addEventListener("click", function(event) {
    if (randomNumber === null) {
        alert("Enter RANGE");
    }
});

function checkNumber(event) {

    let enteredNumber = parseInt(enteredEl.value);

    if (event.key === "Enter") {

        counter = counter - 1;
        numberOfChances.textContent = counter + " chances left";
        if (counter === 0 && enteredNumber !== randomNumber) {
            numberOfChances.textContent = "";
            resultEl.textContent = "";
            numberOfChances.textContent = "You are out of chances";
            numberOfChances.style.fontSize = "25px";
            expPara.classList.remove("d-none");
            ans.textContent = "The number to be guessed is " + randomNumber;
        } else if (enteredNumber === randomNumber) {
            resultEl.textContent = "Yes U guessed it RIGHT";
            pId.classList.remove("d-none");
            ans.textContent = "";


        } else {
            enteredEl.value = "";
            if (enteredNumber <= randomNumber / by) {
                ans.textContent = "The number you entered is SMALLER than the original number to be guessed";
            } else if (enteredNumber <= (randomNumber)) {
                ans.textContent = "The number you entered is ALMOST NEAR to the original number to be guessed";
            } else if (enteredNumber >= randomNumber) {
                ans.textContent = "The number you entered is BIGGER than the original number to be guessed";
            }
        }
    }
}

enteredEl.addEventListener("keydown", function(event) {
    textPara.classList.add("d-none");

    if (counter > 0) {
        checkNumber(event);
    }
});

enteredEl.addEventListener("click",function(){
    if (range === null){
        alert("Enter RANGE");
    }
    else if (chances === null){
        alert("Enter CHANCES");
    }
});

function letReset() {
    resultEl.textContent = "";
    rangeEl.value = "";
    chancesEl.value = "";
    enteredEl.value = "";
    numberOfChances.textContent = "";
    pId.classList.add("d-none");
    ans.textContent = "";
    textPara.classList.remove("d-none");
    expPara.classList.add("d-none");
    chancesHint.classList.add("d-none");
    range = null;
    counter = null;
    randomNumber = null;
    chances = null;
    by = null;
}

resetBtn.onclick = function() {
    letReset();
};


play.onclick = function(){
    section1.classList.add("d-none");
    section2.classList.remove("d-none");
    document.body.classList.add("bodyclass");
};


