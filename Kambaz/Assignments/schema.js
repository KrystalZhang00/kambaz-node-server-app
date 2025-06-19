import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  course: { type: String, ref: "CourseModel" },
  points: {
    type: Number,
    default: 100
  },
  dueDate: Date,
  availableFrom: Date,
  availableUntil: Date,
  assignmentGroup: {
    type: String,
    default: "ASSIGNMENTS"
  },
  displayGradeAs: {
    type: String,
    default: "Percentage"
  },
  submissionType: {
    type: String,
    default: "Online"
  },
  submissionOptions: {
    textEntry: {
      type: Boolean,
      default: false
    },
    websiteUrl: {
      type: Boolean,
      default: false
    },
    mediaRecordings: {
      type: Boolean,
      default: false
    },
    studentAnnotation: {
      type: Boolean,
      default: false
    },
    fileUpload: {
      type: Boolean,
      default: false
    }
  },
  assignTo: {
    type: String,
    default: "Everyone"
  }
}, {
  collection: "assignments"
});

export default assignmentSchema; 