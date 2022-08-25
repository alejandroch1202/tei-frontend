// Select the form area by id
const form = document.querySelector("#form");

// Function addEventListener for submit operation
form.addEventListener("submit", (event) => {
  // prevent the form submit from refreshing the page
  event.preventDefault();

  const { name, mail, message } = event.target;

	// Use your API endpoint URL you copied from the previous step
  const endpoint =
    "https://d4mrtzf8qb.execute-api.eu-central-1.amazonaws.com/api/teisendemail";

  // We use JSON.stringify here so the data can be sent as a string via HTTP
	const body = JSON.stringify({
    senderName: name.value,
    senderEmail: mail.value,
    message: message.value
  });

  const requestOptions = {
    method: "POST",
    cache: "no-cache",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  };

  fetch(endpoint, requestOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch");
      return response.json();
    })
    .then((response) => {
      let success = document.getElementById("result-text");
      success.style.color = "green";
      success.innerText = "Su Solicitud ha sido enviada!";
      setTimeout(function() {success.innerText = "";}, 3000)
      name.value = "";
      mail.value = "";
      message.value = "";

    })
    .catch((error) => {
      let noSuccess = document.getElementById("result-text");
      noSuccess.style.color = "red";
      noSuccess.innerText = "Ha ocurrido un error.";
      setTimeout(function() {noSuccess.innerText = "";}, 3000)
      name.value = "";
      mail.value = "";
      message.value = "";
    });
});

function enviar() {
  alert('Su mensaje fue enviado exitosamente');
}