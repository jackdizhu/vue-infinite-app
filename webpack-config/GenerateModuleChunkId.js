"use strict";

const path = require('path');
const utils = require('./utils');


class GenerateModuleChunkId {
  constructor(options) {
    this.options = options || {};

    const idFunction = options.idFunction // 自定义生成id
    const callWhenMissingLibident = options.callWhenMissingLibident || true // 是否libIdent为空时调用
    if (!idFunction) {
      throw 'idFunction is required';
    }
  }

  _processModules(modules, context) {
    for (const module of modules) {
      utils.addWriteFileSync(path.resolve(__dirname, 'modulesInfo.json'), utils.getKeysAndVal(module) + '\n\n')

      // 已经生成id, 通过插件自定义修改id
      const moduleId = module.id || (module.libIdent ? module.libIdent({context}) : null)
      module.id = this.options.idFunction(moduleId, module);
    }
  }

  apply(compiler) {
    const context = this.options.context || compiler.options.context;

    if (compiler.hooks) {
      compiler.hooks.compilation.tap("GenerateModuleChunkId", compilation => {
        compilation.hooks.beforeModuleIds.tap("GenerateModuleChunkId", modules => {
          this._processModules(modules, context);
        });
      });
    }
    else {
      compiler.plugin("compilation", compilation => {
        compilation.plugin("before-module-ids", modules => {
          this._processModules(modules, context);
        });
      });
    }
  }
}

module.exports = GenerateModuleChunkId;