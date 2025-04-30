window.submitForm = submitForm;

async function submitForm(){

    // Limpiar error
    document.getElementById("name.error").innerHTML = ""
    document.getElementById("race_id.error").innerHTML = ""
    document.getElementById("gender_id.error").innerHTML = ""

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
    if(!name || !race_id || !gender_id) return;

    const formData = new FormData();

    formData.append("name",name);
    formData.append("race_id",race_id);
    formData.append("gender_id",gender_id);
    formData.append("photo",photo);

    // const response = await fetch(`${API_URL}/pets/create`,{
    //     body : formData,
    //     method : "POST",
    //     headers : {
    //         "Authorization" : `Bearer ${localStorage.getItem("token")}`
    //     }
    // })

    // const json = await response.json();

    // if(json.status != 201) console.log(json);
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