const path = require('path');

module.exports = function override(config) {
  config.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'static/media/'
      }
    }]
  });
  
  return config;
};