/*alert("test de connectivite js a html");✅*/
let data=["{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>",
          "{l:}<span class=empty>:::::::::::::::::::::::::</span>"];

function Start() {
    /*
    document.querySelectorAll(".data.compact").forEach((el, i) => {
        el.innerHTML = data[i];
    });*/
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