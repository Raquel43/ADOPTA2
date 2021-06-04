

const dominioAPI = "http://localhost:5000/mascotas";

function getLista() {
    fetch(dominioAPI)
        .then(result => result.json())
        .then(data => {
            let content = document.querySelector('#contenido');
            content.innerHTML = "";

            data.forEach( (mascota, index)=>{
                content.innerHTML += `
                    <tr>
                        <th scope="row">${(index+1)}</th>
                        <td>${mascota.tipo}</td>
                        <td>${mascota.titulo}</td>
                        <td>${mascota.descripcion}</td>
                        <td>${mascota.meses}</td>
                        <td>${mascota.anyos}</td>
                        <td style="width:150px"><img src="../../img/${mascota.imagen}" width="100%"></td>
                        <td>
                            <span data-toggle="modal" data-target="#modal-edicion">
                                <button onclick="editarMascota('${mascota._id}')" class="btn btn-success btn-sm" role="button" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                            </span>
                            <button onclick="confirmarBorrar('${mascota._id}')" class="btn btn-success btn-sm" title="Eliminar"><i class="fas fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    `;
            });
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