import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    await models.Environment.create({
      name: 'development',
      ApiConfigurationId: 1
    });

    await models.Environment.create({
      name: 'production',
      ApiConfigurationId: 2
    });
  }

  static async down(models, sequelize, DataTypes) {
    await models.Environment.destroy({
      where: {
        name: 'development',
        ApiConfigurationId: 1
      }
    });

    await models.Environment.destroy({
      where: {
        name: 'production',
        ApiConfigurationId: 2
      }
    });
  }
}
