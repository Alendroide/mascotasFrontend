const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('pet');

window.submitForm = submitForm;

let coord = undefined;

async function submitForm(){

    // Limpiar error
    document.getElementById("name.error").innerHTML = ""
    document.getElementById("race_id.error").innerHTML = ""
    document.getElementById("gender_id.error").innerHTML = ""
    document.getElementById("coord_id.error").innerHTML = ""

    // Obtener datos
    const name = document.getElementById("name").value;
    const race_id = document.getElementById("race_id").value;
    const gender_id = document.getElementById("gender_id").value;
    const photo = document.getElementById("photo").files?.[0];
    console.log(photo)

    // Checkear errores
    if(!name) document.getElementById("name.error").innerHTML = "Ingrese un nombre"
    if(!race_id) document.getElementById("race_id.error").innerHTML = "Ingrese una raza"
    if(!gender_id) document.getElementById("gender_id.error").innerHTML = "Ingrese un género"
    if(!coord) document.getElementById("coord_id.error").innerHTML = "Seleccione una ubicación"
    if(!name || !race_id || !gender_id || !coord) return;

    const formData = new FormData();

    formData.append("name",name);
    formData.append("race_id",race_id);
    formData.append("gender_id",gender_id);
    formData.append("photo",photo);
    formData.append("lat",coord.lat);
    formData.append("lng",coord.lng);

    const response = await fetch(`${API_URL}/pets/update/${petId}`,{
        body : formData,
        method : "PUT",
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })

    const json = await response.json();

    if(json.status != 200) console.log(json);
    else window.location.href = '/page/home.html';
}

const razasRes = await fetch(`${API_URL}/races/getAll`,{
    headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
})

const racesJson = await razasRes.json();

if(racesJson.status === 401) window.location.href = '/';

const races = await racesJson.data;

document.getElementById("race_id").innerHTML += races.map((race) => (
    `<option value="${race.id}">${race.name.charAt(0).toUpperCase()+race.name.slice(1)}</option>`
))

const gendersRes = await fetch(`${API_URL}/genders/getAll`,{
    headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
})

const gendersJson = await gendersRes.json();

if(gendersJson.status === 401) window.location.href = '/';

const genders = await gendersJson.data;

document.getElementById("gender_id").innerHTML += genders.map((gender) => (
    `<option value="${gender.id}">${gender.name.charAt(0).toUpperCase()+gender.name.slice(1)}</option>`
))

window.displayPreview = displayPreview

function displayPreview(){
    const file = document.getElementById("photo").files?.[0];
    const photoPreview = document.getElementById("photo-preview");
    if(file) {
        const blobUrl = URL.createObjectURL(file);
        photoPreview.src = blobUrl;
    }
}

const oldPetResponse = await fetch(`${API_URL}/pets/getById/${petId}`,{
    headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
});
const oldPetJson = await oldPetResponse.json();
const oldPetData = oldPetJson.data;

document.getElementById("name").value = oldPetData.name
document.getElementById("race_id").value = oldPetData.race_id
document.getElementById("gender_id").value = oldPetData.gender_id
document.getElementById("photo-preview").src = `${API_URL}/public/${oldPetData.photo}`
coord = {lat: oldPetData.latitude, lng: oldPetData.longitude};
const map = L.map('map').setView([oldPetData.latitude,oldPetData.longitude],18);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);
let marker = L.marker([oldPetData.latitude,oldPetData.longitude]).addTo(map);

// Handle map click
map.on('click', function (e) {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
    coord = {lat,lng};
});