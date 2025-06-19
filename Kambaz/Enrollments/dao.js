import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import * as enrollmentsDao from "./dao.js";

export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function findEnrollmentsForUser(userId) {
  const enrollments = await model.find({ user: userId });
  return enrollments;
}

export async function isUserEnrolledInCourse(userId, courseId) {
  const enrollment = await model.findOne({ user: userId, course: courseId });
  return !!enrollment;
}