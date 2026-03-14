    const STORAGE_KEY = "mf-modmenu-settings";

const defaultData = {
    mods:{
        crosshair:false,
        keystrokes:true,
        zoom:false,
        fps: true,
        cps: false,
        textures: false,
        chat: false,
        thewar: false,
        hpHitColor: false,
        betterChests:false
    },
    crosshair:{
        preset:"default",
        customURL:"",
        size:1
    },
    keystrokes:{},
    zoom:{},
    chat:{
        longerChat:false
    },
    thewar:{
        kdrIndicator:false
    },
    hpHitColor: {
    color: "#ff0000"
    },
    keybinds:{
        menu:"AltLeft"
    }
};

let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};

data.mods = {...defaultData.mods, ...(data.mods || {})};
data.crosshair = {...defaultData.crosshair, ...(data.crosshair || {})};
data.chat = {...defaultData.chat, ...(data.chat || {})};
data.keystrokes = {...(data.keystrokes || {})};
data.thewar = {...(data.thewar || {})};
data.hpHitColor = {...(data.hpHitColor || defaultData.hpHitColor)};
data.keybinds = {...defaultData.keybinds, ...(data.keybinds || {})};

function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const menu = document.createElement("div");
menu.className = "mf-modmenu";

menu.innerHTML = `
<div class="mf-menu">
    <div class="mf-title">Celestar Mod Menu</div>

    <div class="mf-mod-list">

        <div class="mf-mod" data-mod="crosshair">
            <label>
                <input type="checkbox" class="mod-toggle">
                Custom Crosshair
            </label>
            <button class="mod-settings">⚙</button>
        </div>

        <div class="mf-mod" data-mod="textures">
        <label>
        <input type="checkbox" class="mod-toggle">
        Texture Pack <span class="beta-tag">BETA</span>
        </label>
        <button class="mod-settings">⚙</button>
        </div>

        <div class="mf-mod" data-mod="keystrokes">
            <label>
                <input type="checkbox" class="mod-toggle">
                Keystrokes
            </label>
            <button class="mod-settings">⚙</button>
        </div>

        <div class="mf-mod" data-mod="zoom">
            <label>
                <input type="checkbox" class="mod-toggle">
                Zoom
            </label>
            <button class="mod-settings" disabled>⚙</button>
        </div>

        <div class="mf-mod" data-mod="fps">
            <label>
                <input type="checkbox" class="mod-toggle">
                FPS Counter
            </label>
            <button class="mod-settings" disabled>⚙</button>
        </div>

        <div class="mf-mod" data-mod="cps">
            <label>
                <input type="checkbox" class="mod-toggle">
                CPS Counter
            </label>
            <button class="mod-settings" disabled>⚙</button>
        </div>

        <div class="mf-mod" data-mod="chat">
        <label>
        <input type="checkbox" class="mod-toggle">
        Chat
        </label>
        <button class="mod-settings">⚙</button>
        </div>

        <div class="mf-mod" data-mod="thewar">
        <label>
        <input type="checkbox" class="mod-toggle">
        The War Utils
        </label>
        <button class="mod-settings">⚙</button>
        </div>

        <div class="mf-mod" data-mod="hpHitColor">
        <label>
        <input type="checkbox" class="mod-toggle">
        Damage Vignette
        </label>
        <button class="mod-settings">⚙</button>
        </div>

        <div class="mf-mod" data-mod="betterChests">
        <label>
        <input type="checkbox" class="mod-toggle">
        Better Chests
        </label>
        <button class="mod-settings" disabled>⚙</button>
        </div>

        <div class="mf-keybind-row">
        <button id="mf-change-key">Change Menu Key</button>
        <span id="mf-key-display">ALT</span>
        </div>

    </div>

    <div class="mf-settings-page"></div>

</div>
`;

document.body.appendChild(menu);

const style = document.createElement("style");

