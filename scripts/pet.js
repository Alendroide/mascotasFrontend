document.getElementById("info-form").innerHTML = `<h2 style='color:white;text-align:center;'>Cargando...</h2>`;

const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('pet');

if(!petId) document.getElementById("info-form").innerHTML = `<h1 style='color:white;text-align:center;'>404 - NOT FOUND</h1>`;

const response = await fetch(`${API_URL}/pets/getById/${petId}`,{
    headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
});

const json = await response.json();

if(json.status === 401) window.location.href = '/';

const mascota = json.data;

if(!mascota) document.getElementById("info-form").innerHTML = `<h1 style='color:white;text-align:center;'>404 - NOT FOUND</h1>`;

console.log(mascota)

document.getElementById("info-form").innerHTML = `
    <div style='display:flex; align-items:center; flex-direction:column;'>
        <img class='pet-photo' src='${API_URL}/public/${mascota.photo}' />
        <div style='margin-top:64px'>
            <div class='info-section'>
                <img class='input-img' src='../imgs/info-name.svg' />
                <p class='input-info'>${mascota.name}</p>
            </div>
            <div class='info-section'>
                <img class='input-img' src='../imgs/info-race.svg' />
                <p class='input-info'>${mascota.race.name.charAt(0).toUpperCase()+(mascota.race.name).slice(1)}</p>
            </div>
            <div class='info-section'>
                <img class='input-img' src='../imgs/info-category.svg' />
                <p class='input-info'>${mascota.race.category.name.charAt(0).toUpperCase()+(mascota.race.category.name).slice(1)}</p>
            </div>
            <div class='info-section'>
                <img class='input-img' src='../imgs/info-gender.svg' />
                <p class='input-info'>${mascota.gender.name.charAt(0).toUpperCase()+(mascota.gender.name).slice(1)}</p>
            </div>
        </div>
    </div>
`