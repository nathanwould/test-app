import { config } from '@keystone-6/core';
import { mergeSchemas } from '@graphql-tools/schema';
import { withAuth, session } from './auth';
import { lists } from './schema';
import addToCart from './extendedSchema/mutations/addToCart';
import checkout from './extendedSchema/mutations/checkout';

const graphql = String.raw;

const PORT = parseInt(process.env.PORT!) || 3000;

const frontEndURL = process.env.FRONTEND_URL || "http://localhost:7777";

const databaseURL = process.env.DATABASE_URL || 'postgres://admin:adminpassword@localhost/brassmart2';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    server: {
      port: PORT,
      cors: {
        origin: [frontEndURL],
        credentials: true,
      },
    },
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: databaseURL,
      onConnect: async context => {
        console.log('Connected to DB');
        // console.log(context);
        // if (process.argv.includes('--seed-data')) {
        //   await insertSeedData(keystone);
        // }
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => true /*!!context.session?.data*/,
    },
    lists,
    extendGraphqlSchema: schema =>
      mergeSchemas({
        schemas: [schema],
        typeDefs: graphql`
          type Mutation {
            addToCart(productId: ID!): CartItem
            checkout(token: String!, shippingAddress: AddressCreateInput!, billingAddress: AddressCreateInput!): Order
          }
        `,
        resolvers: {
          Mutation: {
            addToCart,
            checkout,
          },
        },
    }),
    session,
  })
);
