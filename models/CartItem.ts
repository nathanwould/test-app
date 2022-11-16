import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship } from "@keystone-6/core/fields";
import { permissions } from "../access";

export const CartItem = list({
  access: allowAll,
  ui: {
    // hide the back end UI from regular users
    // hideCreate: args => !permissions.canManageUsers(args),
    // hideDelete: args => !permissions.canManageUsers(args),
    listView: {
      initialColumns: ['product', 'quantity', 'user']
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true },
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});