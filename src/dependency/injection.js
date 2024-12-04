// User
const UserRepository = require("../repository/UserRepository");
const UserApplication = require("../application/UserApplication");
const UserFacade = require("../facade/UserFacade");

const userRepository = new UserRepository();
const userApplication = new UserApplication(userRepository);
const userFacade = new UserFacade(userApplication);
// User

// Address
const TaskRepository = require("../repository/TaskRepository");
const TaskApplication = require("../application/TaskApplication");
const TaskFacade = require("../facade/TaskFacade");

const taskRepository = new TaskRepository();
const taskApplication = new TaskApplication(taskRepository);
const taskFacade = new TaskFacade(taskApplication);
// Address

module.exports = {
  userFacade,
  taskFacade,
};