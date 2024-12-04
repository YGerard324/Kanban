const TaskRepositoryInterface = require("../interface/TaskRepositoryInterface");
const { Task } = require("../data/dbContext");

class TaskRepository extends TaskRepositoryInterface {
  constructor() {
    super();
  }
  async add(req) {
    await Task.create(req);
  }

  async getById(id) {
    const task = await Task.findOne({
      where: { id },
    });
    return task;
  }

  async getAll() {
    const rows = await Task.findAll();
    return rows;
  }

  async getAllByUserId(user_id) {
    const tasks = await Task.findAll({
      where: { user_id }, 
    });
    return tasks;
  }

  async update(req) {
    const { id } = req.params;
    const { body } = req;

    await Task.update(body, {
      where: { id },
      returning: true,
    });
  }

  async delete(id) {
    await Task.destroy({
      where: { id },
      returning: true,
    });
  }
}

module.exports = TaskRepository;
