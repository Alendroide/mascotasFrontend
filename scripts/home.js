
document.getElementById("data-display").innerHTML = '<h2 style="color:white;text-align:center">Cargando...</h2>'

async function getPetsAB(){
    try{
        const response = await fetch(`${API_URL}/pets/getAll`,{
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(!response.ok) throw new Error("NO AUTORIZADO")
        const json = await response.json();
        console.log(json.data);
        return json.data;
    }
    catch(error){
        console.error(error);
        if(error.message === "NO AUTORIZADO"){
            localStorage.removeItem("token");
            window.location.href = '/';
        }
        return error;
    }
}

const data = await getPetsAB();
let count = 0;
document.getElementById("data-display").innerHTML = data.map((mascota) => {

    count += 1;

    return (
        `
            <div class='pet-container' style='background-color:${count % 2 == 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.7)' };'>
                <img class='pet-photo' src='${API_URL}/public/${mascota.photo}' alt='pet-photo'>
                <div class='pet-name-container'>
                    <p class='pet-name'>${mascota.name}</p>
                    <p class='pet-race'>${(mascota.race.name).charAt(0).toUpperCase()+(mascota.race.name).slice(1)}</p>
                </div>
                <div class='pet-options-container'>
                    <img class='pet-option' src='../imgs/btn-show.svg' alt='search' onclick="window.location.href = '/page/pet.html?pet=${mascota.id}'">
                    <img class='pet-option' src='../imgs/btn-edit.svg' alt='search' onclick="window.location.href = '/page/edit.html?pet=${mascota.id}'">
                    <img class='pet-option' src='../imgs/btn-delete.svg' alt='search' onclick="window.location.href = '/page/delete.html?pet=${mascota.id}'">
                </div>
            </div>
        `
    )
})