const router = import(/* webpackChunkName: "app-conf-router" */'./router');
const Card = import(/* webpackChunkName: "app-conf-card-remote-component" */'./components/card-remote-component.vue');

export default router;
export const componentsCard = Card;
