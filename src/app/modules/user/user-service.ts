import { TUser } from "./user-interface";
import { User } from "./user-model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUsersFromDB = async (id: string, role: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: role },
    { runValidators: true, new: true }
  );
  return result;
};


export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  updateUsersFromDB,
};
