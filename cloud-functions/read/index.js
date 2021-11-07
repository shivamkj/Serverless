const Firestore = require("@google-cloud/firestore");
const db = new Firestore();

module.exports.function = async (req, res) => {
  try {
    
    const result = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
