function ponMensaje( v_Codigo, v_Mensaje, v_Error ) {
  let l_mensaje;
  l_mensaje = { Codigo: v_Codigo, Mensaje: v_Mensaje, Error: v_Error };
  return l_mensaje;
}

module.exports.ponMensaje = ponMensaje;