import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Get users array from database
let { users } = db;

// Create a new user with generated ID
export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  users = [...users, newUser];
  return newUser;
};

// Find all users
export const findAllUsers = () => users;

// Find user by ID
export const findUserById = (userId) => 
  users.find((user) => user._id === userId);

// Find user by username
export const findUserByUsername = (username) => 
  users.find((user) => user.username === username);

// Find user by credentials (for login)
export const findUserByCredentials = (username, password) =>
  users.find(
    (user) => user.username === username && user.password === password
  );

// Update existing user
export const updateUser = (userId, user) => {
  users = users.map((u) => (u._id === userId ? user : u));
  return users.find((u) => u._id === userId);
};

// Delete user
export const deleteUser = (userId) => {
  users = users.filter((u) => u._id !== userId);
  return users;
};