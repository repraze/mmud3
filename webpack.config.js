const path = require("path");
const nodeExternals = require("webpack-node-externals");

const clientConfig = {
    entry: ["babel-polyfill", path.resolve(__dirname, "client", "index.tsx")],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build", "public", "js"),
        publicPath: "/public/js/",
        chunkFilename: "[name].chunk.js",
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: ["node_modules"],
    },
    devtool: "source-map",
};

const clientServiceConfig = {
    target: "node",
    node: {
        __filename: false,
        __dirname: false,
    },
    entry: {
        app: [path.resolve(__dirname, "client-service", "index.ts")],
    },
    output: {
        filename: "client-service.bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        modules: ["node_modules"],
    },
    externals: [
        nodeExternals({
            allowlist: [],
        }),
    ],
    devtool: "source-map",
};

const serviceConfig = {
    target: "node",
    node: {
        __filename: false,
        __dirname: false,
    },
    entry: {
        app: [path.resolve(__dirname, "service", "index.ts")],
    },
    output: {
        filename: "service.bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        modules: ["node_modules"],
    },
    externals: [
        nodeExternals({
            allowlist: [],
        }),
    ],
    devtool: "source-map",
};

module.exports = [clientConfig, clientServiceConfig, serviceConfig];
