const mongoose = require("mongoose");
// geocoder
const geocoder = require("../utiles/geocoder");

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the store name is required"],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true,
      index: "2dsphere"
    }
  },
  coordinates: {
    type: [Number],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
//geocoder & create location
StoreSchema.pre("save", async function(next) {

  this.location = {
    type: "Point",
    coordinates: [this.coordinates[0], this.coordinates[1]]
  }
  this.coordinates = undefined;
  await next();
});
module.exports = mongoose.model("Store", StoreSchema);
