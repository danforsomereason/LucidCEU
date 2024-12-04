import express from "express";
import Plan from "../models/Plan";

const router = express.Router();

// Get all plans
router.get('/', async (req: any, res: any) => {
    try {
        const plans = await Plan.find({ is_active: true });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plans', error });
    }
});

// Get single plan
router.get('/:id', async (req: any, res: any) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plan', error });
    }
});

// Create plan
router.post('/', async (req: any, res: any) => {
    try {
        const plan = new Plan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json({ message: 'Error creating plan', error });
    }
});

// Update plan
router.put('/:id', async (req: any, res: any) => {
    try {
        const plan = await Plan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(plan);
    } catch (error) {
        res.status(400).json({ message: 'Error updating plan', error });
    }
});

// Soft delete plan (set is_active to false)
router.delete('/:id', async (req: any, res: any) => {
    try {
        const plan = await Plan.findByIdAndUpdate(
            req.params.id,
            { is_active: false },
            { new: true }
        );
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json({ message: 'Plan deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deactivating plan', error });
    }
});

export default router;
