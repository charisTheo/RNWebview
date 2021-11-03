const path = require('path');

module.exports = {
  webpack: function(config, env) {
    config.plugins[5].options = {
      ...config.plugins[5].options,
      filename: '[name].css'
    }
    config.output = {
      ...config.output,
      filename: "[name].js",
      path: path.join(__dirname, './../assets/www')
    };
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        cacheGroups: {
          default: false,
        },
      },
      runtimeChunk: false
    }
    return config;
  },
  paths: function(paths, env) {
    paths.appBuild = path.resolve(__dirname, './../assets/www');
    return paths;
  }
}
