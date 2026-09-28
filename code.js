let map; let makerGroups;
let currentStatus = "";

document.addEventListener('DOMContentLoaded', createMap())

function createMap(coords=[46.950691, 142.739074]) {
    const saved = localStorage.getItem('hvost_pets_data');
    if (saved) pets = JSON.parse(saved);


    map = L.map('map', {attributionControl: false} ).setView(coords, 13);
    L.tileLayer(tileURL, {
    attribution: '© Яндекс',
    }).addTo(map) 
    makerGroups = L.layerGroup().addTo(map);
    map.invalidateSize();
    renderCards()
}

function filterStatus(status) {
    let button = document.getElementById(status);
    const buttons = document.querySelectorAll('.filt');
    buttons.forEach(but => {
        but.style.backgroundColor = '#fdf6ee';
        but.style.color = 'black';
    }

    )
    button.style.backgroundColor = '#d4600a';
    button.style.color = '#fff9f2';
    currentStatus = status == 'all' ? '' : status;
    renderCards()
}

function renderCards() {
    const container = document.getElementById('cardList');
    const input = document.getElementById('search').value.toLowerCase();
    const type = document.getElementById('typeSelect').value;


    container.innerHTML = '';
    makerGroups.clearLayers();

    const filterPets = pets.filter(pet => {
        return (pet.district.toLowerCase().includes(input) ||
        pet.title.toLocaleLowerCase().includes(input)) && pet.status.includes(currentStatus)  && pet.type.includes(type);
    }

    )
    filterPets.forEach(pet => {
        const color = pet.status == 'lost' ? 'red' : 'green';
        const marker = L.circleMarker(pet.coords, {radius: 8, fillColor : color, color : 'fff'}).bindPopup(`<b>${pet.title}</b><br>${pet.district}`);

        makerGroups.addLayer(marker);

        const cardHTML = `
        <div class="card" onclick="NewView([${pet.coords}])">
            <h3>${pet.title}</h3>
            <p>${pet.district}</p>
            <p>${pet.description}</p>
            <h4>${pet.contact}</h4>
            <span>${pet.status == "lost" ? '🔴Потерян' : '🟢Найден'}</span>
        </div>`
        container.innerHTML += cardHTML;
    }) 
}   

function addPet() {
    form.style.display = 'none';
    form.style.zIndex = '-1';

    event.preventDefault();
    let newPet = {
        id: Date.now,
        status: document.getElementById('newSelect').value,
        type: document.getElementById('newType').value,
        title: document.getElementById('newTitle').value,
        description: document.getElementById('newDesc').value,
        district: document.getElementById('newDist').value,
        contact: document.getElementById('newContact').value,
        coords:  (document.getElementById('coords').value.split(',') == '') ? [46.950695, 142.739074] : document.getElementById('coords').value.split(',')
    }

     pets.unshift(newPet);
    localStorage.setItem('hvost_pets_data', JSON.stringify(pets));
    renderCards();

}


const form = document.getElementById('addForm');

function openForm() {
    form.style.display = 'flex';
    form.style.zIndex = '1';
}
function closeCard() {
    form.style.display = 'none';
    form.style.zIndex = '-1';
}

function NewView(coords) {
    map.setView(coords, 17)
}
