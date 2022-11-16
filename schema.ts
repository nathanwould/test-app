// import { Lists } from '.keystone/types';
import { Address } from './models/Address';
import { CartItem } from './models/CartItem';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';
import { Product } from './models/Product';
import { ProductImage } from './models/ProductImage';
import { User } from './models/User';

export const lists = {
  User,
  Product,
  ProductImage,
  CartItem,
  Order,
  OrderItem,
  Address,
};
