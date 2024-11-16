import { Router } from "express";
import { signUp } from "../../Controller/user.cont";

const router = Router();

router.route("/signup").post(signUp);

export default router;
