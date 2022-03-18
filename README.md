# Curso de Asincronismo con JavaScript

## Apropiar los conceptos de asincronismo

### Introducción al asincronismo
 
El asincronismo es la acción que no ocurre al mismo tiempo

El asincronimso no te permitirá entrar dos inputs yt sacar dos outputs

El callback es lo encargado a una API o en la queue

**API**
Interfaz de programación de aplicaciones (Application Programming Interface). Es un conjunto de rutinas que provee acceso a funciones de un determinado software.

**Concurrencia**
Cuando dos o más tareas progresan simultáneamente.

**Paralelismo**
Cuando dos o más tareas se ejecutan, literalmente, a la vez, en el mismo instante de tiempo.

**Bloqueante**
Una llamada u operación bloqueante no devuelve el control a nuestra aplicación hasta que se ha
completado. Por tanto el thread queda bloqueado en estado de espera.

**Síncrono**
Es frecuente emplear ‘bloqueante’ y ‘síncrono’ como sinónimos, dando a entender que toda la operación de entrada/salida se ejecuta de forma secuencial y, por tanto, debemos esperar a que se complete para procesar el resultado.

**Asíncrono**
La finalización de la operación I/O se señaliza más tarde, mediante un mecanismo específico como por ejemplo un callback, una promesa o un evento, lo que hace posible que la respuesta sea procesada en diferido.

**Call Stack**
La pila de llamadas, se encarga de albergar las instrucciones que deben ejecutarse. Nos indica en que punto del programa estamos, por donde vamos.

**Heap**
Región de memoria libre, normalmente de gran tamaño, dedicada al alojamiento dinámico de objetos. Es compartida por todo el programa y controlada por un recolector de basura que se encarga de liberar aquello que no se necesita.

**Cola o Queue**
Cada vez que nuestro programa recibe una notificación del exterior o de otro contexto distinto al de la aplicación, el mensaje se inserta en una cola de mensajes pendientes y se registra su callback correspondiente.

**Eventloop o Loop de eventos**
Cuando la pila de llamadas (call stack) se vacía, es decir, no hay nada más que ejecutar, se procesan los mensajes de la cola. Con cada ‘tick’ del bucle de eventos, se procesa un nuevo mensaje.

**Hoisting**
Sugiere que las declaraciones de variables y funciones son físicamente movidas al comienzo del código en tiempo de compilación.

**DOM**
DOM permite acceder y manipular las páginas XHTML como si fueran documentos XML. De hecho, DOM se diseñó originalmente para manipular de forma sencilla los documentos XML.

**XML**
Lenguaje de marcado creado para la transferencia de información, legible tanto para seres humanos como para aplicaciones informáticas, y basado en una sencillez extrema y una rígida sintaxis. Así como el HTML estaba basado y era un subconjunto de SGML, la reformulación del primero bajo la sintaxis de XML dio lugar al XHTML; XHTML es, por tanto, un subconjunto de XML.

**Events**
Comportamientos del usuario que interactúa con una página que pueden detectarse para lanzar una acción, como por ejemplo que el usuario haga click en un elemento (onclick), que elija una opción de un desplegable (onselect), que pase el ratón sobre un objeto (onmouseover), etc.

**Compilar**
Compilar es generar código ejecutable por una máquina, que puede ser física o abstracta como la máquina virtual de Java.

**Transpilar**
Transpilar es generar a partir de código en un lenguaje código en otro lenguaje. Es decir, un programa produce otro programa en otro lenguaje cuyo comportamiento es el mismo que el original.

### Presentación del reto: consumir APIs

Usaremos la API de Rick and Morty: https://rickandmortyapi.com/

Curso sugerido: https://platzi.com/clases/postman/

Lista de API publicas: https://github.com/public-apis/public-apis

## Desarrollar soluciones utilizando asicronismo

### Definición Estructura Callback

