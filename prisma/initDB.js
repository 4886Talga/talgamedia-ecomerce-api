const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  User: prisma.user,
  Profile: prisma.profile,
  Product: prisma.product,
  Category: prisma.category,
  Review: prisma.review,
  Cart: prisma.cart,
  CartItem: prisma.cartItem,
  Order: prisma.order,
  Transactions: prisma.transactions,
  Receiver: prisma.receiver,
  Transactions: prisma.transactions,
  TrackingInfo: prisma.trackinginfo,
  Wishlist: prisma.wishlist,
  prisma: prisma,
};
