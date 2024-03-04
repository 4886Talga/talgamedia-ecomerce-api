const { Cart, CartItem } = require("../prisma/initDB");

const createEmptyCart = async (userId) => {
  return await Cart.create({
    data: { userId: userId },
  });
};

const createEmptyAnonymousCart = async (userId) => {
  return await Cart.create({
    data: {
      userId: userId,
    },
  });
};

const findExistingProduct = (items, productId) => {
  const productIndex = items.findIndex((item) => item.productId === productId);
  return productIndex;
};
const chexkExistingCartItem = async (cartId, productId) => {
  return CartItem.findFirst({
    where: { cartId: cartId, productId: productId },
  });
};

const incrementCartItemQuantity = async (userId, cart, ItemIndex) => {
  let { sum, items, id } = cart;
  const price = items[ItemIndex].price;
  items[ItemIndex].quantity = items[ItemIndex].quantity + 1;
  items[ItemIndex].subTotal = items[ItemIndex].subTotal + price;
  sum = sum + price;

  return await Cart.update({
    where: { userId: userId, id: id },
    data: {
      items: items,
      sum: sum,
    },
  });
};

const incCartItemQuantity = async (
  existingCartItemId,
  updatedCartItemQuantity
) => {
  return await CartItem.update({
    where: { id: existingCartItemId },
    data: { quantity: updatedCartItemQuantity },
  });
};

const createCartItemToCart = async (cartId, productId, quantity) => {
  return await CartItem.create({
    data: {
      cart: { connect: { id: cartId } },
      product: { connect: { id: productId } },
      quantity,
    },
  });
};

const fetchCartItems = async (cartId) => {
  return await CartItem.findMany({
    where: { cartId: cartId },
    select: { quantity: true, product: { select: { price: true } } },
  });
};

const fetchCartAndItems = async (userId) => {
  return await Cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
};

const decrementCartItemQuantity = async (userId, currentCart, itemIndex) => {
  let { total, items } = currentCart;
  const price = items[itemIndex].price;

  if (items[itemIndex].quantity - 1 === 0) {
    items.splice(itemIndex, 1);
    total = total - price;
  } else {
    items[itemIndex].quantity--;
    items[itemIndex].subTotal = items[itemIndex].subTotal - price;
    total = total - price;
  }

  await cacheClient.set(
    userId,
    JSON.stringify({
      total: total,
      items: items,
    }),
    { EX: 2000 }
  );
};

const deleteCartItem = async (userId, currentCart, ItemIndex) => {
  let { total, items } = currentCart;
  const productSubTotal = items[ItemIndex].subTotal;
  items.splice(ItemIndex, 1);
  total = total - productSubTotal;

  await cacheClient.set(
    userId,
    JSON.stringify({
      total: total,
      items: items,
    }),
    { EX: 2000 }
  );
};

const removeItemFromCart = async (cartItemId) => {
  return await CartItem.delete({
    where: { id: cartItemId },
  });
};

const deleteCart = async (userId) => {
  await cacheClient.del(userId);
};
const updateCartTotalPrice = async (cartId, totalPrice) => {
  return await Cart.update({
    where: { id: cartId },
    data: { sum: totalPrice },
  });
};

const updateItemQuantityInCart = async (cartItemId, newQuantity) => {
  return await CartItem.update({
    where: { id: cartItemId },
    data: { quantity: newQuantity },
  });
};

module.exports = {
  createEmptyCart,
  findExistingProduct,
  incrementCartItemQuantity,
  createCartItemToCart,
  fetchCartAndItems,
  decrementCartItemQuantity,
  deleteCartItem,
  deleteCart,
  createEmptyAnonymousCart,
  chexkExistingCartItem,
  incCartItemQuantity,
  fetchCartItems,
  updateCartTotalPrice,
  removeItemFromCart,
  updateItemQuantityInCart,
};
