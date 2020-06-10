import React from 'react';


const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Forum = React.lazy(() => import('./views/Base/Forum/Forum'));
const ForumSingle = React.lazy(() => import('./views/Base/Forum/ForumSingle'));
const Exchanges = React.lazy(() => import('./views/Base/EchangesMonnaie/Exchanges'));
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },



  { path: '/exchanges',exact: true, name: 'Forum', component: Exchanges },


  { path: '/forum',exact: true, name: 'Forum', component: Forum },
  { path: '/forum/:id',exact: true, name: 'Forum Message details', component: ForumSingle },


  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
