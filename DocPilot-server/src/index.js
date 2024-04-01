import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/envConfig.js";
import connectDb from "./config/dbConfig.js";
import auth from "./routes/authRoute.js";
import user from "./routes/userRoute.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

// Defninig Routes
app.use("/api/auth", auth);
app.use("/api/user", user);

// Global Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(SERVER_PORT, (req, res) => {
  connectDb();
  console.log(`Server listening on port ${SERVER_PORT}`);
});
