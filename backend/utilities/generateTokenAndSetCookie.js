import jsonwebtoken from "jsonwebtoken";
export const generateTokenAndSetCookie = async (res, userId) => {
  const token = jsonwebtoken.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.Node_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
