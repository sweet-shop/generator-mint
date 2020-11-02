export default [
    {
        path: '/',
        name: 'welcome',
        component: () => import('@/views/welcome'),
        meta: {
            title: 'Welcome to the generator-mint generator!'
        }
    }
];
