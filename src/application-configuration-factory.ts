import {ApplicationConfig} from './application-configuration';

const config = new ApplicationConfig(process.env.STAGE, {
    region: process.env.AWS_REGION,
    dynamoDB: {
      endpoint: process.env.DYNAMO_DB_ENDPOINT,
      tables: {
        deployments: {
          tableName: process.env.DEPLOYMENTS_TABLE_NAME,
        },
      },
    },
  }
);

export { config };
