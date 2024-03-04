const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.header.authorization || req.header.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    req.userData = decodedToken;
    req.authUser = await prisma.user.findUnique({
      where: { id: req.userData.user.id },
    });

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token!",
      error: error,
    });
  }
};

//Grant acces to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    console.log(req.authUser);
    if (!roles.includes(req.authUser.role)) {
      return res.status(403).json({
        message: `User role ${req.userData.role} is unauthorized to access this route `,
      });
    }
    next();
  };
};

module.exports = {
  checkAuth,
  authorize,
};
