import jwt from "jsonwebtoken";

export const shouldBeLoggrdIn = async (req, res) => {
  res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please Login First" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    if (!user.isAdmin) {
      return res.status(401).json({ message: "You are not an admin" });
    }
  });

  res.status(200).json({ message: "You are Authenticated" });
};
