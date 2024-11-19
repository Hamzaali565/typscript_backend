import { Router } from "express";
import { productCreation } from "../../Controller/product.cont";

const router = Router();

router.route("/product").post(productCreation);

export default router;
