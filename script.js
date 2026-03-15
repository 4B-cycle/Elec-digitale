/*alert("test de connectivite js a html");✅*/
let data=["{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>"];

let vitesse=1;

function WriteData(a, b, c, d) {
    data[0] = data[0].replace("}", a+",}");data[0] = data[0].replace(":<", "<");
    data[1] = data[1].replace("}", b+",}");data[1] = data[1].replace(":<", "<");
    data[2] = data[2].replace("}", c+",}");data[2] = data[2].replace(":<", "<");
    data[3] = data[3].replace("}", d+",}");data[3] = data[3].replace(":<", "<");
    /*for (let datum of data) {
            datum=datum.replace(":<", "<");
}*/

}

function UpdateData() {
    document.querySelectorAll(".data.compact").forEach((el, i) => {
        el.innerHTML = data[i];
    });
}

function Start() {
    UpdateData()
    setInterval(UpdateData, 1000/vitesse);
}

function ResetHistory() {/*cet fonction sert a effacer des graphes et changer la vitesse de mise a jour*/
    data=["{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>"];
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