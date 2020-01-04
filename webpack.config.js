const path = require('path');

module.exports = {
    entry: './src/DependencyContainer.ts',
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'dependency-container.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};