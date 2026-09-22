'use strict';

module.exports = {
  async register(ctx) {
    const { email, password, firstname, lastname } = ctx.request.body || {};

    if (!email || !password) {
      return ctx.badRequest('email and password are required');
    }

    const userService = strapi.admin.services.user;
    const roleService = strapi.admin.services.role;

    const exists = await userService.exists({ email });
    if (exists) {
      return ctx.badRequest('Admin with this email already exists');
    }

    const superAdminRole = await roleService.getSuperAdmin();
    if (!superAdminRole) {
      throw new Error("Cannot register an admin because the super admin role doesn't exist.");
    }

    const user = await userService.create({
      email,
      firstname,
      lastname,
      password,
      registrationToken: null,
      isActive: true,
      roles: [superAdminRole.id],
    });

    ctx.body = {
      data: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        isActive: user.isActive,
      },
    };
  },
};