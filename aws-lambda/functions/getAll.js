const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { buildResponse } = require("../utils");

const dbclient = new DynamoDBClient({ region: process.env.REGION });

module.exports.function = async (event) => {
  try {
    const params = {
      TableName: process.env.POSTS_TABLE,
    };

    const { Items: items } = await dbclient.send(new ScanCommand(params));
    console.log("items", items);

    const data = [];
    items.forEach((v) => data.push(unmarshall(v)));

    return buildResponse(200, data);
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Internal Server Error" });
  }
};
