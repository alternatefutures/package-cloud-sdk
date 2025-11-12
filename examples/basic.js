export const main = async () => {
  const msg = "Hello world (.js)";

  return {
    status: 200,
    body: JSON.stringify(msg),
    headers: { "content-type": "application/json" },
  };
};
