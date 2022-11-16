import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, integer } from "@keystone-6/core/fields";

export const OrderItem = list({
  access: allowAll,
  fields: {
    product: relationship({ ref: 'Product' }),
    quantity: integer(),
    order: relationship({ ref: 'Order.items' }),
  },
});