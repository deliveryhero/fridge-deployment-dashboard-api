import {Injectable} from '@nestjs/common';
import {IDeploymentsRepository, RepositoryError} from '../IDeploymentsRepository';
import {Deployment} from '../../model/Deployment';
import * as AWS from 'aws-sdk';
import {ApplicationConfig} from '../../application-configuration';

@Injectable()
export class DynamoDBDeploymentsRepository implements IDeploymentsRepository {
  constructor(
      private readonly dbDocumentClient: AWS.DynamoDB.DocumentClient,
      private readonly config: ApplicationConfig,
  ) {
  }

  async addDeployment(deployment: Deployment): Promise<void> {
    try {
     await this.dbDocumentClient.transactWrite({
        TransactItems: [{
          Put: {
            TableName: this.config.aws.dynamoDB.tables.deployments.tableName,
            Item: {
              PK: deployment.teamName + '_' + deployment.environment,
              SK: deployment.timestamp,
              deployment: deployment,
            },
          },
        }, {
          Put: {
            TableName: this.config.aws.dynamoDB.tables.deployments.tableName,
            Item: {
              PK: deployment.teamName,
              SK: deployment.environment,
            },
          },
        }]
      }).promise();
    } catch (e) {
      throw new RepositoryError('Cannot add deployment');
    }
  }

  async listDeployments(teamName: string, environmentName: string): Promise<Deployment[]> {
    const envs = await this.listEnvironments(teamName);
    if (!envs || !envs.length) {
      return [];
    }
    const teamNameEnv = `${teamName}_${envs[0]}`;
    const params: AWS.DynamoDB.Types.DocumentClient.QueryInput = {
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: {
        '#PK': 'PK'
      },
      ExpressionAttributeValues: {
        ':PK': teamNameEnv
      },
      TableName: this.config.aws.dynamoDB.tables.deployments.tableName,
      ScanIndexForward: false,
      ConsistentRead: true
    };
    const data: AWS.DynamoDB.DocumentClient.QueryOutput = await this.dbDocumentClient.query(params).promise();
    return data.Items.map(item => {
      return item['deployment'];
    });
  }

  async listEnvironments(teamName: string): Promise<string[]> {
    const params: AWS.DynamoDB.Types.DocumentClient.QueryInput = {
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: {
        '#PK': 'PK'
      },
      ExpressionAttributeValues: {
        ':PK': teamName
      },
      TableName: this.config.aws.dynamoDB.tables.deployments.tableName,
      ScanIndexForward: false,
      ConsistentRead: true
    };
    const data: AWS.DynamoDB.DocumentClient.QueryOutput = await this.dbDocumentClient.query(params).promise();
    if (!data || !data.Items || data.Items.length < 1) {
      return [];
    }
    return data.Items.map(item => {
      return item['SK'];
    });
  }

}
