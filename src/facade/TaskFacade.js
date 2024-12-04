class TaskFacade {
  constructor(taskApplication) {
    this.taskApplication = taskApplication;
  }

  async add(data) {
    return await this.taskApplication.add(data);
  }
  async getById(id) {
    return await this.taskApplication.getById(id);
  }

  async getAll() {
    return await this.taskApplication.getAll();
  }
  async getAllByUserId() {
    return await this.taskApplication.getAllByUserId(user_id);
  }

  async update(data) {
    return await this.taskApplication.update(data);
  }

  async delete(id) {
    return await this.taskApplication.delete(id);
  }
}

module.exports = TaskFacade;
