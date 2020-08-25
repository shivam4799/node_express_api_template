const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "user Get routes" });
});

module.exports = router;
