const {
  profileValidation,
  profileUpdationValidation,
} = require("../validations/profileValidation");
const {
  userSignUpValidation,
  userValidation,
  userEmailValidation,
} = require("../validations/userValidation");
const { categoryValidation } = require("../validations/categoryValidation");
const { reviewValidation } = require("../validations/reviewValidation");

const { ErrorResponse, BadRequest } = require("../utils/errorResponse");

const validateUserSignUp = (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const { error } = userSignUpValidation({
      userName: userName,
      email: email,
      password: password,
    });

    if (error) {
      const messages = error.details.map((error) => error.message);
      throw new BadRequest(messages);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateUser = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidation({
      email: email,
      password: password,
    });

    if (error) {
      throw new BadRequest("Invalid Email or password");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateUserEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = userEmailValidation({
      email: email,
    });

    if (error) {
      throw new BadRequest("Invalid Email");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateProfileUpdation = (req, res, next) => {
  try {
    const profile = req.body;

    /*  if (!profile.address && !profile.mobile) {
      next(new BadRequest("At least 1 field required", 400));
    } */

    const { error } = profileUpdationValidation(profile);

    if (error) {
      const messages = error.details.map((error) => error.message);
      throw new BadRequest(messages, 400);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateProfile = (req, res, next) => {
  try {
    const { mobile, address } = req.body;

    const { error } = profileValidation({
      phone: mobile,
      address: address,
    });

    if (error) {
      const messages = error.details.map((error) => error.message);
      throw new ErrorResponse(messages, 400);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateTrack = (req, res, next) => {
  try {
    const { status } = req.body;

    const { error } = trackValidation({
      status: status,
    });

    if (error) {
      throw new BadRequest(error.message);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateCategory = (req, res, next) => {
  try {
    const { name } = req.body;

    const { error } = categoryValidation({
      name: name,
    });

    if (error) {
      throw new BadRequest(error.message);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateReview = (req, res, next) => {
  try {
    const { content, rating } = req.body;
    const { error } = reviewValidation({
      content: content,
      rating: rating,
    });

    if (error) {
      const messages = error.details.map((error) => error.message);
      throw new BadRequest(messages);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProfileUpdation,
  validateProfile,
  validateTrack,
  validateUserSignUp,
  validateUser,
  validateUserEmail,
  validateCategory,
  validateReview,
};
