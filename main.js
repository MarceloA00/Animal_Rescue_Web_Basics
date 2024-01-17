const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
const pets = await petPromise.json()

const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")
//wrapper.className = "animals-wrapper"

function decideAgeText(age) {
    if (!age) {
        return "Menos de un Año"
    }

    return age == 1 ? "1 Año" : `${age} Años`
}

pets.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".species").textContent = pet.species
    clone.querySelector("p").textContent = pet.description
    clone.querySelector(".btn-pet-name").textContent = pet.name
    clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`
    clone.querySelector("img").src = pet.photo
    clone.querySelector("img").alt = `A ${pet.species} named ${pet.name}`

    const age = (new Date().getFullYear()) - pet.birthYear
    const ageText = decideAgeText(age)
    
    clone.querySelector(".age").textContent = ageText

    wrapper.appendChild(clone)
});

document.querySelector(".animals").appendChild(wrapper)

const filterButtons = document.querySelectorAll(".filter-nav a")

filterButtons.forEach(el => {
    console.log(el.classList);
    el.addEventListener("click", e => handleFilterClick(e))
});

function handleFilterClick(e) {
    let target = e.target

    e.preventDefault()
    filterButtons.forEach(el => {
        el.classList.remove("active")
    })

    target.classList.add("active")

    filterPets(target.dataset.filter)
}

function filterPets(species) {
    const allPets = document.querySelectorAll(".animal-card")
    if (species == "all") {
        allPets.forEach(el => {
            el.style.display = ""
        })
    } else {
        allPets.forEach(el => {
            if(el.querySelector(".species").textContent == species) {
                el.style.display = ""
            } else {
                el.style.display = "none"
            }
        })
    }
}