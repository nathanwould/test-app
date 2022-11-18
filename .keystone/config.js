"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core8 = require("@keystone-6/core");
var import_schema = require("@graphql-tools/schema");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var import_config = require("dotenv/config");
var sessionSecret = process.env.SESSION_SECRET;
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "id name email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
  secure: true,
  sameSite: "none"
});

// models/Address.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");
var Address = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({
      validation: { isRequired: true }
    }),
    street: (0, import_fields.text)({
      validation: { isRequired: true }
    }),
    street2: (0, import_fields.text)(),
    city: (0, import_fields.text)({
      validation: { isRequired: true }
    }),
    state: (0, import_fields.text)({
      validation: { isRequired: true }
    }),
    zipCode: (0, import_fields.text)({
      validation: { isRequired: true }
    }),
    country: (0, import_fields.text)({
      validation: { isRequired: true }
    })
  }
});

// models/CartItem.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var CartItem = (0, import_core2.list)({
  access: import_access2.allowAll,
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"]
    }
  },
  fields: {
    quantity: (0, import_fields2.integer)({
      defaultValue: 1,
      validation: { isRequired: true }
    }),
    product: (0, import_fields2.relationship)({ ref: "Product" }),
    user: (0, import_fields2.relationship)({ ref: "User.cart" })
  }
});

// models/Order.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Order = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    total: (0, import_fields3.integer)(),
    items: (0, import_fields3.relationship)({ ref: "OrderItem.order", many: true }),
    user: (0, import_fields3.relationship)({ ref: "User.orders" }),
    charge: (0, import_fields3.text)(),
    shipTo: (0, import_fields3.relationship)({ ref: "Address" }),
    billTo: (0, import_fields3.relationship)({ ref: "Address" }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: {
        kind: "now"
      },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  }
});

// models/OrderItem.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    product: (0, import_fields4.relationship)({ ref: "Product" }),
    quantity: (0, import_fields4.integer)(),
    order: (0, import_fields4.relationship)({ ref: "Order.items" })
  }
});

// models/Product.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Product = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    productType: (0, import_fields5.select)({
      options: [
        { label: "Instrument", value: "instrument" },
        { label: "Accessory", value: "accessory" }
      ],
      validation: { isRequired: true },
      ui: {
        displayMode: "segmented-control"
      }
    }),
    name: (0, import_fields5.text)({
      validation: { isRequired: true }
    }),
    make: (0, import_fields5.text)({
      validation: { isRequired: true }
    }),
    model: (0, import_fields5.text)({
      validation: { isRequired: !!{ productType: "instrument" } }
    }),
    category: (0, import_fields5.select)({
      options: [
        { label: "Trombone", value: "trombone" },
        { label: "Trumpet", value: "trumpet" },
        { label: "Euphonium", value: "euphonium" },
        { label: "Tuba", value: "tuba" },
        { label: "Horn", value: "horn" },
        { label: "Mouthpiece", value: "mouthpiece" },
        { label: "Case", value: "case" },
        { label: "Maintenance", value: "maintenance" }
      ],
      validation: { isRequired: true }
    }),
    instrumentType: (0, import_fields5.select)({
      options: [
        { label: "Alto Trombone", value: "trombone-alto" },
        { label: "Tenor Trombone", value: "trombone-tenor" },
        { label: "Bass Trombone", value: "trombone-bass" },
        { label: "Cornet", value: "cornet" },
        { label: "Mellophone", value: "mellophone" },
        { label: "Euphonium", value: "euphonium" }
      ],
      validation: { isRequired: !!{ productType: "instrument" } }
    }),
    instrumentKey: (0, import_fields5.text)({}),
    boreSize: (0, import_fields5.float)({}),
    bellSize: (0, import_fields5.float)({}),
    description: (0, import_fields5.text)({
      ui: {
        displayMode: "textarea"
      },
      validation: { isRequired: true }
    }),
    photos: (0, import_fields5.relationship)({
      ref: "ProductImage.product",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
        inlineConnect: true
      }
    }),
    price: (0, import_fields5.integer)({
      validation: { isRequired: true }
    }),
    status: (0, import_fields5.select)({
      options: [
        { label: "In Stock", value: "in-stock" },
        { label: "Out Of Stock", value: "out-of-stock" }
      ],
      validation: { isRequired: true },
      defaultValue: "in-stock",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: {
        kind: "now"
      },
      db: {
        updatedAt: true
      },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  }
});

// models/ProductImage.ts
var import_core6 = require("@keystone-6/core");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_fields6 = require("@keystone-6/core/fields");
var import_access6 = require("@keystone-6/core/access");
var cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_KEY || "",
  apiSecret: process.env.CLOUDINARY_SECRET || "",
  folder: process.env.CLOUDINARY_FOLDER
};
var ProductImage = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary
    }),
    altText: (0, import_fields6.text)({
      validation: { isRequired: true }
    }),
    product: (0, import_fields6.relationship)({
      ref: "Product.photos"
    })
  }
});

