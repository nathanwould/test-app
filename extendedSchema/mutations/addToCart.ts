import { KeystoneContext } from "@keystone-6/core/types";
import { Session } from "../../types";

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) {
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('Please log in to add products to your cart.');
  };
  const allCartItems = await context.db.CartItem.findMany({
    where: {
      user: { id: { equals: sesh.itemId } },
      product: { id: { equals: productId } },
    },
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(`${existingCartItem} has already been added to your cart!`);
    return
  };
  return await context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
};

export default addToCart;
