import express, { Request, Response } from "express";
import {
    ModuleProgressModel,
    ModuleProgressZod,
} from "../models/ModuleProgress";
import authenticate from "../utils/authenticate";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {})

router.post("/", async (req: Request, res: Response) => {});
