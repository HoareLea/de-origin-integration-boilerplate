const { buildClientSchema } = require("graphql");
const dotenv = require("dotenv");
const fetch = require("cross-fetch");

dotenv.config();

module.exports = async () => {
  const response = await fetch(    
    process.env.REACT_APP_ORIGIN_PLATFORM_SCHEMA,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  return buildClientSchema(data.data);
};
