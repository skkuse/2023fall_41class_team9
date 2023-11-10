
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    devServer: {
        port: 9092,
        static: {
          directory: path.join(__dirname, "public")
        },
		historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
				use: [ { loader: 'babel-loader' } ]
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
				use: [ {loader: 'style-loader' }, { loader: 'css-loader' } ]
            }
        ]
    },
	
	mode : 'development',

	performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
};
