window.submitForm = submitForm;

// LEAFLET
    // Create the map and set a default view
    const map = L.map('map').setView([1.851740, -76.046878], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let coord = undefined;
    let marker;

    // Handle map click
    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        if (marker) {
            marker.setLatLng([lat, lng]);
            } else {
            marker = L.marker([lat, lng]).addTo(map);
        }
        coord = {lat,lng};
    });

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

    // Checkear errores
    if(!name) document.getElementById("name.error").innerHTML = "Ingrese un nombre"
    if(!race_id) document.getElementById("race_id.error").innerHTML = "Ingrese una raza"
    if(!gender_id) document.getElementById("gender_id.error").innerHTML = "Ingrese un género"
    if(!coord) document.getElementById("coord_id.error").innerHTML = "Seleccione una posición"
    if(!name || !race_id || !gender_id || !coord) return;

    const formData = new FormData();

    formData.append("name",name);
    formData.append("race_id",race_id);
    formData.append("gender_id",gender_id);
    formData.append("photo",photo);
    formData.append("lat",coord.lat);
    formData.append("lng",coord.lng);

    const response = await fetch(`${API_URL}/pets/create`,{
        body : formData,
        method : "POST",
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })

    const json = await response.json();

    if(json.status != 201) console.log(json);
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