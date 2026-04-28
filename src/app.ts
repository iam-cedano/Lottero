import "reflect-metadata";
import express from "express";
import cors from "cors";
import routes from "@/routes";
import { authenticate } from "@/middlewares/auth.middleware";
import { config } from "./config";

const app = express();

console.log(config.production ? "Running in production mode" : "Running in development mode");

app.use(express.json());
app.use(cors());
app.use(authenticate);

app.use("/", routes);

export default app;
