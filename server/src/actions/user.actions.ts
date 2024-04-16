import { UserModel } from "../model/user.model";

export const getUsers = () => {
  return UserModel.find();
};

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({
    email,
  });
};

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => {
  return UserModel.findById(id);
};

export const createUser = async (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => {
    return user.toObject();
  });
};

export const deleteUserById = (id: string) => {
  return UserModel.findByIdAndDelete({
    _id: id,
  });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values);
};
