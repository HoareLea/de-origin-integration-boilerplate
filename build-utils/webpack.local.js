const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const TarWebpackPlugin = require('tar-webpack-plugin').default;
const deps = require('../package.json').dependencies;
const pkg = require("../package.json");

const alias = {
  "@components": path.resolve(__dirname, "../src/components"),
  "@hooks": path.resolve(__dirname, "../src/hooks"),
}

module.exports = {
  entry: "./src/index",
  mode: "none",
  output: {
    publicPath: "auto",
    uniqueName: "de_boiler"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".svg", ".css", ".png"],
    alias
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "postcss-nesting",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader'
      },
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      MyAppVersion: JSON.stringify(pkg.version),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env.local"),
      systemvars: true,
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new WebpackRemoteTypesPlugin({
      remotes: {
        de_common_ui:
          "de-common-ui@http://localhost:3002/remoteEntry.js",
      },
      outputDir: "remote-types", // supports [name] as the remote name
      remoteFileName: "[name]-dts.tgz", // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
    }),
    new ModuleFederationPlugin({
      name: "de_boiler",
      filename: "remoteEntry.js",
      exposes: {
        './App': './src/App.remote',
        "./Widget": "./src/views/Widget/Widget"
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true,
          eager: true,
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true,
          eager: true,
        },
        "@emotion/react": {
          requiredVersion: deps["@emotion/react"],
          singleton: true,
          eager: true,
        },
        "@emotion/styled": {
          requiredVersion: deps["@emotion/styled"],
          singleton: true,
          eager: true,
        },
        "framer-motion": {
          requiredVersion: deps["framer-motion"],
          singleton: true,
          eager: true,
        },
        "@chakra-ui/react": {
          requiredVersion: deps["@chakra-ui/react"],
          singleton: true,
          eager: true,
        },
      },
      remotes: {
        de_common_ui:
          "de_common_ui@http://localhost:3002/remoteEntry.js",
        de_origin:
          "de_origin@http://localhost:3001/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "dist"),
    },
    allowedHosts: 'all',
    client: {
      reconnect: true,
    },
    port: 3004,
  },
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  }
  /* output: {
    filename: "bundle.js",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "..", "dist"),
    clean: true,
    publicPath: "auto",
  }, */
};
