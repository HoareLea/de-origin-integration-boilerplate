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

const alias = {
  "@components": path.resolve(__dirname, "../src/components"),
  "@hooks": path.resolve(__dirname, "../src/hooks"),
}

module.exports = [
  {
    name: "dts",
    mode: "production",
    entry: [
      "./src/App.view",
      "./src/components/Widget",
    ],
    output: {
      publicPath: "auto",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css", ".png"],
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
                name: 'de_boiler', // The name configured in ModuleFederationPlugin
                exposes: { // The exposes configured in ModuleFederationPlugin
                  './App': './src/App.view.tsx',
                  './Widget': './src/components/Widget/Widget.tsx',
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
    mode: "production",
    output: {
      publicPath: "auto",
      uniqueName: "de_boiler",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".svg", ".css", ".png"],
      alias
    },
    module: {
      rules: [
        {
          test: /\.png/,
          type: 'asset/resource'
        },
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
      new Dotenv({
        path: path.resolve(__dirname, "..", "./.env.production"),
        systemvars: true,
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      /* new TarWebpackPlugin({
        action: 'c',
        gzip: true,
        cwd: path.resolve(process.cwd(), '.wp_federation'),
        file: path.resolve(process.cwd(), 'dist', 'new-app-dts.tgz'),
        fileList: ['de_boiler']
      }), */
      new WebpackRemoteTypesPlugin({
        remotes: {
          de_common_ui:
            "de-common-ui@https://origin-tf-dev-web-common-dev.azurewebsites.net/remoteEntry.js",
        },
        outputDir: "remote-types", // supports [name] as the remote name
        remoteFileName: "[name]-dts.tgz", // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
      }),
      new ModuleFederationPlugin({
        name: "de_boiler",
        filename: "remoteEntry.js",
        exposes: {
          './App': './src/App.view.tsx',
          './Widget': './src/views/Widget/Widget.tsx',
        },
        shared: {
          react: {
            requiredVersion: "18.2.0",
            singleton: true,
          },
          "react-dom": {
            requiredVersion: "18.2.0",
            singleton: true,
          },
        },
        remotes: {
          de_common_ui:
            "de_common_ui@https://origin-tf-dev-web-common-dev.azurewebsites.net/remoteEntry.js",
          de_origin:
            "de_origin@https://origin-tf-dev-web-chore-5401.azurewebsites.net/remoteEntry.js",
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
      port: 3004,
      open: true,
      compress: false,
      historyApiFallback: true,
    },
  },
];
