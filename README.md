<h1>API-Whatikect</h1>
API para mandar mensajes de WhatsApp, utilizando Node.js con Axios.

<h1>Index</h1>
<ol>
  <li><a href="#1">Instalación de Node</a></li>
  <li><a href="#2">Crear un proyecto nuevo</a></li>
  <li><a href="#3">Instalar Express</a></li>
  <li><a href="#4">Instalar Axios</a></li>
  <li><a href="#5">Instalar CORS</a></li>
  <li><a href="#6">Instalar Multer</a></li>
  <li><a href="#7">Crear el server.js</a></li>
  <li><a href="#8">Ejemplo simple de Front</a></li>
</ol>

<h2>Creación del proyecto</h2>
Antes de relizar toda la programacion necesaria para hacer los request a la API, es necesario que instalemos diferentes bibliotecas
que seran necesarias para que todo funcione de manera correcta.

<h3 id="1">Instalación de Node</h3>
Podremos instalar Node ingresando a su pagina oficial. En caso de no saber si ya lo tienes instalado puedes utilizar el siguiente comando para verificar:

```
node -v
npm -v
```

<h3 id="2">Crear un proyecto nuevo</h3>
Para crear el proyecto primero es necesario crear una carpeta donde se contendran los archivos como el server.js. Una vez creada, desde el cmd
se debe navegar hasta el directorio donde se encuentra la carpeta creada y ejecutar el siguiente comando:

```
npm init
```

o:

```
dnpm init -y
```

<h3 id="3">Instalar Express</h3>
Para instalar Express en cmd, dentro del mismo directorio ejecutar:

```
npm install express
```

<h3 id="4">Instalar Axios</h3>
Siguiendo el mismo procedimiento que el paso anterior, ejecuta el siguiente comando para instalar Axios:

```
npm install axios
```

<h3 id="5">Instalar CORS</h3>
Para instalar CORS se debe ejecutar el siguiente comando:

```
npm install cors
```

<h3 id="6">Instalar Multer</h3>
Para terminar instalaremos Multer el cual nos servira para el manejo de la carga de archivos que en esta ocasión sera necesario para poder enviar
imagenes, .pdf, .txt, etc. Ejecutando el siguiente comando lo podremos instalar:

```
npm install multer
```

<h3 id="7">Crear el server.js</h3>
Una vez instalado todo lo necesario solo se crea el server.js, el cual ya se encuentra dentro del repositorio en caso de querer trabajar con la misma configuracion(tambien se encuentran los archivos para hacer los llamados).
En caso de no querer utilizar la misma configuracion del server.js y llamados que se proporcionan en el documento, puedes acceder a la documentacion de la API y realizar las propias. Documentación: https://help.whaticket.com/article/¿cómo-funciona-nuestra-api

<h3 id="8">Ejemplo de front</h3>
Este es un ejemplo basico de front para poder hacer un request con el proyecto que se tiene. El siguiente seria el html donde el usuario puede ingresar la informacion que se ocupa para el request(numero de telefono, nombre, mensaje y la imagen).

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar Mensaje</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> <!-- Carga de Axios -->
</head>
<body>

    <h2>Formulario para Enviar Mensaje</h2>

    <form id="mensaje" enctype="multipart/form-data">
        <label for="number">Número de teléfono:</label>
        <input type="text" id="number" name="number" value="5213317461529" required><br><br>

        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" value="Gabriel M" required><br><br>

        <label for="body">Mensaje:</label>
        <textarea id="body" name="body" required>Hola</textarea><br><br>

        <label for="archivo">Adjuntar archivo:</label>
        <input type="file" id="archivo" name="archivo" required><br><br>

        <button type="submit">Enviar Mensaje</button>
    </form>

</body>
</html>
```

Este es el js donde realizamos el llamado:

```javascript
document.getElementById('mensaje').addEventListener('submit', async function(event) {
            event.preventDefault(); 
            
            // Obtén el archivo del input file
            const archivo = document.querySelector('input[type="file"]').files[0];

            // Crea el FormData
            const formData = new FormData();
            formData.append('number', document.getElementById('number').value); 
            formData.append('name', document.getElementById('name').value);
            formData.append('body', document.getElementById('body').value);
            formData.append('archivo', archivo); 
            
            // Muestra los datos del FormData en consola (opcional)
            formData.forEach((value, key) => {
                console.log(key, value);
            });

            try {
                // Realiza la solicitud POST con los datos
                const response = await axios.post('http://localhost:8004/api/whatsapp/envia', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    }
                });

                // Si la respuesta es exitosa
                if (response.status === 200) {
                    alert('Mensaje enviado correctamente');
                }
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                alert('Hubo un error al enviar el mensaje');
            }
        });
```


