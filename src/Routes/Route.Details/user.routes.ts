import { Router } from "express";
import { login, signUp } from "../../Controller/user.cont";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);

export default router;
