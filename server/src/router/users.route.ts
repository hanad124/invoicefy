import express from "express";

import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserInfo,
  getUserBSessionToken,
  updateUserProfile,
} from "../controllers/users.controller";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.put("/update-user-profile", isAuthenticated, updateUserProfile);
  router.get("/users/:id", isAuthenticated, isOwner, getUserById);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  // router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
  router.post("/get-user-info", getUserInfo);
  router.post("/get-user-by-session-token", getUserBSessionToken);

  return router;
};