Articulo: https://medium.com/@ubykuo/event-loop-la-naturaleza-asincr%C3%B3nica-de-javascript-78d0a9a3e03d

Post: https://stackoverflow.com/questions/824234/what-is-a-callback-function

Una función que recibe otra función como parámetro se le denomina función de orden superior (higher-order function).

El callback en este caso sería la función que es pasada como parámetro, mas no la función que lo recibe.

```js
function sum(num1, num2){
  return num1 + num2;
}

function calc(num1, num2, callback){
  return callback(num1, num2);
}
//para identificar que es un callback le ponemos ese nombre o parametro

console.log(calc(6,2,sum));
```
Con el script en package.json configuramos para que corra con callback

Ejecutamos el codigo en la consola con...

```
npm run callback
```

Con otro ejemplo de tiempos
```js
function date(callback) {
  console.log(new Date);
  setTimeout(function (){
    let date = new Date;
    callback(date)
  }, 3000)
}
//El primer valor es lo que vas a pasar y el segundo valor del timeout es el tiempo

function printDate(dateNow) {
  console.log(dateNow)
}

date(printDate);
```
El callback de parametro puede tener otro nombre como pepe o bang, y seguirá funcionando

pero date recibe printDate y reemplaza el callback, pero la llamamaos callback debido a que pasamos la función printDate como parametro dentro de la función de orden mayor date

y date reemplaza dateNow en la función printDate

### Peticiones a APIs usando Callbacks

Consultaremos a la API de rick and morty que personaje es y a que dimension pertenece

link: https://rickandmortyapi.com/api/character/

HTTP con gatos: https://http.cat/

Tendremo que haceru n callback porque hay un 2do llamado en una api que traeremos

Primero traemos el codigo para hacer peticiones dentro de un callback, despues al personaje, luego a la dimensión

Lo trabajaremos sobre Node, entonces instalaremos una dependencia llamada XMLHttpRequest, es un objeto dentro de JS que nos permite hacer peticiones a un servicio de la nube

Lo haremos con 
```
npm install xmlhttprequest --save
```
Aplicando el ejercicio...
```js
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//fetch es para ES6 y estamos trabajando con callbacks, no con promesas

//crearemos una funcion que nos permitirá traer la información desde la api

function fetchData(url_api, callback) {
  //generamos la referencia al objeto que necesitamos
  let xhttp = new XMLHttpRequest();
  //Usaremos el primer referrente o el llamado a la url
  xhttp.open('GET', url_api, true);
  //Pasaremos la peticion GET, luego la url de traer la data osea url_api y que se maneje de maner async asi que dejaremos el true para activar el asincronismo

  //Ahora tenemos que generar o escuchar esa conexión
  xhttp.onreadystatechange = function (event) {
    if(xhttp.readyState === 4){
      if(xhttp.status === 200){
      //Se ha completado la petición pero no sabemos si esta correcta, 200 es OK, mira los gatos para entender, ahora ya podremos usar el callback, normalmente en node permite el 1er valor como el error y el 2do la información que se desencadena
        callback(null, JSON.parse(xhttp.responseText))
      }
      else{
        const error = new Error("Error "+ url_api);
        return callback(error, null)
        //primero pasamos el error y luego lo que se desecadena, en esta caso, null
      }
    }
  }
  xhttp.send();
  // Si este cambio sucede entnces vas a ejecutar una función que recibirá un evento para hacer una validación para ejecutar el callback

  //Hay distintos estados, hay 5, 0 no inicializado, se esta cargadno, ya cargado, hay una descarga, ya completado (contamos desde el 0)
  // Los estados de un request de acuerdo a la documentacion:
  // 0: request not initialized
  // 1: server connection established
  // 2: request received
  // 3: processing request
  // 4: request finished and response is ready
}
```
documentacion: https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest


Apuntes adicionales:

