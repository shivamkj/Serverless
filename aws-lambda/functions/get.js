// const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { buildResponse } = require("../utils");

// const dbclient = new DynamoDBClient({ region: process.env.REGION });
const dbclient = new DynamoDB({ region: process.env.REGION });

module.exports.function = async (event) => {
  try {
    const id = event.pathParameters.id;

    const params = {
      TableName: process.env.POSTS_TABLE,
      Key: {
        id: { S: id },
      },
    };

    // const data = await dbclient.send(new GetItemCommand(params));
    const { Item: item } = await dbclient.getItem(params);

    if (item) {
      const data = unmarshall(item);
      return buildResponse(200, data);
    } else return buildResponse(404, { error: "Post not found" });
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Internal Server Error" });
  }
};
