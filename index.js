console.log ("Inciando programa...")

const url = 'https://fakestoreapi.com'

const args = process.argv.slice(2)

//Aca se define un array con los argumentos válidos que se pueden usar en el programa. En este caso, los argumentos válidos son "GET", "POST", "PUT" y "DELETE". Idea de un compañero que es muy útil.
const argumentos_validos = ["GET", "POST", "PUT", "DELETE"]

console.log("Argumentos ingresados: ", args)

async function programa_principal (args) {

  if(!args[0] in argumentos_validos){
    console.log("Argumento no válido. Por favor, use uno de los siguientes: GET, POST, PUT, DELETE.")
    return
  }
  switch (args[0]) {
    case "GET":
      //Aca en la primera condicion es si no se cumple la condicion del primer argumento, es decir, si no incluye un "/" y el segundo argumento es "products", entonces se va a ejecutar el bloque de codigo dentro del if. En este caso, se hace una solicitud GET a la API para obtener todos los productos.
      if (!args[0].includes("/") && args[1] == "products") {
        try {
          const response = await fetch(`${url}/products`, {
          method : "GET"
        })
        if (response.status !== 200) {
          throw new Error("Error en la solicitud")
          break
        }
        const data = await response.json()
        //Aca hicimos un forEach ya que un console.table al data quedaba medio raro. Entonces por cada elemento del array data, se va a imprimir por consola el elemento completo.
        data.forEach(element=>{ 
          console.log(element)
        })
      } catch (error) {
          console.log(error)
          break
      } 
      //A continuación se hizo una solicitud a la API para obtener un producto por ID específico. 
      //Ya que en los argumentos que se escriben por consola, el [0] sería el método (GET) por ej. El [1]
      //puede ser products/nro. Entonces, hay que hacer un split para separar el "products" del "nro". Entonces, se hace un split con el caracter "/" y se guarda en una variable llamada id_sin_separar.
      //Luego, se hace una solicitud GET a la API utilizando el ID que se obtuvo del split. Si la respuesta es exitosa, se imprime el producto específico por consola. Si hay un error en la solicitud, se captura y se imprime el error por consola.
    }else if (args[1].includes("/") && args[1].includes("products")) {
        let id_sin_separar = args[1].split("/")
        try {
          //Aca hicimos un parseInt para convertir el string en numero entero y lo guardamos en una variable
          const id = parseInt(id_sin_separar[1])
          // una vez guardada en la variable, se hace la solicitud a la API utilizando ${id} a la ruta correspondiente  
          const response = await fetch (`${url}/products/${id}`, {
            method : "GET"
          })
          if (response.status !== 200) {
            throw new Error("Error en la solicitud")
            break
          }
          const data = await response.json()
          console.log(data)
          break
        } catch (error) {
          console.log(error)
          break

        }
      }else {
          console.log("Argumento no válido. Por favor, use uno de los siguientes: GET, POST, PUT, DELETE.")
          break
        }
      
//Caso POST
      
    case "POST":
    if (args[1] == "products" && args.length == 5) 
      try {
    //Aca se declaró un objeto, con los valores de los argumentos ingresados por consola. 
    const nuevo_producto = { 
  title: args[2],
  price: parseFloat(args[3]),
  category: args[4]
    }
  //aca mandamos mediante un fetch una solicitud POSt a la API, con el nuevo producto creado. Si la respuesta no es exitosa, se lanza un error. Si la respuesta es exitosa, se convierte a formato JSON y se imprime por consola el producto creado con sus detalles.
    const response = await fetch (`${url}/products`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(nuevo_producto)
    })
  
    if (!response.ok){
      throw new Error("Error en la solicitud")
    }
const data = await response.json()
console.log(data)
console.log(`Producto creado: ${data.titulo}, Precio: ${data.precio}, Categoria: ${data.categoria}  ID: ${data.id}`)
break
  } 
  catch (error) {
    console.log("Solicitud incompleta.")
    break
  }
   
  case "DELETE":
    if (args[0] == "DELETE" && args[1].includes("products/")) 
      try {
      let id_sin_separar = args[1].split("/")
      const id = parseInt(id_sin_separar[1])
     // console.log(id_sin_separar)
     // acá fue una prueba de como me separaba el ID.

      const response = await fetch (`${url}/products/${id}`,{
        method : "DELETE"
      })
        if (!response.ok) {
          throw new Error("Error en la solicitud")
          break
        }
      const data = await response.json()
      console.log(`Producto con ID ${id} eliminado.`)
      break
      }
  catch (error) {
    console.log(error)
    break
} 
 else {
  console.log("Solicitud Incorrecta")
  console.log(`Argumentos permitidos para DELETE: DELETE products/nro. Por ejemplo: DELETE products/1`)
  break
}
}
}
programa_principal(args)