```js
//Apuntes utiles:
// Implementación de una API con XMLHttpRquest

// Instanciando el request.
//Permite hacer peticiones a algun servidor en la nube
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function fetchData(url_api, callback){
    //referencia al objeto XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    /* 
    A nuestra referencia xhttp le pasamos un LLAMADO 'open'
    donde: parametro1 = el metodo, parametro2 = la url,
    parametro3 = verificación si es asincrono o no, valor por defecto true
    */
    xhttp.open('GET', url_api, true);
    //Cuando el estado del objeto cambia, ejecutar la función:
    xhttp.onreadystatechange = function (event){
        /*
        los estados que puede tener son:
        estado 0: inicializado
        estado 1: cargando
        estado 2: ya se cargó
        estado 3: ya hay información
        estado 4: solicitud completa
        PD: recuerda estas trabajando con una API externa osea un servidor por lo que
        depende del servidor cuanto demore en cada estado haces un pedido por datos
        (request) y solo es aplicar lógica.
        */
        if(xhttp.readyState === 4){
            //Verificar estado, aqui un resumen de los casos mas comunes:
            /*
            ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
            ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
            ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
            ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
            ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
            */
            if(xhttp.status === 200){
                //Estandar de node con callbacks, primer parametro error, segundo el resultado
                callback(null, JSON.parse(xhttp.responseText))
            } else {
                const error = new Error('Error ' + url_api);
                return callback(error, null)
            }
        }
    }
    //Envio de la solicitud.
    xhttp.send();
}
```
- XMLHttpRequest es la forma antigua de hacer llamados, como el profesor lo menciona usa ese y no Fetch que es el actual, por que no conocemos aùn las promesas y fecth es con promesas, para saber por que el profesor uso OPEN y todas esas funciones aqui està la forma de usar XMLHttpRequest : https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest.

- " new Error " que el profesor crea, es una nueva instancia de la clase Error que tiene Javascript, son clases ya implicitas que tiene javascript en este caso es para monstrar bien un mensaje de error podemos usarla, màs informaciòn aqui : https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Error.

- Para los que son fron-end y están aprendiendo de Back, el profesor uso GET por que hace parte de los método http, en este caso necesitamos pedir información a las url ,màs información: https://developer.mozilla.org/es/docs/Web/HTTP/Methods

### Múltiples Peticiones a un API con Callbacks

Para eliminar comments dale a ctl + p le das a > y remove comments

```js
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url_api, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', url_api, true);
  xhttp.onreadystatechange = function (event) {
    if(xhttp.readyState === 4){
      if(xhttp.status === 200){

        callback(null, JSON.parse(xhttp.responseText))
      }
      else{
        const error = new Error("Error "+ url_api);
        return callback(error, null)
      }
    }
  }
  xhttp.send(); 
}

//Procederemos a realizar los 3 llamados con callbacks
fetchData(API, function(error1, data1){
  if (error1) return console.error(error1);
  fetchData(API + data1.results[0].id, function(error2, data2){
    if(error2) return console.error(error2)
    fetchData(data2.origin.url, function(error3, data3){
      if (error3) return console.error(error3);
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension)
    })
  })
})
```

Te botará 
```
826
Rick Sanchez
Dimension C-137
```
Esto te puede llevar a un callback hell, evita hacer muchos llamados encadenados, lo ideal es máximo 3 llamadas

### Implementando Promesas

Promesa de que algo va a suceder ahora, en el futuro o nunca

```js
const somethingWilHappen = () => {
  return new Promise((resolve, reject) => {
    if (true){
      resolve('Hey!');
    }
    else {
      reject('Whoops');
    }
  })
};

somethingWilHappen()
  .then(response => console.log(response))
  .catch(err => console.error(err))
```

**Dato interesante:**

somethingWillHappend lo declaraba como función y retornaba la promesa en lugar de declarar de una vez la promesa en la variable. Pues probando me di cuenta que para encapsular la promesa y que no se ejecute hasta que se llame a la función ya que si se declara la promesa directamente en la variable la promesa se ejecutara al cargar la variable.

