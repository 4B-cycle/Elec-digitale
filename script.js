function range(x) {/*svp n'enlevez pas ca, c'est un alternative de "for i in range(...)" de python*/
    let recol = [];
    for (let i = 0; i < x; i++) {
        recol.push(i);
    }
    return recol;
}

function input(){/*c'est un version de prompt modifiee*/
    document.querySelectorAll(".overlay").forEach(x => x.remove());
    document.body.innerHTML+=inputFrame;
    return String(promptEntity);
};prompt=input;/*pour que on puisse utiliser prompt() comme input()*/

function ConfirmPrompt(){
    promptEntity=document.querySelector(".input-row").value
    document.querySelectorAll(".overlay").forEach(x => x.remove());
};

const videData="{l:}<span class=empty>:::::::::::::::::::::::::</span>";
const inputFrame=  `<div class="input-frame overlay obg" onclick="document.querySelectorAll('.overlay').forEach(x => x.remove())">
                    <div class="input-popup centre" onclick="event.stopPropagation()">
                        <input type="number" min="0.1" max="100" step="0.1" class="input-row" placeholder="Entre 0,1 et 100" value="10">
                        <img src="./icons/OK.svg" width="32" height="32" alt="OK" class="input-btn btn" onclick="ConfirmPrompt()">
                    </div></div>`;

let dataTexte=[videData, videData, videData, videData];
let dataValeur=[[], [], [], []];
let vitesse=10;
let promptEntity;

function UpdateData() {
}

function Start() {
    for (let i in range(4)) {
        console.log("test"+i);
    }
    setInterval(UpdateData, 1000/vitesse);
}

function ResetHistory() {/*cet fonction sert a effacer des graphes et changer la vitesse de mise a jour*/
    data = [videData, videData, videData, videData];
    document.querySelectorAll(".data.compact").forEach((el, i) => {
        el.innerHTML = data[i];
    });
    vitesse=parseFloat(prompt("Changements par seconde: ").replace(",","."));
    if (isNaN(vitesse)) {
        vitesse=1;
    }
    if (vitesse<0.1&&vitesse>0) {
        vitesse=0.1;
    }
    if (vitesse<0) {
        vitesse=1;
    }
    if (vitesse>100) {
        vitesse=100;
    }
}

function AffDB() {
    alert("test")
}

function AffPCB() {
    alert("test")
}

function TestLEDs() {
    alert("test")
}