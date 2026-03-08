let zooming = false;

function applyZoom(){
    const canvas = document.querySelector(".game-canvas");
    if(!canvas) return;

    canvas.style.transformOrigin = "center center";
    canvas.style.transition = "transform 0.2s ease";
    canvas.style.transform = zooming ? "scale(1.5)" : "scale(1)";
}

setInterval(applyZoom, 100); // constantly enforce zoom

document.addEventListener("keydown", e=>{
    if(e.key.toLowerCase()==="v") zooming = true;
});

document.addEventListener("keyup", e=>{
    if(e.key.toLowerCase()==="v") zooming = false;
});
