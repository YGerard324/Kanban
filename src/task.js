module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
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
          unique: true,
        },
        priority: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.ENUMERABLE(["A fazer", "Fazendo", "Feito"]),
          allowNull: false,
          unique: true,
        },
      },
      { timestamps: false, freezeTableName: true }
    );
    return User;
  };