// // src/routes/courseCompletion.ts
// import express, { Request, Response } from 'express';
// import { Types } from 'mongoose';
// import Course from '../models/Course';
// import Certificate from '../models/Certificate';
// import CourseProgress from '../models/CourseProgress';
// import User from '../models/User';
// import { authenticateUser } from '../middleware/auth';

// const router = express.Router();

// // Types
// type ApprovalBoard = "NBCC" | "APA" | "ASWB" | "NAADAC" | "CAMFT" | "Nursing";

// interface CompleteCourseRequest extends Request {
//   params: {
//     courseId: string;
//   };
//   body: {
//     quizScore: number;
//   };
//   user?: {
//     id: string;
//     role: string;
//   };
// }

// // Helper function to generate certificate number
// const generateUniqueCertificateNumber = (): string => {
//   const timestamp = new Date().getTime();
//   const random = Math.floor(Math.random() * 10000);
//   return `CERT-${timestamp}-${random}`;
// };

// // Middleware to validate MongoDB ObjectIds
// const validateObjectId = (id: string): boolean => {
//   return Types.ObjectId.isValid(id);
// };

// router.post(
//   '/courses/:courseId/complete',
//   authenticateUser,
//   async (req: CompleteCourseRequest, res: Response) => {
//     try {
//       const { courseId } = req.params;
//       const { quizScore } = req.body;
      
//       // Validate courseId
//       if (!validateObjectId(courseId)) {
//         return res.status(400).json({ message: 'Invalid course ID format' });
//       }

//       // Validate quiz score
//       if (typeof quizScore !== 'number' || quizScore < 0 || quizScore > 100) {
//         return res.status(400).json({ 
//           message: 'Quiz score must be a number between 0 and 100' 
//         });
//       }

//       // Check if user exists in request
//       if (!req.user?.id) {
//         return res.status(401).json({ message: 'User not authenticated' });
//       }

//       // Find course
//       const course = await Course.findById(courseId);
//       if (!course) {
//         return res.status(404).json({ message: 'Course not found' });
//       }

//       // Find or create course progress
//       let courseProgress = await CourseProgress.findOne({
//         user_id: req.user.id,
//         course_id: courseId
//       });

//       if (!courseProgress) {
//         courseProgress = new CourseProgress({
//           user_id: req.user.id,
//           course_id: courseId,
//           started_at: new Date(),
//           status: 'in_progress'
//         });
//       }

//       // Update course progress to completed
//       courseProgress.completed_at = new Date();
//       courseProgress.status = 'completed';
//       await courseProgress.save();

//       // Find existing certificate or create new one
//       let certificate = await Certificate.findOne({
//         user_id: req.user.id,
//         course_id: courseId
//       });

//       const newIssueHistory = {
//         issued_at: new Date(),
//         certificate_number: generateUniqueCertificateNumber(),
//         quiz_score: quizScore
//       };

//       if (certificate) {
//         // Add new issue to history
//         certificate.issued_history.push(newIssueHistory);
//       } else {
//         // Create new certificate
//         certificate = new Certificate({
//           user_id: req.user.id,
//           course_id: courseId,
//           issued_history: [newIssueHistory],
//           approved_by: course.approved_by?.map(board => ({
//             board: board as ApprovalBoard,
//             logo_url: `${process.env.BASE_URL}/logos/${board.toLowerCase()}.png` // Adjust based on your logo storage
//           })) || []
//         });
//       }

//       await certificate.save();

//       // Update user's certificates and progress arrays if not already included
//       await User.findByIdAndUpdate(
//         req.user.id,
//         { 
//           $addToSet: { 
//             certificates: certificate._id,
//             courseProgress: courseProgress._id
//           } 
//         },
//         { new: true }
//       );

//       // Get most recent issue for response
//       const mostRecentIssue = certificate.getMostRecentIssue();

//       res.status(201).json({ 
//         message: 'Course completed and certificate issued',
//         certificate: {
//           ...certificate.toObject(),
//           mostRecentIssue
//         },
//         courseProgress: courseProgress
//       });

//     } catch (error) {
//       console.error('Course completion error:', error);
//       res.status(500).json({ 
//         message: 'Error completing course',
//         error: process.env.NODE_ENV === 'development' ? error : undefined
//       });
//     }
//   }
// );

// // Optional: Add route to get certificate history
// router.get(
//   '/courses/:courseId/certificates',
//   authenticateUser,
//   async (req: Request, res: Response) => {
//     try {
//       const { courseId } = req.params;

//       if (!validateObjectId(courseId)) {
//         return res.status(400).json({ message: 'Invalid course ID format' });
//       }

//       const certificate = await Certificate.findOne({
//         user_id: req.user?.id,
//         course_id: courseId
//       });

//       if (!certificate) {
//         return res.status(404).json({ message: 'No certificates found for this course' });
//       }

//       res.status(200).json({
//         certificate,
//         mostRecentIssue: certificate.getMostRecentIssue()
//       });

//     } catch (error) {
//       console.error('Error fetching certificates:', error);
//       res.status(500).json({ 
//         message: 'Error fetching certificates',
//         error: process.env.NODE_ENV === 'development' ? error : undefined
//       });
//     }
//   }
// );

// export default router;