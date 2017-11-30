import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    await models.ApiConfiguration.create({
      space: 'ft53b2q3sca9',
      accessToken: 'b3613fdf478448a7097b782a6e6d88ef57d071db1851df8b3597df6b3f44bdf9'
    });

    await models.ApiConfiguration.create({
      space: 'ft53b2q3sca9',
      accessToken: 'b3613fdf478448a7097b782a6e6d88ef57d071db1851df8b3597df6b3f44bdf9'
    });
  }

  static async down(models, sequelize, DataTypes) {
    await models.ApiConfiguration.destroy({
      where: {
        space: 'ft53b2q3sca9',
        accessToken: 'b3613fdf478448a7097b782a6e6d88ef57d071db1851df8b3597df6b3f44bdf9'
      }
    });
  }
}
