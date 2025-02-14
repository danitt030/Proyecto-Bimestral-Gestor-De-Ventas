import { Router } from "express";
import {
  getUserById,
  getUsers,
  deleteUser,
  updatePassword,
  updateUser,
  updateProfilePicture,
  updateRole
} from "./user.controller.js";
import {
  getUserByIdValidator,
  deleteUserValidator,
  updatePasswordValidator,
  updateUserValidator,
  updateProfilePictureValidator,
  updateRoleValidator
} from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);

router.get("/", getUsers);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.patch(
  "/updateProfilePicture/:uid",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
);

router.patch("/updateRole/:uid", updateRoleValidator, updateRole);

export default router;
