const webpackFactory = require("./webpackFactory");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

var properties = {
  mode: "production",
  dotEnvFile: "./.env.production",
  remoteTypes: {
    de_common_ui:
      "de-common-ui@https://common.hle.originaec.app/remoteEntry.js",
  },
  remoteModules: {
    de_common_ui: "de_common_ui@https://common.hle.originaec.app/remoteEntry.js",
    de_origin: "de_origin@https://origin-tf-dev-web-chore-12341.azurewebsites.net/remoteEntry.js",
  },
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          // removing comments
          comments: false,
        },
        compress: {
          // remove console.logs
          drop_console: true,
        },
      },
    }),
  ],
};

module.exports = webpackFactory.create(properties);
