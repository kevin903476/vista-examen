window.addEventListener("DOMContentLoaded", () => {
  const agregarBtn = document.getElementById("agregar");
  const editarBtn = document.getElementById("editar");
  const eliminarBtn = document.getElementById("eliminar");
  const limpiarBtn = document.getElementById("limpiar");

  const buscarBtn = document.getElementById("buscar");
  const verTodosBtn = document.getElementById("verTodos");

  const CedulaInput = document.getElementById("Cedula");
  const NombreInput = document.getElementById("Nombre");
  const passInput = document.getElementById("pass");
  const buscarcedulaInput = document.getElementById("buscarCedula");

  const tablaRegistros = document
    .getElementById("tablaRegistros")
    .querySelector("tbody");

  limpiarTabla();
  inicializarTabla();

  buscarBtn.addEventListener("click", buscar);
  verTodosBtn.addEventListener("click", () => {
    limpiarTabla();
    inicializarTabla();
  });

  agregarBtn.addEventListener("click", agregarRegistro);
  editarBtn.addEventListener("click", editarRegistro);
  eliminarBtn.addEventListener("click", eliminarRegistro);
  limpiarBtn.addEventListener("click", limpiarFormulario);

  function inicializarTabla() {
    fetch("http://localhost/api-examen/controlador/usuarios.php", {
      method: "GET",
      headers: { "Content-Type": "application/json", "cedula": "01" },
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta)
        limpiarTabla();
        llenarTabla(respuesta);
      })
      .catch((error) => {
        console.error("Error al inicializar la tabla:", error);
      });
  }

  function llenarTabla(datos) {
    if (datos.length > 0) {
      datos.forEach((registro, posicion) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
             <td>${registro.cedula}</td>
             <td>${registro.nombre}</td>
             <td>${registro.pass}</td>
         `;
        fila.addEventListener("click", () =>
          seleccionarRegistro(posicion, datos)
        );
        tablaRegistros.appendChild(fila);
      });
    } else {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td colspan="3">No hay datos disponibles</td>`;
      tablaRegistros.appendChild(fila);
    }
  }

  function limpiarTabla() {
    tablaRegistros.innerHTML = "";
  }

  function seleccionarRegistro(posicion, datos) {
    Cedula.value = datos[posicion].Cedula;
    Nombre.value = datos[posicion].Nombre;
    pass.value = datos[posicion].pass;

    agregarBtn.disabled = true;
    editarBtn.disabled = false;
    eliminarBtn.disabled = false;
  }

  function limpiarFormulario() {
    Cedula.value = "";
    Nombre.value = "";
    pass.value = "";

    agregarBtn.disabled = false;
    editarBtn.disabled = true;
    eliminarBtn.disabled = true;
  }

  function agregarRegistro() {
    const datos = {
      Cedula: CedulaInput.value,
      Nombre: NombreInput.value,
      pass: passInput.value
    };

    fetch("https://localhost/api/api-examen/controlador/usuarios.php", {
      //aqui irian los datos quemado del usuario?
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then((respuesta) => respuesta.json())
    .then((data) => {
          
          if (data.error) {
            alert("Error: " + data.error); 
          } else {
            limpiarFormulario();
            inicializarTabla(); 
          }
    })
    .catch((error) => {
        alert('Hubo un problema al ingresar el usuario'); 
    });
}

function editarRegistro() {
  const datos = {
    Cedula: CedulaInput.value,
    Nombre: NombreInput.value,
    pass: passInput.value,
  };

  fetch("https://localhost/api/api-examen/controlador/usuarios.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })
    .then((respuesta) => respuesta.json())
    .then(() => {
      alert("Actualizado Correctamente")
      limpiarFormulario();
      inicializarTabla();
    })
    .catch((error) => {
      alert("Error al editar el usuario:", error);
    });
}

  function eliminarRegistro() {
    const datos = { Cedula: CedulaInput.value };

    fetch("https://localhost/api/api-examen/controlador/usuarios.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        limpiarFormulario();
        inicializarTabla();
        alert('Se elimino correctamente');
      })
      .catch((error) => {
        alert.error("Error al eliminar el usuario:", error);
      });
  }

  function buscar() {
    const datos = { Cedula: buscarcedulaInput.value };

    fetch("http://localhost/api-examen/controlador/usuarios.php", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "cedula": "01" , "pass":"1234567890qwertyuiopasdfghjklzxc"},
      body: ("5MgOy4+rgb0U/cY6XcIz7GhoorwIrwkMNDzGvJhb0+u1KcDx+EflATdks0Ov0kYA"),
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        console.log("busca")
        limpiarTabla();
        llenarTabla(datos);
      })
      .catch((error) => {
        alert.error("Error al buscar registro:", error);
      });
  }
});
