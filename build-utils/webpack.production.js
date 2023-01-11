const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TarWebpackPlugin = require('tar-webpack-plugin').default;
const deps = require('../package.json').dependencies;

const alias = {
  "@components": path.resolve(__dirname, "../src/components"),
  "@hooks": path.resolve(__dirname, "../src/hooks"),
}

module.exports = [
  {
    name: "dts",
    mode: "production",
    entry: [
      "./src/components/Button",
    ],
    output: {
      publicPath: "auto",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css"],
      alias
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: "postcss-loader",
              options: {
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
          ]
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
          use: [
            {
              loader: 'dts-loader',
              options: {
                name: 'new_app', // The name configured in ModuleFederationPlugin
                exposes: { // The exposes configured in ModuleFederationPlugin
                  './App': './src/App.view.tsx',
                },
                typesOutputDir: '.wp_federation' // Optional, default is '.wp_federation'
              },
            },
          ],
        },
      ],
    },
  },
  {
    entry: "./src/index",
    mode: "development",
    output: {
      publicPath: "auto",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".svg", ".css"],
      alias
    },
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
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
      new Dotenv({
        path: path.resolve(__dirname, "..", "./.env.production"),
        systemvars: true,
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new TarWebpackPlugin({
        action: 'c',
        gzip: true,
        cwd: path.resolve(process.cwd(), '.wp_federation'),
        file: path.resolve(process.cwd(), 'dist', 'app-name-dts.tgz'),
        fileList: ['new_app']
      }),
      new WebpackRemoteTypesPlugin({
        remotes: {
          de_common_ui:
            "de-common-ui@https://origin-tf-dev-web-common-dev.azurewebsites.net/remoteEntry.js",
        },
        outputDir: "remote-types", // supports [name] as the remote name
        remoteFileName: "[name]-dts.tgz", // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
      }),
      new ModuleFederationPlugin({
        name: "new_app",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.view",
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
          "@chakra-ui/react": {
            requiredVersion: deps["@chakra-ui/react"],
            singleton: true,
          },
          "framer-motion": {
            requiredVersion: deps["framer-motion"],
            singleton: true,
          },
        },
        remotes: {
          de_common_ui:
            "de_common_ui@https://origin-tf-dev-web-common-dev.azurewebsites.net/remoteEntry.js",
          de_origin:
            "de_origin@http://hledev.originaec.app/remoteEntry.js"
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
      port: 3001,
      open: true,
      compress: false,
      historyApiFallback: true,
    },
  },
];
