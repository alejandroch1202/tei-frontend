// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'eu-central-1'; // Select the AWS region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'eu-central-1:00abeafd-83d3-4ccb-9ba5-c5fc5b31af03',
});
  
  // Set init variables
  var state = "NaN"
  var network = "NaN"
  var thermal = "NaN"
  var thermal_not = "NaN"
  var phase = "NaN"
  var phase_not = "NaN"
  var level = "NaN"
  var level_not = "NaN"
  var alert_flag = false
  var dynamodb = new AWS.DynamoDB();
  var docClient = new AWS.DynamoDB.DocumentClient();
  
  // Funtion to query the data from the DB
  function QueryData() {

    var params = {
        TableName : db,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{ "#id": "id_number" },
        ExpressionAttributeValues: { ":id": clientID }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log(JSON.stringify(err, undefined, 2));
            window.location.href = login;
        } else {
            network = data.Items[0].network
            state = data.Items[0].thing_status
            // console.log(data.Items)
        }
        document.getElementById('label').innerHTML = 'No disponible'
    });
}