(function(){
'use strict';

const ui=document.createElement("div");
ui.className="mf-keystrokes";

ui.innerHTML=`

<div class="mf-settings">

<div class="mf-setting">
<label>Theme</label>
<div class="custom-dropdown">
  <div class="selected">Default</div>
  <ul class="options">
    <li data-value="default">Default</li>
    <li data-value="celestar">Celestar</li>
    <li data-value="rainbow">Rainbow</li>
  </ul>
</div>
</div>

<div class="mf-setting">
<label>Size</label>
<input type="range" id="mf-size" min="0.6" max="2" step="0.1">
</div>

<div class="mf-setting toggle">
<label>Show CPS</label>
<input type="checkbox" id="mf-cps">
</div>

<div class="mf-setting">
<label id="shift-label">Key: SHIFT</label>
<button id="rebind-shift">Change</button>
</div>

<div class="mf-setting">
<label id="crouch-label">Key: C</label>
<button id="rebind-c">Change</button>
</div>

</div>

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

document.body.appendChild(ui);

const style=document.createElement("style");

style.textContent=`

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
}

.mf-keystrokes .key.active{
background:white !important;
color:black !important;
}

.mf-keystrokes .key.wide{
width:7vh;
}

.mf-keystrokes .key.space{
width:14.6vh;
}

.cps-value{
font-size:1vh;
opacity:.8;
margin-top:.2vh;
}

.mf-settings{
position:absolute;
bottom:105%;
left:0;
background:rgba(20,20,20,.95);
padding:1vh;
border-radius:.7vh;
font-size:1.2vh;
display:none;
flex-direction:column;
gap:.8vh;
width:16vh;
box-shadow:0 0 .8vh rgba(0,0,0,.4);
}

.mf-setting{
display:flex;
justify-content:space-between;
align-items:center;
color:white;
gap:.5vh;
}

.custom-dropdown {
  position: relative;
  width: 16vh;
  font-size: 1.2vh;
  color: white;
  user-select: none;
  cursor: pointer;
}

.custom-dropdown .selected {
  background: #222;
  padding: 0.3vh 0.6vh; 
  width: 3vw;
  margin-left: 2.05vw;
  border-radius: 0.4vh;
  border: 0.1vh solid #444;
  font-size: 1.1vh;
  cursor: pointer;
  text-align: center;
}

.custom-dropdown .options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 3.5vw;
  margin-left: 2.05vw;
  background: #222;
  border-radius: 0.4vh;
  border: 0.1vh solid #444;
  margin-top: 0.3vh;
  list-style: none;
  padding: 0;
  display: none;
  max-height: 20vh;
  overflow-y: auto;
  z-index: 1000;
}

.custom-dropdown .options li {
  padding: 0.5vh 0.8vh;
  transition: background 0.2s;
}

.custom-dropdown .options li:hover {
  background: #444;
}

.mf-setting > .custom-dropdown {
    margin-left: auto;
}

input[type="range"]{
width:8vh;
height:.6vh;
appearance:none;
background:#333;
border-radius:.4vh;
outline:none;
}

input[type="range"]::-webkit-slider-thumb{
appearance:none;
width:1.2vh;
height:1.2vh;
border-radius:50%;
background:white;
cursor:pointer;
}

button{
background:#222;
border:.1vh solid #444;
outline: none;
color:white;
font-size:1.1vh;
padding:.3vh .6vh;
border-radius:.4vh;
cursor:pointer;
transition:.15s;
}

button:hover{
background:#333;
}

.mf-keystrokes[mf-theme="rainbow"] .key {
  animation: rainbowcycle 9s linear infinite;
  box-shadow:0 0 .8vh rgba(0,0,0,.4);
}

