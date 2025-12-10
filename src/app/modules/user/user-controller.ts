/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from "./user-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

export const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.getAllUsersFromDB();
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrived successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserServices.updateUsersFromDB(id, role);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  updateUser,
};
