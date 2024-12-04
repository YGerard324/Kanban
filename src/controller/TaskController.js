const {taskFacade} = require("../dependency/injection");

module.exports.add = async (req, res) => {
    let row = await taskFacade.add(req.body);
    res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
};

module.exports.getAll = async (req, res) => {
    let row = await taskFacade.getAll();
    res.status(200).json(row);
};

module.exports.getById = async (req, res) => {
    const {id} = req.params;
    let row = await taskFacade.getById(id);
    res.status(200).json(row);
};
module.exports.getAllByUserId = async (req, res) => {
    const {user_id} = req.params;
    let row = await taskFacade.getAllByUserId(user_id);
    res.status(200).json(row);
};
module.exports.update = async (req, res) => {
    let row = await taskFacade.update(req);
    res.status(200).json({ message: 'Tarefa atualizada realizado com sucesso!' });
};
module.exports.delete = async (req, res) => {
    const {id} = req.params;
    let row = await taskFacade.delete(id);
    res.status(200).json({ message: 'Tarefa deletada realizado com sucesso!' });
};
