const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  phone: String,
  address: {
    street: String,
    city: String,
    zip: String,
  },
  serviceHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
});
module.exports = mongoose.model("Customer", customerSchema);