style.textContent = `

.mf-modmenu{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:999999;
    font-family:Roboto,Arial;
    display:none;
    user-select:none;
}

.mf-menu{
    background:rgba(20,20,20,.95);
    padding:2vh;
    border-radius:1vh;
    display:flex;
    flex-direction:column;
    gap:1.2vh;
    width:28vh;
    box-shadow:0 0 1vh rgba(0,0,0,.4);
    color:white;
    font-size:1.6vh;
}

.mf-title{
    font-size:2vh;
    font-weight:bold;
    text-align:center;
    margin-bottom:0.8vh;
}

.mf-mod{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:0.8vh;
}

.mf-mod label{
    display:flex;
    align-items:center;
    gap:0.6vh;
    cursor:pointer;
}

.mod-settings{
    appearance:none;
    width:2.4vh;
    height:2.4vh;
    border-radius:0.5vh;
    background:#222;
    border:0.2vh solid #444;
    color:white;
    cursor:pointer;
    font-size:1.4vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0;
}

.mod-settings:hover{
    background:#333;
}

.mod-settings:disabled{
    opacity:.3;
    cursor:default;
}

input[type="checkbox"]{
    appearance:none;
    width:2.4vh;
    height:2.4vh;
    border-radius:0.5vh;
    background:black;
    border:0.2vh solid #444;
    cursor:pointer;
    transition:.2s;
}

input[type="checkbox"]:checked{
    background:#d81de3;
    border-color:#d81de3;
}

.mf-setting{
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:white;
    gap:1vh;
}

.mf-settings-page{
    display:flex;
    flex-direction:column;
    gap:1vh;
    margin-top:1vh;
}

select{
    background:#222;
    border:0.15vh solid #444;
    color:white;
    font-size:1.4vh;
    border-radius:0.6vh;
    padding:0.3vh 0.6vh;
    outline: none;
}

option {
  background-color: #222 !important;
  color: #fff !important;
  outline: none !important;
  border:none !important;
}

.mf-modmenu input[type="text"]{
    width:6vh;
    height:2.4vh;
    padding:0.3vh 0.6vh;
    border-radius:0.6vh;
    border:0.15vh solid #555;
    background:#222;
    color:white;
    outline:none;
    font-size:1.4vh;
    text-align:center;
}

input[type="range"]{
    width:12vh;
    height:0.8vh;
    appearance:none;
    background:#333;
    border-radius:0.6vh;
    outline:none;
}

input[type="range"]::-webkit-slider-thumb{
    appearance:none;
    width:1.8vh;
    height:1.8vh;
    border-radius:50%;
    background:#ffffff;
    cursor:pointer;
}

.mf-back{
    background:#222;
    border:0.2vh solid #444;
    color:white;
    border-radius:0.5vh;
    font-size:1.4vh;
    padding:0.4vh 0.8vh;
    cursor:pointer;
    margin-bottom:0.8vh;
}

.mf-back:hover{
    background:#333;
}

#mf-reset-textures{
    background:#e5383b;
    right: 0 !important;
    border:0.2vh solid #660708;
    color:white;
    border-radius:0.5vh;
    font-size:1.4vh;
    padding:0.4vh 0.8vh;
    cursor:pointer;
    margin-bottom:0.8vh;
}

#mf-reset-textures:hover{
    background:#ba181b;
}

.mf-mod-list{
display:flex;
flex-direction:column;
gap:1vh;
}

.minefun-cps,
.minefun-fps{
    background: #2e3644cc;
    border-radius: 5px;
    height: 28px;
    padding: 0 8px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto, sans-serif;
}

.minefun-cps .coord-symbol,
.minefun-fps .coord-symbol{
    color: #ffffffb3;
    margin-right: 4px;
}

.minefun-cps .cps-value,
.minefun-fps .fps-value{
    font-size: 16px;
    color: #ffffff !important;
    font-family: Roboto, sans-serif;
    font-variant-numeric: tabular-nums;
}

#mf-texture-upload {
    position: relative;
    width: 100%;
    color: transparent;
}

#mf-texture-upload::-webkit-file-upload-button {
    visibility: hidden;
}

#mf-texture-upload::before {
    content: "Upload";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #222;
    border: 0.15vh solid #444;
    color: #fff;
    border-radius: 0.6vh;
    padding: 0.3vh 0.6vh;
    cursor: pointer;
    font-size: 1.4vh;
}

#mf-texture-upload:hover::before {
    background: #333;
}

.beta-tag {
    background-color: #e5383b;
    color: white;
    font-size: 0.9em;
    font-weight: bold;
    padding: 0 0.3vh;
    border-radius: 0.3vh;
    margin-left: 0.5vh;
}

#mf-crosshair-preview-box{
    width:10vh;
    height:10vh;
    background:#111;
    border:0.15vh solid #444;
    border-radius:0.6vh;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
}

#mf-crosshair-preview{
    position:absolute;
}

.mf-keybind-row{
display:flex;
justify-content:space-between;
align-items:center;
margin-top:1vh;
}

#mf-change-key{
background:#222;
border:0.2vh solid #444;
color:white;
border-radius:0.5vh;
font-size:1.4vh;
padding:0.4vh 0.8vh;
cursor:pointer;
outline: none;
}

#mf-change-key:hover{
background:#333;
}

#mf-key-display{
font-size:1.7vh;
margin-right: 0.2vw
}

`;

document.head.appendChild(style);

let open = false;

document.addEventListener("keydown", e => {

    if(e.code === data.keybinds.menu){
        open = !open;
        menu.style.display = open ? "block" : "none";
    }

});

document.querySelectorAll(".mf-mod").forEach(row=>{

const mod=row.dataset.mod;
const toggle=row.querySelector(".mod-toggle");

toggle.checked=data.mods[mod];

toggle.onchange=()=>{
data.mods[mod]=toggle.checked;
save();
};

});

const settingsPage = document.querySelector(".mf-settings-page");
const modList = document.querySelector(".mf-mod-list");

document.querySelectorAll(".mod-settings").forEach(btn=>{

btn.onclick=()=>{

const mod=btn.parentElement.dataset.mod;

openSettings(mod);

};

});

function openSettings(mod){

settingsPage.innerHTML="";
settingsPage.style.display="flex";
modList.style.display="none";

const back = document.createElement("button");
back.textContent="Back";
back.className="mf-back";

back.onclick = () => {
    settingsPage.style.display = "none";
    settingsPage.innerHTML = "";
    modList.style.display = "flex";
};

settingsPage.appendChild(back);

if(mod==="crosshair") buildCrosshairSettings();
if(mod==="keystrokes") buildKeystrokesSettings();
if(mod==="textures") buildTextureSettings();
if(mod==="chat") buildChatSettings();
if(mod==="thewar") buildTheWarSettings();
if(mod==="hpHitColor") buildHpHitColorSettings()

}
/* ---------------- CHANGE KEYBIND ---------------- */

