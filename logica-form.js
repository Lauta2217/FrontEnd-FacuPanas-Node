document.getElementById("button-form").addEventListener("click", function(event) {
    event.preventDefault(); 
    const link_archivo = document.getElementById("link_archivo").value;
    const regex = /^https:\/\/drive\.google\.com\/file/;
    if (!regex.test(link_archivo)) {
        Swal.fire({
        icon: 'error',
        title: 'Link inválido',
        text: 'El link debe comenzar con https://drive.google.com/file',
        confirmButtonText: 'Entendido'
    });
    return;
    }
    Swal.fire({
    icon: 'success',
    title: 'Enviado',
    text: 'Tu mensaje se abrió en WhatsApp 🚀',
    showConfirmButton: false,
    timer: 2000
});
    const nombre_apellido = document.getElementById("nombre-apellido").value;
    const descripcion = document.getElementById("descripcion").value;
    const mensaje = 'Hola mi nombre es ' + nombre_apellido + ', mi archivo es: ' + link_archivo + ', y mi mensaje es: ' + descripcion;
    const url = 'https://api.whatsapp.com/send?phone=542644590545&text=' + encodeURIComponent(mensaje);
    window.open(url);
    document.getElementById("formulario").reset();
});