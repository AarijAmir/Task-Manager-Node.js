const Task = require("../models/task");
const { asyncWrapper } = require("../middleware/async");
const { createCustomError } = require("../errors/custom-errors");

module.exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.status(200).json({ status: "success", data: tasks });
});

module.exports.createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
});

module.exports.getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`));
  } else {
    return res.status(200).json({ task });
  }
});

module.exports.updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`));
  } else {
    return res.status(200).json({ task });
  }
});

module.exports.deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`));
  } else {
    return res.status(200).json({ task });
  }
});

module.exports.editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`));
  } else {
    return res.status(200).json({ task });
  }
});
