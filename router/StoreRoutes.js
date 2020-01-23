const express = require("express");
const router = express.Router();

//controllers
const { getStores, addStore } = require("../controllers/StoreController");
router
  .route("/")
  .get(getStores)
  .post(addStore);

//export
module.exports = router;
