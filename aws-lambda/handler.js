module.exports.fun = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello from Lambda!",
        input: event,
      },
      null,
      2
    ),
  };
};
