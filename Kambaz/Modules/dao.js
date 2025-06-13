import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function updateModule(moduleId, moduleUpdates) {
  if (!moduleId || !moduleUpdates) {
    throw new Error("Module ID and updates are required");
  }
  const { modules } = Database;
  const module = modules.find((module) => module._id === moduleId);
  if (!module) {
    throw new Error(`Module with id ${moduleId} not found`);
  }
  const updatedModule = { ...module, ...moduleUpdates };
  const index = modules.findIndex(m => m._id === moduleId);
  modules[index] = updatedModule;
  return updatedModule;
}

export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  Database.modules = [...Database.modules, newModule];
  return newModule;
}

export function findModulesForCourse(courseId) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
} 