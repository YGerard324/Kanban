const express = require("express");
const TaskController = require ("../controller/TaskController");
const router = express.Router();

router.post("/" , TaskController.add);
router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getById);
router.put("/:id" , TaskController.update);
router.delete("/:id" , TaskController.delete);

module.exports = router;