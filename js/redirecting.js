"use strict";

// Function that redirects the users according to his license
const token = window.location.href;
const api = "https://vnfl2aee1k.execute-api.eu-central-1.amazonaws.com/default/login";
const oauth = "https://auth.tei.com.ve/oauth2/userInfo";
const rUrl = token.split("redirecting")[1];

// Get the licence of the client
async function getLicense() {
  const auth = "Bearer " + token.split("&")[1].split("=")[1];
  let url = oauth;

  const result = await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  });

  const data = await result.json();
  const clientId = data.sub;

  url = api + "?id=" + clientId;

  const response = await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  });

  const res = await response.json();
  const license = await res.body;
  console.log(license);

  if (license === '"standard"') {
    window.location.href = "../standard" + rUrl;
  } else if (license === '"basic"') {
    window.location.href = "../basic" + rUrl;
  } else {
    window.location.href = "https://tei.com.ve";
  }
}

getLicense();
