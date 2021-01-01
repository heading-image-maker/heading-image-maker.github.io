const path = require('path');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'docs/js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['@babel/preset-env', { modules: false }]]
						}
					}
				]
			},
			{
				enforce: 'pre',
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		]
	}
};
