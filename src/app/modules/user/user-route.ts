import { Router } from "express";
import { UserControllers } from "./user-controller";
import validateRequest from "../../middleware/validateRequest";
import UserValidationSchema from "./user-validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidationSchema),
  UserControllers.createUser
);
router.get("/", UserControllers.getAllUser);
router.patch("/role/:id", UserControllers.updateUser);

export const UserRotues = router;
