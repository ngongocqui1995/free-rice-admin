export default [
  {
    exact: false,
    path: '/',
    component: './layouts',
    routes: [
      {
        path: '/user',
        layout: false,
        access: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
            access: '/user/login',
          },
          {
            path: '/user',
            redirect: '/user/login',
          },
        ],
      },
      {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: '/admin',
        routes: [
          {
            name: 'Permission',
            icon: 'control',
            path: '/admin/permissions',
            access: '/admin/permissions',
            component: './Admin/Permission',
          },
          {
            name: 'Menu',
            icon: 'menu',
            path: '/admin/menus',
            access: '/admin/menus',
            component: './Admin/Menu',
          },
          {
            name: 'Role',
            icon: 'gold',
            path: '/admin/roles',
            access: '/admin/roles',
            component: './Admin/Role',
          },
          {
            name: 'User',
            icon: 'user',
            path: '/admin/users',
            access: '/admin/users',
            component: './Admin/User',
          },
          {
            name: 'Vocabulary',
            icon: 'menu',
            path: '/admin/vocabulary',
            access: '/admin/vocabulary',
            component: './Admin/Vocabulary',
          },
          {
            path: '/admin',
            redirect: '/admin/users',
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        icon: 'windows',
        access: '/system',
        routes: [
          {
            name: 'Valid-Address',
            icon: 'safety-certificate',
            path: '/system/valid-address',
            access: '/system/valid-address',
            component: './System/ValidAddress',
          },
          {
            path: '/system',
            redirect: '/system/valid-address',
          },
        ],
      },
      {
        path: '/account',
        name: 'account',
        icon: 'account',
        access: '/account',
        component: './Account',
        hideInMenu: true,
      },
      {
        path: '/settings',
        name: 'setting',
        icon: 'setting',
        access: '/settings',
        component: './Setting',
        hideInMenu: true,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
];
