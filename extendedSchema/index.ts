// import { graphQLSchemaExtension } from "@keystone-6/core";
// // import { Context } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";
// import { Context } from ".keystone/types";
// import addToCart from "./mutations/addToCart";
// import checkout from "./mutations/checkout";

// const graphql = String.raw;

// export const extendedGraphqlSchema = graphQLSchemaExtension<Context>({
//   typeDefs: graphql`
//     type Mutation {
//       addToCart(productId: ID!): CartItem
//       checkout(token: String!, shippingAddress: AddressCreateInput!, billingAddress: AddressCreateInput!): Order
//     }
//   `,
//   resolvers: {
//     Mutation: {
//       addToCart,
//       checkout,
//     },
//   },
// });