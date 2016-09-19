var path = require('path');
var srcPath = path.join(__dirname, 'public');
var buildPath = path.join(__dirname, 'public', 'dist');

module.exports = {
    context: srcPath,
    devtool: "inline-source-map",
    entry: path.join(srcPath, 'reactApp.js'),
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot'],
                include: buildPath
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                },
                include: srcPath
            }
        ]
    }
};