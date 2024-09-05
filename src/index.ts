import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import fs from "fs";
import path from "path";

const PORT = 3000;
const app = express();

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
