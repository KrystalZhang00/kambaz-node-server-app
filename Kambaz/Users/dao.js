import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() }; // NEW
    return model.create(newUser);
}
  
export const findAllUsers = async () => {
    try {
        const users = await model.find();
        console.log(`Found ${users.length} users in database`);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
};
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = async (username, password) => {
    try {
        if (!username || !password) {
            console.log("Missing username or password");
            return null;
        }
        const user = await model.findOne({ username, password });
        if (!user) {
            console.log(`No user found with username: ${username}`);
        }
        return user;
    } catch (error) {
        console.error("Error in findUserByCredentials:", error);
        return null;
    }
};
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  