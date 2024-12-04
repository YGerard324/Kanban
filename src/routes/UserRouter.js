const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();

router.get("/", UserController.getAll);
router.post("/" , UserController.add);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
