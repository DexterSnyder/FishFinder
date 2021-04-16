const express = require("express");
const router = new express.Router();

router.get("/stocked", async (req, res) => {
  res.send({ message: "This is where stocked info will live" });
});

module.exports = router;
