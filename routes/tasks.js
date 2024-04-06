const express = require("express");
const tasksController = require("../controller/tasks");
const router = express.Router();
router
  .route("/:id")
  .get(tasksController.getTask)
  .delete(tasksController.deleteTask)
  .patch(tasksController.updateTask)
  .put(tasksController.editTask);

router
  .route("/")
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);

module.exports = router;
