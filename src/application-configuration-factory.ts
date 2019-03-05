import {ApplicationConfig} from './application-configuration';

const config = new ApplicationConfig(process.env.STAGE, {
    region: process.env.AWS_REGION,
    accountId: process.env.AWS_ACCOUNT_ID,
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

// if (process.env.STAGE === 'test') {
//   AWS.config.update({
//     credentials: new AWS.Credentials('', ''),
//   });
// }

export { config };
