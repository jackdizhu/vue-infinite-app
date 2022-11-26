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
      jsonpFunction: `webpackJsonp_${name}`,
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
        resourcesVar: `window.resourcesConst_${name}`,
        resourcesRequireVar: `window.webpackRequire_${name}`,
        resourcesMainFileName: `main_${name}.js`,
      }),
    ],
  };
};
