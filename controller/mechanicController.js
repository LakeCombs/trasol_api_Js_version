const asyncHandler = require("express-async-handler");
const Mechanic = require("../model/mehanicModel");
const generateToken = require("../middleware/generateToken");

const registerMechanic = asyncHandler(async (req, res) => {
  const {
    first_name,
    email,
    last_name,
    phone,
    core,
    car_they_can_fix,
    password,
    proof_of_years_of_experience,
    mechanic_Tr_number,
    guarantor_name,
    guarantor_phone,
    guarantor_address,

    address,
  } = req.body;

  if (!first_name || !last_name || !car_they_can_fix || !password) {
    throw new Error("Please fill in the required field");
  }

  //they can register with either email or password
  //most mechanic dont have emails
  const mechanicExist = await Mechanic.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  if (mechanicExist) {
    throw new Error("User already exist");
  }

  //i am enforcing this data structure so you don't have to do it on the frontend
  //just collect the data and it will be automatically arranged, if we want to
  //change it in the future we can simple add or remove whatever we want
  const newMechanicData = {
    first_name,
    last_name,
    email,
    password,
    car_they_can_fix,
    address,
    core,
    proof_of_years_of_experience,
    mechanic_Tr_number,
    phone,
    guarantor: { guarantor_name, guarantor_phone, guarantor_address },
  };

  try {
    const newMechanic = await Mechanic.create(newMechanicData).select(
      "-password"
    );
    const mechanicObject = {
      newMechanic,
      token: generateToken(newMechanic._id),
    };
    return res.status(200).send(mechanicObject);
  } catch (error) {
    res.status(400).json(error);
  }
});

//mechanic can login with email or password
//since they will be having two login input field wheere one is taken by password already
// the second one should be name logindetails on the frontend which could be email or password
const loginMechanic = asyncHandler(async (req, res) => {
  const { login_details, password } = req.body;

  if (!login_details || !password) {
    throw new Error("please enter your login details");
  }

  const mechanic = await Mechanic.findOne({
    $or: [{ email: login_details }, { phone: login_details }],
  });

  const confirmPassword = await mechanic.matchPassword(password);

  if (mechanic && confirmPassword) {
    const mechanicObject = { mechanic, token: generateToken(mechanic._id) };
    return res.status(200).json(mechanicObject);
  } else {
    res
      .status(404)
      .json({ error: "You entered a wrong email, phone number or password" });
  }

  console.log("completed");
});

const getAllMechanic = asyncHandler(async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    res.status(200).json(mechanics);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getOneMechanicById = asyncHandler(async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    res.status(200).json(mechanic);
  } catch (error) {
    res.status(404).json(error);
  }
});

const editOneMechanicData = asyncHandler(async (req, res) => {
  try {
    const editMechanic = await Mechanic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!editMechanic) {
      throw new Error("could not edit mechanics");
    }
    if (editMechanic) {
      res.status(202).json(editMechanic);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//this route help find mechanic by address core phonenumber experience car_they_can_fix etc
const getMehanicByFilter = asyncHandler(async (req, res) => {
  const {
    car1,
    car2,
    car3,
    proof_of_years_of_experience,
    phone,
    address,
    core,
  } = req.body;
  try {
    const filterMechanic = await Mechanic.find({
      $or: [
        { address: address },
        { phone: phone },
        { core: core },
        { proof_of_years_of_experience: proof_of_years_of_experience },
        { car_they_can_fix: { $in: [car1, car2, car3] } },
      ],
    });

    return res.status(200).json(filterMechanic);
  } catch (error) {
    res.status(400).json(error);
  }
});

//to use this route you must have a car1 you
//i will still work onthis route so that we can deepsearch by many factors
//like cars location year_of_experience
const getMechanicByDeepSearch = asyncHandler(async (req, res) => {
  const { car1, core } = req.body;
  try {
    const filterMechanicByDeepSearch = await Mechanic.find({
      $and: [
        // { address: address ? address : "" },
        { core: core },
        {
          car_they_can_fix: {
            $in: [car1],
          },
        },
      ],
    });

    if (!filterMechanicByDeepSearch.length) {
      res.status(200).json({ message: "No match found" });
    } else {
      return res.status(200).json(filterMechanicByDeepSearch);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  registerMechanic,
  loginMechanic,
  getAllMechanic,
  getOneMechanicById,
  editOneMechanicData,
  getMehanicByFilter,
  getMechanicByDeepSearch,
};
