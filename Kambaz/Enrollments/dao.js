import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  // 检查是否已经注册
  const existing = enrollments.find(
    (e) => e.user === userId && e.course === courseId
  );
  if (existing) {
    return existing;
  }
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index > -1) {
    const removed = enrollments.splice(index, 1);
    return removed[0];
  }
  return null;
}

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((e) => e.user === userId);
}

export function isUserEnrolledInCourse(userId, courseId) {
  const { enrollments } = Database;
  return enrollments.some(
    (e) => e.user === userId && e.course === courseId
  );
}