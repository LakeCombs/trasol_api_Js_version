const mongoose = require("mongoose");

const bcrypt = requrie("bcryptjs");

const mechanicSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    carTheyCanFix: [String],
    address: { type: String, required: true },
    core: { type: String, required: true, emum: ["Electric", "Mechanic"] },
    proofOfYearsOfExperience: { type: String, required: true },
    driverLicenseNumber: { type: Number, required: true },
    account_details: { type: String },
    guarantor: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      garantorAddress: { type: String, required: true },
    },
    password: { type: String, required: true },
    MechanicTrNumber: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    rating: { type: Number },
  },
  { timestamps: true }
);

mechanicSchema.module.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

mechanicSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mogoose.model("Mechanic", mechanicSchema);
