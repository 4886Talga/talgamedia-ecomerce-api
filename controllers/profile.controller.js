const { PrismaClient } = require("@prisma/client");
const {
  createProfile,
  fetchProfile,
  updateProfile,
} = require("../services/profileService");
const { Conflict, NotFound } = require("../utils/errorResponse");

const prisma = new PrismaClient();

const setProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { mobile, address, firstName, lastName, image } = req.body;
    const profile = await createProfile(
      id,
      mobile,
      address,
      firstName,
      lastName,
      image
    );

    res.status(201).json({
      success: true,
      message: "Profile created succesfully",
      createdProduct: profile,
    });
  } catch (error) {
    if (error.code === "P2002") {
      next(new Conflict("Profile already exists for this user"));
    } else {
      next(error);
    }
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const profile = await fetchProfile(id);

    if (!profile) throw new NotFound("Profile not found");

    res.status(201).json({
      success: true,
      message: "Profile fetched succesfully",
      createdProduct: profile,
    });
  } catch (error) {
    next(error);
  }
};

const modifyProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const profile = req.body;

    const updatedProfile = await updateProfile(id, profile);

    res.status(201).json({
      success: true,
      message: "Profile updated succesfully",
      profile: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  setProfile,
  getProfile,
  modifyProfile,
};
