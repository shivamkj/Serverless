// const {
//   DynamoDBClient,
//   UpdateItemCommand,
// } = require("@aws-sdk/client-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { buildResponse } = require("../utils");

// const dbclient = new DynamoDBClient({ region: process.env.REGION });
const dbclient = new DynamoDB({ region: process.env.REGION });

module.exports.function = async (event) => {
  try {
    const id = event.pathParameters.id;
    const reqBody = JSON.parse(event.body);
    const { body, title } = reqBody;

    const params = {
      TableName: process.env.POSTS_TABLE,
      Key: { id: { S: id } },
      UpdateExpression: "set title = :title, body = :body",
      ExpressionAttributeValues: {
        ":title": { S: title },
        ":body": { S: body },
      },
      // ConditionExpression: "attribute_exists(id)",
      // ReturnValues: "ALL_NEW",
    };

    // const data = await dbclient.send(new UpdateItemCommand(params));
    const output = await dbclient.updateItem(params);
    console.log("output", output);
    return buildResponse(200, output);
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Internal Server Error" });
  }
};
