export default {};

export const getAppResourcesConf = function getAppResourcesConf(name) {
  return {
    publicPath: `/${name}/`,
    resourcesFileName: `resources_${name}.js`,
    resourcesVar: `window.resourcesConst_${name}`,
    resourcesRequireVar: `window.webpackRequire_${name}`,
    resourceswebpackJsonpVar: `window.webpackJsonp_${name}`,
    resourcesMainFileName: `main_${name}.js`,
  };
};
/**
 * 所有子应用配置
 */
export const appList = {
  appConf: getAppResourcesConf('appConf'),
  appUser: getAppResourcesConf('appUser'),
};

const loadScriptCache = {}; // 记录已经加载的script
/**
 * 加载远程script
 * @param {String} src url链接地址
 */
export const loadScript = function loadScript(src) {
  return new Promise((reslove, reject) => {
    if (loadScriptCache[src]) {
      return reslove();
    }
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.timeout = 120;

    script.src = src;
    const timeout = setTimeout(() => {
      const $err = new Error({ type: 'timeout', target: script });
      console.error($err);
      reject($err);
    }, 120000);
    script.onerror = function scriptOnerror(error) {
      clearTimeout(timeout);
      console.error(error);
      reject(error);
    };
    script.onload = function scriptOnload() {
      loadScriptCache[src] = script;
      clearTimeout(timeout);
      reslove();
    };
    document.head.appendChild(script);
  });
};

/**
 * 加载多个script资源
 * @param {Array} list 资源列表
 */
export const loadSubApp = function loadSubApp(list = []) {
  return new Promise((reslove, reject) => {
    const $promiseList = [];
    list.forEach((src) => {
      $promiseList.push(loadScript(src));
    });
    return Promise.all($promiseList)
      .then(() => {
        reslove();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * 加载应用资源
 * @param {String} name 子应用名称
 */
export const loadSubAppByName = function loadSubAppByName(name) {
  return new Promise((reslove, reject) => {
    const conf = appList[name];
    if (!conf) {
      return reject(new Error(`${name} 应用不存在`));
    }
    const $origin = conf.origin || window.origin;
    const $url = $origin + conf.publicPath + conf.resourcesFileName;
    console.log('conf --', conf);
    loadScript($url).then(() => {
      const $var = conf.resourcesVar.replace('window.', '');
      const $resourcesRequireVar = conf.resourcesRequireVar.replace('window.', '');
      const $deferredModulesVar = conf.deferredModulesVar.replace('window.', '');
      const $res = window[$var] || '';
      console.log('$resources --', $res);

      const $resList = $res.split(',');
      if (!$res || !$resList[0] === '') {
        return reject(new Error(`${name} 加载资源列表失败`));
      }

      const $urlList = [];
      $resList.forEach((fileName) => {
        const $url = $origin + conf.publicPath + fileName;
        $urlList.push($url);
      });
      loadSubApp($urlList).then(() => {
        const $require = window[$resourcesRequireVar];
        const $defModules = window[$deferredModulesVar];

        const mainModuleid = ``
        debugger
        const $module = $require($defModules[0]);
        const res = $module && $module.default;
        if (!res) {
          reject(new Error(`${name} 加载应用文件失败`));
          return false;
        }
        reslove(res); // 加载完成
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};
