const Firestore = require("@google-cloud/firestore");
const db = new Firestore();

exports.function = async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).send({ error: "Method not allowed" });

    // TODO: Check for valid request body
    const input = req.body;

    const add = await db.collection("users").add(input);
    const documentSnapshot = await add.get();
    const document = documentSnapshot.data();

    res.status(200).send(document);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
