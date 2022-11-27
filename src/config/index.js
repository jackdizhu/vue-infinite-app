export default {};

/**
 * 应用注册管理
 * @param {String} key window对象属性
 */
export const appRegisterManage = function appRegisterManage(key = '__appRegisterManage__') {
  const $val = {};
  const handler = {
    /**
      * target 目标对象
      * propKey 对象属性名
      * proxy 实例本身（严格地说，是操作行为所针对的对象)
      */
    get: function $valGet(target, property, receiver) {
      // console.log('Proxy.get', target, property, receiver);
      let key1 = '';
      const $prop = property.replace(/^([a-zA-Z_-]+)\./, (match, p1, offset, string) => {
        key1 = p1;
        return '';
      });
      if (key1) {
        return target[key1] && target[key1][$prop];
      }

      return target[$prop];
    },
    /**
      * target 目标对象
      * key 属性名
      * value 属性值
      * receive 代理本身
      */
    set: function $valSet(target, property, value, receiver) {
      // console.log('Proxy.set', target, property, value, receiver);
      let key1 = '';
      const $prop = property.replace(/^([a-zA-Z_-]+)\./, (match, p1, offset, string) => {
        key1 = p1;
        return '';
      });
      if (key1) {
        if (!target[key1]) { target[key1] = {}; }
        target[key1][$prop] = value;
        return target[key1][$prop];
      }
      target[property] = value;
      return target[property];
    },
    /**
      * target 目标对象
      * propKey 属性名
      */
    deleteProperty: function $valDeleteProperty(target, propKey) {
      // console.log(target, propKey);
      return true;
    },
  };
  const $proxyVal = new Proxy($val, handler);
  Object.defineProperty(window, key, {
    writable: false,
    value: $proxyVal,
  });
  return key;
};

export const getAppResourcesConf = function getAppResourcesConf(name, mainFile) {
  return {
    publicPath: `/${name}/`,
    resourcesFileName: `resources_${name}.js`,
    resourcesVar: `window.__appRegisterManage__.${name}.resourcesConst`,
    resourcesRequireVar: `window.__appRegisterManage__.${name}.webpackRequire`,
    resourceswebpackJsonpVar: `window.__appRegisterManage__.${name}.webpackJsonp`,
    resourcesMainFileName: `main_${name}.js`,
    resourcesMainModuleid: `/src/${mainFile}`,
  };
};
/**
 * 所有子应用配置
 */
export const appList = {
  appConf: getAppResourcesConf('appConf', 'main-app-conf.js'),
  appUser: getAppResourcesConf('appUser', 'main-app-user.js'),
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
    list.forEach((item) => {
      // 仅加载必要文件
      if (item.type === 'entry' && item.url) {
        $promiseList.push(loadScript(item.url));
      }
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
    const $root = window.__appRegisterManage__ || window; // 全局对象
    const $origin = conf.origin || window.origin;
    const $url = $origin + conf.publicPath + conf.resourcesFileName;
    console.log('conf --', conf);
    loadScript($url).then(() => {
      const $var = conf.resourcesVar.replace('window.__appRegisterManage__.', '');
      const $resourcesRequireVar = conf.resourcesRequireVar.replace('window.__appRegisterManage__.', '');
      const $resList = $root[$var] || [];
      console.log('$resources --', $resList);

      if (!Array.isArray($resList) || !$resList.length) {
        return reject(new Error(`${name} 加载资源列表失败`));
      }

      const $urlList = $resList.map((item) => {
        return {
          ...item,
          url: $origin + conf.publicPath + item.value,
        }
      });
      loadSubApp($urlList).then(() => {
        const $require = $root[$resourcesRequireVar];

        const mainModuleid = conf.resourcesMainModuleid;
        const $module = $require(mainModuleid);
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
