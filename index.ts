import { Request, Response } from "express";
import { connectDb } from "./src/Database/Database.config";
import * as dotenv from "dotenv";
dotenv.config();

import { app } from "./src/app";

const PORT = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server connection failed with error ${err}`);
  });
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});


