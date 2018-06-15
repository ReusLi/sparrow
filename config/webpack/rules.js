const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
    },
    {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { loader: "css-loader" }
            ]
        })
    },
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { loader: "less-loader" }
            ]
        })
    }
]