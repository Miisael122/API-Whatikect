const axios = require('axios');
const config = require(__dirname + '../../config/config.js');
const comunes = require(__dirname + '../../config/comunes.js');
const { cargarImagen } = require(__dirname + '/cargaImagen.js');

async function post(req, res) {

console.log('Body recibido:', req.body); 

let mediakey;
let mediatype;

if (typeof req.body.number === 'undefined') {
    return res.status(202).send( comunes.ponMensaje( '001', 'number es un campo requerido', '' ) );
}
if (typeof req.body.name === 'undefined') {
    return res.status(202).send( comunes.ponMensaje( '002', 'name es un campo requerido', '' ) );
}
if (typeof req.body.body === 'undefined') {
    return res.status(202).send( comunes.ponMensaje( '003', 'body es un campo requerido', '' ) );
}


const { number, name, body } = req.body;

try{

    const archivoBuffer = req.file.buffer;  
    const archivoNombre = req.file.originalname;
    mediaType = req.file.mimetype; 

    const respuestaImagen = await cargarImagen(archivoBuffer, archivoNombre );

    if (respuestaImagen && respuestaImagen.mediaKey) {
        mediakey = respuestaImagen.mediaKey;
    } else {
        return res.status(400).send(comunes.ponMensaje('004', 'No se pudo obtener la mediaKey del archivo', ''));
    }
    console.log('Media key recibida:', mediakey); 
    console.log('Media type recibida:', mediaType); 

    const data = {
        whatsappId: "Se consigue dentro de la pagina cuando tienes cuenta",  
        globalMediaKey: mediakey,
        globalMediaType: mediaType.split('/')[0], 
        messages: [
        {
            number: number,
            name: name,
            body: body
        }
        ]
    };

    JSON.stringify(data);

    let configAxios = {
    method: 'post',
    url: `${config.ejemplo.url}/messages`,
    headers: { 
        Authorization: `Bearer ${config.ejemplo.key}`
    },
    data : data
    };

    await axios.request(configAxios)
    .then((response) => {
        //return console.log(data);
        return res.status(response.status).json( response.data );
    })
    .catch((error) => {
        if (error.response) {
            return res.status(error.response.status).json( error.response.data );
        } else {
            return res.status(405).send( { codigo: '001', mensaje: 'Error', resultado: error.message } );
        }
    });

}catch (error) {
    console.error(error);
    return res.status(500).send({
        codigo: '001',
        mensaje: 'Error al procesar la solicitud',
        resultado: error.message
    });
}

}

module.exports.post = post;