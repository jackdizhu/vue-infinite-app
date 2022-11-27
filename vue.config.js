// vue.config.js
const configureWebpack = require('./webpack-config/configureWebpack');
const getConfigureWebpack = require('./webpack-config/getConfigureWebpack');

const isSubMod = false; // 是否子应用打包
const subAppName = ''; // 子应用名称

const subAppListConf = {
  appConf: {
    mainjs: 'main-app-conf.js',
    name: 'appConf',
    publicPath: '/appConf/',
  },
  appUser: {
    mainjs: 'main-app-user.js',
    name: 'appUser',
    publicPath: '/appUser/',
  },
};
const subConf = subAppListConf[subAppName]; // 子应用打包配置

const subMod = isSubMod && subConf;
const $configureWebpack = subMod ? getConfigureWebpack(subConf.mainjs, subConf.name) : configureWebpack;
const $publicPath = subMod ? subConf.publicPath : '/';
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: $publicPath,
  productionSourceMap: false,
  configureWebpack: $configureWebpack,
  chainWebpack: (config) => {
    if (subMod) {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch');
      // 移除 preload 插件
      config.plugins.delete('preload');
    }
  },
};
