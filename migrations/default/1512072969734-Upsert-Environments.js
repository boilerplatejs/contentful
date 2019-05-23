export default class {
  static async up(models, sequelize, DataTypes) {
    // await models.Environment.upsert({
    //   name: 'development',
    //   ServiceConfigurationId: 3
    // });

    // await models.Environment.upsert({
    //   name: 'production',
    //   ServiceConfigurationId: 4
    // });
  }

  static async down(models, sequelize, DataTypes) {
    // await models.Environment.destroy({
    //   where: {
    //     name: 'development',
    //     ServiceConfigurationId: 3
    //   }
    // });

    // await models.Environment.destroy({
    //   where: {
    //     name: 'production',
    //     ServiceConfigurationId: 4
    //   }
    // });
  }
}
