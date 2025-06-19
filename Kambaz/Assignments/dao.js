import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// 获取某个课程的所有作业
export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

// 创建新作业
export function createAssignment(assignment) {
  const newAssignment = { 
    ...assignment, 
    _id: uuidv4(),
    // Core fields with fallbacks
    points: assignment.points || 100,
    dueDate: assignment.dueDate || new Date().toISOString(),
    availableFrom: assignment.availableFrom || new Date().toISOString(),
    availableUntil: assignment.availableUntil || new Date().toISOString(),
    // Accept all UI fields if provided, otherwise use schema defaults
    assignmentGroup: assignment.assignmentGroup || "ASSIGNMENTS",
    displayGradeAs: assignment.displayGradeAs || "Percentage",
    submissionType: assignment.submissionType || "Online",
    submissionOptions: assignment.submissionOptions || {
      textEntry: false,
      websiteUrl: false,
      mediaRecordings: false,
      studentAnnotation: false,
      fileUpload: false
    },
    assignTo: assignment.assignTo || "Everyone"
  };
  return model.create(newAssignment);
}

// 更新作业
export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}

// 删除作业
export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

// 根据ID查找作业
export function findAssignmentById(assignmentId) {
  return model.findOne({ _id: assignmentId });
}