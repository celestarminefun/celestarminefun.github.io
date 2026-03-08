const crosshairPresets = {
    "default": { label: "Default", style: { backgroundColor: "#fff", border: "2px solid #111010", borderRadius: "70.5px", width: 1, height: 1 } },
    "mc": { label: "Minecraft", image: "https://media.discordapp.net/attachments/1471854668559683735/1480054794608709773/mccrosshair.png", style: { border: "none", borderRadius: "0", width: 16, height: 16 } },
    "greencircle": { label: "Green Circle", image: "https://i.imgur.com/FEK3Eyc.png", style: { border: "none", borderRadius: "0", width: 16, height: 16 } },
    "diamond": { label: "Diamond", image: "https://media.discordapp.net/attachments/1353514861526646825/1353514861811863572/image.png", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "okay": { label: "Okay", image: "https://media.discordapp.net/attachments/856723935357173780/1069994777057185822/image.png", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "anya": { label: "Anya", image: "https://media.discordapp.net/attachments/856723935357173780/1108462921710845972/image.png", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "sakura": { label: "Sakura", image: "https://media.discordapp.net/attachments/856723935357173780/1103790854365249536/image.png", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "blueheart": { label: "Blue Heart", image: "https://media.discordapp.net/attachments/856723935357173780/1020656980949467157/image.png", style: { border: "none", borderRadius: "0", width: 16, height: 16 } },
    "X": { label: "X", image: "https://media.discordapp.net/attachments/856723935357173780/941739759791931463/image.png", style: { border: "none", borderRadius: "0", width: 60, height: 60 } },
    "ben10": { label: "Ben 10", image: "https://media.discordapp.net/attachments/856723935357173780/936156953938386984/image.png", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "triangle": { label: "Triangle", image: "https://media.discordapp.net/attachments/901185531185074217/902247225592270928/Guest1917_neon_scifi.png", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "rainbow": { label: "Rainbow", image: "https://media.discordapp.net/attachments/614536835984785434/846192895395495956/rainbow.gif", style: { border: "none", borderRadius: "0", width: 48, height: 48 } },
    "spinning": { label: "Spinning", image: "https://media.discordapp.net/attachments/596103721520201768/596527529829990403/Webp.net-gifmaker_12.gif", style: { border: "none", borderRadius: "0", width: 60, height: 60 } }
};

const defaultSettings = { preset: "default", customURL: "", size: 1 };
let settings = JSON.parse(localStorage.getItem("mf-crosshair-settings")) || defaultSettings;

const ui = document.createElement("div");
ui.className = "mf-crosshair-ui";
ui.innerHTML = `
<div class="mf-crosshair-settings" style="display:none;">
  <div class="mf-crosshair-setting">
    <label>Crosshair Preset</label>
    <div class="mf-crosshair-dropdown">
      <div class="selected">${settings.preset==="custom"?"Custom":crosshairPresets[settings.preset].label}</div>
      <ul class="options">
        ${Object.entries(crosshairPresets).map(([k,v])=>`<li data-value="${k}">${v.label}</li>`).join("")}
        <li data-value="custom">Custom</li>
      </ul>
    </div>
  </div>
  <div class="mf-crosshair-setting" id="mf-crosshair-custom-url-wrapper" style="display:${settings.preset==="custom"?"flex":"none"};">
    <label>Custom URL</label>
    <input type="text" id="mf-crosshair-custom-url" placeholder="Enter image URL" value="${settings.customURL}">
  </div>
  <div class="mf-crosshair-setting">
    <label>Size</label>
    <input type="range" id="mf-crosshair-size" min="0.2" max="4" step="0.1" value="${settings.size}">
  </div>
</div>
`;
document.body.appendChild(ui);

const style = document.createElement("style");
style.textContent = `
.mf-crosshair-ui { font-family: Arial, sans-serif; user-select: none; z-index:999999; }
.mf-crosshair-settings { display:flex; flex-direction: column; gap: 1.5vh; background: rgba(20,20,20,0.95); padding: 2vh; border-radius: 1vh; min-width: 30vh; color: white; font-size: 1.5vh; position: fixed; top:10%; left:50%; transform: translateX(-50%); }
.mf-crosshair-setting { display:flex; justify-content: space-between; align-items:center; gap:1vh; }
.mf-crosshair-dropdown { position:relative; width:15vh; cursor:pointer; }
.mf-crosshair-dropdown .selected { background:#222; padding:0.5vh 1vh; border-radius:0.5vh; border:0.1vh solid #444; text-align:center; }
.mf-crosshair-dropdown .options { position:absolute; top:100%; left:0; right:0; background:#222; border-radius:0.5vh; border:0.1vh solid #444; display:none; list-style:none; padding:0; margin-top:0.5vh; max-height:20vh; overflow-y:auto; z-index:1000; }
.mf-crosshair-dropdown .options li { padding:0.5vh 1vh; transition:background 0.2s; cursor:pointer; }
.mf-crosshair-dropdown .options li:hover { background:#444; }
#mf-crosshair-custom-url { width:100%; padding:0.5vh; border-radius:0.5vh; border:0.1vh solid #444; background:#333; color:white; outline:none; }
input[type="range"]{ width:8vh; height:.6vh; -webkit-appearance:none; background:#333; border-radius:.4vh; outline:none; }
input[type="range"]::-webkit-slider-thumb{ -webkit-appearance:none; width:1.2vh; height:1.2vh; border-radius:50%; background:white; cursor:pointer; }
`;
document.head.appendChild(style);

const crosshair = document.createElement("div");
crosshair.className = "mf-crosshair";
document.body.appendChild(crosshair);

function applyCrosshair(){
    crosshair.style.position="absolute";
    crosshair.style.top="50%";
    crosshair.style.left="50%";
    crosshair.style.transform="translate(-50%, -50%)";
    crosshair.style.zIndex="9999";
    crosshair.style.transition="all 0.1s linear";

    if(settings.preset==="custom" && settings.customURL){
        crosshair.style.backgroundImage=`url('${settings.customURL}')`;
        crosshair.style.backgroundRepeat="no-repeat";
        crosshair.style.backgroundPosition="center";
        crosshair.style.backgroundSize="contain";
        crosshair.style.backgroundColor="transparent";
        crosshair.style.border="none";
        crosshair.style.borderRadius="0";
        crosshair.style.width=`${32*settings.size}px`;
        crosshair.style.height=`${32*settings.size}px`;
    } else {
        const preset = crosshairPresets[settings.preset];
        if(!preset) return;
        if(preset.image){
            crosshair.style.backgroundImage=`url('${preset.image}')`;
            crosshair.style.backgroundRepeat="no-repeat";
            crosshair.style.backgroundPosition="center";
            crosshair.style.backgroundSize="contain";
            crosshair.style.backgroundColor="transparent";
        } else {
            crosshair.style.backgroundImage="";
            crosshair.style.backgroundColor=preset.style.backgroundColor||"transparent";
        }
        crosshair.style.border=preset.style.border||"none";
        crosshair.style.borderRadius=preset.style.borderRadius||"0";
        crosshair.style.width=`${preset.style.width*settings.size}px`;
        crosshair.style.height=`${preset.style.height*settings.size}px`;
    }
}
applyCrosshair();
setInterval(applyCrosshair,100);

const menu = ui.querySelector(".mf-crosshair-settings");
let menuOpen=false;
document.addEventListener("keydown", e=>{
    if(e.code==="F8"){
        menuOpen=!menuOpen;
        menu.style.display=menuOpen?"flex":"none";
    }
});

const dropdown = ui.querySelector(".mf-crosshair-dropdown");
const selected = dropdown.querySelector(".selected");
const options = dropdown.querySelector(".options");
const customWrapper = ui.querySelector("#mf-crosshair-custom-url-wrapper");
const customInput = ui.querySelector("#mf-crosshair-custom-url");
const sizeSlider = ui.querySelector("#mf-crosshair-size");

selected.addEventListener("click", ()=>{ options.style.display = options.style.display==="block"?"none":"block"; });
options.querySelectorAll("li").forEach(li=>{
    li.addEventListener("click", ()=>{
        const val = li.dataset.value;
        settings.preset=val;
        selected.textContent=val==="custom"?"Custom":crosshairPresets[val].label;
        customWrapper.style.display = val==="custom"?"flex":"none";
        options.style.display="none";
        applyCrosshair();
        localStorage.setItem("mf-crosshair-settings",JSON.stringify(settings));
    });
});
document.addEventListener("click", e=>{ if(!dropdown.contains(e.target)) options.style.display="none"; });
customInput.addEventListener("change", ()=>{ settings.customURL=customInput.value.trim(); applyCrosshair(); localStorage.setItem("mf-crosshair-settings",JSON.stringify(settings)); });
sizeSlider.addEventListener("input", ()=>{ settings.size=parseFloat(sizeSlider.value); applyCrosshair(); localStorage.setItem("mf-crosshair-settings",JSON.stringify(settings)); });