const keyBtn = document.getElementById("mf-change-key");
const keyDisplay = document.getElementById("mf-key-display");

function formatKey(code){
    return code
        .replace("Key","")
        .replace("Digit","")
        .replace("Left","")
        .replace("Right","");
}

keyDisplay.textContent = formatKey(data.keybinds.menu);

let waitingKey = false;

keyBtn.onclick = () => {
    keyBtn.textContent = "Press a key...";
    waitingKey = true;
};

document.addEventListener("keydown",e=>{

    if(waitingKey){

        e.preventDefault();

        data.keybinds.menu = e.code;
        updateHomeModTip();
        save();

        keyDisplay.textContent = formatKey(e.code);

        keyBtn.textContent = "Change Menu Key";
        waitingKey = false;

        return;
    }

});

/* ---------------- CROSSHAIR ---------------- */

const crosshairPresets = {

"default":{
label:"Default",
style:{
backgroundColor:"#fff",
border:"2px solid #111010",
borderRadius:"70.5px",
width:1,
height:1
}
},

"plus1":{
label:"Plus 1",
image:"https://celestarminefun.github.io/crosshairs/plus1.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"plus2":{
label:"Plus 2",
image:"https://celestarminefun.github.io/crosshairs/plus2.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"plus3":{
label:"Plus 3",
image:"https://celestarminefun.github.io/crosshairs/plus3.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"plus4":{
label:"Plus 4",
image:"https://celestarminefun.github.io/crosshairs/plus4.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"plus5":{
label:"Plus 5",
image:"https://celestarminefun.github.io/crosshairs/plus5.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"circle1":{
label:"Circle 1",
image:"https://celestarminefun.github.io/crosshairs/circle1.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"circle2":{
label:"Circle 2",
image:"https://celestarminefun.github.io/crosshairs/circle2.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"cross":{
label:"Cross",
image:"https://celestarminefun.github.io/crosshairs/cross.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"eye":{
label:"Eye",
image:"https://celestarminefun.github.io/crosshairs/eye.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},
"triangle":{
label:"Triangle",
image:"https://celestarminefun.github.io/crosshairs/triangle.png",
style:{border:"none",borderRadius:"0",width:32,height:32}
},

};

function buildCrosshairSettings(){

const current=data.crosshair;

settingsPage.insertAdjacentHTML("beforeend", `

<div class="mf-setting">
<label>Preset</label>
<select id="mf-crosshair-preset"></select>
</div>

<div class="mf-setting">
<label>Custom URL</label>
<input id="mf-crosshair-url" type="text">
</div>

<div class="mf-setting">
<label>Size</label>
<input id="mf-crosshair-size" type="range" min="0.2" max="4" step="0.1">
</div>

<div class="mf-setting" style="flex-direction:column; align-items:center;">
<label>Preview</label>

<div id="mf-crosshair-preview-box">
    <div id="mf-crosshair-preview"></div>
</div>

</div>

`);

const presetSelect=document.getElementById("mf-crosshair-preset");

Object.entries(crosshairPresets).forEach(([key,val])=>{
const opt=document.createElement("option");
opt.value=key;
opt.textContent=val.label;
presetSelect.appendChild(opt);
});

const custom=document.createElement("option");
custom.value="custom";
custom.textContent="Custom URL";
presetSelect.appendChild(custom);

presetSelect.value=current.preset;

document.getElementById("mf-crosshair-url").value=current.customURL;
document.getElementById("mf-crosshair-size").value=current.size;

presetSelect.onchange=e=>{
data.crosshair.preset=e.target.value;
save();
updatePreview();
};

document.getElementById("mf-crosshair-url").onchange=e=>{
data.crosshair.customURL=e.target.value;
save();
updatePreview();
};

document.getElementById("mf-crosshair-size").oninput=e=>{
data.crosshair.size=parseFloat(e.target.value);
save();
updatePreview();
};

const preview = document.getElementById("mf-crosshair-preview");

function updatePreview(){

    preview.style = "";

    const fakeAim = preview;

    applyCrosshairTo(fakeAim);

}

updatePreview();

}

function applyCrosshairTo(aim){

if(!data.mods.crosshair) return;

const settings=data.crosshair;

aim.style.position="absolute";
aim.style.top="50%";
aim.style.left="50%";
aim.style.transform="translate(-50%,-50%)";
aim.style.zIndex="9999";

if(settings.preset==="custom" && settings.customURL){

aim.style.backgroundImage=`url('${settings.customURL}')`;
aim.style.backgroundRepeat="no-repeat";
aim.style.backgroundPosition="center";
aim.style.backgroundSize="contain";
aim.style.backgroundColor="transparent";

aim.style.border="none";
aim.style.borderRadius="0";

aim.style.width=`${32*settings.size}px`;
aim.style.height=`${32*settings.size}px`;

return;

}

const preset=crosshairPresets[settings.preset];
if(!preset) return;

if(preset.image){

aim.style.backgroundImage=`url('${preset.image}')`;
aim.style.backgroundRepeat="no-repeat";
aim.style.backgroundPosition="center";
aim.style.backgroundSize="contain";
aim.style.backgroundColor="transparent";

}else{

aim.style.backgroundImage="";
aim.style.backgroundColor=preset.style.backgroundColor;

}

aim.style.border=preset.style.border || "none";
aim.style.borderRadius=preset.style.borderRadius || "0";

aim.style.width=`${preset.style.width*settings.size}px`;
aim.style.height=`${preset.style.height*settings.size}px`;

}

setInterval(()=>{

if(!data.mods.crosshair) return;

let aim = document.querySelector(".aim");

if(!aim){
    aim = document.querySelector(".sights");
}

if(aim){
    applyCrosshairTo(aim);
}

},100);

/* ---------------- TEXTURE PACK ---------------- */

function buildTextureSettings(){
    settingsPage.insertAdjacentHTML("beforeend",`
        <div class="mf-setting">
            <label>Upload Pack</label>
            <input type="file" id="mf-texture-upload" accept=".txt">
        </div>

        <div class="mf-setting">
            <label>Status</label>
            <span id="mf-texture-status">No pack loaded</span>
        </div>

        <div class="mf-setting">
            <button id="mf-reset-textures">Reset Texture Pack</button>
        </div>
    `);

    document.getElementById("mf-texture-upload").addEventListener("change", loadTexturePack);
    document.getElementById("mf-reset-textures").addEventListener("click", resetAllTextureOverrides);
    updateTextureStatus();
}

function isGameElement(el){
    return el.closest(".game");
}
function isGameActive(){
    return !document.querySelector(".home");
}

function resetAllTextureOverrides() {
    for (const key in overrides) delete overrides[key];

    if (data.textures) data.textures.overrides = {};
    save();

    const status = document.getElementById("mf-texture-status");
    if (status) status.textContent = "No pack loaded";

    document.querySelectorAll("img").forEach(img => {
        img.src = img.src;
    });

    alert("Celestar: Texture pack has been removed");
}

const overrides = {};

function overrideURL(url){

for(const original in overrides){

if(url.includes(original)){
return overrides[original];
}

}

return url;

}

function updateTextureStatus() {
    const status = document.getElementById("mf-texture-status");
    if (!status) return;

    if (!data.mods.textures) {
        status.textContent = "Mod Disabled";
    } else if (Object.keys(overrides).length) {
        status.textContent = "Loaded";
    } else {
        status.textContent = "No pack loaded";
    }
}

function loadTexturePack(e){
    const file = e.target.files[0];
    if(!file) return;

    if(!data.mods.textures){
        data.mods.textures = true;
        save();
    }

    file.text().then(text => {
        const lines = text.split("\n");
        const status = document.getElementById("mf-texture-status");
        status.textContent = "Loading...";

        let loaded = false;

        for(const line of lines){
            const idx = line.indexOf(">");
            if(idx === -1) continue;

            const texture = line.slice(0, idx).trim();
            const dataURL = line.slice(idx + 1).trim();

            if(texture && dataURL){
                overrides[texture] = dataURL;
                loaded = true;
            }
        }

        if(loaded){
            status.textContent = "Loaded";
            saveTextureOverrides();
            reloadAllImages();
            confirm(`Celestar: Texture pack "${file.name}" loaded successfully!`);
        } else {
            status.textContent = "Failed";
            confirm("Celestar: Failed to load texture pack!");
        }
    }).catch(err=>{
        console.error(err);
        document.getElementById("mf-texture-status").textContent = "Failed";
        confirm("Celestar: Failed to load texture pack!");
    });
}

const origSetAttr = Element.prototype.setAttribute;
const origSetProp = CSSStyleDeclaration.prototype.setProperty;

const imgSrc = Object.getOwnPropertyDescriptor(
HTMLImageElement.prototype,
"src"
);

Object.defineProperty(HTMLImageElement.prototype, "src", {
    set(value) {

        if (data.mods.textures && isGameActive()) {
            value = overrideURL(value);
        }

        return imgSrc.set.call(this, value);
    },
    get() {
        return imgSrc.get.call(this);
    }
});
Element.prototype.setAttribute = function(name, value) {

    if (data.mods.textures && name === "src" && isGameActive()) {
        value = overrideURL(value);
    }

    return origSetAttr.call(this, name, value);
};

function reloadAllImages() {
    if (!data.mods.textures) return;

    document.querySelectorAll(".game img").forEach(img => {
        img.src = overrideURL(img.src);
    });
}

const savedOverrides = data.textures?.overrides;
if (savedOverrides) {
    Object.assign(overrides, savedOverrides);
    updateTextureStatus();
    reloadAllImages();
}

function saveTextureOverrides() {
    if(!data.textures || typeof data.textures !== "object") data.textures = {};
    data.textures.overrides = {...overrides};
    save();
}

/* ---------------- KEYSTROKES---------------- */

if(!data.keystrokes.size){
data.keystrokes={
x:1,
y:2,
size:1,
theme:"default",
showCPS:false,
border:false,
borderThickness:0.1,
borderColour:"#ffffff",
pressedBG:"#ffffff",
pressedText:"#000000",
shadow:false,
arrows:false,
keys:{shift:"ShiftLeft",crouch:"KeyC"}
};
save();
}

const ks=document.createElement("div");
ks.className="mf-keystrokes";

ks.innerHTML=`

<div class="key-container">

<div class="row">
<div class="key shift-key">SHIFT</div>
<div class="key" data-key="KeyW">W</div>
<div class="key crouch-key">C</div>
</div>

<div class="row">
<div class="key" data-key="KeyA">A</div>
<div class="key" data-key="KeyS">S</div>
<div class="key" data-key="KeyD">D</div>
</div>

<div class="row">
<div class="key wide cps" data-key="LMB">LMB<br><span class="cps-value">0</span></div>
<div class="key wide cps" data-key="RMB">RMB<br><span class="cps-value">0</span></div>
</div>

<div class="row">
<div class="key space" data-key="Space">_______</div>
</div>

</div>

`;

document.body.appendChild(ks);

const ksStyle=document.createElement("style");

ksStyle.textContent=`

.mf-keystrokes{
position:fixed;
bottom:2vh;
left:1vw;
display:flex;
flex-direction:column;
gap:.6vh;
z-index:99999;
font-family:Roboto,Arial;
user-select:none;
}

.key-container{
display:flex;
flex-direction:column;
gap:.6vh;
}

.row{
display:flex;
gap:.6vh;
justify-content:center;
}

.mf-keystrokes .key{
width:4.5vh;
height:4.5vh;
background:rgba(0,0,0,.55);
border-radius:.6vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
font-size:1.3vh;
color:white;
transition:.05s;
line-height:1.1;
border:var(--mf-border,0vh solid transparent);
box-shadow:var(--mf-shadow,0 0 .8vh rgba(0,0,0,.4));
}

.mf-keystrokes .key.active{
background:var(--mf-pressed-bg,#fff) !important;
color:var(--mf-pressed-text,#000) !important;
}

.mf-keystrokes .key.wide{width:7vh;}
.mf-keystrokes .key.space{width:14.6vh;}

.cps-value{
font-size:1vh;
opacity:.8;
margin-top:.2vh;
}

.mf-keystrokes[mf-theme="rainbow"] .key{
animation:rainbowcycle 9s linear infinite;
}

@keyframes rainbowcycle{
0%{background-color:#ff0000}
14%{background-color:#ff7f00}
28%{background-color:#ffff00}
42%{background-color:#00ff00}
57%{background-color:#0000ff}
71%{background-color:#4b0082}
85%{background-color:#8b00ff}
100%{background-color:#ff0000}
}

.mf-keystrokes[mf-theme="celestar"] .key{
background:linear-gradient(270deg,#ff00de,#00beff,#ff00de);
background-size:400% 400%;
animation:rgbmove 12s linear infinite;
}

@keyframes rgbmove{
0%{background-position:0% 50%}
100%{background-position:400% 50%}
}

`;

document.head.appendChild(ksStyle);

function applyKeystrokes(){

if(!data.mods.keystrokes){
ks.style.display="none";
return;
}

ks.style.display="flex";

const s=data.keystrokes;

ks.style.left=s.x+"vw";
ks.style.bottom=s.y+"vh";
ks.style.transform=`scale(${s.size})`;

ks.setAttribute("mf-theme",s.theme);

document.documentElement.style.setProperty(
"--mf-border",
s.border ? s.borderThickness+"vh solid "+s.borderColour : "0vh solid transparent"
);

document.documentElement.style.setProperty("--mf-pressed-bg",s.pressedBG);
document.documentElement.style.setProperty("--mf-pressed-text",s.pressedText);

document.documentElement.style.setProperty(
"--mf-shadow",
s.shadow ? "0 0 .8vh rgba(0,0,0,.4)" : "none"
);

if(s.arrows){

document.querySelector('[data-key="KeyW"]').textContent="↑";
document.querySelector('[data-key="KeyA"]').textContent="←";
document.querySelector('[data-key="KeyS"]').textContent="↓";
document.querySelector('[data-key="KeyD"]').textContent="→";

}else{

document.querySelector('[data-key="KeyW"]').textContent="W";
document.querySelector('[data-key="KeyA"]').textContent="A";
document.querySelector('[data-key="KeyS"]').textContent="S";
document.querySelector('[data-key="KeyD"]').textContent="D";

}

document.querySelectorAll(".mf-keystrokes .cps-value").forEach(e=>{
e.style.display=s.showCPS?"block":"none";
});

}

applyKeystrokes();

/* ---------------- KEY DETECTION ---------------- */

const shiftKey=document.querySelector(".shift-key");
const crouchKey=document.querySelector(".crouch-key");

document.addEventListener("keydown",e=>{

if(!data.mods.keystrokes) return;

if(e.code===data.keystrokes.keys.shift)
shiftKey.classList.add("active");

if(e.code===data.keystrokes.keys.crouch)
crouchKey.classList.add("active");

const key=document.querySelector('[data-key="'+e.code+'"]');
if(key) key.classList.add("active");

});

document.addEventListener("keyup",e=>{

if(e.code===data.keystrokes.keys.shift)
shiftKey.classList.remove("active");

if(e.code===data.keystrokes.keys.crouch)
crouchKey.classList.remove("active");

const key=document.querySelector('[data-key="'+e.code+'"]');
if(key) key.classList.remove("active");

});

/* ---------------- CPS ---------------- */

const lmb=[];
const rmb=[];

document.addEventListener("mousedown",e=>{

if(!data.mods.keystrokes) return;

const now=performance.now();

if(e.button===0){
lmb.push(now);
document.querySelector('[data-key="LMB"]').classList.add("active");
}

if(e.button===2){
rmb.push(now);
document.querySelector('[data-key="RMB"]').classList.add("active");
}

});

document.addEventListener("mouseup",e=>{

if(e.button===0)
document.querySelector('[data-key="LMB"]').classList.remove("active");

if(e.button===2)
document.querySelector('[data-key="RMB"]').classList.remove("active");

});

document.addEventListener("contextmenu",e=>e.preventDefault());

function cpsLoop(){

const now=performance.now();
const windowMs=1000;

while(lmb.length && lmb[0]<now-windowMs) lmb.shift();
while(rmb.length && rmb[0]<now-windowMs) rmb.shift();

const l=document.querySelector('[data-key="LMB"] .cps-value');
const r=document.querySelector('[data-key="RMB"] .cps-value');

if(l) l.textContent=lmb.length;
if(r) r.textContent=rmb.length;

requestAnimationFrame(cpsLoop);

}

cpsLoop();

let dragging=false;

ks.addEventListener("mousedown",()=>{
dragging=true;
});

document.addEventListener("mouseup",()=>dragging=false);

document.addEventListener("mousemove",e=>{

if(!dragging) return;

const vw=innerWidth;
const vh=innerHeight;

data.keystrokes.x=(e.clientX/vw)*100;
data.keystrokes.y=((vh-e.clientY)/vh)*100;

applyKeystrokes();
save();

});

function buildKeystrokesSettings(){

const s=data.keystrokes;

settingsPage.insertAdjacentHTML("beforeend", `

<div class="mf-setting">
<label>Theme</label>
<select id="ks-theme">
<option value="default">Default</option>
<option value="celestar">Celestar</option>
<option value="rainbow">Rainbow</option>
</select>
</div>

<div class="mf-setting">
<label>Size</label>
<input type="range" id="ks-size" min="0.6" max="2" step="0.1">
</div>

<div class="mf-setting">
<label>Show CPS</label>
<input type="checkbox" id="ks-cps">
</div>

<div class="mf-setting">
<label>Border</label>
<input type="checkbox" id="ks-border">
</div>

<div class="mf-setting">
<label>Border Thickness</label>
<input type="range" id="ks-border-thickness" min="0" max="0.4" step="0.02">
</div>

<div class="mf-setting">
<label>Border Colour</label>
<input type="text" id="ks-border-colour">
</div>

<div class="mf-setting">
<label>Pressed BG</label>
<input type="text" id="ks-pressed-bg">
</div>

<div class="mf-setting">
<label>Pressed Text</label>
<input type="text" id="ks-pressed-text">
</div>

<div class="mf-setting">
<label>Box Shadow</label>
<input type="checkbox" id="ks-shadow">
</div>

<div class="mf-setting">
<label>Arrow Keys</label>
<input type="checkbox" id="ks-arrows">
</div>

`);

document.getElementById("ks-theme").value=s.theme;
document.getElementById("ks-size").value=s.size;
document.getElementById("ks-cps").checked=s.showCPS;
document.getElementById("ks-border").checked=s.border;
document.getElementById("ks-border-thickness").value=s.borderThickness;
document.getElementById("ks-border-colour").value=s.borderColour;
document.getElementById("ks-pressed-bg").value=s.pressedBG;
document.getElementById("ks-pressed-text").value=s.pressedText;
document.getElementById("ks-shadow").checked=s.shadow;
document.getElementById("ks-arrows").checked=s.arrows;

document.getElementById("ks-theme").onchange=e=>{
data.keystrokes.theme=e.target.value;
applyKeystrokes();
save();
};

document.getElementById("ks-size").oninput=e=>{
data.keystrokes.size=parseFloat(e.target.value);
applyKeystrokes();
save();
};

document.getElementById("ks-cps").onchange=e=>{
data.keystrokes.showCPS=e.target.checked;
applyKeystrokes();
save();
};

document.getElementById("ks-border").onchange=e=>{
data.keystrokes.border=e.target.checked;
applyKeystrokes();
save();
};

document.getElementById("ks-border-thickness").oninput=e=>{
data.keystrokes.borderThickness=parseFloat(e.target.value);
applyKeystrokes();
save();
};

document.getElementById("ks-border-colour").onchange=e=>{
data.keystrokes.borderColour=e.target.value;
applyKeystrokes();
save();
};

document.getElementById("ks-pressed-bg").onchange=e=>{
data.keystrokes.pressedBG=e.target.value;
applyKeystrokes();
save();
};

document.getElementById("ks-pressed-text").onchange=e=>{
data.keystrokes.pressedText=e.target.value;
applyKeystrokes();
save();
};

document.getElementById("ks-shadow").onchange=e=>{
data.keystrokes.shadow=e.target.checked;
applyKeystrokes();
save();
};

document.getElementById("ks-arrows").onchange=e=>{
data.keystrokes.arrows=e.target.checked;
applyKeystrokes();
save();
};

}

/* ---------------- ZOOM MOD ---------------- */

let zooming=false;

function applyZoom(){

if(!data.mods.zoom) return;

const canvas=document.querySelector(".game-canvas");
if(!canvas) return;

canvas.style.transformOrigin="center center";
canvas.style.transition="transform 0.2s ease";
canvas.style.transform=zooming ? "scale(1.5)" : "scale(1)";

}

setInterval(applyZoom,100);

document.addEventListener("keydown",e=>{
if(e.key.toLowerCase()==="v") zooming=true;
});

document.addEventListener("keyup",e=>{
if(e.key.toLowerCase()==="v") zooming=false;
});

/* ---------------- FPS COUNTER ---------------- */

let fpsDiv=null;
let lastTime=performance.now();
let frames=0;

function injectFPS(){

if(!data.mods.fps) return;

const stats=document.querySelector('.chat .stats');
if(!stats) return;

if(stats.querySelector('.minefun-fps')){
fpsDiv=stats.querySelector('.minefun-fps');
return;
}

fpsDiv=document.createElement("div");
fpsDiv.className="minefun-fps";

fpsDiv.innerHTML=`
<span class="coord-symbol">FPS</span>
<span class="fps-value">0</span>
`;

stats.appendChild(fpsDiv);

}

function fpsLoop(now){

if(!data.mods.fps){
if(fpsDiv) fpsDiv.remove();
requestAnimationFrame(fpsLoop);
return;
}

frames++;

if(now-lastTime>=1000){

const fps=Math.round((frames*1000)/(now-lastTime));
frames=0;
lastTime=now;

if(fpsDiv){
fpsDiv.querySelector(".fps-value").textContent=fps;
}

}

requestAnimationFrame(fpsLoop);

}

requestAnimationFrame(fpsLoop);
setInterval(injectFPS,250);

/* ---------------- CPS COUNTER ---------------- */

let cpsDiv=null;
let clicks=[];

function injectCPS(){

if(!data.mods.cps) return;

const stats=document.querySelector('.chat .stats');
if(!stats) return;

if(stats.querySelector('.minefun-cps')){
cpsDiv=stats.querySelector('.minefun-cps');
return;
}

cpsDiv=document.createElement("div");
cpsDiv.className="minefun-cps";

cpsDiv.innerHTML=`
<span class="coord-symbol">CPS</span>
<span class="cps-value">0</span>
`;

stats.appendChild(cpsDiv);
}

document.addEventListener("mousedown",()=>{

if(!data.mods.cps) return;
clicks.push(Date.now());

});

function cpsStatsLoop(){
    if(!data.mods.cps){
        if(cpsDiv) cpsDiv.remove();
        requestAnimationFrame(cpsStatsLoop);
        return;
    }

    const now = Date.now();
    clicks = clicks.filter(t => now - t <= 1000);

    if(cpsDiv){
        cpsDiv.querySelector(".cps-value").textContent = clicks.length;
    }

    requestAnimationFrame(cpsStatsLoop);
}

requestAnimationFrame(cpsStatsLoop);
setInterval(injectCPS,250);

/* ---------------- CHAT ---------------- */

function buildChatSettings(){
const s = data.chat;

settingsPage.insertAdjacentHTML("beforeend",`
<div class="mf-setting">
<label>Longer Chat</label>
<input type="checkbox" id="chat-longer">
</div>
`);

const checkbox = document.getElementById("chat-longer");
checkbox.checked = s.longerChat;

checkbox.onchange = e => {
data.chat.longerChat = e.target.checked;
save();
applyLongerChat();

};

}

function applyLongerChat(){

const chat = document.querySelector(".messages");
if(!chat) return;
if(data.chat.longerChat){
chat.style.maxHeight = "60vh";
}else{
chat.style.maxHeight = "";
}

}

const chatWait = setInterval(()=>{
const chat = document.querySelector(".messages");

if(!chat) return;
clearInterval(chatWait);
applyLongerChat();

},500);

/* ---------------- THE WAR UTILS ---------------- */
function buildTheWarSettings() {
    const s = data.thewar;

    settingsPage.insertAdjacentHTML("beforeend", `
        <div class="mf-setting">
            <label>KDR Indicator</label>
            <input type="checkbox" id="war-kd">
        </div>
    `);

    const kdCheckbox = document.getElementById("war-kd");
    kdCheckbox.checked = s.kdrIndicator || false;

    kdCheckbox.onchange = e => {
        data.thewar.kdrIndicator = e.target.checked;
        save();
        applyKDDisplay();
    };
}

function applyKDDisplay() {
    if (!data.thewar.kdrIndicator) return;

    const waitStats = setInterval(() => {
        const stats = document.querySelector(".game .stats");
        if (!stats) return;

        const killSection = stats.querySelector(".stat-section .kill-icon")?.parentElement;
        const deathSection = stats.querySelector(".stat-section .death-icon")?.parentElement;

        if (!killSection || !deathSection) return;

        clearInterval(waitStats);

        let kdDiv = stats.querySelector(".kd-display");
        if (!kdDiv) {
            kdDiv = document.createElement("div");
            kdDiv.className = "kd-display";
            kdDiv.style.cssText = `
                background-color: #b422bd;
                border-color: #d81de3;
                border-radius: 10px;
                border-width: 4px;
                min-width: 130px;
                margin-left: 23px;
                border-style: solid;
                padding: 0.5vh 1vh;
                color: white;
                font-family: Lilita One;
                font-size: 6vh !important;
                text-align: center;
                box-shadow: 0 0 0 6px #00000040, 0 0 0 3px #0b0914;
            `;
            stats.appendChild(kdDiv);
            updateKD()
        }

    }, 200);
}

applyKDDisplay()

function updateKD() {
    const stats = document.querySelector(".game .stats");
    if (!stats) return;

    const killSection = stats.querySelector(".stat-section .kill-icon")?.parentElement;
    const deathSection = stats.querySelector(".stat-section .death-icon")?.parentElement;

    const kills = killSection ? parseInt(killSection.textContent.trim()) || 0 : 0;
    const deaths = deathSection ? parseInt(deathSection.textContent.trim()) || 0 : 0;

    let kdDiv = stats.querySelector(".kd-display");
    if (!kdDiv) {
        applyKDDisplay();
        kdDiv = stats.querySelector(".kd-display");
        if (!kdDiv) return;
    }

    kdDiv.textContent = `KDR ${deaths === 0 ? kills : (kills / deaths).toFixed(1)}`;
}

setInterval(updateKD, 300);

/* ---------------- DAMAGE VIG ---------------- */
function buildHpHitColorSettings() {

    const s = data.hpHitColor;

    settingsPage.insertAdjacentHTML("beforeend", `
        <div class="mf-setting">
            <label>Colour</label>
            <input type="text" id="hp-hit-color" placeholder="#ff0000">
        </div>
    `);

    const input = document.getElementById("hp-hit-color");
    input.value = s.color;

    input.onchange = e => {
        let hex = e.target.value.trim();
        if(!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
            alert("Please enter a valid hex color (e.g., #ff0000)");
            input.value = s.color;
            return;
        }
        data.hpHitColor.color = hex;
        save();
        applyHpHitColor();
    };
}

function applyHpHitColor() {
    if(!data.hpHitColor) return;

    const colorHex = data.hpHitColor.color;

    const r = parseInt(colorHex.slice(1,3),16);
    const g = parseInt(colorHex.slice(3,5),16);
    const b = parseInt(colorHex.slice(5,7),16);

    const rgba = `rgba(${r},${g},${b},0.2)`;
    const rgba2 = `rgba(${r},${g},${b},0.02)`;

    let styleEl = document.getElementById("mf-hp-hit-style");
    if(!styleEl){
        styleEl = document.createElement("style");
        styleEl.id = "mf-hp-hit-style";
        document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
.hp-hit {
    background: radial-gradient(49.99% 49.99% at 50.01% 50.01%, ${rgba2} 0% 66.66%, ${rgba2} 89.23%, ${rgba} 100%) !important;
}
    `;
}

setInterval(() => {
    if(data.mods.hpHitColor) applyHpHitColor();
}, 500);

/* ---------------- BETTER CHESTS ---------------- */

if(!data.mods.betterChests) data.mods.betterChests = false;

function updateBetterChests() {
    if (!data.mods.betterChests) return;

    document.querySelectorAll(".chest").forEach(chest => {
        const items = chest.querySelectorAll(".item");

        if (items.length === 18) {
            chest.style.backgroundColor = "#6d7d90";
            chest.style.border = "2px solid #294362";
            items.forEach(item => {
                item.style.backgroundColor = "#b4b3b3";
                item.style.border = "1px solid #8c9aa7";
            });

        } else if (items.length === 27) {
            chest.style.backgroundColor = "#93361f";
            chest.style.border = "2px solid #600f05";
            items.forEach(item => {
                item.style.backgroundColor = "#ca7051";
                item.style.border = "1px solid #b55136";
            });

        } else if (items.length === 36) {
            chest.style.backgroundColor = "#e66e24";
            chest.style.border = "2px solid #c70931";
            items.forEach(item => {
                item.style.backgroundColor = "#edcc70";
                item.style.border = "1px solid #eda01d";
            });

        } else if (items.length === 45) {
            chest.style.backgroundColor = "#09beea";
            chest.style.border = "2px solid #43ccec";
            items.forEach(item => {
                item.style.backgroundColor = "#09f1e8";
                item.style.border = "1px solid #7659ed";
            });

        } else {
            chest.style.backgroundColor = "";
            chest.style.border = "";
            items.forEach(item => {
                item.style.backgroundColor = "";
                item.style.border = "";
            });
        }
    });
}

setInterval(updateBetterChests, 100);

/* ---------------- HOME TIP ---------------- */
function updateHomeModTip() {
    const home = document.querySelector(".home");
    let tip = document.getElementById("mf-home-tip");

    if (home) {

        if (!tip) {
            tip = document.createElement("div");
            tip.id = "mf-home-tip";

            tip.style.position = "fixed";
            tip.style.bottom = "2vh";
            tip.style.left = "50%";
            tip.style.transform = "translateX(-50%)";
            tip.style.padding = "0.5vh 1vh";
            tip.style.backgroundColor = "rgba(20,20,20,0.8)";
            tip.style.color = "#fff";
            tip.style.fontFamily = "Roboto, Arial";
            tip.style.fontSize = "1.6vh";
            tip.style.borderRadius = "0.5vh";
            tip.style.zIndex = "999999";

            document.body.appendChild(tip);
        }

        // 🔹 ALWAYS update the text
        const keyName = formatKey(data.keybinds.menu);
        tip.textContent = `Press ${keyName} for Celestar Mod Menu | dsc.gg/celestar`;

    } else if (tip) {
        tip.remove();
    }
}

setInterval(updateHomeModTip, 200);

/* ---------------- FINAL LOOP ---------------- */

setInterval(()=>{
applyKeystrokes();
},500);
