'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/admin/register',
      handler: 'admin.register',
      config: {
        auth: false,
      },
    },
  ],
};