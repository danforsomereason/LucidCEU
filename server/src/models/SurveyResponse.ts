import mongoose, { Schema } from "mongoose";
import { z } from "zod";


export const surveyResponseZod = z.object({
    survey_id: z.string(),
    user_id: z.string(),
    responses: z.array(z.string()),
});

export type SurveyResponse = z.infer<typeof surveyResponseZod>; 

const SurveyResponseSchema: Schema = new Schema({
    survey_id: { type: String, required: true },
    user_id: { type: String, required: true },
    responses: { type: [String], required: true },
});

export const SurveyResponseModel = mongoose.model<SurveyResponse>("SurveyResponse", SurveyResponseSchema);
export default SurveyResponseModel;