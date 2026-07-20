import jwt from 'jsonwebtoken';

/**
 * Generates access and refresh JWT tokens.
 * @param {Object} user - Mongoose user document.
 * @returns {Object} { accessToken, refreshToken }
 */
export const generateTokens = async (user) => {
  const payload = {
    sub: user._id.toString(),
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });

  return { accessToken, refreshToken };
};
