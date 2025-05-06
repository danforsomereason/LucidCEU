import express from "express";
import User from "../models/User";
import VerifiedUser from "../models/VerifiedUsers";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticate from "../utils/authenticate";

const router = express.Router();

router.post("/signup", async (req, res) => {
    console.log(req.body);

    const existingUser = await User.findOne({
        email: req.body.email,
        dt_deleted: null,
    });

    if (existingUser) return res.sendStatus(403);

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        license_type: req.body.license_type,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        password_hash: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
        { userId: savedUser._id },
        "TEST_SECRET", // TODO move this to .env
        { expiresIn: "1h" }
    );

    res.json({
        token,
        user: savedUser,
    });
});
// http://localhost:4000/login
router.post("/login", async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email,
        dt_deleted: null,
    });
    console.log("Existing user:", existingUser);

    if (existingUser) {
        const matchingPassword = await bcryptjs.compare(
            req.body.password,
            existingUser.password_hash
        );
        console.log("Body password", req.body.password);

        console.log("Matching password:", matchingPassword);
        // "guard pattern" presumes you have a password and returns if not
        if (!matchingPassword) {
            return res.json({ message: "invalid" });
        }
        const decoded = { userId: existingUser._id };
        const token = jwt.sign(
            decoded,
            "TEST_SECRET", // TODO move this to .env
            { expiresIn: "1h" }
        );
        res.json({ token, user: existingUser });
    } else {
        res.json({ message: "invalid" });
    }
});

router.get("/identify", async (req, res) => {
    const user = await authenticate(req.headers.authorization);
    res.json({ user });
});

router.delete("/delete", async (req, res) => {
    // authentication
    const user = await authenticate(req.headers.authorization);
    // authorization
    if (user.role !== "admin") {
        throw new Error("Only admins can delete users.");
    }
    res.send("User Deleted");
});

router.post("/update-profile/:userId", async (req, res) => {
    // authentication:
    const user = await authenticate(req.headers.authorization);
    // authorization:
    if (user.id !== req.params.userId) {
        throw new Error("You can only update your own profile.");
    }
    // Behavior: update user profile
    res.send("Profile Updated");
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

router.get("/", async (req, res) => {
    const user = await authenticate(req.headers.authorization);
    if (user.role !== "admin") {
        throw new Error("Only admins can view users");
    }
    const users = await User.find();
    res.send({ users });
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
