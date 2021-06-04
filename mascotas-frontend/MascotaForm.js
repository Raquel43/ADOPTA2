

const dominioAPI = "http://localhost:5000/mascotas";

let itemsTotales =[];
function getLista() {
    fetch(dominioAPI)
        .then(result => result.json())
        .then(data => {
           itemsTotales.push(data);
           console.log(itemsTotales);
            content.innerHTML = "";

           
        });
}

function insertarMascota() {
    let mascotaData = {
        "tipo": document.querySelector("#tipo").value,
        "titulo": document.querySelector("#titulo").value,
        "descripcion": document.querySelector("#descripcion").value,
        "meses": document.querySelector("#meses").value,
         "anyos": document.querySelector("#anyos").value,
         "imagen": document.querySelector("#imagen").value,
    };

    fetch(dominioAPI, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mascotaData)
    })
        .then(response => {
            response.json();
            getLista();
        })
        .then(response => console.log(response))
        .catch(error => error);

}

function modificaMascota() {
    let mascotaData = {
        id: document.querySelector("#id").value,
        tipo: document.querySelector("#tipo").value,
        titulo: document.querySelector("#titulo").value,
        descripcion: document.querySelector("#descripcion").value,
        meses: document.querySelector("#meses").value,
        anyos: document.querySelector("#anyos").value,
        imagen: document.querySelector("#imagen").value,
    };
    console.log("Datos a modificar", mascotaData);

    fetch(dominioAPI, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mascotaData)
    })
        .then(response => {
            alert("Mascota modificada");
            response.json();
            getLista();
        })
        .catch(error => {
            console.log(error);
        });

}

function editarMascota(id) {
    // Recuperamos datos del mascota y configuramos los datos en el formulario
    fetch(`${dominioAPI}/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            document.querySelector("#id").value = data._id;
            document.querySelector("#tipo").value = data.tipo;
            document.querySelector("#descripcion").value = data.descripcion;
            document.querySelector("#meses").value = data.meses;
            document.querySelector("#anyos").value = data.anyos;
            //document.querySelector("#imagen").value = data.imagen;
            myModal.show();
        })
        .catch(error => {
            console.log(error);
        });
}

function confirmarBorrar(id){
    
    Swal.fire({
    title: "¿De verdad quieres Borrar?",
    icon: 'question',
    confirmButtonText: 'Seleccionar',
    showCancelButton: true,
    cancelButtonText: 'No quiero borrar',
   stopKeydownPropagation: true
  
})
.then(resultado =>{
    if(resultado.value){
       eliminarMascota(id);
    }
});
}
function eliminarMascota(id) {
    
    fetch("http://localhost:5000/mascotas/" + id, { method: 'DELETE' })
        .then(response => {
            //response.json();
            getLista();
            Swal.fire({
                title: "Mascota eliminada con éxito"
               })
        })
        .then(response => console.log(response))
        .catch(error => error);
}

function guardarMascota() {
    const id = document.querySelector("#id").value;
    if (id == "")
        insertarMascota();
    else
        modificaMascota(id);

    myModal.hide();
}

function nuevoMascota() {
    document.querySelector("#id").value = "";
    document.querySelector("#form-data-mascota").reset();
    myModal.show();
}