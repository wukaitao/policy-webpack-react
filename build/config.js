const path = require('path');//路径中间件

module.exports = {
	entry: {
		vendor: [
			'./client/assets/js/jquery/jquery.js',
			'./client/assets/js/jquery/jquery.md5.js'
		],
		main: [
			'./client/main.js'
		]
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				}
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/images/[name].[hash].[ext]'
				}
			},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/fonts/[name].[hash].[ext]'
				}
			},
			{
				test: path.resolve(__dirname,'../client/assets/js/jquery/jquery.js'),
				loader: 'expose?jQuery!expose?$'
			},
			{
				test: path.resolve(__dirname,'../client/assets/js/fetch/fetch.js'),
				loader: 'expose?fetch'
			}
		]
	}
};