function range(x) {/*svp n'enlevez pas ca, c'est un alternative de "for i in range(...)" de python*/
    let recol = [];
    for (let i = 0; i < x; i++) {
        recol.push(i);
    }
    return recol;
}

function input(){/*c'est un version de prompt modifiee*/
};prompt=input;/*pour que on puisse utiliser input() comme prompt()*/

const videData="{l:}<span class=empty>:::::::::::::::::::::::::</span>";
const inputFrame=  `<div class="input-frame overlay">
                        <div class="input-popup">
                            <input type="number" min="0.1" max="100" step="0.1" class="input-row" placeholder="Entre 0,1 et 100" value="10">
                            <button class="input-btn">OK</button>
                        </div>
                    </div>`

let dataTexte=[videData, videData, videData, videData];
let dataValeur=[[], [], [], []];
let vitesse=1;

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