import jwt from "jsonwebtoken";
export function generateTokenAndSetCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //Prevent xss cros site scripting
    sameSite: "strict", //Prevent csrf cross site request forgery
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });
}
