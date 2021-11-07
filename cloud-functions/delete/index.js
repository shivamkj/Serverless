const Firestore = require("@google-cloud/firestore");
const db = new Firestore();

exports.function = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) res.status(400).send({ error: "ID missing" });

    const result = await await db.collection("users").doc(id).delete();

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
