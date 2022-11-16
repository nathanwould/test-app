import { list } from "@keystone-6/core";
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { relationship, text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.CLOUDINARY_KEY || '',
  apiSecret: process.env.CLOUDINARY_SECRET || '',
  folder: process.env.CLOUDINARY_FOLDER,
};

// console.log(cloudinary)

export const ProductImage = list({
  access: allowAll,
  fields: {
    image: cloudinaryImage({
      cloudinary,
    }),
    altText: text({
      validation: { isRequired: true }
    }),
    product: relationship({
      ref: 'Product.photos',
    }),
  },
});