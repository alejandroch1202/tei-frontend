// Initialize the Amazon Cognito credentials provider
AWS.config.region = "eu-central-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "eu-central-1:00abeafd-83d3-4ccb-9ba5-c5fc5b31af03",
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

let state = "null";
let network = "null";

// Funtion to get the client ID
function GetId() {
  let auth = "Bearer " + token.split("&")[1].split("=")[1];
  let url = oauth;

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
      client_id = res["sub"];
      QueryData(client_id);
    });
}

// Funtion to query the data from the DB
function QueryData(client_id) {
  if (typeof client_id !== "string") {
    return;
  }
  let params = {
    TableName: db,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: { "#id": "id_number" },
    ExpressionAttributeValues: { ":id": client_id },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.log(JSON.stringify(err, undefined, 2));
      window.location.href = login;
    } else {
      network = data.Items[0].network;
      state = data.Items[0].thing_status;
      // console.log(data.Items[0]);
    }
    // document.getElementById("label").innerHTML = "No disponible";
  });
}