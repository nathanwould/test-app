import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, timestamp } from "@keystone-6/core/fields";

export const Order = list({
  access: allowAll,
  fields: {
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
    shipTo: relationship({ ref: 'Address' }),
    billTo: relationship({ ref: 'Address' }),
    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
      },
    }),
  },
});