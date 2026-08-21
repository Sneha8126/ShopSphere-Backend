import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Normalize each origin: trim whitespace/CR-LF and strip a trailing slash.
// CLIENT_URL may also be a comma-separated list.
const normalizeOrigin = (value) => String(value || "").trim().replace(/\/$/, "");

const allowedOrigins = [
  ...(process.env.CLIENT_URL || "").split(",").map(normalizeOrigin).filter(Boolean),
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      // Temporary diagnostic logging: shows the exact rejected origin and
      // the exact allow-list on the server, since a CORS rejection never
      // reaches morgan (next(err) skips it) and morgan is disabled in
      // production anyway.
      console.error(
        `CORS rejected origin: "${origin}" (normalized: "${normalizedOrigin}"). Allowed: ${JSON.stringify(
          allowedOrigins
        )}`
      );

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "ShopSphere API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ShopSphere API running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});