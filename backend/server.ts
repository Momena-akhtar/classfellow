import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connectDB } from "./src/config/db";
import { setupSwagger } from "./src/config/swagger";
import authRoutes from "./src/routes/auth.routes";
import courseRoutes from "./src/routes/course.routes";
import bookRoutes from "./src/routes/book.routes";
import noteRoutes from "./src/routes/note.routes";
import emailRoutes from "./src/routes/email.routes";
import { connectRedis } from "./src/config/redis";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
const app = express();
const PORT = process.env.PORT || 5500;

connectDB();
connectRedis().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieparser());

// Setup Swagger documentation
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/email", emailRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
        <html>
        <head>
            <title>Classfellow</title>
            <meta charset="utf-8">
        </head>
            <body style="font-family: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace;">
            <h1>Classfellow</h1>
            <p>Version: 1.0.0</p>
            <p>© Momena Akhtar & Talal Majeed - 2025</p>
            <p><strong>Environment:</strong> ${env}</p>
            <a href="/api-docs/">View API Documentation</a>
        </body>
        </html>
        `);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
