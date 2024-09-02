import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on http://localhost:3000");
});