```js
/**
 * Aqui la promesa se ejecuta al cargar el archivo
*/
const somethingWillHapped = new Promise( (resolve, reject) => {
    if (true) {
        console.log('Hey dude!');
        resolve('Hey!');
    } else {
        reject('Whoops!');
    }
});

/**
 *Aqui la promesa no se ejecuta hasta que se llame a la funcion
*/
const somethingWillHapped = () => {
    return new Promise( (resolve, reject) => {
        if (true) {
            console.log('Hey dude!');
            resolve('Hey!');
        } else {
            reject('Whoops!');
        }
    });
}
```

```js
somethingWilHappen()
  .then(response => console.log(response))
  .catch(err => console.error(err))

const somethingWilHappen2 = () => {
  return new Promise((resolve, reject) => {
    if (false){
      setTimeout(() => {
        resolve('True');
      }, 2000)
    }
    else {
      const error = new Error('Whoops!')
      reject(error)
    }
  })
}
somethingWilHappen2()
  .then(response => console.log(response))
  // .then(()=> console.log('hola'))
  //podemos sacar mas then con un console log
  .catch(err => console.error(err))
  //El new error te botará en el caso de false en la promesa diciendote donde esta el error para hacer un debugging
```

Como correr varias promesas al mismo tiempo

```js
Promise.all([somethingWilHappen(), somethingWilHappen2()])
  .then(response => {
    console.log('Array of results', response)
  })
  .catch(err => {
    console.error(err)
  })
//Te botará Array of results [ 'Hey!', 'True' ]

```
Entonces...

**Métodos de las promesas**

*Promise.all(iterable)*
Devuelve una de dos promesas:

- una que se cumple cuando todas las promesas en el argumento iterable han sido cumplidas,

- o una que se rechaza tan pronto como una de las promesas del argumento iterable es rechazada.

Si la promesa retornada es cumplida, lo hace con un arreglo de los valores de las promesas cumplidas en el mismo orden definido en el iterable.

Si la promesa retornada es rechazada, es rechazada con la razón de la primera promesa rechazada en el iterable. Este método puede ser útil para agregar resultados de múltiples promesas

*Promise.race(iterable)*
Devuelve una promesa que se cumple o rechaza tan pronto como una de las promesas del iterable se cumple o rechaza, con el valor o razón de esa promesa.

*Promise.reject(reason)*
Devuelve un objeto Promise que es rechazado con la razón dada.

### Resolver problema con Promesas

Si transformamos fetchData del reto anterior a ES6
```js
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const fetchData = (url_api) =>{
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = (() => {
      if(xhttp.readyState === 4){
        (xhttp.status === 200)
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error('Error', url_api))
      }
    })
    xhttp.send(); 
  })
}

module.exports = fetchData;
//Esto te sirve en node para import y export
```

Y luego hacemos el llamado con challenge.js
```js
const fetchData = require('../utils/fetchData')
const API = 'https://rickandmortyapi.com/api/character/'

fetchData(API)
  .then (data => {
    console.log(data.info.count)
    return fetchData(`${API}${data.results[0].id}`)
  })
  .then(data => {
    console.log(data.name)
    return fetchData(data.origin.url)
  })
  .then(data => {
    console.log(data.dimension)
  })
  .catch(err => console.error(err))
```
Nos botará
```js
826
Rick Sanchez
Dimension C-137
```

> tip con el modulo nativo de node de https

Con el módulo HTTPS nativo de node, para no requerir la instalación de ningún paquete con npm, todo funciona nativamente. Si bien el resultado es el mismo, desistir de paquetes que no nos son realmente necesarios siempre será la mejor opción para nuestros desarrollos a medida que van creciendo, para evitar llenarlos de dependencias.

