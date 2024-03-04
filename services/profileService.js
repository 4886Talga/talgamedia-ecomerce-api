const { Profile } = require("../prisma/initDB");
const ErrorResponse = require("../utils/errorResponse");

const createProfile = async (
  userId,
  mobile,
  address,
  firstName,
  lastName,
  image
) => {
  return await Profile.create({
    data: {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      image: image,
      mobile: mobile,
      address: address,
    },
  });
};

const fetchProfile = async (userId) => {
  return await Profile.findUnique({
    where: {
      userId: userId,
    },
  });
};

const updateProfile = async (userId, profile) => {
  return await Profile.update({
    where: {
      userId: userId,
    },
    data: profile,
  });
};

const fetchProfileAddress = async (userId) => {
  return await Profile.findUnique({
    where: {
      userId: userId,
    },
    select: {
      address: true,
    },
  });
};

module.exports = {
  createProfile,
  fetchProfile,
  updateProfile,
  fetchProfileAddress,
};
