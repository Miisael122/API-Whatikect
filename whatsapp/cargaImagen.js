const axios = require('axios');
const config = require(__dirname + '../../config/config.js');
const FormData = require('form-data');

async function cargarImagen(buffer, archivo) {

    try{

        let data = new FormData();
        data.append('media', buffer, archivo);

        let configAxios = {
        method: 'post',
        url: `${config.ejemplo.url}/medias`,
        headers: { 
            Authorization: `Bearer ${config.ejemplo.key}`
        },
        data : data
        };

        const response = await axios(configAxios);

        if (response.data && response.data.mediaKey) {
            return response.data;
        } else {
            throw new Error('La respuesta de carga de imagen no contiene la mediaKey');
        }

    }catch (error) {
        console.error('Error al cargar imagen:', error.message);
        throw error;
    }
}
module.exports = { cargarImagen };