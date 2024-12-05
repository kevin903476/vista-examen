window.addEventListener("DOMContentLoaded", () => {
    const agregarBtn = document.getElementById("agregar");
    const editarBtn = document.getElementById("editar");
    const eliminarBtn = document.getElementById("eliminar");
    const limpiarBtn = document.getElementById("limpiar");
  
    const buscarBtn = document.getElementById("buscar");
    const verTodosBtn = document.getElementById("verTodos");

    const NombreInput = document.getElementById("Nombre");
    const EmpresaInput = document.getElementById("Empresa");
    const EliminarporId = document.getElementById("EliminarporId");
    const buscarcedulaInput = document.getElementById("buscarporId");
  
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
      fetch("http://localhost/api/api-examen/controlador/producto.php", {
        method: "GET",
        headers: { "Content-Type": "application/json", "cedula": "01","pass":"1234567890qwertyuiopasdfghjklzxc"},
      })
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            if(respuesta.Error){
            alert(respuesta.Error)
            }else{
                alert("Datos cargados")
                limpiarTabla();
                llenarTabla(respuesta);
            }

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
               <td>${registro.idProducto}</td>
               <td>${registro.nombre}</td>
               <td>${registro.empresa}</td>
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
        EliminarporId.value = datos[posicion].idProducto
      NombreInput.value = datos[posicion].nombre;
      EmpresaInput.value = datos[posicion].empresa;
  
      agregarBtn.disabled = true;
      editarBtn.disabled = false;
      eliminarBtn.disabled = false;
    }
  
    function limpiarFormulario() {
        EliminarporId.value ="";
      NombreInput.value = "";
      EmpresaInput.value = "";
  
      agregarBtn.disabled = false;
      editarBtn.disabled = true;
      eliminarBtn.disabled = true;
    }
  
    function agregarRegistro() {
      const datos = {
        
        nombre: NombreInput.value,
        empresa: EmpresaInput.value
      };

      if(NombreInput.value == "" && EmpresaInput.value =="")
      {
      alert("Ingresa todos los datos")
      }else{

      
      fetch("http://localhost/api/api-examen/controlador/producto.php", {
          method: "POST",
          headers: { "Content-Type": "application/json","cedula": "01" , "pass":"1234567890qwertyuiopasdfghjklzxc"},
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
          alert('Hubo un problema al ingresar el producto'); 
      });
    }
  }
  
  function editarRegistro() {
    const datos = {
        
      nombre: NombreInput.value,
      empresa: EmpresaInput.value,
      idProducto: EliminarporId.value
    };
  
    fetch("http://localhost/api/api-examen/controlador/producto.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "cedula": "01" , "pass":"1234567890qwertyuiopasdfghjklzxc"},
      body: JSON.stringify(datos),
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        if(respuesta.Error){
            alert(respuesta.Error)
            }else{
                alert("Actualizado Correctamente")
                limpiarFormulario();
                inicializarTabla();
            }

      })
      .catch((error) => {
        alert("Error al editar el producto:", error);
      });
  }
  
    function eliminarRegistro() {
      const datos = { idProducto: EliminarporId.value };
  
      fetch("http://localhost/api/api-examen/controlador/producto.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "cedula": "01" , "pass":"1234567890qwertyuiopasdfghjklzxc"},
        body: JSON.stringify(datos)
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data)
            if(data.Error){
                alert(data.Error)
                }else{
                    alert("Eliminado Correctamente")
                    limpiarFormulario();
                    inicializarTabla();
                }
        })
        .catch((error) => {
          alert("Error al eliminar el producto:", error);
        });
    }
  
    function buscar() {
      const datos = { idProducto: buscarporId.value };
  
      fetch("http://localhost/api/api-examen/controlador/producto.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "cedula": "01" , "pass":"1234567890qwertyuiopasdfghjklzxc"},
        body: JSON.stringify(datos)
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data)
            if(data.Error){
                alert(data.Error)
            }else{
                limpiarTabla();
                llenarTabla(data);
            }
        })
        .catch((error) => {
          alert("Error al buscar producto:", error);
        });
    }
  });
  