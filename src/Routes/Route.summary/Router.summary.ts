import userRoutes from "../Route.Details/user.routes";
import productRoutes from "../Route.Details/product.routes";
import { authMiddleware } from "../../Middleware/auth.middleware";
const routesOptions = (app: any) => {
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", authMiddleware, productRoutes);
};

export { routesOptions };
