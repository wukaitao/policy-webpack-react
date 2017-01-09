const HtmlWebpackPlugin =  require('html-webpack-plugin');//生成html中间件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//抽取css样式
const TransferWebpackPlugin = require('transfer-webpack-plugin');;//复制文件
const webpack = require('webpack');//打包工具
const path = require('path');//路径中间件

const config = {
	entry: {
		common: [
			'./client/assets/js/jquery/jquery.js',
			'./client/assets/js/jquery/jquery.md5.js'
		],
		main: [
			'./client/main.js'
		]
	},
	output: {
		path: path.resolve(__dirname,'../dist'),//__direname当前目录,创建相对于当前目录的文件夹
		publicPath: '/',//生成静态文件夹所在的相对目录
		filename: 'assets/js/[name].[hash].js',//name文件名;hash为MD5编码
		chunkFilename: 'assets/js/[id].[hash].js'//文件命名配置
	},
	devtool: false,//关掉开发模式
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
				test: /\.(css|scss)$/,
				loader: ExtractTextPlugin.extract('style-loader','css-loader','resolve-url','sass-loader')
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
	},
	plugins: [
		new ExtractTextPlugin('assets/css/[name].[hash].css'),//抽取css样式
		new TransferWebpackPlugin(//复制json文件
			[{from: './client/json'}], path.resolve(__dirname,'../dist/assets/json')
		),
		new HtmlWebpackPlugin({
			filename: 'index.html',//文件名
			title: 'my first project by webpack.',//标题(会被template模板覆盖)
			template: path.resolve(__dirname,'../client/main.html'),//模板
			inject: true,//是否插入到body
			minify: {//压缩
				removeComments: true,//移除注释
				collapseWhitespace: true,//去除空格
				removeAttributeQuotes: true//去除属性引用
			}
		})
	]
};

webpack(config,function(err,stats){
	if(err) throw err;
	console.log('complete.');
});