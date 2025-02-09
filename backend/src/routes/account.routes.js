const express = require("express");
const { getBalance, transfer } = require("../controllers/accountController");
const authMiddleware = require("../middleware");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);

router.post("/transfer", authMiddleware, transfer);

module.exports = router;
