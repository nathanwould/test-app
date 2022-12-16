import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { float, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Product = list({
  access: allowAll,
  fields: {
    productType: select({
      options: [
        { label: 'Instrument', value: 'instrument' },
        { label: 'Accessory', value: 'accessory' },
      ],
      validation: { isRequired: true },
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    name: text({
      validation: { isRequired: true },
    }),
    make: text({
      validation: { isRequired: true },
    }),
    model: text({
      // lol this doesn't work, Keystone doesn't support conditional fields like this yet
      validation: { isRequired: !!{ productType: 'instrument' } }
    }),
    category: select({
      options: [
        { label: 'Trombone', value: 'trombone' },
        { label: 'Trumpet', value: 'trumpet' },
        { label: 'Euphonium', value: 'euphonium' },
        { label: 'Tuba', value: 'tuba' },
        { label: 'Horn', value: 'horn' },
        { label: 'Mouthpiece', value: 'mouthpiece' },
        { label: 'Case', value: 'case' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
      validation: { isRequired: true },
    }),
    instrumentType: select({
      options: [
        { label: 'Alto Trombone', value: 'trombone-alto' },
        { label: 'Tenor Trombone', value: 'trombone-tenor' },
        { label: 'Bass Trombone', value: 'trombone-bass' },
        { label: 'Cornet', value: 'cornet' },
        { label: 'Mellophone', value: 'mellophone' },
        { label: 'Euphonium', value: 'euphonium' },
      ],
      // TODO: conditional fields aren't supported yet but when they are, programatically render fields based on productType
      // ui: {
      //   createView: {
      //     fieldMode: async ({ session, context }) => !!{ productType: 'instrument' } ? 'edit' : 'hidden',
      //   },
      //   itemView: {
      //     fieldMode: async ({ session, context }) =>  !!{ productType: 'instrument' } ? 'edit' : 'hidden',
      //   }
      // },
    }),
    // Same for the next few instrument-specific ones
    instrumentKey: text({}),
    boreSize: float({}),
    bellSize: float({}),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
      validation: { isRequired: true },
    }),
    photos: relationship({
      ref: 'ProductImage.product',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
        inlineConnect: true,
      },
    }),
    price: integer({
      validation: { isRequired: true },
    }),
    status: select({
      options: [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Out Of Stock', value: 'out-of-stock' },
      ],
      validation: { isRequired: true },
      defaultValue: 'in-stock',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
      db: {
        updatedAt: true,
      },
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
      },
    }),
  },
});