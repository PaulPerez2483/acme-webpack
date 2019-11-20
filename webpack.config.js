const path = require('path');
module.exports = {
    entry: './client/client.js',
    output: {
        filename: "client.js",
        path: path.join(__dirname, 'rsc')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]

    }
}