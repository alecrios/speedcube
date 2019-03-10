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
};
