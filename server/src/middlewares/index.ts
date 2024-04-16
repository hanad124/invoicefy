import express from "express";
import { get, merge } from "lodash";
import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../actions/user.actions";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    const currentUserId = req.body.userid as string | undefined;

    if (!currentUserId) {
      console.log("no currentUserId");
      return res.sendStatus(403);
    }

    if (currentUserId !== req.body.userid) {
      console.log("not owner");
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken =
      req.headers.authorization?.split(" ")[1] || req.cookies["token"];

    if (!sessionToken) {
      console.log("no session token");
      return res.status(401).send({ message: "Unauthorized" });
    }

    const existingUSer = await getUserBySessionToken(sessionToken);

    if (!existingUSer) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    merge(req, { identity: existingUSer });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Internal server error" });
  }
};
