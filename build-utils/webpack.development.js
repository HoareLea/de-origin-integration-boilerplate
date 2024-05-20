const webpackFactory = require("./webpackFactory");

var properties = {
  mode: "development",
  devtool: "eval-source-map",
  dotEnvFile: "./.env.development",
  remoteModules: {
    de_common_ui:
      "de_common_ui@https://dev.originaec.app/common/remoteEntry.js",
    de_origin:
      // "de_origin@https://dev.originaec.app/remoteEntry.js",
      "de_origin@https://origin-tf-dev-web-chore-12341.azurewebsites.net/remoteEntry.js",
      // "de_origin@http://localhost:3001/remoteEntry.js",
  },
};

module.exports = webpackFactory.create(properties);
