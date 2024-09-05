import express from "express";
import multer from "multer";
import path from "path";
import { register, login } from "../controllers/AuthController";

const router = express.Router();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Caminho para o diretório de uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Rota de registro com upload de arquivo
router.post("/register", upload.single("profilePic"), register);

// Rota de login
router.post("/login", login);

export default router;