// models/User.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");

// models/Permissions.ts
var import_fields7 = require("@keystone-6/core/fields");
var permissionFields = {
  canManageProducts: (0, import_fields7.checkbox)({
    defaultValue: false,
    label: "User can Update and delete any product"
  }),
  canSeeOtherUsers: (0, import_fields7.checkbox)({
    defaultValue: false,
    label: "User can query other users"
  }),
  canManageUsers: (0, import_fields7.checkbox)({
    defaultValue: false,
    label: "User can manage other users"
  }),
  canManageRoles: (0, import_fields7.checkbox)({
    defaultValue: false,
    label: "User can manage roles"
  }),
  canManageCart: (0, import_fields7.checkbox)({
    defaultValue: false,
    label: "User can see and manage cart and cart items"
  }),
  canManageOrders: (0, import_fields7.checkbox)({
    defaultValue: false,
    label: "User can see and manage orders"
  })
};
var permissionsList = Object.keys(
  permissionFields
);

// access.ts
var generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function({ session: session2 }) {
      return !!session2?.data.role?.[permission];
    }
  ])
);
var permissions = {
  ...generatedPermissions
};

// models/User.ts
var User = (0, import_core7.list)({
  access: import_access7.allowAll,
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args)
  },
  fields: {
    name: (0, import_fields8.text)({
      validation: { isRequired: true }
    }),
    email: (0, import_fields8.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields8.password)(),
    cart: (0, import_fields8.relationship)({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    orders: (0, import_fields8.relationship)({
      ref: "Order.user",
      many: true
    })
  }
});

// schema.ts
var lists = {
  User,
  Product,
  ProductImage,
  CartItem,
  Order,
  OrderItem,
  Address
};

// extendedSchema/mutations/addToCart.ts
async function addToCart(root, { productId }, context) {
  const sesh = context.session;
  if (!sesh.itemId) {
    throw new Error("Please log in to add products to your cart.");
  }
  ;
  const allCartItems = await context.db.CartItem.findMany({
    where: {
      user: { id: { equals: sesh.itemId } },
      product: { id: { equals: productId } }
    }
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(`${existingCartItem} has already been added to your cart!`);
    return;
  }
  ;
  return await context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } }
    }
  });
}
var addToCart_default = addToCart;

// lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripeConfig = new import_stripe.default(process.env.STRIPE_SECRET || "", {
  apiVersion: "2022-11-15"
});
var stripe_default = stripeConfig;

// extendedSchema/mutations/checkout.ts
async function checkout(root, { token, shippingAddress, billingAddress }, context) {
  console.log(shippingAddress, billingAddress);
  if (!token) {
    throw new Error("Stripe token is missing!");
  }
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("Sorry, you must be signed in to place an order.");
  }
  const user = await context.query.User.findOne({
    where: { id: userId },
    query: "id name email cart { id quantity product { id name price description photos {id image { id publicUrlTransformed }}}}"
  });
  const cartItems = user?.cart?.filter((cartItem) => cartItem.product);
  const productPhotos = cartItems.map((cartItem) => cartItem.product.photos);
  const amount = cartItems.reduce(function(tally, cartItem) {
    return tally + cartItem.quantity * cartItem.product?.price;
  }, 0);
  const charge = await stripe_default.paymentIntents.create({
    amount,
    currency: "USD",
    confirm: true,
    payment_method: token
  }).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  const orderItems = cartItems.map((cartItem) => {
    const photoIds = cartItem.product.photos.map((photo) => ({ id: photo.id }));
    const orderItem = {
      product: { connect: { id: cartItem.product.id } },
      quantity: cartItem.quantity
    };
    return orderItem;
  });
  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      shipTo: { create: shippingAddress },
      billTo: { create: billingAddress },
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } }
    }
  });
  const cartItemIds = user.cart.map((cartItem) => ({ id: cartItem.id }));
  await context.db.CartItem.deleteMany({
    where: cartItemIds
  });
  return order;
}
var checkout_default = checkout;

// keystone.ts
var graphql = String.raw;
var frontEndURL = process.env.FRONTEND_URL || "http://localhost:7777";
var databaseURL = process.env.DATABASE_URL || "postgres://admin:adminpassword@localhost/brassmart2";
var keystone_default = withAuth(
  (0, import_core8.config)({
    server: {
      cors: {
        origin: frontEndURL,
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: databaseURL,
      onConnect: async (context) => {
        console.log("Connected to DB");
      }
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    lists,
    extendGraphqlSchema: (schema) => (0, import_schema.mergeSchemas)({
      schemas: [schema],
      typeDefs: graphql`
          type Mutation {
            addToCart(productId: ID!): CartItem
            checkout(token: String!, shippingAddress: AddressCreateInput!, billingAddress: AddressCreateInput!): Order
          }
        `,
      resolvers: {
        Mutation: {
          addToCart: addToCart_default,
          checkout: checkout_default
        }
      }
    }),
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
