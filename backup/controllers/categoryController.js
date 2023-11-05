import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).send({
        sucess: false,
        message: "Name is required to create category",
      });

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        sucess: false,
        message: "category already exists",
      });
    }
    await new categoryModel({ name }).save();
    res.status(200).send({
      sucess: true,
      message: "successfully created the category",
      name,
    });
  } catch (err) {
    res.status(400).send({
      sucess: false,
      message: "error in category",
      err,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).send({
      sucess: true,
      message: "successfully updated the category",
      category,
    });
  } catch (err) {
    res.status(400).send({
      sucess: false,
      message: "Error in updating the category",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      sucess: true,
      message: "successfully deleted the category",
    });
  } catch (err) {
    res.status(400).send({
      sucess: false,
      message: "Error in deletion of category",
      err,
    });
  }
};

// get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categoriesList = await categoryModel.find({});

    res.status(200).send({
      sucess: true,
      message: "successfully fetched all categories",
      categoriesList,
    });
  } catch (err) {
    res.status(400).send({
      sucess: false,
      message: "error in fetching all categories",
      err,
    });
  }
};

// fetching single categories
