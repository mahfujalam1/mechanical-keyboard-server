import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // সব origin allow
    },
    credentials: true,
  })
);

app.use("/api", router);

const test = async (req: Request, res: Response) => {
  res.send({ message: "Mechanical Keyboard server is running" });
};

app.get("/", test);

export default app;
