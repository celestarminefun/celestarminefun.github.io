
const homeBtn = document.getElementById("homeBtn");
const modsBtn = document.getElementById("modsBtn");
const skinsBtn = document.getElementById("skinsBtn");

const homePage = document.getElementById("homePage");
const modsPage = document.getElementById("modsPage");
const skinsPage = document.getElementById("skinsPage");


function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".navbtn").forEach(b => b.classList.remove("active"));

    if (page === "home") {
        homePage.classList.add("active");
        homeBtn.classList.add("active");
    } else if (page === "mods") {
        modsPage.classList.add("active");
        modsBtn.classList.add("active");

        const modBoxes = document.querySelectorAll(".grid-box");
        modBoxes.forEach((box, index) => {
            box.classList.remove("fade-in-up");
            void box.offsetWidth;
            box.style.animationDelay = `${index * 0.1}s`;
            box.classList.add("fade-in-up");
        });
    } else if (page === "skins") {
        skinsPage.classList.add("active");
        skinsBtn.classList.add("active");

        const skinCards = document.querySelectorAll(".skin-card");
        skinCards.forEach((card, index) => {
            card.classList.remove("fade-in-up");
            void card.offsetWidth;
            card.style.animationDelay = `${index * 0.05}s`;
            card.classList.add("fade-in-up");
        });
    }
}

homeBtn.onclick = () => showPage("home");
modsBtn.onclick = () => showPage("mods");
skinsBtn.onclick = () => showPage("skins");