@keyframes rainbowcycle {
  0%   { background-color: #ff0000; }
  14%  { background-color: #ff7f00; }
  28%  { background-color: #ffff00; }
  42%  { background-color: #00ff00; }
  57%  { background-color: #0000ff; }
  71%  { background-color: #4b0082; }
  85%  { background-color: #8b00ff; }
  100% { background-color: #ff0000; }
}

.mf-keystrokes[mf-theme="celestar"] .key{
background:linear-gradient(270deg,#ff00de,#00beff,#ff00de);
background-size:400% 400%;
animation:rgbmove 12s linear infinite;
box-shadow:0 0 .8vh rgba(0,0,0,.4);
}

@keyframes rgbmove {
  0%   { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}
`;

document.head.appendChild(style);

const defaultSettings={
x:1,
y:2,
size:1,
theme:"default",
showCPS:true,
keys:{shift:"ShiftLeft",crouch:"KeyC"}
};

let settings=JSON.parse(localStorage.getItem("mf-keystrokes-settings"))||defaultSettings;

function save(){
localStorage.setItem("mf-keystrokes-settings",JSON.stringify(settings));
}

function apply(){

ui.style.left=settings.x+"vw";
ui.style.bottom=settings.y+"vh";
ui.style.transform=`scale(${settings.size})`;

ui.setAttribute("mf-theme", settings.theme);

document.querySelectorAll(".cps-value").forEach(e=>{
e.style.display=settings.showCPS?"block":"none";
});

const customDropdown = document.querySelector(".custom-dropdown");
customDropdown.querySelector(".selected").textContent = settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1);
}

apply();

const customDropdown = document.querySelector(".custom-dropdown");
const selected = customDropdown.querySelector(".selected");
const options = customDropdown.querySelector(".options");

selected.addEventListener("click", e => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

options.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", e => {
        const value = li.dataset.value;
        selected.textContent = li.textContent;
        options.style.display = "none";
        settings.theme = value;
        apply();
        save();
    });
});

document.addEventListener("click", e => {
    if (!customDropdown.contains(e.target)) {
        options.style.display = "none";
    }
});

const size=document.getElementById("mf-size");
const cps=document.getElementById("mf-cps");

size.value=settings.size;
cps.checked=settings.showCPS;

function updateSize(){
settings.size=parseFloat(size.value);
apply();
}

size.addEventListener("change",updateSize);
size.addEventListener("mouseup",updateSize);
size.addEventListener("touchend",updateSize);

cps.onchange=e=>{
settings.showCPS=e.target.checked;
apply();
};

let edit=false;
const menu=document.querySelector(".mf-settings");

document.addEventListener("keydown",e=>{
if(e.code==="F4"){
edit=!edit;
menu.style.display=edit?"flex":"none";
if(!edit) save();
}
});

let dragging=false;
const keys=document.querySelector(".key-container");

keys.addEventListener("mousedown",()=>{
if(edit) dragging=true;
});

document.addEventListener("mouseup",()=>dragging=false);

document.addEventListener("mousemove",e=>{

if(!dragging) return;

const vw=innerWidth;
const vh=innerHeight;

settings.x=(e.clientX/vw)*100;
settings.y=((vh-e.clientY)/vh)*100;

apply();

});

const shiftKey=document.querySelector(".shift-key");
const crouchKey=document.querySelector(".crouch-key");

const shiftLabel=document.getElementById("shift-label");
const crouchLabel=document.getElementById("crouch-label");

function displayKey(code){

if(code.includes("Shift")) return "SHIFT";
if(code.startsWith("Key")) return code.replace("Key","");
return code;

}

function rebind(type,button,label){

button.textContent="Press any key";

const handler=e=>{

e.preventDefault();

if(type==="shift"){
settings.keys.shift=e.code;
shiftKey.textContent=displayKey(e.code);
label.textContent="Key: "+displayKey(e.code);
}

if(type==="crouch"){
settings.keys.crouch=e.code;
crouchKey.textContent=displayKey(e.code);
label.textContent="Key: "+displayKey(e.code);
}

button.textContent="Change";

save();

document.removeEventListener("keydown",handler);

};

document.addEventListener("keydown",handler);

}

document.getElementById("rebind-shift").onclick=e=>{
rebind("shift",e.target,shiftLabel);
};

document.getElementById("rebind-c").onclick=e=>{
rebind("crouch",e.target,crouchLabel);
};

document.addEventListener("keydown",e=>{

if(e.code===settings.keys.shift)
shiftKey.classList.add("active");

if(e.code===settings.keys.crouch)
crouchKey.classList.add("active");

const key=document.querySelector('[data-key="'+e.code+'"]');
if(key) key.classList.add("active");

});

document.addEventListener("keyup",e=>{

if(e.code===settings.keys.shift)
shiftKey.classList.remove("active");

if(e.code===settings.keys.crouch)
crouchKey.classList.remove("active");

const key=document.querySelector('[data-key="'+e.code+'"]');
if(key) key.classList.remove("active");

});

const lmb=[];
const rmb=[];

document.addEventListener("mousedown",e=>{

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

document.querySelector('[data-key="LMB"] .cps-value').textContent=lmb.length;
document.querySelector('[data-key="RMB"] .cps-value').textContent=rmb.length;

requestAnimationFrame(cpsLoop);

}

cpsLoop();

})();
