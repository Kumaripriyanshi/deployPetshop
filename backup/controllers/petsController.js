import categoryModel from "../models/categoryModel.js";
import petModel from "../models/petModel.js";
import fs from "fs";

export const addPets = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.fields;
    const { photo } = req.files;

    if (!name || !category || !price || !quantity || !photo)
      return res
        .status(500)
        .send({ sucess: false, message: "Something is missing!!" });

    const newPet = new petModel({ ...req.fields });
    newPet.photo.data = fs.readFileSync(photo.path);
    newPet.photo.contentType = photo.type;
    await newPet.save();

    res.status(200).send({
      success: true,
      message: "successfully added new pet",
    });
  } catch (err) {
    res.status(400).send({
      success: fasle,
      message: "error in adding new pet",
    });
  }
};

export const getAllPets = async (req, res) => {
  try {
    const allpets = await petModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: 1 }); //sorting in ascending order according to creation timing

    res.status(200).send({
      success: true,
      counTotal: allpets.length,
      message: "ALlProducts ",
      allpets,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "error in fetching all pets  ",
    });
  }
};

export const getpetsById = async (req, res) => {
  try {
    const { id } = req.params;
    const allpets = await petModel.findById(id).select("-photo");

    res.status(200).send({
      success: true,
      allpets,
      message: "Here is required pet ",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "error in fetching pets by id  ",
      err,
    });
    console.log(err);
  }
};

export const getpetphoto = async (req, res) => {
  try {
    const { id } = req.params;
    const pets = await petModel.findById(id);
    if (pets.photo.data) {
      res.set("Content-type", pets.photo.contentType);
      return res.status(200).send(pets.photo.data);
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "error in getting photo",
      err,
    });
  }
};

export const updatepets = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.fields;
    const { photo } = req.files;
    
    const {id}=req.params
    let updObj={}
    if(name)updObj.name=name
    if(category) updObj.category=category
    if(price) updObj.price =price
    if(quantity) updObj.quantity=quantity

    // const newPet = new petModel({ ...req.fields });
    // newPet.photo.data = fs.readFileSync(photo.path);
    // newPet.photo.contentType = photo.type;
    // await newPet.save();
    // if(photo)updObj.photo=photo
    const pet = await petModel.findByIdAndUpdate(id,updObj,{new:true}).select("-photo")
    if(photo){
      pet.photo.data = fs.readFileSync(photo.path);
    pet.photo.contentType = photo.type;
    await pet.save();
    }



    res.status(200).send({
      success: true,
      message: "successfully updated the pet",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "error in updating the pet",
    });
  }
};

export const deletepets = async (req, res) => {
  try {
    await petModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Successfully deleted this pet",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "error in deletion ",
    });
  }
};

export const searchByFilter = async (req, res) => {
  try {
    const { keywords } = req.params;
    const pet = await petModel
      .find({ name: { $regex: keywords, $options: "i" } })
      .select("-photo");
    if (!pet) {
      res.status(400).send({
        success: false,
        message: "this pet don't exist",
      });
    }

    res.status(200).send({
      success: true,
      pet,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Unable to find pet by keyword",
    });
  }
};

export const searchByCategoryFilter = async (req, res) => {
  try {
    const { keywords } = req.params;

    // const pet = await petModel
    //   .find({ category : { name:{$regex: keywords, $options: "i" }} })
    //   .select("-photo");

    let pet = [];
    if (keywords === "1" || keywords === "-1") {
      pet = await petModel
        .find({})
        .populate("category")
        .select("-photo")
        .sort({ price: parseInt(keywords) }); //sorting in ascending order according to creation timing
    } else {
      const cate = await categoryModel.find({
        name: { $regex: keywords, $options: "i" },
      });
      pet = await petModel
        .find({ category: { _id: cate[0]._id } })
        .select("-photo");
    }

    // const pet= await petModel.find({category:{_id:"65244240dddd2c666822257b"}}).select("-photo")

    if (pet) {
      return res.status(200).send({
        success: true,
        pet,
      });
    }

    res.status(400).send({
      success: false,
      message: "this pet don't exist",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Unable to find pet by keyword",
      err,
    });
  }
};
