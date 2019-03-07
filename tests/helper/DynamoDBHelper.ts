import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {Deployment} from '../../src/model/Deployment';

export class DynamoDBHelper {
  public databaseClient: AWS.DynamoDB.DocumentClient;
  private endpoint: string = 'http://0.0.0.0:8000';
  private region: string = 'eu-west-1';
  private apiVersion: string = '2012-08-10';
  private deploymentTableName: string = 'test-fridge-dda-deployment';
  private dynamoDb: AWS.DynamoDB;

  constructor() {
    this.dynamoDb = new AWS.DynamoDB({
      endpoint: this.endpoint,
      apiVersion: this.apiVersion,
      region: this.region
    });
    this.databaseClient = new AWS.DynamoDB.DocumentClient({
      region: this.region,
      endpoint: this.endpoint,
      apiVersion: this.apiVersion
    });
  }

  async createDeploymentTable(): Promise<void> {
    const readCapacityUnits = 1;
    const writeCapacityUnits = 1;
    const params = {
      TableName: this.deploymentTableName,
      KeySchema: [
        {AttributeName: 'PK', KeyType: 'HASH'}, // Partition key
        {AttributeName: 'SK', KeyType: 'RANGE'}, // Sort Key
      ],
      AttributeDefinitions: [
        {AttributeName: 'PK', AttributeType: 'S'},
        {AttributeName: 'SK', AttributeType: 'S'},
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: readCapacityUnits,
        WriteCapacityUnits: writeCapacityUnits
      },
      SSESpecification: {
        Enabled: true
      }
    };
    return this.createTable(params, this.deploymentTableName);
  }

  async deleteDeploymentTable(): Promise<void> {
    return await this.deleteTable(this.deploymentTableName);
  }

  async getEnv(teamName: string): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    const params: AWS.DynamoDB.Types.DocumentClient.QueryInput = {
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: {
        '#PK': 'PK'
      },
      ExpressionAttributeValues: {
        ':PK': teamName
      },
      TableName: this.deploymentTableName,
      ScanIndexForward: false,
      ConsistentRead: true
    };
    return await this.get(params);
  }

  async getDeployment(teamName: string, environmentName: string): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    const teamNameEnv = `${teamName}_${environmentName}`;
    const params: AWS.DynamoDB.Types.DocumentClient.QueryInput = {
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: {
        '#PK': 'PK'
      },
      ExpressionAttributeValues: {
        ':PK': teamNameEnv
      },
      TableName: this.deploymentTableName,
      ScanIndexForward: false,
      ConsistentRead: true
    };
    return await this.get(params);
  }

  async addDeployment(deployment: Deployment): Promise<void> {
    await this.add({
      TableName: this.deploymentTableName,
      Item: {
        PK: deployment.teamName + '_' + deployment.environment,
        SK: deployment.timestamp,
        deployment: deployment,
      }
    });
    await this.add({
      TableName: this.deploymentTableName,
      Item: {
        PK: deployment.teamName,
        SK: deployment.environment,
      }
    });
  }

  async countAllDeployments(): Promise<number> {
    const params: DocumentClient.ScanInput = {
      Select: 'COUNT',
      TableName: this.deploymentTableName
    };
    const data: AWS.DynamoDB.DocumentClient.ScanOutput = await this.databaseClient.scan(params).promise();
    return data.Count;
  }

  private async add(params: DocumentClient.PutItemInput): Promise<void> {
    await this.databaseClient.put(params).promise();
  }

  private async get(params: DocumentClient.QueryInput): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> {
    const data: AWS.DynamoDB.DocumentClient.QueryOutput = await this.databaseClient.query(params).promise();
    return data.Items;
  }

  private async createTable(params, tableName: string): Promise<void> {
    await this.dynamoDb.createTable(params).promise();
  }

  private async deleteTable(tableName: string): Promise<void> {
    await this.describeTable(tableName);
    await this.dynamoDb.deleteTable({TableName: tableName}).promise();
  }

  private async describeTable(tableName: string): Promise<AWS.DynamoDB.Types.DescribeTableOutput> {
    return await this.dynamoDb.describeTable({TableName: tableName}).promise();
  }
}
