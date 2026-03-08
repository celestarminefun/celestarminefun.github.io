(function(){
const crosshairPresets = {
    "default": { label: "Default", style: { backgroundColor: "#fff", border: "2px solid #111010", borderRadius: "70.5px", width: 1, height: 1 } },
    "mc": {
        label: "Minecraft",
        image: "https://media.discordapp.net/attachments/1471854668559683735/1480054794608709773/mccrosshair.png?ex=69ae47f1&is=69acf671&hm=620f4fc609c7f68a04812d4b377cf938b81131a8aa344864a6fd0838acd4162b&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 16, height: 16 }
    },
    "greencircle": {
        label: "Green Circle",
        image: "https://images-ext-1.discordapp.net/external/i2QGlfURY5GvvezRPxSx5xAQVa3iw9WNjNtD9sLVW4w/https/i.imgur.com/FEK3Eyc.png?format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 16, height: 16 }
    },
    "diamond": {
        label: "Diamond",
        image: "https://media.discordapp.net/attachments/1353514861526646825/1353514861811863572/image.png?ex=69ae09f2&is=69acb872&hm=2eb8fa17fa8e082515c1f37bfad3e2f38471c0f4265d92fe585a7e1c6ff31df7&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "okay": {
        label: "Okay",
        image: "https://media.discordapp.net/attachments/856723935357173780/1069994777057185822/image.png?ex=69ae370a&is=69ace58a&hm=d1e128d5016591391a83d23daba9e1fc0363df2d82987e852f16bc06077f316f&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "anya": {
        label: "Anya",
        image: "https://media.discordapp.net/attachments/856723935357173780/1108462921710845972/image.png?ex=69adc18a&is=69ac700a&hm=a7279f09e5f1545eafc9d15a71204a2aca6ff92bf699414cb3d5a204ffa58b66&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "sakura": {
        label: "Sakura",
        image: "https://media.discordapp.net/attachments/856723935357173780/1103790854365249536/image.png?ex=69ade5d7&is=69ac9457&hm=99c713556243d9db8929e28079c9dd7dd4c473ded0bf5fbf2740f75d8f64aec2&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "blueheart": {
        label: "Blue Heart",
        image: "https://media.discordapp.net/attachments/856723935357173780/1020656980949467157/image.png?ex=69ae05a3&is=69acb423&hm=892605e375dc8051d511d04aad2d956b52043b675336772dfe479f717889e9b5&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 16, height: 16 }
    },
    "X": {
        label: "X",
        image: "https://media.discordapp.net/attachments/856723935357173780/941739759791931463/image.png?ex=69ae533f&is=69ad01bf&hm=36187f98c2a01fcea0af8c4df9e5d206d7a68ee564e44511965c065c6a98083a&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 60, height: 60 }
    },
    "ben10": {
        label: "Ben 10",
        image: "https://media.discordapp.net/attachments/856723935357173780/936156953938386984/image.png?ex=69adca5a&is=69ac78da&hm=6066611728e833006ff5d65cf3edcc2645d6efef7ac9c52a1e29040445170c7a&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "triangle": {
        label: "Triangle",
        image: "https://media.discordapp.net/attachments/901185531185074217/902247225592270928/Guest1917_neon_scifi.png?ex=69adb1b5&is=69ac6035&hm=0c53407ce6437aa88525f23f5454c55f0e8b05599c30ffa47bad7438bf51362e&=&format=webp&quality=lossless",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "rainbow": {
        label: "Rainbow",
        image: "https://media.discordapp.net/attachments/614536835984785434/846192895395495956/rainbow.gif?ex=69ae1d8b&is=69accc0b&hm=4f0e58973d903c7ea16c3f6bcbef11929676daa5f08c40b4874a4a9b0cecce22&=",
        style: { border: "none", borderRadius: "0", width: 48, height: 48 }
    },
    "spinning": {
        label: "Spinning",
        image: "https://media.discordapp.net/attachments/596103721520201768/596527529829990403/Webp.net-gifmaker_12.gif?ex=69ae300e&is=69acde8e&hm=546b90980d3ed839bc65f6dd5177dd19138aaddb637c8005d66e9f80ac09f964&=",
        style: { border: "none", borderRadius: "0", width: 60, height: 60 }
    },
};

const crosshairUI = document.createElement("div");
crosshairUI.className = "mf-crosshair-ui";
crosshairUI.innerHTML = `
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
document.body.appendChild(crosshairUI);

const style = document.createElement("style");
style.textContent = `
.mf-crosshair-ui { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; font-family: Arial, sans-serif; user-select: none; }
.mf-crosshair-settings { display: none; flex-direction: column; gap: 1.5vh; background: rgba(20,20,20,0.95); padding: 2vh; border-radius: 1vh; min-width: 30vh; color: white; font-size: 1.5vh; }
.mf-crosshair-setting { display: flex; justify-content: space-between; align-items: center; gap: 1vh; }
.mf-crosshair-dropdown { position: relative; width: 15vh; cursor: pointer; }
.mf-crosshair-dropdown .selected { background: #222; padding: 0.5vh 1vh; border-radius: 0.5vh; border: 0.1vh solid #444; text-align: center; }
.mf-crosshair-dropdown .options {position: absolute;top: 100%;left: 0;right: 0;background: #222;border-radius: 0.5vh;border: 0.1vh solid #444;display: none;list-style: none;padding: 0;margin-top: 0.5vh;max-height: 20vh;overflow-y: auto;z-index: 1000;}
.mf-crosshair-dropdown .options::-webkit-scrollbar {width: 0.8vh;}
.mf-crosshair-dropdown .options::-webkit-scrollbar-track {background: #222;border-radius: 0.5vh;}
.mf-crosshair-dropdown .options::-webkit-scrollbar-thumb {background-color: #888;border-radius: 1vh;border: 0.2vh solid #222;}
.mf-crosshair-dropdown .options li { padding: 0.5vh 1vh; transition: background 0.2s; }
.mf-crosshair-dropdown .options li:hover { background: #444; }
#mf-crosshair-custom-url { width: 100%; padding: 0.5vh; border-radius: 0.5vh; border: 0.1vh solid #444; background: #333; color: white; outline: none; }
input[type="range"]{ width:8vh; height:.6vh; -webkit-appearance:none; background:#333; border-radius:.4vh; outline:none; }
input[type="range"]::-webkit-slider-thumb{ -webkit-appearance:none; width:1.2vh; height:1.2vh; border-radius:50%; background:white; cursor:pointer; }
`;
document.head.appendChild(style);

    const defaultSettings = { preset: "default", customURL: "", size: 1 };
    let settings = JSON.parse(localStorage.getItem("mf-crosshair-settings")) || defaultSettings;

    function saveSettings(){ localStorage.setItem("mf-crosshair-settings", JSON.stringify(settings)); }

    const ui = document.createElement("div");
    ui.className = "mf-crosshair-ui";
    ui.innerHTML = `
    <div class="mf-crosshair-settings">
      <div class="mf-crosshair-setting">
        <label>Crosshair Preset</label>
        <div class="mf-crosshair-dropdown">
          <div class="selected">${settings.preset === "custom" ? "Custom" : crosshairPresets[settings.preset].label}</div>
          <ul class="options">
            ${Object.entries(crosshairPresets).map(([key,val])=>`<li data-value="${key}">${val.label}</li>`).join("")}
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
    .mf-crosshair-ui { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; font-family: Arial, sans-serif; user-select: none; }
    .mf-crosshair-settings { display: none; flex-direction: column; gap: 1.5vh; background: rgba(20,20,20,0.95); padding: 2vh; border-radius: 1vh; min-width: 30vh; color: white; font-size: 1.5vh; }
    .mf-crosshair-setting { display: flex; justify-content: space-between; align-items: center; gap: 1vh; }
    .mf-crosshair-dropdown { position: relative; width: 15vh; cursor: pointer; }
    .mf-crosshair-dropdown .selected { background: #222; padding: 0.5vh 1vh; border-radius: 0.5vh; border: 0.1vh solid #444; text-align: center; }
    .mf-crosshair-dropdown .options {position: absolute;top: 100%;left: 0;right: 0;background: #222;border-radius: 0.5vh;border: 0.1vh solid #444;display: none;list-style: none;padding: 0;margin-top: 0.5vh;max-height: 20vh;overflow-y: auto;z-index: 1000;}
    .mf-crosshair-dropdown .options li { padding: 0.5vh 1vh; transition: background 0.2s; cursor: pointer; }
    .mf-crosshair-dropdown .options li:hover { background: #444; }
    #mf-crosshair-custom-url { width: 100%; padding: 0.5vh; border-radius: 0.5vh; border: 0.1vh solid #444; background: #333; color: white; outline: none; }
    input[type="range"]{ width:8vh; height:.6vh; -webkit-appearance:none; background:#333; border-radius:.4vh; outline:none; }
    input[type="range"]::-webkit-slider-thumb{ -webkit-appearance:none; width:1.2vh; height:1.2vh; border-radius:50%; background:white; cursor:pointer; }
    `;
    document.head.appendChild(style);

    const crosshair = document.createElement("div");
    crosshair.className = "mf-crosshair";
    crosshair.style.position = "absolute";
    crosshair.style.top = "50%";
    crosshair.style.left = "50%";
    crosshair.style.transform = "translate(-50%, -50%)";
    crosshair.style.zIndex = "9999";
    document.body.appendChild(crosshair);

    function applyCrosshair(){
        const preset = settings.preset==="custom"?null:crosshairPresets[settings.preset];
        if(settings.preset==="custom" && settings.customURL){
            crosshair.style.backgroundImage = `url('${settings.customURL}')`;
            crosshair.style.backgroundRepeat = "no-repeat";
            crosshair.style.backgroundPosition = "center";
            crosshair.style.backgroundSize = "contain";
            crosshair.style.backgroundColor = "transparent";
            crosshair.style.border = "none";
            crosshair.style.borderRadius = "0";
            crosshair.style.width = `${32*settings.size}px`;
            crosshair.style.height = `${32*settings.size}px`;
        } else if(preset){
            if(preset.image){
                crosshair.style.backgroundImage = `url('${preset.image}')`;
                crosshair.style.backgroundRepeat = "no-repeat";
                crosshair.style.backgroundPosition = "center";
                crosshair.style.backgroundSize = "contain";
                crosshair.style.backgroundColor = "transparent";
            } else {
                crosshair.style.backgroundImage = "";
                crosshair.style.backgroundColor = preset.style.backgroundColor||"transparent";
            }
            crosshair.style.border = preset.style.border||"none";
            crosshair.style.borderRadius = preset.style.borderRadius||"0";
            crosshair.style.width = `${preset.style.width*settings.size}px`;
            crosshair.style.height = `${preset.style.height*settings.size}px`;
        }
    }
    applyCrosshair();
    setInterval(applyCrosshair, 100);

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
            settings.preset = val;
            selected.textContent = val==="custom"?"Custom":crosshairPresets[val].label;
            customWrapper.style.display = val==="custom"?"flex":"none";
            options.style.display = "none";
            applyCrosshair();
            saveSettings();
        });
    });

    document.addEventListener("click", e=>{ if(!dropdown.contains(e.target)) options.style.display="none"; });

    customInput.addEventListener("change", ()=>{
        settings.customURL = customInput.value.trim();
        applyCrosshair();
        saveSettings();
    });

    sizeSlider.addEventListener("input", ()=>{
        settings.size = parseFloat(sizeSlider.value);
        applyCrosshair();
        saveSettings();
    });
    let menuOpen = false;
    window.addEventListener("keydown", e=>{
        if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) return;
        if(e.code==="F8"){
            menuOpen = !menuOpen;
            ui.querySelector(".mf-crosshair-settings").style.display = menuOpen?"flex":"none";
            e.preventDefault();
        }
    }, { capture:true });

})();
