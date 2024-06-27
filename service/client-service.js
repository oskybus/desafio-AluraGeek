//Fetch API
const url = "http://localhost:3000/prod";

const listaProductos = () => fetch("http://localhost:3000/prod").then((respuesta) => respuesta.json()).catch((error) => error);

const crearCliente = (imagen, categoria, nombre_prod, precio_prod, descripcion_prod) => {
    console.log(imagen, categoria, nombre_prod, precio_prod, descripcion_prod)
    return fetch((`${url}`),{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            imagen,
            categoria,
            nombre_prod,
            precio_prod,
            descripcion_prod
      
        })
    })
}

const detalleProducto = (id) =>{
    return fetch(`http://localhost:3000/prod/${id}`)
    .then( (respuesta) => respuesta.json())
}

const actualizarProducto = (imagen, categoria, nombre_prod, precio_prod, descripcion_prod,id) =>{
    return fetch(`http://localhost:3000/prod/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({imagen, categoria, nombre_prod, precio_prod, descripcion_prod})
    })
    .then( (respuesta) => respuesta)
    .catch( (err) => console.log(err));
}

export const listaServices = {
    listaProductos,
    crearCliente,
    actualizarProducto,
    detalleProducto
}

const crearNuevaLinea = (imagen, categoria, nombre_prod, precio_prod, id) => {
    const linea = document.createElement("div");
    
    const contenido = `
    <div class="productos_all">
    <a class="link_producto" href="./descripcion_productos.html?id=${id}&categoria=${categoria}">
    <div class="bng_box">
    <img class="img" src="${imagen}" alt="${nombre_prod}">
    </div>
    <div>
      <ul>
        <li class="nombre_producto">${nombre_prod}</li>
        <li class="precio_producto">${precio_prod}</li>
        <li>Ver producto</li>
      </ul>   
    </div>
    </a>
 </div>
    `;
    linea.innerHTML = contenido;
  
    return linea;
  };

  
const div = document.querySelector("[data-producto]");

listaServices
  .listaProductos()
  .then((data) => {
    alert("llego");
    data.forEach(({ imagen, categoria, nombre_prod, precio_prod, id }) => {
      const nuevaLinea = crearNuevaLinea(imagen, categoria, nombre_prod, precio_prod, id);
      div.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Error al cargar!."));
  