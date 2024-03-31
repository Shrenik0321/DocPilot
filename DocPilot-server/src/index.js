import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/envConfig.js";
import connectDb from "./config/dbConfig.js";
import auth from "./routes/authRoute.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(express.json());

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

// Global Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(SERVER_PORT, (req, res) => {
  connectDb();
  console.log(`Server listening on port ${SERVER_PORT}`);
});
