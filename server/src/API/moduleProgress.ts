import express, { Request, Response } from "express";
import { ModuleProgress, ModuleProgressZod } from "../models/ModuleProgress"
import authenticate from "../utils/authenticate";

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
    
})