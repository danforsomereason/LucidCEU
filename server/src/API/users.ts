import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import User from "../models/User";
import VerifiedUser from "../models/VerifiedUsers";
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
            res.json({ token, user: existingUser });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get("/check-exists/:email", async (req: any, res: any) => {
    try {
        const existingUser = await User.findOne({
            email: req.params.email,
            dt_deleted: null,
        });

        return res.status(200).json({
            exists: !!existingUser,
        });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/check-verification/:email", async (req: any, res: any) => {
    try {
        const verifiedUser = await VerifiedUser.findOne({
            email: req.params.email,
        });

        return res.status(200).json({
            exists: !!verifiedUser,
            organizationId: verifiedUser?.organization || null,
        });
    } catch (error) {
        console.error("Error checking verification:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Organization signup (no payment required)
router.post("/signup/organization", async (req: any, res: any) => {
    try {
        const { user, password } = req.body;

        // Verify organization membership one more time
        const verifiedUser = await VerifiedUser.findOne({ email: user.email });
        if (!verifiedUser) {
            return res
                .status(403)
                .json({ message: "Organization verification failed" });
        }

        // Create user with organization reference
        const newUser = new User({
            ...user,
            organization: verifiedUser.organization,
        });

        (newUser as any).setPassword(password);
        const savedUser = await newUser.save();

        // Remove from verified users after successful creation
        await VerifiedUser.deleteOne({ email: user.email });

        res.json({
            token: (newUser as any).generateJWT(),
            user: savedUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating organization user" });
    }
});

// Personal signup (requires payment verification)
// router.post("/signup/personal", async (req: any, res: any) => {
//     try {
//         const { user, password, paymentIntent } = req.body;

//         // Verify payment intent with Stripe
//         const paymentVerified = await verifyStripePayment(paymentIntent);
//         if (!paymentVerified) {
//             return res.status(403).json({ message: "Payment verification failed" });
//         }

//         const existingUser = await User.findOne({
//             email: user.email,
//             dt_deleted: null,
//         });

//         if (existingUser) {
//             return res.status(403).json({ message: "User already exists" });
//         }

//         const newUser = new User({
//             ...user,
//             subscription_status: 'active',
//             subscription_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
//         });

//         (newUser as any).setPassword(password);
//         const savedUser = await newUser.save();

//         res.json({
//             token: (newUser as any).generateJWT(),
//             user: savedUser
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error creating personal user" });
//     }
// });

export default router;
