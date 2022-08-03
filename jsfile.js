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
let highesteff = document.getElementById("highesteff");
let presenteff = document.getElementById("presenteff");

let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let play = document.getElementById("play");

let efficiency = localStorage.getItem("efficiency");
let calculated_efficiency = null;

if(efficiency !== null){
    highesteff.textContent = "Your best Score:" + efficiency;
}

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


function calc(left,max,taken) {

    let chances_left = left+1;
    let max_chances = parseInt(max/4);
    let total_chances = taken;
    let chances_taken = taken;

    let x = ( chances_left * max_chances ) / ( (total_chances - left) * chances_taken );

    console.log(x);

    calculated_efficiency = (x * 10 );

    calculated_efficiency = Math.round(calculated_efficiency * 1000 / range, 2);

    if(calculated_efficiency > 0){
        presenteff.classList.remove("d-none");
        presenteff.textContent = "Score: " + calculated_efficiency;
        console.log(calculated_efficiency);
    }

    if(calculated_efficiency > efficiency){
        efficiency = calculated_efficiency;
        localStorage.setItem("efficiency",efficiency);
    }
}


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
            numberOfChances.classList.add("d-none");
            resultEl.appendChild(document.createElement("br"));
            let chancesRes = document.createElement("span");
            chancesRes.textContent = counter + " chances left";
            chancesRes.style.color="black";
            chancesRes.style.fontSize = "1.8rem";
            resultEl.appendChild(chancesRes);
            calc(counter,range,chances);

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
    presenteff.classList.add("d-none");
    range = null;
    counter = null;
    randomNumber = null;
    chances = null;
    by = null;
    highesteff.textContent = "Your best Score:" + efficiency;
}

resetBtn.onclick = function() {
    letReset();
};


play.onclick = function(){
    section1.classList.add("d-none");
    section2.classList.remove("d-none");
    document.body.classList.add("bodyclass");
};


