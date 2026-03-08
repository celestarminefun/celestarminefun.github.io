const grid = document.getElementById("modsGrid")
const search = document.getElementById("search")
const filterBtns = document.querySelectorAll(".filter-btn")

let mods = []
let currentFilter = "all"

async function loadMods(){

    const res = await fetch("data/mods.json")
    mods = await res.json()

    renderMods()
}

function renderMods(){

    const term = search.value.toLowerCase()

    grid.innerHTML = ""

    mods
    .filter(mod => {

        const matchesFilter =
        currentFilter === "all" || mod.tag === currentFilter

        const matchesSearch =
        mod.title.toLowerCase().includes(term)

        return matchesFilter && matchesSearch

    })
    .forEach(mod => {

        const box = document.createElement("div")
        box.className = "grid-box"

        box.innerHTML = `
    <h3>${mod.title}</h3>
    <div class="mod-desc">${mod.description}</div>
    <div class="grid-actions">
        <a href="${mod.download}" target="_blank" class="download-btn">Download</a>
    </div>
`

        grid.appendChild(box)

    })

}

search.addEventListener("input", renderMods)

filterBtns.forEach(btn => {

    btn.onclick = () => {

        filterBtns.forEach(b => b.classList.remove("active"))
        btn.classList.add("active")

        currentFilter = btn.dataset.filter

        renderMods()

    }

})

loadMods()