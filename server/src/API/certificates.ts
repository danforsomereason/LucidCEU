import express from "express";
import Certificate from "../models/Certificate";
import Course from "../models/Course";
import User from "../models/User";
import { generatePDF } from "../utils/pdfGenerator";
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';

// Configure AWS
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

const router = express.Router();

router.post("/", async (req: any, res: any) => {
    try {
        const { course_id, score } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        const course = await Course.findById(course_id);
        
        if (!user || !course) {
            return res.status(404).json({ message: "User or course not found" });
        }

        // Generate a unique certificate number
        const certificateNumber = `CERT-${uuidv4().slice(0, 8).toUpperCase()}`;

        // Find existing certificate or create new one
        let certificate = await Certificate.findOne({
            user_id: userId,
            course_id: course_id
        });

        if (!certificate) {
            certificate = new Certificate({
                user_id: userId,
                course_id: course_id,
                issued_history: [],
                approved_by: course.approved_by || []
            });
        }

        // Add new issue to history with certificate_url as undefined
        certificate.issued_history.push({
            issued_at: new Date(),
            certificate_number: certificateNumber,
            quiz_score: score,
            certificate_url: undefined  // update for pdf url
        });

        // Generate certificate PDF
        const certificateData = {
            userName: `${user.first_name} ${user.last_name}`,
            courseName: course.name,
            ceHours: course.ce_hours,
            completionDate: new Date(),
            score
        };

        const pdfBuffer = await generatePDF(certificateData);

        const fileName = `certificates/${uuidv4()}.pdf`;

        // Upload to S3
        await s3.putObject({
            Bucket: 'your-bucket-name',
            Key: fileName,
            Body: pdfBuffer,
            ContentType: 'application/pdf'
        }).promise();

        // Generate URL
        const pdfUrl = s3.getSignedUrl('getObject', {
            Bucket: 'your-bucket-name',
            Key: fileName,
            Expires: 3600 // URL expires in 1 hour
        });

        // Get the most recent issue (it will be the last one in the array)
        const currentIssue = certificate.issued_history[certificate.issued_history.length - 1];
        if (currentIssue) {
            currentIssue.certificate_url = pdfUrl;
            await certificate.save();
        }

        res.json({ 
            message: "Certificate generated successfully",
            certificateUrl: pdfUrl
        });

    } catch (err) {
        console.error('Certificate generation error:', err);
        res.status(500).json({ message: "Failed to generate certificate" });
    }
});

export default router; 