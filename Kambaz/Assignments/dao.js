import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// 获取某个课程的所有作业
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

// 创建新作业
export function createAssignment(assignment) {
  const newAssignment = { 
    ...assignment, 
    _id: uuidv4(),
    points: assignment.points || 100,
    dueDate: assignment.dueDate || new Date().toISOString(),
    availableFrom: assignment.availableFrom || new Date().toISOString(),
    availableUntil: assignment.availableUntil || new Date().toISOString()
  };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

// 更新作业
export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((a) => a._id === assignmentId);
  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}

// 删除作业
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}

// 根据ID查找作业
export function findAssignmentById(assignmentId) {
  const { assignments } = Database;
  return assignments.find((a) => a._id === assignmentId);
}