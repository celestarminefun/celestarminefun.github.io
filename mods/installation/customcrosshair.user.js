// ==UserScript==
// @name         Custom Crosshair Mod | Celestar
// @author       thetalkingcat
// @description  A custom crosshair mod for MineFun.io
// @namespace    celestarminefun.github.io
// @version      1.0
// @match        *://minefun.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// ==UserScript==
// @name         Minefun Custom Crosshair
// @namespace    minefun.social
// @version      1.5
// @description  Custom crosshair with working presets, custom image, live preview, auto reapply, and proper centering
// @match        *://minefun.io/*
// @grant        none
// ==/UserScript==

(function(){
'use strict';

/* ===============================
   CROSSHAIR PRESETS
=============================== */

const crosshairPresets = {
    "default": { label: "Default", style: { backgroundColor: "#fff", border: "2px solid #111010", borderRadius: "70.5px", width: 5, height: 5 } },
    "mc": { 
        label: "Minecraft", 
        image: "https://i.imgur.com/6m6kxU8.png", // CORS-friendly link
        style: { border: "none", borderRadius: "0", width: 16, height: 16 } 
    }
};

/* ===============================
   SETTINGS MENU
=============================== */

const ui = document.createElement("div");
ui.className = "mf-crosshair-ui";
ui.innerHTML = `
<div class="mf-crosshair-settings">
  <div class="mf-crosshair-setting">
    <label>Crosshair Preset</label>
    <div class="mf-crosshair-dropdown">
      <div class="selected">Default</div>
      <ul class="options">
        ${Object.entries(crosshairPresets).map(([key,val])=>`<li data-value="${key}">${val.label}</li>`).join("")}
        <li data-value="custom">Custom</li>
      </ul>
    </div>
  </div>
  <div class="mf-crosshair-setting" id="mf-crosshair-custom-url-wrapper" style="display:none;">
    <label>Custom URL</label>
    <input type="text" id="mf-crosshair-custom-url" placeholder="Enter image URL">
  </div>
  <div class="mf-crosshair-setting">
    <label>Size</label>
    <input type="range" id="mf-crosshair-size" min="0.2" max="4" step="0.1">
  </div>
</div>
`;
document.body.appendChild(ui);

/* ===============================
   STYLE
=============================== */

const style = document.createElement("style");
style.textContent = `
.mf-crosshair-ui { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; font-family: Arial, sans-serif; user-select: none; }
.mf-crosshair-settings { display: none; flex-direction: column; gap: 1.5vh; background: rgba(20,20,20,0.95); padding: 2vh; border-radius: 1vh; min-width: 30vh; color: white; font-size: 1.5vh; }
.mf-crosshair-setting { display: flex; justify-content: space-between; align-items: center; gap: 1vh; }
.mf-crosshair-dropdown { position: relative; width: 15vh; cursor: pointer; }
.mf-crosshair-dropdown .selected { background: #222; padding: 0.5vh 1vh; border-radius: 0.5vh; border: 0.1vh solid #444; text-align: center; }
.mf-crosshair-dropdown .options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #222;
    border-radius: 0.5vh;
    border: 0.1vh solid #444;
    display: none;
    list-style: none;
    padding: 0;
    margin-top: 0.5vh;
    max-height: 20vh;
    overflow-y: auto;
    z-index: 1000;

    scrollbar-width: thin;
    scrollbar-color: #888 #222;
}
.mf-crosshair-dropdown .options::-webkit-scrollbar {
    width: 0.8vh;
}

.mf-crosshair-dropdown .options::-webkit-scrollbar-track {
    background: #222;
    border-radius: 0.5vh;
}

.mf-crosshair-dropdown .options::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1vh;
    border: 0.2vh solid #222;
}

.mf-crosshair-dropdown .options::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
}
.mf-crosshair-dropdown .options li { padding: 0.5vh 1vh; transition: background 0.2s; }
.mf-crosshair-dropdown .options li:hover { background: #444; }
#mf-crosshair-custom-url { width: 100%; padding: 0.5vh; border-radius: 0.5vh; border: 0.1vh solid #444; background: #333; color: white; outline: none; }
input[type="range"]{ width:8vh; height:.6vh; -webkit-appearance:none; background:#333; border-radius:.4vh; outline:none; }
input[type="range"]::-webkit-slider-thumb{ -webkit-appearance:none; width:1.2vh; height:1.2vh; border-radius:50%; background:white; cursor:pointer; }
`;
document.head.appendChild(style);

const defaultSettings = { preset: "default", customURL: "", size: 1 };
let settings = JSON.parse(localStorage.getItem("mf-crosshair-settings")) || defaultSettings;

function save(){ localStorage.setItem("mf-crosshair-settings",JSON.stringify(settings)); }

function applyCrosshairTo(aim){
    if(!aim) return;
    aim.style.transition = "all 0.1s linear";
    aim.style.position = "absolute";
    aim.style.top = "50%";
    aim.style.left = "50%";
    aim.style.transform = "translate(-50%, -50%)";
    aim.style.zIndex = "9999";

    if(settings.preset === "custom" && settings.customURL){
        aim.style.backgroundImage = `url('${settings.customURL}')`;
        aim.style.backgroundRepeat = "no-repeat";
        aim.style.backgroundPosition = "center";
        aim.style.backgroundSize = "contain";
        aim.style.backgroundColor = "transparent";
        aim.style.border = "none";
        aim.style.borderRadius = "0";
        aim.style.width = `${32 * settings.size}px`;
        aim.style.height = `${32 * settings.size}px`;
    } else {
        const preset = crosshairPresets[settings.preset];
        if(!preset) return;
        if(preset.image){
            aim.style.backgroundImage = `url('${preset.image}')`;
            aim.style.backgroundRepeat = "no-repeat";
            aim.style.backgroundPosition = "center";
            aim.style.backgroundSize = "contain";
            aim.style.backgroundColor = "transparent";
        } else {
            aim.style.backgroundImage = "";
            aim.style.backgroundColor = preset.style.backgroundColor || "transparent";
        }
        aim.style.border = preset.style.border || "none";
        aim.style.borderRadius = preset.style.borderRadius || "0";
        aim.style.width = `${preset.style.width * settings.size}px`;
        aim.style.height = `${preset.style.height * settings.size}px`;
    }
}
function applyCrosshair(){
    const aim = document.querySelector('.aim[data-v-11a4d221]');
    if(aim) applyCrosshairTo(aim);
}
setInterval(applyCrosshair, 100);

let menuOpen=false;
const menu = document.querySelector(".mf-crosshair-settings");
document.addEventListener("keydown", e=>{
    if(e.code==="F6"){
        menuOpen=!menuOpen;
        menu.style.display = menuOpen?"flex":"none";
    }
});

const dropdown = document.querySelector(".mf-crosshair-dropdown");
const selected = dropdown.querySelector(".selected");
const options = dropdown.querySelector(".options");
const customWrapper = document.getElementById("mf-crosshair-custom-url-wrapper");
const customInput = document.getElementById("mf-crosshair-custom-url");

selected.addEventListener("click", ()=>{ options.style.display = options.style.display==="block"?"none":"block"; });

options.querySelectorAll("li").forEach(li=>{
    li.addEventListener("click", ()=>{
        const val = li.dataset.value;
        selected.textContent = li.textContent;
        options.style.display = "none";
        settings.preset = val;
        customWrapper.style.display = val==="custom"?"flex":"none";
        applyCrosshair();
        save();
    });
});

document.addEventListener("click", e=>{
    if(!dropdown.contains(e.target)) options.style.display="none";
});

customInput.addEventListener("change", ()=>{
    settings.customURL = customInput.value.trim();
    applyCrosshair();
    save();
});

const sizeSlider = document.getElementById("mf-crosshair-size");
sizeSlider.value = settings.size;

sizeSlider.addEventListener("input", ()=>{
    settings.size = parseFloat(sizeSlider.value);
    applyCrosshair();
    save();
});

if(settings.preset==="custom") customWrapper.style.display="flex";
customInput.value = settings.customURL;
selected.textContent = settings.preset==="custom" ? "Custom" : crosshairPresets[settings.preset].label;

})();
