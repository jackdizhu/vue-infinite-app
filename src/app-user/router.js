import Index from './pages/index.vue';
import Page01 from './pages/page01.vue';
import Page01Child01 from './pages/page01-child01.vue';
import Page01Child02 from './pages/page01-child02.vue';
import Page02 from './pages/page02.vue';

export default [
  {
    path: '/app-user',
    component: Index,
  },
  {
    path: '/app-user/page01',
    component: Page01,
    children: [
      {
        path: '/app-user/page01/child01',
        component: Page01Child01,
      },
      {
        path: '/app-user/page01/child02',
        component: Page01Child02,
      },
    ],
  },
  {
    path: '/app-user/page02',
    component: Page02,
  },
];
