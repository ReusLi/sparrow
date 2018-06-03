const webpackConfig = require('./webpack.config')
const path = require('path')

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

        // webpack: webpackConfig,

        webpack: {
            mode: 'production',
            // module: {
            //     rules: [
            //         {
            //             test: /\.js$/,
            //             loader: 'babel',
            //             exclude: /node_modules/
            //         }
            //     ]
            // },
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