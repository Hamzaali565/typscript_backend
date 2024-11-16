import express from "express";
import { routesOptions } from "./Routes/Route.summary/Router.summary";

const app = express();
app.use(express.json());

routesOptions(app);

export { app };
