import express from "express";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getDetailUsers,
} from "../controller/userController";
import { loginUser } from "../controller/authController";

import { authMiddleWare } from "../middleware/authMiddleware";

const router = express.Router();

//user
router.get("/get-all-user", getAllUsers);
router.get("/get-detail-user/:id", getDetailUsers);
router.post("/create-new-user", createNewUser);
router.delete("/delete-user/:id", authMiddleWare, deleteUser);
router.put("/update-user/:id", authMiddleWare, updateUser);

//authentication
router.post("/login", loginUser);

module.exports = router;
