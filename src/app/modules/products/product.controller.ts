/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productSerivces } from "./product.service";
import { TFilterOptions } from "./product.interface";

const createProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;

  const result = await productSerivces.createProductIntoDB(productData);

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
    message: "Product created successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await productSerivces.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Retrived successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res, next) => {
  const { minPrice, maxPrice, sortBy, searchTerm } = req.query;

  const filterOptions: TFilterOptions = {
    minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
    maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
    sortBy:
      sortBy !== undefined
        ? (sortBy as "Price - Low to High" | "Price - High to Low" | "Default")
        : undefined,
    searchTerm: searchTerm !== undefined ? String(searchTerm) : undefined,
  };

  const result = await productSerivces.getAllProductFromDB(filterOptions);

  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products Retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  const result = await productSerivces.updateProductIntoDB(id, body);

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
    message: "Product Updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await productSerivces.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Deleted successfully",
    data: result,
  });
});

const decreaseProductQuantity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const updatedProduct = await productSerivces.decreaseProductQuantity(
    id,
    quantity
  );

  if (!updatedProduct) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Product not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product quantity decreased successfully",
    data: updatedProduct,
  });
});

export const prouductControllers = {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  decreaseProductQuantity,
};
