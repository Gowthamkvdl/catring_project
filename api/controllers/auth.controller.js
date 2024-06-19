import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  //  Get values from req.body
  const { username, email, age, phone, city, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Check if the user already exisits by username, email address and phone
    const existUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (existUsername) {
      res.status(400).json({ message: "Username already taken. Please try with a different username." });
      return;
    }

    const existsEmailAndPhone = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone },
        ],
      },
    });
    if (existsEmailAndPhone) {
      res.status(400).json({ message: "Email or phone number already exists. Please try with a different email id or phone number." });
      return;
    }
  
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

    res.status(200).json({ message: "Registration successful! Please login to continue." });
  } catch (error) {
    res.status(500).json({ message: `Failed to create user: ${error}` });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    //CHECK IF THE PASSOWRD IS CORRECT
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect Password!" });
    }

    //GENERATE COOKIE TOKEN AND SEND IT TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        // isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );
    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpsOnly: true,
        maxAge: age,
      })
      .json(userInfo);

      console.log(res.data)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login! " + error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

