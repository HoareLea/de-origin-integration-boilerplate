const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const deps = require("../package.json").dependencies;
const pkg = require("../package.json");

const alias = {
  "@": path.resolve(__dirname, "../src"),
  "@components": path.resolve(__dirname, "../src/components"),
  "@hooks": path.resolve(__dirname, "../src/hooks"),
  "@utils": path.resolve(__dirname, "../src/utils"),
  "@services": path.resolve(__dirname, "../src/services"),
};

const create = ({
  mode,
  devtool,
  dotEnvFile,
  remoteTypes,
  remoteModules,
  minimize = false,
  minimizer = undefined,
}) => ({
  entry: "./src/index",
  mode,
  devtool,
  output: {
    publicPath: "auto",
    uniqueName: "de_boiler",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".svg", ".css", ".png"],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
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
        include: path.resolve(__dirname, "../"),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
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
        },
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
      path: path.resolve(__dirname, "..", dotEnvFile),
      systemvars: true,
    }),
    new webpack.ProgressPlugin(),
    new ModuleFederationPlugin({
      name: "de_boiler",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.remote",
        "./Widget": "./src/views/Widget/Widget",
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true,
        },
        "@emotion/react": {
          requiredVersion: deps["@emotion/react"],
          singleton: true,
        },
        "@emotion/styled": {
          requiredVersion: deps["@emotion/styled"],
          singleton: true,
        },
        "framer-motion": {
          requiredVersion: deps["framer-motion"],
          singleton: true,
        },
        "@chakra-ui/react": {
          requiredVersion: deps["@chakra-ui/react"],
          singleton: true,
        },
      },
      remotes: remoteModules,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "dist"),
    },
    allowedHosts: "all",
    client: {
      reconnect: true,
    },
    port: 3004,
    open: true,
    compress: false,
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: "async",
    },
    minimize,
    minimizer,
  },
});

module.exports = {
  create,
};
