const { overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  config.allowedHosts = ['all']; // or specific hosts like ['.mydomain.com']
  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),  
};