"use strict";

// const path = require('path');
// const utils = require('./utils');

function SubAppBuildPlugin(options = {}) {
  const $prototype = SubAppBuildPlugin.prototype;
  $prototype.$resourcesFileName = options.resourcesFileName || 'resources.js';
  $prototype.$resourcesVar = options.resourcesVar || 'window..__appRegisterManage__resources_const';
  $prototype.$mainFileName = options.resourcesMainFileName || 'main.js';
  $prototype.$requireVar = options.resourcesRequireVar || 'window.__appRegisterManage__.webpackRequire';
}

SubAppBuildPlugin.prototype.apply = function SubAppBuildPluginApply(compiler) {
  const $prototype = SubAppBuildPlugin.prototype;
  const { $resourcesFileName } = $prototype;
  const { $resourcesVar } = $prototype;
  const { $mainFileName } = $prototype;
  const { $requireVar } = $prototype;

  /**
    entryOption : 在 webpack 选项中的 entry 配置项处理过之后，执行插件。
    afterPlugins : 设置完初始插件之后，执行插件。
    compilation : 编译创建之后，生成文件之前，执行插件。
    emit : 生成资源到 output 目录之前。
    done : 编译完成。
  */
  compiler.plugin('emit', (compilation, callback) => {
    const $assets = compilation.assets;
    // const $chunks = compilation.chunks;

    const entryName = 'app'; // entry 入口定义key名称
    /** app初始化必要文件 entryPointUnfilteredFiles - also includes hot module update files */
    const entryPointUnfilteredFiles = compilation.entrypoints.get(entryName).getFiles();
    const entryPointFiles = entryPointUnfilteredFiles.filter((chunkFile) => {
      // compilation.getAsset was introduced in webpack 4.4.0
      // once the support pre webpack 4.4.0 is dropped please
      // remove the following guard:
      const asset = compilation.getAsset && compilation.getAsset(chunkFile);
      if (!asset) {
        return true;
      }
      // Prevent hot-module files from being included:
      const assetMetaInformation = asset.info || {};
      return !(assetMetaInformation.hotModuleReplacement || assetMetaInformation.development);
    }).map((chunkFile) => {
      return {
        type: 'entry',
        value: chunkFile,
      };
    });

    // utils.addWriteFileSync(path.resolve(__dirname, 'modulesInfo.json'), utils.getKeysAndVal(entryPointUnfilteredFiles) + '\n\n\n\n')

    let filelist = [...entryPointFiles];
    // 遍历所有资源
    Object.keys($assets).forEach((filename) => {
      const $file = $assets[filename];

      const source = $file.source();
      let $source = source;
      const $typeStr = $source && typeof $source === 'string';
      if (/\.js$/.test(filename)) {
        if (!filelist.some((item) => item.value === filename)) {
          filelist.push({
            type: 'async',
            value: filename,
          });
        }
        // 修改全局对象webpackJsonp
        if ($typeStr) {
          $source = $source.replace(/window\["__appRegisterManage__\.([a-zA-Z._-]+)"\]/g, (match, p1, offset, string) => {
            return `window["__appRegisterManage__"]["${p1}"]`;
          });
        }
      }
      if ($typeStr && filename === $mainFileName) {
        // 修改资源文件，根据压缩模式调整或者使用babel插件
        $source = $source && $source.replace('/******/ 	function __webpack_require__(moduleId) {', `/******/	let __webpack_require__ = ${$requireVar} = function __webpack_require__(moduleId) {`);
      }

      if ($typeStr) {
        $assets[filename] = {
          source() {
            return $source;
          },
          size() {
            return $source.length;
          },
        };
      }
    });

    filelist = `${$resourcesVar} = ${JSON.stringify(filelist)}`;

    // 写入新资源文件
    $assets[$resourcesFileName] = {
      source() {
        return filelist;
      },
      size() {
        return filelist.length;
      },
    };

    callback();
  });
};

module.exports = SubAppBuildPlugin;
