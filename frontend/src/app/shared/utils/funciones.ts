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
