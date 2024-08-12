/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
//URL Base
const baseUrl="https://platzi-avo.vercel.app/" 
//URL API
const url = "https://platzi-avo.vercel.app/api/avo";
const containerApp = document.querySelector('#container');


const formatPrice = price => {

    const newPrice = new window.Intl.NumberFormat("es-EN", {
        style: "currency",
        currency: "USD"
    }).format(price) //como ya inicialice la api le voy a decir a la api
                    //que le voy a dar formato al precio que he recibido

    return newPrice;
 }

/*Web API Fetch
La utilizamos para traer recursos desde cualquier otro sitio web
Lo unico que tenemos que pasarle es nuestra url
1. Nos conectaremos al servidor
*/

window.fetch(url)
/*2. Procesar la respuesta y despues la convertimos en JSON
   Fetch es algo que nos devuelve una promesa asi que
   trabajaremos con promesas para obtener la respuesta
   y transformarla en JSON
*/
   .then(respuesta => respuesta.json())

/*3.
Luego de que convirtamos la respuesta en JSON lo que obtenemos
ahora es informacion y la obtenemos concatenando otra promesa

Cuando tengamos el JSON  tendremos esa informacion que
nos servira para renderizar esa info en nuestro navegador*/
   .then(responseJson =>{

       const todosLosItems = [];
       /*recorremos cada uno de los elementos que estan en arrays
       con un forEach
       */
       responseJson.data.forEach(item => {
       /*atraves del parametro de la funcion del forEach accedemos
       a los elementos de la respuesta json*/
        
       //creamos nuestros elementos
       const imagen = document.createElement('img');
       imagen.src = `${baseUrl}${item.image}`;
       imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

       const titulo = document.createElement('h2'); 
       titulo.textContent=item.name;
       titulo.className = 'text-xl mx-auto my-auto'//'text-lg'     
       
       const precio = document.createElement('h3');
       //precio.textContent= item.price;
       precio.textContent = formatPrice(item.price);
       precio.className = 'text-gray-600 mx-auto my-auto'


       // cremos el contenedor donde vamos a poner nuestros elementos
       const container = document.createElement('div');
       container.className = "md:flex bg-green-100 rounded-lg mx-auto max-w-4xl p-4 my-8 hover:bg-green-300"

       container.append(imagen,titulo,precio);
       //agregamos el contenedor en nuestro body
       //document.body.appendChild(container);
       todosLosItems.push(container);
       console.log(item.name);
           
       });

       containerApp.append(...todosLosItems)

   });

/*RESUMEN: NOS CONECTAMOS A UNA API QUE ES UN PUENTE CON LA INFORMACION 
 DE UN SERVIDOR Y ESE SERVIDOR NOS DEVUELVE ESA INFORMACION, Y UTILIZAMOS
 UN CICLO POR CADA UNO DE LOS ELEMENTOS QUE NOS DEVUELVE ESE SERVIDOR
 CREAMOS NODOS Y SE LOS AGREGAMOS AL FINAL A NUESTRO HTML*/

/*RETO PARA MEJORAR ESTE CODIGO  Y ES HACERLO CON ASYNC Y AWAIT EN VES 
 DE PROMESAS 
 */

/* //El fetch() con async/await
const url2 = "https://platzi-avo.vercel.app/api/avo";

//web api
async function fetchData() {
  const response = await fetch(url2),
  data = await response.json(),
  allItems = [];

  data.data.forEach((item) => {
    // create image
    const image = document.createElement("img");
    // create title
    const title = document.createElement("h2");
    // create price
    const price = document.createElement("div");

    const container = document.createElement("div");
    container.append(image, title, price);

    allItems.push(container);
  });

  document.body.append(...allItems)
}

fetchData();
*/