const HtmlWebpackPlugin =  require('html-webpack-plugin');//生成html中间件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//抽取css样式
const webpack = require('webpack');//打包工具
const path = require('path');//路径中间件

const config = {
	entry: {
		main: [
			'./client/vendors.js',
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
				test: /\.html/,
				loader: 'html!resolve-url'
			},
			{
				test: /\.vue/,
				loader: 'vue'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader?presets=es2015'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(css|scss|less)$/,
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
			}
		]
	},
	vue: {
		//vue编译器配置(js/style/css/scss/less等)
		loaders: {
			js: 'babel-loader?presets=es2015'
		}
	},
	resolve: {
		//自动扩展文件后缀名
        extensions: ['','.js','json','.css','.scss'],
    	//别名配置
        alias: {
            'vue': path.resolve(__dirname,'../node_modules/vue/dist/vue.js'),
            'vue-router': path.resolve(__dirname,'../node_modules/vue-router/dist/vue-router.js'),
            'vue-resource': path.resolve(__dirname,'../node_modules/vue-resource/dist/vue-resource.js'),
            'vuex': path.resolve(__dirname,'../node_modules/vuex/dist/vuex.js')
        }
	},
	plugins: [
		new ExtractTextPlugin('assets/css/[name].[hash].css'),//抽取css样式
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