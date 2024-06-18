import bcript from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  //  Get values from req.body
  const { username, email, age, phone, city, password } = req.body;
  // hash password
  const hashedPassword = await bcript.hash(password, 10);
  // save user
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      phone,
      age,
      city,
      password: hashedPassword,
    },
  });

  console.log(newUser)

};
export const login = (req, res) => {};
export const logout = (req, res) => {};
