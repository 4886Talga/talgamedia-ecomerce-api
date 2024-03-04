const { PrismaClient } = require("@prisma/client");
const {
  createUser,
  confirmUser,
  fetchUserByEmail,
  fetchUserById,
  updatePassword,
  setUserRefreshToken,
  deleteUserRefreshToken,
  fetchUserRefreshToken,
  fetchUserByResetPasswordToken,
  updateUserDetailsByAdmin,
  fetchUsersWithPagination,
  removeUser,
  setResetPasswordToken,
  registerAnonymousUser,
  updateAnonymousUserDetails,
} = require("../services/userService");
const {
  createEmptyCart,
  createEmptyAnonymousCart,
} = require("../services/cartService");
const {
  generateVerificationToken,
  decodeVerificationToken,
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken,
  generatePasswordResetToken,
  decodePasswordResetToken,
} = require("../utils/jwt");
const {
  generateHashedPassword,
  compareHashedPassword,
} = require("../utils/hash");
const { Unauthorized, BadRequest } = require("../utils/errorResponse");
const { sendVerificationEmail } = require("../utils/email");
const { User } = require("../prisma/initDB");

const sendEmail = require("../utils/sendEmail");

const prisma = new PrismaClient();

const PER_PAGE = 2;

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { email } = decodeVerificationToken(token);

    const user = await fetchUserByEmail(email);

    if (!user) {
      throw new BadRequest("Invalid Verification Token");
    }

    const confirmedUser = await confirmUser(user);

    res.status(201).json({
      success: true,
      message: `${confirmedUser.email} confirmed succesfully!`,
      //data: confirmedUser.userId,
    });
  } catch (error) {
    next(error);
  }
};

