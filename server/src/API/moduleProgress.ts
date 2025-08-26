import express, { Request, Response } from "express";
import {
    ModuleProgressModel,
    ModuleProgressZod,
} from "../models/ModuleProgress";
import authenticate from "../utils/authenticate";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const user = await authenticate(req.headers.authorization);
    if (!user) {
        return res.json({
            message: "You must be logged in to begin progress on a course",
        });
    }

    const currentModuleId = req.body.currentModuleId;
    const nextModuleId = req.body.nextModuleId;

    let completedModule = await ModuleProgressModel.findOne({
        user_id: user.id,
        module_id: currentModuleId,
    });

    if (!completedModule) {
        throw new Error("Module not found.");
    }

    if (!completedModule.end_module) {
        completedModule.end_module = new Date();
        await completedModule.save();
    }

    let nextModuleProgress = await ModuleProgressModel.findOne({
        user_id: user.id,
        module_id: nextModuleId,
    });
    console.log("Next module progress", nextModuleProgress);
    if (!nextModuleProgress) {
        const createdProgress = await ModuleProgressModel.create({
            module_id: nextModuleId,
            user_id: user.id,
            start_module: new Date(),
        });
        return res.json({
            message: "Created module progress",
            createdProgress,
            completedModule,
        });
    }

    res.status(200).json({
        message: "Updated module progress",
        completedModule,
    });
});

export default router;
