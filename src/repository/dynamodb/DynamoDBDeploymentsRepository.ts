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
  ) {}

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
      console.log(e);
      throw new RepositoryError('Cannot add deployment');
    }
  }

  async listApplications(teamName: string, environmentName: string): Promise<string[]> {
    // TODO: list applications for team under one environments
    return undefined;
  }

  listDeployments(teamName: string, environmentName: string, applicationName: string): Promise<Deployment[]> {
    // TODO: list Deployments for one application
    return undefined;
  }

  listEnvironments(teamName: string): Promise<string[]> {
    // TODO: list Environments which team has
    return undefined;
  }

}
