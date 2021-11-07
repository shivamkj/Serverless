// const m1 = require("./m1");
// const { m21 } = require("./m2");

import m1 from "../m1";
import { m21 } from "../m2";

console.log(m1());

console.log(m21());

module.exports.function = () => {
  const abcdef = m1();
  console.log(abcdef);
  m1();
  m21();
};

const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildResponse } from "../utils";

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
