import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { registerUser, loginUser } from "../services/AuthService";

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório para armazenar uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export const register = [
  upload.single("profilePic"), // Usando o middleware multer para upload
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const profilePic = req.file ? req.file.path : ""; // Obtendo o caminho da foto de perfil

    try {
      const user = await registerUser(
        firstName,
        lastName,
        email,
        password,
        profilePic
      );
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unexpected error occurred" });
      }
    }
  },
];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    const token = process.env.JWT_SECRET;
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unexpected error occurred" });
    }
  }
};
