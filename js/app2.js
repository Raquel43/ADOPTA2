const dominioAPI = "http://localhost:5000/mascotas";

window.onload = function () {
    getMascotas();
  };
function getMascotas() {
    fetch(dominioAPI)
        .then(result => result.json())
        .then(data => {
            let content = document.querySelector('#tarjetas');
            content.innerHTML = "";

            data.forEach( (mascota, index)=>{
                content.innerHTML += `
                <div id="${(index+1)}" class="card" style="width: 20rem;">
                <img class="p-2" src="img/${mascota.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mascota.titulo}</h5>
                  <p class="card-text">${mascota.descripcion}</p>
                  <a href="#" class="btn btn-primary">Adóptame</a>
                </div>
              </div>
                    `;
            });
        });
}
