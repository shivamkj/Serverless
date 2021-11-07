// const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { v4 } = require("uuid");
const { buildResponse } = require("../utils");

// const dbclient = new DynamoDBClient({ region: process.env.REGION });
const dbclient = new DynamoDB({ region: process.env.REGION });

module.exports.function = async (event) => {
  try {
    const reqBody = JSON.parse(event.body);

    if (!reqBody.title.trim() || !reqBody.body.trim())
      return buildResponse(400, {
        error: "Post must have a title and body and they must not be empty",
      });

    const params = {
      TableName: process.env.POSTS_TABLE,
      Item: {
        id: { S: v4() },
        createdAt: { S: new Date().toISOString() },
        userId: { N: "113" },
        title: { S: reqBody.title },
        body: { S: reqBody.body },
      },
    };

    // const data = await dbclient.send(new PutItemCommand(params));
    const output = await dbclient.putItem(params);
    return buildResponse(201, output);
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Internal Server Error" });
  }
};
