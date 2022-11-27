// vue.config.js
const path = require('path');
const SubAppBuildPlugin = require('./SubAppBuildPlugin');
const GenerateModuleChunkId = require('./GenerateModuleChunkId');
const utils = require('./utils');

const rootPath = path.resolve(__dirname, '../');

/**
 * mainFile: main-app-conf.js
 * name: appConf
 */
module.exports = function getConfigureWebpack(mainFile, name) {
  return {
    entry: {
      app: path.resolve(__dirname, '../', `src/${mainFile}`),
    },
    output: {
      filename: `main_${name}.js`,
      jsonpFunction: `__appRegisterManage__.${name}.webpackJsonp`,
      path: path.resolve(__dirname, '../', 'dist'),
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new GenerateModuleChunkId({
        idFunction: utils.idFunction(rootPath),
      }),
      new SubAppBuildPlugin({
        resourcesFileName: `resources_${name}.js`,
        resourcesVar: `window.__appRegisterManage__["${name}.resourcesConst"]`, // 通过name.resourcesConst方式初始化应用
        resourcesRequireVar: `window.__appRegisterManage__["${name}.webpackRequire"]`,
        resourcesMainFileName: `main_${name}.js`,
        resourcesMainModuleid: `/src/${mainFile}`,
      }),
    ],
  };
};
