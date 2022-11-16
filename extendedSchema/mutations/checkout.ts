import { KeystoneContext } from "@keystone-6/core/types";
import stripeConfig from "../../lib/stripe";

interface Args {
  token: string;
  shippingAddress: any,
  billingAddress: any,
}

async function checkout(
  root: any,
  { token, shippingAddress, billingAddress }: Args,
  context: KeystoneContext
) {
  console.log(shippingAddress, billingAddress)
  if (!token) {
    throw new Error('Stripe token is missing!')
  }
  // 1. Make sure they're signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry, you must be signed in to place an order.')
  }
  // 2. Query current user
  const user = await context.query.User.findOne({
    where: { id: userId },
    query: 'id name email cart { id quantity product { id name price description photos {id image { id publicUrlTransformed }}}}'
  });
  // 3. Calculate the total order price
  const cartItems = user?.cart?.filter((cartItem: any) => cartItem.product);
  const productPhotos = cartItems.map((cartItem: any) => cartItem.product.photos);
  const amount = cartItems.reduce(function (tally: number, cartItem: any) {
    return tally + cartItem.quantity * cartItem.product?.price;
  }, 0);
  // 4. Create the charge with the Stripe Library
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(err => {
    console.log(err)
    throw new Error(err.message)
  });

  // 5.1 Convert CartItems to OrderItems
  const orderItems = cartItems.map((cartItem: any) => {
    const photoIds = cartItem.product.photos.map((photo: any) => ({ id: photo.id }))
    const orderItem = {
      product: { connect: { id: cartItem.product.id } },
      quantity: cartItem.quantity,
    };
    return orderItem
  });
  // 6. Create order and return it
  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      shipTo: { create: shippingAddress},
      billTo: { create: billingAddress },
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });
  // 7. Clear user's cart
  const cartItemIds = user.cart.map((cartItem: any) => ({ id: cartItem.id} ));
  await context.db.CartItem.deleteMany({
    where: cartItemIds,
  });
  return order;
};

export default checkout;
