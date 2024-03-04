const { User } = require("../prisma/initDB");

module.exports.createUser = async (userName, email, password) => {
  return await User.create({
    data: {
      userName: userName,
      email: email,
      password: password,
    },
  });
};

module.exports.registerAnonymousUser = async () => {
  return await User.create({
    data: {
      role: "ANONYMOUS",
    },
  });
};

module.exports.confirmUser = async (user) => {
  const { id } = user;
  return await User.update({
    where: {
      id: id,
    },
    data: {
      emailValid: true,
    },
  });
};

module.exports.fetchUserByEmail = async (email) => {
  return await User.findUnique({
    where: {
      email: email,
    },
  });
};

module.exports.fetchUserById = async (userId) => {
  return await User.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
      order: true,
      review: true,
      transactions: true,
      receiver: true,
      wishlist: true,
      cart: true,
    },
  });
};

module.exports.fetchUsersWithPagination = async (options) => {
  let users;

  users = await User.findMany(options);

  return users;
};

module.exports.fetchUserRefreshToken = async (token) => {
  return await User.findUnique({
    where: {
      refreshToken: token,
    },
  });
};

module.exports.fetchUserByResetPasswordToken = async (token) => {
  return await User.findUnique({
    where: {
      resetPasswordToken: token,
    },
  });
};

module.exports.updatePassword = async (userId, newPassword) => {
  return await User.update({
    where: {
      id: userId,
    },
    data: {
      password: newPassword,
    },
  });
};
// Refresh token
module.exports.setUserRefreshToken = async (email, refreshToken) => {
  return await User.update({
    where: { email: email },
    data: {
      refreshToken: refreshToken,
    },
  });
};
module.exports.setResetPasswordToken = async (email, token) => {
  return await User.update({
    where: { email: email },
    data: {
      resetPasswordToken: token,
    },
  });
};
//update user details
module.exports.updateUserDetailsByAdmin = async (userId, data) => {
  return await User.update({
    where: { id: userId },
    data: data,
  });
};
//update anonymous user details
module.exports.updateAnonymousUserDetails = async (
  userId,
  userName,
  email,
  hashedPassword,
  role
) => {
  return await User.update({
    where: { id: userId },
    data: {
      email: email,
      password: hashedPassword,
      userName: userName,
      role: role,
    },
  });
};

module.exports.getUserRefreshToken = async (email) => {
  return await cacheClient.get(email);
};

module.exports.deleteUserRefreshToken = async (id) => {
  return await User.update({
    where: { id: id },
    data: {
      refreshToken: "",
    },
  });
};

module.exports.removeUser = async (id) => {
  return await User.delete({
    where: { id: id },
  });
};
