class TaskApplication {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async add(data) {
    return await this.taskRepository.add(data);
  }
  async getById(code) {
    return await this.taskRepository.getById(code);
  }

  async getAll() {
    return await this.taskRepository.getAll();
  }
  async getAllByUserId() {
    return await this.taskRepository.getAll(user_id);
  }

  async update(data) {
    return await this.taskRepository.update(data);
  }

  async delete(code) {
    return await this.taskRepository.delete(code);
  }
}

module.exports = TaskApplication;
