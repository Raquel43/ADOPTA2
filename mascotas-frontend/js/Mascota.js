

const dominioAPI = "http://localhost:5000/mascotas";
const divLista = document.querySelector("#lista-mascotas");
const divPaginacion = document.getElementById("paginacion");
let paginaActual = 1;
let filas = 3;
let i = 0;
let itemsTotales =[];

async function init() {
 
    await cargarMascotaAsync();
  
    
  
    mostrasLista(filas, paginaActual);
    crearBarraPaginacion(filas);
  }

init();

async function cargarMascotaAsync() {
    await fetch(dominioAPI)
        .then(result => result.json())
        .then(data => {
           itemsTotales = data;
           //console.log(itemsTotales[id][index]);
        });
}

// Mostrar lista de botones
function mostrasLista(filasPorPagina, pagina) {
    // Inicializar contenedor
    divLista.innerHTML = "";
    // Calculamos los items de la pagina
    let inicial = filasPorPagina * (pagina - 1); // restamos uno porque los array comienza por 0
    let final = inicial + filasPorPagina;
    // Sublista con los items de la página
    let itemsPagina = itemsTotales.slice(inicial, final);
  
   console.log(itemsPagina);
  
    // Recorremos el bucle de los items a mostrar
    itemsPagina.forEach((mascota) => {
     
      
  //console.log(mascota);
      divLista.innerHTML += `
              <div id="mascota-${
                mascota._id
              }" class="card" style="width: 18rem;">
            <img src="../../img/${
              mascota.imagen
            }" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${mascota.tipo}</h5>
              <p class="card-text"> ${mascota.descripcion}</p>
              <a href="#" class="btn btn-primary">Detalles</a>
            </div>
          </div>
              `;
    });
  }
  
  // Crear barrar de paginación
  function crearBarraPaginacion(filasPorPagina) {
    divPaginacion.innerHTML = "";
  
    // Cálculo de páginas a mostrar
    let contadorPaginas = Math.ceil(itemsTotales.length / filasPorPagina);
    // Creación de un botón por página
    for (let i = 1; i <= contadorPaginas; i++) {
      // Por cada página creamos un botón
      let btn = crearBotonPaginacion(i);
      divPaginacion.appendChild(btn);
    }
  }
  
  // Crear el objeto botón con la acción a ejecutar
  function crearBotonPaginacion(pagina) {
    // Creación elemento HTML botón
    let button = document.createElement("button");
    button.innerText = pagina;
    // Mostramos el botón activado si coincide con la página actual
    if (paginaActual == pagina) button.classList.add("active");
  
    // Acción a ejecutar en el evento click del botón
    button.addEventListener("click", function () {
      paginaActual = pagina; // Actualizamos la página a ver
      mostrasLista(filas, paginaActual); // Mostar datos de la página
  
      // Desactivar botón activo actual
      let botonActual = document.querySelector(".pagenumbers button.active");
      botonActual.classList.remove("active");
      // Activar botón del click
      button.classList.add("active");
    });
  
    return button;
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