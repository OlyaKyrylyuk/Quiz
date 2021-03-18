import jwt from "jsonwebtoken";

const secret_token = () => {
  const default_user = {};
  const token = jwt.sign({ default_user }, "my_secret_key");
  return token;
};
export default secret_token;
