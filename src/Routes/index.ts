import { Router } from "express";

import UserRoutes from "./UserRoutes";
import { userController } from "../container";

const router = Router();

router.use("/user", UserRoutes(userController));

export default router;