async function signup(req, res, next) {
  try {
    const { userName, email, password } = req.body;

    const user = await fetchUserByEmail(email);

    if (user) {
      throw new BadRequest("User already has an account");
    }

    const hashedPassword = await generateHashedPassword(password);
    const newUser = await createUser(userName, email, hashedPassword);

    const verificationToken = generateVerificationToken(email);

    const link = `localhost:3001/api/user/verify/${verificationToken}`;
    //const link = `https://talgamedia.com/api/user/verify/${verificationToken}`;

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/user/verify/${verificationToken}`;

    const message = `You are receiving this email because we need you to confirm your e-mail address.`;

    const options = {
      url: resetUrl,
      message,
      subject: "Confirm your e-mail",
    };

    await sendVerificationEmail(email, options);

    res.status(201).json({
      success: true,
      message: `Verification link has been sent to ${email}`,
    });
  } catch (error) {
    next(error);
  }
}

async function boardUser(req, res, next) {
  try {
    const { id: userId, userName, email, password, role } = req.body;

    const user = await fetchUserByEmail(email);

    if (user) {
      throw new BadRequest("User already has an account");
    }

    const hashedPassword = await generateHashedPassword(password);

    await updateAnonymousUserDetails(
      userId,
      userName,
      email,
      hashedPassword,
      role
    );

    const verificationToken = generateVerificationToken(email);

    const link = `localhost:3001/api/user/verify/${verificationToken}`;
    //const link = `https://talgamedia.com/api/user/verify/${verificationToken}`;

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/user/verify/${verificationToken}`;

    const message = `You are receiving this email because we need you to confirm your e-mail address.`;

    const options = {
      url: resetUrl,
      message,
      subject: "Confirm your e-mail",
    };

    await sendVerificationEmail(email, options);

    res.status(201).json({
      success: true,
      message: `Verification link has been sent to ${email}`,
    });
  } catch (error) {
    next(error);
  }
}

async function regauser(req, res, next) {
  try {
    const { id: userId, role } = await registerAnonymousUser();

    const anonymosUserCart = await createEmptyAnonymousCart(userId);
    const { id: cartId, sum, quantity, items } = anonymosUserCart;

    const anonymiosUserCookie = {
      userId,
      role,
      cartId,
      sum,
      quantity,
      items,
    };

    const auser = JSON.stringify(anonymiosUserCookie);

    const options = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };

    res.status(200).cookie("auser", auser, options).json({
      message: "Anonymous user registrated succesfuly!",
      data: auser,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await fetchUserByEmail(email);

  if (!user || !(await compareHashedPassword(password, user.password))) {
    throw new Unauthorized("Invalid email or password");
  }

  const options = {
    //expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE),
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  const accessToken = generateAccessToken(user.email, user.id, user.role);
  const refreshToken = generateRefreshToken(user.email, user.id, user.role);

  // Saving refreshToken
  setUserRefreshToken(user.email, refreshToken);

  res.status(200).cookie("jwt", refreshToken, options).json({
    message: "Autentication succesfull!",
    accessToken: accessToken,
  });
}

async function refresh(req, res, next) {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    throw new Unauthorized("Invalid email or password");
  }

  const refreshToken = cookies.jwt;

  // evaluate jwt
  try {
    const decoded = decodeRefreshToken(refreshToken);

    const user = await fetchUserByEmail(decoded.email);

    if (!user) {
      throw new Unauthorized("Invalid token!");
    }

    const accessToken = generateAccessToken(user.email, user.id, user.role);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  const options = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.sendStatus(204); // nocontent
    }

    const refreshToken = cookies.jwt;

    // is refresh token in db
    const user = await fetchUserRefreshToken(refreshToken);
    if (!user) {
      res.clearCookie("jwt", options);
      return res.sendStatus(204);
    }
    // delete refresh token in db
    await deleteUserRefreshToken(user.id);

    res.clearCookie("jwt", options);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const count = await User.count();
    const { users, orderdir, orderby, role, search } = req.query;
    const usersPerPage = users > count ? PER_PAGE : users;
    const query = req.query;
    const currentPage = Math.max(Number(query.page || 1), 1);

    /** @type { import('@prisma/client').Prisma.UserFindManyArgs} */
    const options = {
      take: usersPerPage ? Number(usersPerPage) : PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      orderBy: {
        userName: "asc",
      },
      include: {
        profile: { select: { firstName: true, lastName: true } },
      },
    };

    if (search || role) {
      options.where = {
        OR: [
          { userName: { contains: search } },
          { email: { contains: search } },
          { role: { equals: role } }, // assuming query is case-insensitive
        ],
      };
    }

    if (orderby) {
      options.orderBy = {
        [orderby]: orderdir || "asc",
      };
    }

    const requestedUsers = await fetchUsersWithPagination(options);

    const userFrase = requestedUsers.length < 2 ? "user" : "users";
    const finalPage = Math.ceil(count / PER_PAGE);
    const nextPage = Math.min(currentPage + 1, finalPage);
    const prevPage = Math.max(currentPage - 1, 0);

    res.status(200).json({
      message: `${requestedUsers.length} ${userFrase} fetched succesfully!`,
      data: users,
      count,
      finalPage,
      nextPage,
      prevPage,
      requestedUsers,
    });
  } catch (error) {
    next(error);
  }
}
async function getSingleUser(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await fetchUserById(userId);

    res.status(200).json({
      success: true,
      message: `${user.userName} fetched succesfully!`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
async function createUserByAdmin(req, res) {
  const { userName, email, password } = req.body;

  const userExist = await fetchUserByEmail(email);

  if (userExist) {
    throw new BadRequest("User already has an account");
  }

  const hashedPassword = await generateHashedPassword(password);

  try {
    const newUser = await createUser(userName, email, hashedPassword);

    res.status(201).json({
      success: true,
      message: `${newUser.userName} created succesfully!`,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
}
async function updateUserByAdmin(req, res, next) {
  const { userId } = req.params;
  const data = req.body;

  try {
    const user = await updateUserDetailsByAdmin(userId, data);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
async function deleteUserByAdmin(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await fetchUserById(userId);

    if (!user) {
      throw new BadRequest("User don't exist!");
    }

    const deletedUser = await removeUser(userId);

    res.status(200).json({
      message: `User with id: ${userId} was deleted.`,
      deletedUser: deletedUser,
    });
  } catch (error) {
    if (error.code === "P2025") {
      next(new ErrorResponse("User not found", 404));
    } else {
      next(error);
    }
  }
}
async function getMe(req, res) {
  console.log(req.user);
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  res.status(200).json({
    success: true,
    data: user,
  });
}

async function forgotPassword(req, res, next) {
  const { email } = req.body;

  try {
    const user = await fetchUserByEmail(email);
    const { password } = user;
    if (!user) throw new Unauthorized("There is no user with this email");

    // Generate token
    const token = generatePasswordResetToken(email, password);

    // Update user model with resetPasswordToken
    await setResetPasswordToken(email, token);

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/user/resetpassword/${token}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password.`;

    const options = {
      url: resetUrl,
      message,
      subject: "Reset your password",
    };
    await sendVerificationEmail(email, options);

    res.status(200).json({
      success: true,
      message: `Email with reset link has been sent to ${email}. Check your email and folow the link.`,
    });
  } catch (error) {
    // Clean db by seting resetPasswordToken to undefined
    await setResetPasswordToken(email, null);
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { resettoken } = req.params;
    const newPassword = req.body.password;
    const hashedPassword = await generateHashedPassword(newPassword);
    const user = await fetchUserByResetPasswordToken(resettoken);
    if (!user) throw new Unauthorized("Invalid user");
    const decoded = decodePasswordResetToken(resettoken, user.password);
    if (!decoded) throw new BadRequest("Invalid token");

    const { email, id, role } = await updatePassword(user.id, hashedPassword);
    const accessToken = await generateAccessToken(email, id, role);
    const refreshToken = await generateRefreshToken(email, id, role);
    await setUserRefreshToken(email, refreshToken);

    res.status(200).json({
      success: true,
      message: {
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserPassword(req, res, next) {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.user;

  const user = await prisma.user.updateMany({
    where: {
      id: id,
      password: {
        equals: currentPassword,
      },
    },
    data: { password: newPassword },
  });
  res.status(200).json({
    success: true,
    data: user,
  });
}

module.exports = {
  signup,
  login,
  getAllUsers,
  getMe,
  forgotPassword,
  resetPassword,
  updateUserPassword,
  getSingleUser,
  createUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  verifyEmail,
  refresh,
  logout,
  regauser,
  boardUser,
};
