import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    // await models.ServiceConfiguration.create({
    //   space: '<DEV_SPACE>',
    //   accessToken: '<DEV_TOKEN>'
    // });

    // await models.ServiceConfiguration.create({
    //   space: '<PROD_SPACE>',
    //   accessToken: '<PROD_TOKEN>'
    // });
  }

  static async down(models, sequelize, DataTypes) {
    // await models.ServiceConfiguration.destroy({
    //   where: {
    //     space: '<DEV_SPACE>',
    //     accessToken: '<DEV_TOKEN>'
    //   }
    // });

    // await models.ServiceConfiguration.destroy({
    //   where: {
    //     space: '<PROD_SPACE>',
    //     accessToken: '<PROD_TOKEN>'
    //   }
    // });
  }
}
