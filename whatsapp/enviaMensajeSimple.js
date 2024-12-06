const axios = require('axios');
const config = require(__dirname + '../../config/config.js');
const comunes = require(__dirname + '../../config/comunes.js');

async function post(req, res) {

console.log('Body recibido:', req.body); 


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

    const data = {
        whatsappId: "Se consigue dentro de la pagina cuando tienes cuenta",  
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

}

module.exports.post = post;