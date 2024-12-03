import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    role: mongoose.Types.ObjectId;
    password_hash: string;
    salt: string;
    course_progress: mongoose.Types.ObjectId[];
    certificates: mongoose.Types.ObjectId[];
    survey_responses: mongoose.Types.ObjectId[];
    organization: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: Schema.Types.ObjectId, required: true, default: "user" },
        password_hash: { type: String, required: true },
        salt: { type: String, required: true },
        course_progress: [
            { type: Schema.Types.ObjectId, ref: "CourseProgress" },
        ],
        certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
        survey_responses: [
            { type: Schema.Types.ObjectId, ref: "SurveyResponse" },
        ],
        organization: [{type: Schema.Types.ObjectId, ref: "Organization"}]
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

UserSchema.method("setPassword", function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password_hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
      .toString("hex");
  });

  UserSchema.method("validatePassword", function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
      .toString("hex");
    return hash === this.password_hash;
  });

  UserSchema.method("generateJWT", function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
      },
      "lucid"
    );
  });

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
