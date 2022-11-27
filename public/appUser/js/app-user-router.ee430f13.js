(window["__appRegisterManage__"]["appUser.webpackJsonp"] = window["__appRegisterManage__"]["appUser.webpackJsonp"] || []).push([["app-user-router"],{

/***/ "e0f1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import Index from './pages/index.vue';
// import Page01 from './pages/page01.vue';
// import Page01Child01 from './pages/page01-child01.vue';
// import Page01Child02 from './pages/page01-child02.vue';
// import Page02 from './pages/page02.vue';

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/app-user',
  component: function component() {
    return __webpack_require__.e(/* import() | app-user-router-index */ "app-user-router-index").then(__webpack_require__.bind(null, "c6ff"));
  }
}, {
  path: '/app-user/page01',
  component: function component() {
    return __webpack_require__.e(/* import() | app-user-router-page01 */ "app-user-router-page01").then(__webpack_require__.bind(null, "baf0"));
  },
  children: [{
    path: '/app-user/page01/child01',
    component: function component() {
      return __webpack_require__.e(/* import() | app-user-router-page01-child01 */ "app-user-router-page01-child01").then(__webpack_require__.bind(null, "6857"));
    }
  }, {
    path: '/app-user/page01/child02',
    component: function component() {
      return __webpack_require__.e(/* import() | app-user-router-page01-child02 */ "app-user-router-page01-child02").then(__webpack_require__.bind(null, "3497"));
    }
  }]
}, {
  path: '/app-user/page02',
  component: function component() {
    return __webpack_require__.e(/* import() | app-user-router-page02 */ "app-user-router-page02").then(__webpack_require__.bind(null, "64ce"));
  }
}]);

/***/ })

}]);