function SubAppBuildPlugin(options = {}) {
  const $prototype = SubAppBuildPlugin.prototype;
  $prototype.$resourcesFileName = options.resourcesFileName || 'resources.js';
  $prototype.$resourcesVar = options.resourcesVar || 'window.resources_const';
  $prototype.$mainFileName = options.resourcesMainFileName || 'main.js';
  $prototype.$requireVar = options.resourcesRequireVar || 'window.webpackRequire';
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
      if (/\.js$/.test(filename)) {
        filelist.push(filename);
      }
      if (filename === $mainFileName) {
        const source = $assets[filename].source();
        // 修改资源文件，根据压缩模式调整或者使用babel插件
        const $source = source.replace('/******/ 	function __webpack_require__(moduleId) {', `/******/	let __webpack_require__ = ${$requireVar} = function __webpack_require__(moduleId) {`);
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
