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
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere"
    },
    formatedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
//geocoder & create location
StoreSchema.pre("save", async function(next) {
  await geocoder.geocode(this.address).then(res=>{
    const loc = res;
    this.location = {
      type: "Point",
      coordinates: [loc[0].longitude, loc[0].latitude],
      formatedAddress: loc[0].formattedAddress
    };
  });
  
  //we do not want to save address
  this.address = undefined;
  await next();
});
module.exports = mongoose.model("Store", StoreSchema);
