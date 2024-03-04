const {
  createCartItemToCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  deleteCartItem,
  deleteCart,
  fetchCartAndItems,
  findExistingProduct,
  createEmptyCart,
  incCartItemQuantity,
  chexkExistingCartItem,
  updateCartTotalPrice,
  fetchCartItems,
  updateItemQuantityInCart,
  removeItemFromCart,
} = require("../services/cartService");
const { fetchUserById } = require("../services/userService");
const { fetchProduct } = require("../services/productService");
const { NotFound, BadRequest } = require("../utils/errorResponse");

const getCart = async (req, res, next) => {
  try {
    const { id: userId } = req.user || req.body;
    const cart = await fetchCartAndItems(userId);

    if (!cart) throw new NotFound("Cart not found for this user!");

    res.status(200).json({
      success: true,
      message: cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeCart = async (req, res, next) => {
  try {
    const { id: userId } = req.user || req.body;
    await deleteCart(userId);
    res.status(200).json({
      success: true,
      message: "Cart Deleted",
    });
  } catch (error) {
    next(error);
  }
};

const setCartItemInc = async (req, res, next) => {
  try {
    const { id: userId } = req.user || req.body;
    const { price } = req.product;
    const { productId } = req.params;
    const currentCart = req.cart;
    const { availablity } = req;
    const quantity = req.body;

    if (availablity) {
      // If the item already exists, update its quantity
      const { id: existingCartItemId, quantity: existingCartItemQuantity } =
        existingCartItem;

      await incCartItemQuantity(
        existingCartItemId,
        existingCartItemQuantity + quantity
      );
    } else {
      // If the item does not exist, create a new cart item
      await createCartItemToCart(cartId, productId, quantity);
    }

    if (!availablity) {
      await createCartItemToCart(userId, productId, price, currentCart);
      return res.status(201).json({
        success: true,
        message: "New Item added to cart",
      });
    }

    const itemIndex = req.productIndex;
    await incrementCartItemQuantity(userId, currentCart, itemIndex);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeCartItemDec = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const currentCart = req.cart;
    const availablity = req.availablity;

    if (!availablity) {
      throw new NotFound("Item not exist in the cart");
    }

    const itemIndex = req.productIndex;
    await decrementCartItemQuantity(userId, currentCart, itemIndex);

    res.status(200).json({
      success: true,
      message: "Item decremented",
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = req.cart;
    const availablity = req.availablity;

    if (!availablity) {
      throw new NotFound("Item not found");
    }

    const productIndex = req.productIndex;
    await deleteCartItem(userId, cart, productIndex);

    res.status(200).json({
      success: true,
      message: "Cart Item deleted",
    });
  } catch (error) {
    next(error);
  }
};

async function addItemToCart(req, res, next) {
  const { id: userId } = req.user || req.body;
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    // Find the user
    const user = await fetchUserById(userId);

    if (!user) {
      throw new BadRequest("User don't exist!");
    }

    // Find the product
    const product = await fetchProduct(productId);

    if (!product) {
      throw new NotFound("Product not found");
    }

    // Check if the user already has a cart
    let cart = await fetchCartAndItems(userId);

    if (!cart) {
      cart = await createEmptyCart(userId);
    }

    const { id: cartId } = cart;

    // Check if the item already exists in the cart
    const existingCartItem = await chexkExistingCartItem(cartId, productId);

    if (existingCartItem) {
      // If the item already exists, update its quantity
      const { id: existingCartItemId, quantity: existingCartItemQuantity } =
        existingCartItem;

      await incCartItemQuantity(
        existingCartItemId,
        existingCartItemQuantity + quantity
      );
    } else {
      // If the item does not exist, create a new cart item
      await createCartItemToCart(cartId, productId, quantity);
    }

    // Update the total price of the cart
    const cartItems = await fetchCartItems(cartId);

    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    await updateCartTotalPrice(cartId, totalPrice);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    next(error);
  }
}

async function subtractItemFromCart(req, res, next) {
  const { id: userId } = req.user || req.body;
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    // Find the user's cart
    let cart = await fetchCartAndItems(userId);
    const { id: cartId } = cart;

    if (!cart) {
      throw new NotFound("Cart not found");
    }

    // Find the specified item in the cart
    const cartItem = await chexkExistingCartItem(cartId, productId);
    const { id: cartItemId } = cartItem;

    if (!cartItem) {
      throw new NotFound("Item not found in the cart");
    }

    // Calculate the new quantity after subtraction
    const newQuantity = cartItem.quantity - quantity;

    if (newQuantity <= 0) {
      // If the new quantity is zero or negative, remove the item from the cart
      await removeItemFromCart(cartItemId);
    } else {
      // Otherwise, update the quantity of the item in the cart
      await updateItemQuantityInCart(cartItemId, newQuantity);
    }

    // Update the total price of the cart
    const cartItems = await fetchCartItems(cartId);

    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    await updateCartTotalPrice(cartId, totalPrice);

    res.status(201).json({
      success: true,
      message: "Item subtracted from cart successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  removeCart,
  removeCartItem,
  removeCartItemDec,
  setCartItemInc,
  getCart,
  addItemToCart,
  subtractItemFromCart,
};
