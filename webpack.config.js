const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/application.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public'),
		publicPath: '/',
	},
	mode: 'development',
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.jsx?/,
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'] // preset configs for Babel
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	}, 
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
			publicPath: '/',
		},
		compress: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		hot: true,
		historyApiFallback: true,
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api/**': {
				target: 'http://localhost:3000',
				secure: false,
			},
		},
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
