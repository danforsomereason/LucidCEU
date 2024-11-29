import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import User from "../models/User";

const router = express.Router();
const { requireAuth, localLogin } = auth;

router.post("/signup", async (req: any, res: any) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.user.email,
            dt_deleted: null,
        });

        if (existingUser) return res.sendStatus(403);

        const newUser = new User(req.body.user);

        (newUser as any).setPassword(req.body.password);

        const savedUser = await newUser.save();
        res.json({
            token: (newUser as any).generateJWT(),
            user: savedUser,
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post("/login", localLogin, async (req: any, res: any) => {
    const email = req.body.email;

    const password = req.body.password;
    try {
        const existingUser = await User.findOne({
            email,
            dt_deleted: null,
        });
        if (existingUser) {
            const token = (req.user as any).generateJWT();
            res.json({ token });
        
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
export default router;
