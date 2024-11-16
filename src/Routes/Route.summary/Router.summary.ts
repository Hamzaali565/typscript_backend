import userRoutes from "../Route.Details/user.routes";

const routesOptions = (app: any) => {
  app.use("/api/v1", userRoutes);
};

export { routesOptions };
