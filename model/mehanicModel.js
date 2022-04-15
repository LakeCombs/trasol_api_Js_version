const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const mechanicSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    car_they_can_fix: [String],
    address: { type: String, required: true },
    core: { type: String, required: true, emum: ["Electric", "Mechanic"] },
    proof_of_years_of_experience: { type: String, required: true },
    driver_license_number: { type: Number },
    account_details: { type: String },
    guarantor: {
      guarantor_name: { type: String, required: true },
      guarantor_phone: { type: String, required: true },
      guarantor_address: { type: String, required: true },
    },
    password: { type: String, required: true },
    mechanic_Tr_number: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

mechanicSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

mechanicSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Mechanic", mechanicSchema);
