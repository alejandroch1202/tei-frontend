window.addEventListener("error", HandleError, true);

const db = "tei-db";
const oauth = "https://auth.tei.com.ve/oauth2/userInfo";
const login = "https://auth.tei.com.ve/login?client_id=7g3i7fpuuotl1d7jjevu29pilq&response_type=token&scope=email+https://tei.logo.actions/logo.off+https://tei.logo.actions/logo.on+openid+https://tei.logo.actions/login&redirect_uri=https://www.tei.com.ve/redirecting";
const token = window.location.href;

GetId();

let client_id;
let interval = 1000;

const water_icon = document.querySelector("#water");
const water_check = document.querySelector("#water_check");
const network_icon = document.querySelector("#network");
const network_status = document.querySelector("#network_status");
const network_check = document.querySelector("#network_check");

setInterval(() => {
  QueryData(client_id);

  if (network !== "Online_") {
    if (network_check.checked) {
      network_icon.src = "/img/imagenes/iconos/conexion-off2.png";
      network_status.textContent = "Offline";
      network_check.click();
    }
  } else {
    if (!network_check.checked) {
      network_icon.src = "/img/imagenes/iconos/conexion-on2.png";
      network_status.textContent = "Online";
      network_check.click();
    }
  }

  if (state !== "01") {
    if (water_check.checked) {
      water_icon.src = "./img/imagenes/iconos/gota-off2.png";
      water_check.click();
      swal("Estimado usuario TEI", "Su motor ha sido apagado correctamente.", {
        buttons: false,
        icon: "success",
        timer: 3000,
        closeOnClickOutside: false,
      });
    }
  } else {
    if (!water_check.checked) {
      water_icon.src = "./img/imagenes/iconos/gota-on2.png";
      water_check.click();
      swal(
        "Estimado usuario TEI",
        "Su motor ha sido encendido correctamente.",
        {
          buttons: false,
          icon: "success",
          timer: 3000,
          closeOnClickOutside: false,
        }
      );
    }
  }
}, interval);

// Funtion to handle errors on the GUI
function HandleError(evt) {
  if (evt.message) {
    if (
      evt.message ==
      `Uncaught TypeError: Cannot read properties of undefined (reading 'split')`
    ) {
      window.location.href = login;
    } else if (evt.message == `Script error.`) {
      window.location.href = login;
    } else {
      console.log(evt.message);
    }
  }
}

function notification(sound) {
  const notif = new Audio("../audio/" + sound + ".mp3");
  notif.play();
}

function control(set) {
  let url = "https://vnfl2aee1k.execute-api.eu-central-1.amazonaws.com/default/control/http/" + set + "?id=" + client_id;
  let auth = token.split("&")[1].split("=")[1];

  fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res["body"]);
    });
}