// import Index from './pages/index.vue';
// import Page01 from './pages/page01.vue';
// import Page01Child01 from './pages/page01-child01.vue';
// import Page01Child02 from './pages/page01-child02.vue';
// import Page02 from './pages/page02.vue';

export default [
  {
    path: '/app-conf',
    component: () => import(/* webpackChunkName: "app-conf-router-index" */'./pages/index.vue'),
  },
  {
    path: '/app-conf/page01',
    component: () => import(/* webpackChunkName: "app-conf-router-page01" */'./pages/page01.vue'),
    children: [
      {
        path: '/app-conf/page01/child01',
        component: () => import(/* webpackChunkName: "app-conf-router-page01-child01" */'./pages/page01-child01.vue'),
      },
      {
        path: '/app-conf/page01/child02',
        component: () => import(/* webpackChunkName: "app-conf-router-page01-child02" */'./pages/page01-child02.vue'),
      },
    ],
  },
  {
    path: '/app-conf/page02',
    component: () => import(/* webpackChunkName: "app-conf-router-page02" */'./pages/page02.vue'),
  },
];
