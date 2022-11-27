const router = import(/* webpackChunkName: "app-user-router" */'./router');
const Card = import(/* webpackChunkName: "app-user-card-remote-component" */'./components/card-remote-component.vue');

export default router;
export const componentsCard = Card; // 提供组件外部调用
