const crosshairPresets = {
        "default": { label: "Default", style: { backgroundColor: "#fff", border: "2px solid #111010", borderRadius: "70.5px", width: 1, height: 1 } },
        "greencircle": { label: "Green Circle", image: "https://i.imgur.com/FEK3Eyc.png", style: { border: "none", borderRadius: "0", width: 16, height: 16 } },
    };

    const defaultSettings = { preset: "default", customURL: "", size: 1 };
    let settings = JSON.parse(localStorage.getItem("mf-crosshair-settings")) || defaultSettings;
    const loadedPresetURLs = {};
    async function preloadPresetImages(){
        for(const key in crosshairPresets){
            if(crosshairPresets[key].image){
                try{
                    const res = await fetch(crosshairPresets[key].image, {mode:'cors'});
                    const blob = await res.blob();
                    loadedPresetURLs[key] = URL.createObjectURL(blob);
                }catch(e){ loadedPresetURLs[key] = null; }
            }
        }
    }
    preloadPresetImages();
    let customURLObject = null;

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
</div>`;
    document.body.appendChild(ui);

    const style = document.createElement("style");
    style.textContent = `
.mf-crosshair-ui { position: fixed; top: 10%; left: 50%; transform: translateX(-50%); font-family: Arial, sans-serif; user-select: none; z-index: 999999; }
.mf-crosshair-settings { display:flex; flex-direction:column; gap:1.5vh; background:rgba(20,20,20,0.95); padding:2vh; border-radius:1vh; min-width:30vh; color:white; font-size:1.5vh; position:fixed; top:10%; left:50%; transform:translateX(-50%); }
.mf-crosshair-setting { display:flex; justify-content:space-between; align-items:center; gap:1vh; }
.mf-crosshair-dropdown { position:relative; width:15vh; cursor:pointer; }
.mf-crosshair-dropdown .selected { background:#222; padding:0.5vh 1vh; border-radius:0.5vh; border:0.1vh solid #444; text-align:center; }
.mf-crosshair-dropdown .options { position:absolute; top:100%; left:0; right:0; background:#222; border-radius:0.5vh; border:0.1vh solid #444; display:none; list-style:none; padding:0; margin-top:0.5vh; max-height:20vh; overflow-y:auto; z-index:1000; }
.mf-crosshair-dropdown .options li { padding:0.5vh 1vh; transition:background 0.2s; cursor:pointer; }
.mf-crosshair-dropdown .options li:hover { background:#444; }
#mf-crosshair-custom-url { width:100%; padding:0.5vh; border-radius:0.5vh; border:0.1vh solid #444; background:#333; color:white; outline:none; }
input[type="range"]{ width:8vh; height:.6vh; -webkit-appearance:none; background:#333; border-radius:.4vh; outline:none; }
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none; width:1.2vh; height:1.2vh; border-radius:50%; background:white; cursor:pointer; }`;
    document.head.appendChild(style);

    const menu = ui.querySelector(".mf-crosshair-settings");
    let menuOpen=false;
    document.addEventListener("keydown", e=>{
        if(e.code==="F8"){
            menuOpen=!menuOpen;
            menu.style.display = menuOpen ? "flex" : "none";
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
            settings.preset = val;
            selected.textContent = val==="custom"?"Custom":crosshairPresets[val].label;
            customWrapper.style.display = val==="custom"?"flex":"none";
            options.style.display="none";
            localStorage.setItem("mf-crosshair-settings", JSON.stringify(settings));
        });
    });
    document.addEventListener("click", e=>{ if(!dropdown.contains(e.target)) options.style.display="none"; });
    customInput.addEventListener("change", ()=>{ settings.customURL = customInput.value.trim(); customURLObject = null; localStorage.setItem("mf-crosshair-settings", JSON.stringify(settings)); });
    sizeSlider.addEventListener("input", ()=>{ settings.size = parseFloat(sizeSlider.value); localStorage.setItem("mf-crosshair-settings", JSON.stringify(settings)); });

    function applyCrosshair(aim) {
    if (!aim) return;

    aim.style.position = "absolute";
    aim.style.top = "50%";
    aim.style.left = "50%";
    aim.style.transform = "translate(-50%, -50%)";
    aim.style.zIndex = "9999";
    aim.style.transition = "all 0.1s linear";

    if (settings.preset === "custom" && settings.customURL) {
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
        const preset = crosshairPresets[settings.preset] || crosshairPresets.default;

        if (preset.image) {
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

    setInterval(()=>{
        const aim = document.querySelector(".aim[data-v-11a4d221]");
        if(aim) applyCrosshair(aim);
    }, 100);
