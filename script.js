const firebaseConfig = {
  apiKey: "AIzaSyBwpU_NjyXwPUYqfk8OdFjyiF0hPjGX0uE",
  authDomain: "datos-formulario-93988.firebaseapp.com",
  projectId: "datos-formulario-93988",
  storageBucket: "datos-formulario-93988.appspot.com",
  messagingSenderId: "865313658505",
  appId: "1:865313658505:web:af45c3dcdc8c537ed49858",
  measurementId: "G-JQ2RETQPWY"
};

// Inicializo Firebase
firebase.initializeApp(firebaseConfig);


// Inicializo Cloud Firestore y obtengo la referencia al servicio
const db = firebase.firestore();


//preventdefault cuando hacemos click en submit prevenimos la accion por defecto de limpiar el formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()


//Validacion nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

//validacion correo
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if(!emailPattern.test(emailEntrada.value)){
       emailError.textContent = 'Por favor, introduce un correo electrónico válido'
       emailError.classList.add('error-message')
    }else{
      emailError.textContent = ''
      emailError.classList.remove('error-message')

    }

//validar contraseña

    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    if (!contrasenaPattern.test(contrasenaEntrada.value) ){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, mayusculas, minusculas, numeros y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

//Si todos los campos son validos, envio formulario

if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
    db.collection("users").add({
      nombre: entradaNombre.value,
      email: emailEntrada.value,
      password: contrasenaEntrada.value
    })
    .then((docRef) => {
      alert('El formulario se ha enviado con éxito', docRef.id);
      document.getElementById('formulario').reset();
    })
    .catch((error) => {
      alert(error);
    });
  }
})