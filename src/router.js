import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import i18n from './i18n'

// import Home from './views/Home.vue'
import Empty from './views/Empty.vue'

const isServer = typeof window === 'undefined';
const history = isServer ? createMemoryHistory() : createWebHistory();
const routes = [
  {
    path: '/',
    redirect: `/${i18n.global.locale.value}`
  },
  {
    path: '/:lang',
    component: Empty,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('./views/Home.vue'),
        meta: { layout: 'mane' }
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('./views/Blog.vue'),
        meta: { layout: 'internal', breadCrumbTitle: [{lang: 'en', value: 'My blog'}, {lang: 'ru', value: 'Мой Блог'}] }
      },
      {
        path: 'blog/:id',
        name: 'blogPostSingle',
        component: () => import('./views/BlogPost.vue'),
        meta: {layout: 'internal', breadCrumbTitle: [{lang: 'en', value: 'My blog'}, {lang: 'ru', value: 'Мой Блог'}] }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('./views/About.vue'),
        meta: { layout: 'internal', breadCrumbTitle: [{lang: 'en', value: 'About'}, {lang: 'ru', value: 'О Нас'}] }
      },
      {
        path: 'releases',
        name: 'releases',
        component: () => import('./views/Releases.vue'),
        meta: { layout: 'internal', breadCrumbTitle: [{lang: 'en', value: 'My releases'}, {lang: 'ru', value: 'Мои релизы'}] }
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import('./views/Contacts.vue'),
        meta: { layout: 'internal', breadCrumbTitle: [{lang: 'en', value: 'Contact'}, {lang: 'ru', value: 'Контакты'}] }
      }
    ]
  }
];

const router = createRouter({
  history: history,
  linkActiveClass: 'active',
  routes
})

export default router;

