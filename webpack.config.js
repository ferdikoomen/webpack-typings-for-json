'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'development',

    entry: path.resolve(__dirname, './test/index.ts'),

    output: {
        path: path.resolve(__dirname, './test/dist'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    devServer: {
        contentBase: path.resolve(__dirname, './test/dist'),
        open: true,
        port: 8080
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader'
                }]
            }, {
                test: /\.json$/,
                type: 'javascript/auto',
                use: [{
                    loader: path.resolve(__dirname, './src')
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './test/index.html',
            filename: './index.html'
        })
    ]
};
