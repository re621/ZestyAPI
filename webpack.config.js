const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: "./src/E621.ts",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "ZestyAPI.js",
        path: path.resolve(__dirname, "dist"),
        globalObject: "this",
        library: {
            name: "ZestyAPI",
            type: "umd",
            export: "default",
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            (compiler) => {
                new TerserPlugin({
                    terserOptions: { format: { comments: false } },
                    extractComments: false,
                }).apply(compiler);
            }
        ]
    },
    externals: {
        "cross-fetch": "cross-fetch",
    },
    cache: true,
};
