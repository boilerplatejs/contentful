export default class {
  static async up(models, sequelize, DataTypes) {
    await sequelize.sync();
  }

  static async down(models, sequelize, DataTypes) {}
}
