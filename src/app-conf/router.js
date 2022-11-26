import Index from './pages/index.vue';
import Page01 from './pages/page01.vue';
import Page01Child01 from './pages/page01-child01.vue';
import Page01Child02 from './pages/page01-child02.vue';
import Page02 from './pages/page02.vue';

export default [
  {
    path: '/app-conf',
    component: Index,
  },
  {
    path: '/app-conf/page01',
    component: Page01,
    children: [
      {
        path: '/app-conf/page01/child01',
        component: Page01Child01,
      },
      {
        path: '/app-conf/page01/child02',
        component: Page01Child02,
      },
    ],
  },
  {
    path: '/app-conf/page02',
    component: Page02,
  },
];
