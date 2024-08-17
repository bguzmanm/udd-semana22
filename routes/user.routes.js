const express = require("express");
const router = express.Router();

const { findAll, findOne, create, update, remove } = require("../controllers/user.controller");

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;