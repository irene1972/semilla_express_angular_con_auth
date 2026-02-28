export function isAdmin() {
  const usuarioString = localStorage.getItem('usuarioTwitter');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    console.log(usuario);
    if (usuario.role === 'admin') return usuario;
    else return false;
  }
}

export function isLogged() {
  const usuarioString = localStorage.getItem('usuarioTwitter');
  if (!usuarioString) {
    return false;
  } else {
    const usuario = JSON.parse(usuarioString);
    if (usuario.role === 'admin' || usuario.role === 'user') return usuario;
    else return false;
  }
}

export function returnText(code:string){
  switch(code){
    case '1': return "Se ha enviado un mensaje de confirmación a su correo electrónico. Por favor confirme en el enlace";
    //case 2: return "";
    default: return "";
  }
}