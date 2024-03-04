// redis ttl and jwt ttl for verify -> describe
// passwordResetSecret + oldPassword -> abr redis er ttl thakbe ki na

// write -> refresh token ttl === refresh token redis key ttl, checking -> how?

const { sign, verify } = require("jsonwebtoken");
const config = require("config");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const verificationSecret = process.env.VERIFICATION_SECRET;
const passwordResetSecret = process.env.PASSWORD_RESET_SECRET;

const accessTokenTtl = process.env.ACCESS_TOKEN_TTL;
const refreshTokenTtl = process.env.REFRESH_TOKEN_TTL;
const verificationTokenTtl = process.env.VERIFICATION_TOKEN_TTL;
const passwordResetTokenTtl = process.env.PASSWORD_RESET_TOKEN_TTL;

module.exports.generateAccessToken = (email, id, role) => {
  const payload = { email: email, id: id, role: role };
  const secret = accessTokenSecret;
  const options = { expiresIn: accessTokenTtl };
  const token = sign(payload, secret, options);
  return token;
};

module.exports.generateRefreshToken = (email, id, role) => {
  const payload = { email: email, id: id, role: role };
  const secret = refreshTokenSecret;
  const options = { expiresIn: refreshTokenTtl };
  const token = sign(payload, secret, options);
  return token;
};

module.exports.generateVerificationToken = (email) => {
  const payload = { email: email };
  const secret = verificationSecret;
  const options = { expiresIn: verificationTokenTtl };
  const token = sign(payload, secret, options);

  return token;
};

module.exports.generatePasswordResetToken = (email, oldPassword) => {
  const payload = { email: email };
  const secret = passwordResetSecret + oldPassword;
  const options = { expiresIn: passwordResetTokenTtl };
  const token = sign(payload, secret, options);
  return token;
};

module.exports.decodeAccessToken = (accessToken) => {
  return verify(accessToken, accessTokenSecret);
};

module.exports.decodeRefreshToken = (refreshToken) => {
  return verify(refreshToken, refreshTokenSecret);
};

module.exports.decodeVerificationToken = (verificationToken) => {
  return verify(verificationToken, verificationSecret);
};

module.exports.decodePasswordResetToken = (
  passwordResetToken,
  currentPassword
) => {
  const secret = passwordResetSecret + currentPassword;
  return verify(passwordResetToken, secret);
};

module.exports.getTokenFromTokenHeader = (tokenHeader) => {
  return tokenHeader.split(" ")[1].trim();
};
