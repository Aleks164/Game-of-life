const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin").default;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HandlebarsPlugin = require("handlebars-webpack-plugin");

// const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.ts"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MiniCssExtractPlugin(),


        new CleanWebpackPlugin(),

        // new webpack.HotModuleReplacementPlugin(),
        // new HandlebarsPlugin({
        //     // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
        //     entry: path.join(process.cwd(), "pages", "*.hbs"),
        //     // output path and filename(s). This should lie within the webpacks output-folder
        //     // if ommited, the input filepath stripped of its extension will be used
        //     output: path.join(process.cwd(), "dist", "[name].html"),
        //     // you can also add a [path] variable, which will emit the files with their relative path, like
        //     // output: path.join(process.cwd(), "build", [path], "[name].html"),


        //     // globbed path to partials, where folder/filename is unique
        //     partials: [
        //         path.join(process.cwd(), "partials", "**", "*.hbs")
        //     ],
        // })
    ],
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
        ],
    },
};