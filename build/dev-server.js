'use strict'
const HtmlWebpackPlugin =  require('html-webpack-plugin');//生成html中间件
const webpack = require('webpack');//打包工具
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';//热重载(重新刷新)
const path = require('path');//路径中间件
const express = require('express');//框架
const app = express();//web框架
const port = '8888';//端口
const publicPath = 'http://localhost:'+port+'/';

const config = {
	entry: {
		common: [
			'./client/assets/js/jquery/jquery.js',
			'./client/assets/js/jquery/jquery.md5.js'
		],
		main: [
			hotMiddlewareScript,
			'./client/main.js'
		]
	},
	output: {
		path: '/',//因为文件运行在内存,所以输出路径不同(相对于静态目录)
		publicPath: publicPath,//因为文件运行在内存,内联路径不同
		filename: '[name].[hash].js'//文件名
	},
	devtool: 'source-map',//开发模式(配置显示合并前的js文件,去除则显示合并后的js文件)
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
				loaders: ['style','css?sourceMap','resolve-url','sass?sourceMap']
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
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),//热重载
		new webpack.NoErrorsPlugin(),//报错而不退出webpack进程
		new HtmlWebpackPlugin({
			filename: 'index.html',//文件名
			title: 'my first project by webpack.',//标题(会被template模板覆盖)
			template: path.resolve(__dirname,'../client/main.html'),//模板
			inject: true//是否插入到body
		})
	]
};

//注入服务器/热重载
let compiler = webpack(config);//配置
//服务器
const devMiddleWare = require('webpack-dev-middleware')(compiler,{
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});
//热重载
const hotMiddleWare = require('webpack-hot-middleware')(compiler);
//热重载html
/*
compiler.plugin('compilation',function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
		hotMiddleWare.publish({action: 'reload'});
		cb();
	});
});
*/
app.use(devMiddleWare);//注入服务器
app.use(hotMiddleWare);//注入热重载
app.use(express.static('./client'));//静态目录
app.listen(port,function(e){
	console.log(`server start at http://localhost:${port}`);
});