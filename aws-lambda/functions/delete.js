// const {
//   DynamoDBClient,
//   DeleteItemCommand,
// } = require("@aws-sdk/client-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { buildResponse } = require("../utils");

// const dbclient = new DynamoDBClient({ region: process.env.REGION });
const dbclient = new DynamoDB({ region: process.env.REGION });

module.exports.function = async (event) => {
  try {
    const id = event.pathParameters.id;

    const params = {
      Key: {
        id: { S: id },
      },
      TableName: process.env.POSTS_TABLE,
    };

    // const { Item } = await dbclient.send(new DeleteItemCommand(params));
    const { Item: item } = await dbclient.deleteItem(params);
    return buildResponse(200, { message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Internal Server Error" });
  }
};
