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

  compiler.plugin('emit', (compilation, callback) => {
    const $assets = compilation.assets;

    let filelist = [];
    // 遍历所有资源
    Object.keys($assets).forEach((filename) => {
      const source = $assets[filename].source();
      let $source = source;
      const $typeStr = $source && typeof $source === 'string';
      if (/\.js$/.test(filename)) {
        filelist.push(filename);
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

    filelist = `${$resourcesVar} = \`${filelist.join(',')}\``;

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
