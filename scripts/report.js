const reporte = await fetch(`${API_URL}/pets/report`,{
    headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
});

const reporteJson = await reporte.json();

if(reporteJson.status === 401) window.location.href = '/';

const data = await reporteJson.data;

document.getElementById("pet-count").innerHTML += data.totalPets;

document.getElementById("adopted-percentage").style.width = `${data.percentageAdopted}%`;
document.getElementById("not-adopted-percentage").style.width = `${data.percentageNotAdopted}%`;

document.getElementById("not-adopted-percentage-number").innerHTML = `${data.percentageNotAdopted}%`;
document.getElementById("adopted-percentage-number").innerHTML = `${data.percentageAdopted}%`;

console.log(data.adoptedPercentage)

document.getElementById("report").innerHTML = `
    <div style='width:80%;margin:0 auto;padding:20px'>
        <div>
            <h2> Mascotas adoptadas: ${data.totalAdopted} </h2>
            ${data.adoptedPets.map((pet) => (
                `
                    <div class='pet-container' style='background-color: rgba(230,230,230,0.8);'>
                        <div class='pet-photo-div'>
                            <img class='pet-photo' src='${API_URL}/public/${pet.photo}' alt='pet-photo'>
                        </div>
                        <div class='pet-name-container'>
                            <p class='pet-name'>${pet.name}</p>
                            <p class='pet-race'>${(pet.race.name).charAt(0).toUpperCase()+(pet.race.name).slice(1)}</p>
                        </div>
                    </div>
                `
            ))}
        </div>
        <div>
            <h2> Mascotas no adoptadas: ${data.totalNotAdopted} </h2>
            ${data.notAdoptedPets.map((pet) => (
                `
                    <div class='pet-container' style='background-color: rgba(230,230,230,0.8);'>
                        <div class='pet-photo-div'>
                            <img class='pet-photo' src='${API_URL}/public/${pet.photo}' alt='pet-photo'>
                        </div>
                        <div class='pet-name-container'>
                            <p class='pet-name'>${pet.name}</p>
                            <p class='pet-race'>${(pet.race.name).charAt(0).toUpperCase()+(pet.race.name).slice(1)}</p>
                        </div>
                    </div>
                `
            ))}
        </div>
    </div>
`