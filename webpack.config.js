const path = require('path');
const webpack = require('webpack');			  //to aceess build-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");



module.exports = {
	entry: {
		main: './app/index.js',
		//vendor: [
		//	'moment',
		//	'lodash'
		//]
	},
	output: {
		filename:'[name].[chunkhash].js',
		path:path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test:/\.(js|jsx)$/,
				use: 'babel-loader'
			},
			{ 
				test: /\.svg$/, 
				use: 'babel?presets[]=es2015,presets[]=react!svg-react' 
			}
		]
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function(module){
			  return module.context && module.context.indexOf("node_modules") !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		// new ChunkManifestPlugin({
		// 	filename:'chunk-manifest.json',
		// 	manifestVariable: 'webpackManifest',
		// 	inlineManifest: false
		// })
	]
};
