import express from "express";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "../actions/user.actions";
import { authentication, random } from "../helper";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication?.salt, password);

    if (expectedHash !== user.authentication?.password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("token", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    });

    res.status(200).send({
      success: true,
      message: "User logged in successfully!",
      data: user.authentication.sessionToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const existingUSer = await getUserByEmail(email);

    if (existingUSer) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = random();

    // create user
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(200).send({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
