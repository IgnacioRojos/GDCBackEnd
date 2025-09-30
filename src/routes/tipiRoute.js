const express = require("express");
const router = express.Router();
const { getTipificacionById } = require("../controller/tipiController");


router.get("/:tipi", getTipificacionById);

module.exports = router;