process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
	pwa: {
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black-translucent',
		themeColor: '#17191c',
		msTileColor: '#17191c',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/sw.js',
			swDest: 'service-worker.js',
		},
	},
	chainWebpack: (config) => {
		// Disable the default loaders for worker files to prevent conflicts with the loaders below
		// https://github.com/vuejs/vue-cli/issues/2028
		config.module.rule('js').exclude.add(/\.worker\.js$/);
	},
	configureWebpack: {
		// Set the global object for worker files to be `self` instead of `window`
		// https://github.com/webpack/webpack/issues/6642
		// https://github.com/webpack/webpack/issues/6629
		output: {
			globalObject: 'self',
		},
		devtool: 'source-map',
		// Set the worker loader for worker files
		module: {
			rules: [
				{
					test: /\.worker\.js$/,
					use: [{loader: 'worker-loader'}, {loader: 'babel-loader'}],
				},
			],
		},
	},
};
