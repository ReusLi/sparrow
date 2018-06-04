const webpackConfig = require('./webpack.config')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'test/**/*.js'
        ],

        preprocessors: {
            'test/**/*.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha', 'coverage'],

        webpackServer: {
            noInfo: true
        },

        plugins: [
            'karma-coverage',
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-mocha-reporter'
        ],

        webpack: {
            mode: 'production',
            module: {
                rules: [
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
                ],
            },
            resolve: {
                alias: {
                    'components': path.resolve(__dirname, 'src/components'),
                    'context': path.resolve(__dirname, 'src/context')
                },
                extensions: ['.tsx', '.ts', '.js', '.jsx']
            },
            watch: true
        },

        port: 9876,

        colors: true,

        autoWatch: false,

        browsers: ['PhantomJS'],

        singleRun: true,

        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: 'coverage', subdir: '.' },
                { type: 'text-summary', dir: 'coverage', subdir: '.' }
            ]
        }
    })
}