const petPromise = await fetch("../pets.json");
const pets = await petPromise.json()

const petId = new URLSearchParams(window.location.search).get('id')

const template = document.querySelector("body")

pets.forEach(pet => {
    if (pet.id == petId) {
        template.querySelector("h1").textContent = `Parece que quieres adoptar a ${pet.name}`
        template.querySelector("img").src = pet.photo
    }
});