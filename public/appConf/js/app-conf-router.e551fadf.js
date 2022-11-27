(window["__appRegisterManage__"]["appConf.webpackJsonp"] = window["__appRegisterManage__"]["appConf.webpackJsonp"] || []).push([["app-conf-router"],{

/***/ "7827":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import Index from './pages/index.vue';
// import Page01 from './pages/page01.vue';
// import Page01Child01 from './pages/page01-child01.vue';
// import Page01Child02 from './pages/page01-child02.vue';
// import Page02 from './pages/page02.vue';

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/app-conf',
  component: function component() {
    return __webpack_require__.e(/* import() | app-conf-router-index */ "app-conf-router-index").then(__webpack_require__.bind(null, "d4a4"));
  }
}, {
  path: '/app-conf/page01',
  component: function component() {
    return __webpack_require__.e(/* import() | app-conf-router-page01 */ "app-conf-router-page01").then(__webpack_require__.bind(null, "a232"));
  },
  children: [{
    path: '/app-conf/page01/child01',
    component: function component() {
      return __webpack_require__.e(/* import() | app-conf-router-page01-child01 */ "app-conf-router-page01-child01").then(__webpack_require__.bind(null, "e755"));
    }
  }, {
    path: '/app-conf/page01/child02',
    component: function component() {
      return __webpack_require__.e(/* import() | app-conf-router-page01-child02 */ "app-conf-router-page01-child02").then(__webpack_require__.bind(null, "a843"));
    }
  }]
}, {
  path: '/app-conf/page02',
  component: function component() {
    return __webpack_require__.e(/* import() | app-conf-router-page02 */ "app-conf-router-page02").then(__webpack_require__.bind(null, "edd3"));
  }
}]);

/***/ })

}]);