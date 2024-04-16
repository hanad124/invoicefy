import express, { Request, Response } from "express";
import { UserModel } from "../model/user.model";
import {
  deleteUserById,
  getUserBySessionToken,
  getUsers,
} from "../actions/user.actions";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById({
      _id: id,
    });

    if (user) {
      res.send({
        success: true,
        message: "User Fetched Successfully.",
        data: user,
      });
    } else {
      res.send({
        success: false,
        message: "User does not exists.",
        data: null,
      });
    }

    res.end();
  } catch (error: any) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = await UserModel.findOne({
      "authentication.sessionToken": token,
    });

    if (user) {
      res.send({
        success: true,
        message: "User Info Fetched Successfully.",
        data: user,
      });
    } else {
      res.send({
        success: false,
        message: "User does not exists.",
        data: null,
      });
    }

    res.end();
  } catch (error: any) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

// get user by session token
export const getUserBSessionToken = async (req: Request, res: Response) => {
  try {
    const user = await getUserBySessionToken(req.body.token);

    if (user) {
      res.send({
        success: true,
        message: "User Fetched Successfully.",
        data: user,
      });
    } else {
      res.send({
        success: false,
        message: "User does not exists.",
        data: null,
      });
    }

    res.end();
  } catch (error: any) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email } = req.body;
    const { id } = req.params;

    if (!username || !email) {
      return res.sendStatus(400);
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    user.username = username;
    user.email = email;

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { username, email, profilePicture } = req.body;
    const { _id } = req.body;

    if (!username || !email) {
      console.log("Username or email is missing");
      return res.sendStatus(400);
    }

    const user = await UserModel.findById({
      _id: _id,
    });

    if (!user) {
      console.log("User not found");
      return res.sendStatus(404);
    }

    // update only if tha value changed or different from the previous one
    if (username !== user.username) {
      user.username = username;
    }

    if (email !== user.email) {
      user.email = email;
    }

    if (profilePicture !== user.profilePicture) {
      user.profilePicture = profilePicture;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
