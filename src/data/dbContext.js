require("dotenv").config(); 
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

const User = require("../data/UserModel")(sequelize, DataTypes);
const Task = require("../data/TaskModel")(sequelize, DataTypes);


sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao tentar conectar: " + err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tabelas criadas com sucesso!");
  })
  .catch((err) => {
    console.log("Erros: " + err);
  });


// Relação entre User e Address
User.hasMany(Task, {
  foreignKey: "user_id",
  as: "tasks", // Um usuário pode ter vários endereços
});
Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "user", // Um endereço pertence a um único usuário
});

module.exports = {
  User,
  Task
};