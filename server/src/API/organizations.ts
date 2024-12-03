import express from "express";
import Organization from "../models/Organizations";

const router = express.Router();

// Get all organizations
router.get("/", async (req: any, res: any) => {
    try {
        const organizations = await Organization.find()
            // Build point of contact with first name, last name, and email of admin
            .populate("point_of_contact", "first_name last_name email")
            .populate("plan_id")
            .populate("owner");
        res.json(organizations);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching organizations",
            error: error,
        });
    }
});

// Get a single organization by id
router.get("/:id", async (req: any, res: any) => {
    try {
        const organization = await Organization.findById(req.params.id)
            .populate("point_of_contact", "first_name last_name email")
            .populate("plan_id")
            .populate("owner");
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.json(organization);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching organization",
            error: error,
        });
    }
});

// Create a new organization
router.post("/", async (req: any, res: any) => {
    try {
        const organization = new Organization(req.body);
        await organization.save();
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({
            message: "Error creating organization",
            error: error,
        });
    }
});

// Update an organization
router.put("/:id", async (req: any, res: any) => {
    try {
        const organization = await Organization.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.json(organization);
    } catch (error) {
        res.status(500).json({
            message: "Error updating organization",
            error: error,
        });
    }
});

// Delete an organization
router.delete("/:id", async (req: any, res: any) => {
    try {
        const organization = await Organization.findByIdAndDelete(
            req.params.id
        );
    } catch (error) {
        res.status(500).json({
            message: "Error deleting organization",
            error: error,
        });
    }
});

export default router;
