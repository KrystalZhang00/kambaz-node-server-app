import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function updateModule(moduleId, moduleUpdates) {
  if (!moduleId || !moduleUpdates) {
    throw new Error("Module ID and updates are required");
  }
  return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
}

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}

export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  return model.create(newModule);
}

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
} 