const form = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
  password: /^.{4,12}$/,
};

const campos = {
  usuario: false,
  password: false,
};

const validar = (e) => {
  switch (e.target.name) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;

    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`${campo}-label`)
      .classList.remove(`${campo}-incorrecto`);
    document
      .getElementById(`${campo}-label`)
      .classList.add(`${campo}-correcto`);
    document.getElementById(`${campo}`).classList.remove(`input-incorrecto`);
    document.getElementById(`${campo}`).classList.add(`input-correcto`);
    document
      .getElementById(`mensaje-${campo}`)
      .classList.add(`mensaje-${campo}-activo`);
    document
      .getElementById(`mensaje-${campo}`)
      .classList.remove(`mensaje-${campo}-activo`);
    campos[campo] = true;
  } else {
    document
      .getElementById(`${campo}-label`)
      .classList.add(`${campo}-incorrecto`);
    document
      .getElementById(`${campo}-label`)
      .classList.remove(`${campo}-correcto`);
    document.getElementById(`${campo}`).classList.add(`input-incorrecto`);
    document.getElementById(`${campo}`).classList.remove(`input-correcto`);
    document
      .getElementById(`mensaje-${campo}`)
      .classList.remove(`mensaje-${campo}-activo`);
    document
      .getElementById(`mensaje-${campo}`)
      .classList.add(`mensaje-${campo}-activo`);
    campos[campo] = false;
  }
};

const eliminar = (campo) => {
  document
    .getElementById(`${campo}-label`)
    .classList.remove(`${campo}-correcto`);
  document.getElementById(`${campo}`).classList.remove(`input-correcto`);
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validar);
  input.addEventListener("blur", validar);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.usuario && campos.password) {
    form.reset();

    document
      .getElementById("mensaje-exito")
      .classList.add("mensaje-exito-activo");
    document
      .getElementById("mensaje-error")
      .classList.remove("mensaje-error-activo");

    eliminar("usuario");
    eliminar("password");

    setTimeout(() => {
      document
        .getElementById("mensaje-exito")
        .classList.remove("mensaje-exito-activo");
    }, 3000);
  } else {
    document
      .getElementById("mensaje-error")
      .classList.add("mensaje-error-activo");
  }
});
