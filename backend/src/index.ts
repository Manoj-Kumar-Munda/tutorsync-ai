import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(clerkMiddleware());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
