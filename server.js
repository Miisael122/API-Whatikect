const express = require('express');
const cors = require( 'cors' );
const multer = require('multer'); 

let mensaje = require(__dirname + '/whatsapp/enviaMensaje.js');
let mensajeSimple = require(__dirname + '/whatsapp/enviaMensajeSimple.js');

const app = express(); 
const PORT = 8004;
const router = express.Router();

const storage = multer.memoryStorage();  
const upload = multer({ storage: storage });

router.post( '/whatsapp/envia', upload.single('archivo'), mensaje.post );
router.post( '/whatsapp/envia', mensajeSimple.post );
app.use(express.json());
app.use('/api', cors(), router);


app.listen(PORT, function()  {
  console.log(`Servidor encendido, puerto: ${PORT}`);
});