```js
const https = require("https");
const API_BASE = 'https://rickandmortyapi.com/api/';

const APIRequest = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.setEncoding('utf8');
            if(res.statusCode === 200) {
                let body = '';
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', () => { 
                    resolve(JSON.parse(body));
                });
            } else reject(new Error(`REQUEST ERROR ON ${url}. Status ${res.statusCode}`));
        });
    });
}

APIRequest(API_BASE + 'character/')
    .then((response) => {
        console.log(response.info.count)
        return APIRequest(API_BASE + 'character/' + response.results[0].id);
    })
    .then((response) => {
        console.log(response.name)
        return APIRequest(response.origin.url);
    })
    .then((response) => {
        console.log(response.dimension)
    })
    .catch((error) => console.error(error));
```

### Conociendo Async/await

Es preferible aplicarest osobre las promesas porque el codigo se comporta de manera sincrona

```js
const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve ('Do Something Async'), 3000)
      : reject(new Error('Test Error'))
  })
}

const doSomething = async () => {
  const something = await doSomethingAsync()
  console.log(something)
}

console.log('Before');
doSomething();
console.log('After')

//Te botará
// Before
// After
// Do Something Async

//Pero como vamos a capturar los errores?

const anotherFunction = async () => {
  try {
    const something = await doSomethingAsync();
    console.log(something)
  }
  catch (error) {
    console.error(error)
  }
}

console.log('Before 1');
anotherFunction();
console.log('After 1')
```

### Resolver problema con Async/Await

```js
const fetchData = require('../utils/fetchData');
const API = 'https://rickandmortyapi.com/api/character/'
//si algo nunca va a cmabiar o mover lo ponemos en mayusculas

const anotherFunction = async (url_api) => {
  try {
    const data = await fetchData(url_api)
    const character = await fetchData(`${API}${data.results[0].id}`)
    const origin = await fetchData(character.origin.url)
    
    console.log(data.info.count)
    console.log(character.name)
    console.log(origin.dimension)
  }
  catch (error) {
    console.error(error)
  }
}

console.log('Before')
anotherFunction(API)
console.log('After')

// Te botará:
// Before
// After
// 826
// Rick Sanchez
// Dimension C-137

```
## Comprender las diferencias entre las estructuras asíncronas

### Callbacks Vs Promesas Vs Async/Await

**Callbacks**

*Ventajas:* Simple(una función que recibe otra función). Son universales, corren en cualquier navegador.
*Desventajas:* Composición tediosa, anidando cada vez más elementos. Caer en Callback Hell.


**Promesas**

*Ventajas:* Facilmente enlazables .Then( return… ).Then - Fácil e intuitivo de leer.
*Desventajas:* Posible error si no se retorna el siguiente llamado. No corre en todos los navegadores.


**Async-Await**

*Ventajas:* Se puede usar try-catch . Código más ordenado e intuitivo.
*Desventajas:* No corre en todos los navegadores (se requiere un transpilador).

### Conclusiones
Ventajas y Desventajas

Callbacks
V = Es simple una función que recibe otra función
V = Son universales
D = Composición tosca
D = Callbacks Hell
D = Flujo poco intuitivo
D = Debemos pensar que estamos haciendo código para humanos y debe ser facil de leer
D = if FecthData, if FecthData, if FecthData y se vuelve tedioso y no se maneja excepciones

Promise
V = Fácilmente enlazable then y return, then y return y asi
V = Es poderoso // es muy recomendado para desarrolladores
D = NO maneja excepciones si no maneja un catch al final y seremos propensos a errores
D = Requiere un polyfile para ser transpilados y ser interpretados en todos los navegadores //Babbel

Async Await
V = El tradicional try - catch y manejar las excepciones de manera mas fluida
V = Mas fáciles de leer que sucedera que va a suceder
D = Ese poder que podemos decir es decir si queremos algo debemos esperar que algo suceda
D = Requiere un polyfile para ser transpilados y ser interpretados en todos los navegadores //Babbel