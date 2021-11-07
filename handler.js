"use strict";

var admin = require("firebase-admin");

var serviceAccount = require("./SAK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rest-api-6dcd5.firebaseio.com",
});

const db = admin.firestore();

module.exports.hello = async (event) => {
  /*
  CRUD OPERATIONS FOR FIRESBASE FIRESTORE
  */

  // // C - CREATE OPERATION
  // const data = {
  //   email: "abc@world.com",
  //   firstName: "Hello" + Math.floor(Math.random() * 100).toString(),
  //   lastName: "World" + Math.floor(Math.random() * 100).toString(),
  // };
  // const add = await db.collection("users").add(data);
  // const documentSnapshot = await add.get();
  // const result = documentSnapshot.data();

  // // R - READ OPERATION
  const result = [];
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    result.push({ id: doc.id, ...doc.data() });
  });

  // // U - UPDATE OPERATION
  // const result = await db.collection("users").doc("Wg03rVbFP59qhlGLgd8V").set(
  //   {
  //     email: "email@email.com",
  //   },
  //   { merge: true }
  // );

  // // D - DLETE OPERATION
  // const result = await await db.collection("users").doc("cO2GLdWP0vOtU05pxDPP").delete();

  // const snapshot = await db.collection("users").doc("Wg03rVbFP59qhlGLgd8V");
  // const doc = await (await snapshot.get()).ref;
  // const result = await doc.listCollections()

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
