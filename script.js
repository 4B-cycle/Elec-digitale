// --- CONFIGURATION ---
const picoURL = "http://10.147.250.33"; // Ensure this matches your Pico's IP
let vitesse = 1; // Refresh rate (1 = once per second)
const maxHistory = 15; // Number of data points to show in the graph

// --- GLOBAL STATE ---
let history = {
    ti: [], // Temp Interior
    hi: [], // Hum Interior
    te: [], // Temp Exterior
    he: []  // Hum Exterior
};

let promptEntity;
const videData = "{l:}<span class=empty>:::::::::::::::::::::::::</span>";
const inputFrame = `<div class="input-frame overlay obg" onclick="document.querySelectorAll('.overlay').forEach(x => x.remove())">
                    <div class="input-popup centre" onclick="event.stopPropagation()">
                        <input type="number" min="0.1" max="100" step="0.1" class="input-row" placeholder="Entre 0,1 et 100" value="10">
                        <img src="./icons/OK.svg" width="32" height="32" alt="OK" class="input-btn btn" onclick="ConfirmPrompt()">
                    </div></div>`;

// --- CORE DATA FETCHING ---

async function getPicoData() {
    try {
        const response = await fetch(picoURL);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const rawData = await response.text();
        const parts = rawData.split(';');

        if (parts.length === 5) {
            // Mapping values from Pico string: "ti;hi;te;he;angle"
            const data = {
                ti: parts[0],
                hi: parts[1],
                te: parts[2],
                he: parts[3]
            };

            // 1. Update the numeric display spans
            document.querySelector(".temperature.interieur").innerText = data.ti + "°C";
            document.querySelector(".humidite.interieur").innerText = data.hi + "%";
            document.querySelector(".temperature.exterieur").innerText = data.te + "°C";
            document.querySelector(".humidite.exterieur").innerText = data.he + "%";

            // 2. Update the dynamic graphs (data compact)
            // Order: [0]=TI, [1]=HI, [2]=TE, [3]=HE
            updateGraph("ti", data.ti, 0);
            updateGraph("hi", data.hi, 1);
            updateGraph("te", data.te, 2);
            updateGraph("he", data.he, 3);

            // Update Wi-Fi icon to "connected" state
            document.getElementById("etat-wifi").src = "./icons/wifi-4.svg";
            document.getElementById("etat-wifi").alt = "Connected";
        }

    } catch (error) {
        console.error("Could not connect to Pico:", error);
        // Show disconnected state
        document.getElementById("etat-wifi").src = "./icons/no-wifi.svg";
        document.getElementById("etat-wifi").alt = "Disconnected";
    }
}

function updateGraph(key, newValue, elementIndex) {
    // Add new value to history
    history[key].push(Math.round(newValue));

    // Keep history at exactly 15 points
    if (history[key].length > maxHistory) {
        history[key].shift();
    }

    // Build the {l:10,20,30} string
    const graphString = `{l:${history[key].join(',')}}`;
    
    // Fill the remaining space with dots
    const dotsCount = maxHistory - history[key].length;
    const dotsString = ":".repeat(dotsCount);

    // Inject into the HTML element
    const target = document.querySelectorAll(".data.compact")[elementIndex];
    if (target) {
        target.innerHTML = `${graphString}<span class="empty">${dotsString}</span>`;
    }
}

// --- SYSTEM FUNCTIONS ---

function UpdateData() {
    getPicoData();
}

function Start() {
    console.log("System Starting...");
    // Initialize empty graphs
    document.querySelectorAll(".data.compact").forEach(el => el.innerHTML = videData);
    
    // Initial fetch
    getPicoData();
    
    // Set loop based on 'vitesse'
    setInterval(UpdateData, 1000 / vitesse);
}

// --- UTILITIES (Original Logic) ---

function range(x, y=undefined, z=1) {
    if (y==undefined) {y = 0} else {let recol = x; x = y; y = recol;}
    let recol = [];
    for (let i = y; i < x; i += z) {
        recol.push(i);
    }
    return recol;
}

function input() {
    document.querySelectorAll(".overlay").forEach(x => x.remove());
    document.body.innerHTML += inputFrame;
    // Note: This returns the current promptEntity which might be undefined 
    // until ConfirmPrompt is called. Standard JS prompt is synchronous, 
    // but this custom UI is asynchronous.
    return promptEntity;
}
window.prompt = input;

function ConfirmPrompt() {
    promptEntity = document.querySelector(".input-row").value;
    document.querySelectorAll(".overlay").forEach(x => x.remove());
    
    // If the user entered a new speed, we update it
    let newVitesse = parseFloat(promptEntity.replace(",", "."));
    if (!isNaN(newVitesse) && newVitesse > 0) {
        // Refresh page to apply new setInterval timing
        window.location.reload(); 
    }
}

function ResetHistory() {
    // Reset internal arrays
    history = { ti: [], hi: [], te: [], he: [] };
    
    // Prompt for new speed
    window.prompt(); 
}

// Placeholder functions for your other buttons
function GraphStyle(type) { console.log("Changing graph style to:", type); }
function TestLEDs() { alert("Testing Pico LEDs..."); }
function AffDB() { console.log("Database access requested"); }
function AffPCB() { console.log("PCB view requested"); }