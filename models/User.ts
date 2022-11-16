import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { password, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../access";

export const User = list({
  access: allowAll, /* {
    operation: {
      query: ({ session, context }) => true,
      create: ({ session, context }) => true,
      update: args => permissions.canManageUsers(args),
      delete: args => permissions.canManageUsers(args),
    },
  },*/
  ui: {
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({
      validation: { isRequired: true, }
    }),
    email: text({
      validation: { isRequired: true, },
      isIndexed: 'unique',
    }),
    password: password(),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({
      ref: 'Order.user',
      many: true,
    }),
    // role: relationship({
    //   ref: 'Role.assignedTo',
    //   access: {
    //     create: permissions.canManageUsers,
    //     update: permissions.canManageUsers,
    //   },
    // }),
  },
});