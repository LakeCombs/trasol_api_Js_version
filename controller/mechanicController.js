const asyncHandler = require("express-async-handler");
const Mechanic = require("../model/mehanicModel");

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

  //i am enforcing this datastructure so you don't have to do it on the frontend
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
    const newMechanic = await Mechanic.create(newMechanicData);
    if (newMechanic) res.status(201).json(newMechanic);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { registerMechanic };
