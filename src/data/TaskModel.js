module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM(["Baixa", "Media", "Alta"]),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(["A fazer", "Fazendo", "Feito"]),
        allowNull: false,
        defaultValue: "A fazer"
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Task;
};
