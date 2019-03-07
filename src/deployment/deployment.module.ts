import { Module } from '@nestjs/common';
import {DeploymentsController} from './deployments.controller';
import {DynamoDBDeploymentsRepository} from '../repository/dynamodb/DynamoDBDeploymentsRepository';
import {ApplicationConfig} from '../application-configuration';
import {config} from '../application-configuration-factory';
import * as AWS from 'aws-sdk';

@Module({
  controllers: [DeploymentsController],
  providers: [
    {
      provide: 'IDeploymentsRepository',
      useClass: DynamoDBDeploymentsRepository
    },
    {
      provide: ApplicationConfig,
      useValue: config,
    },
    {
      provide: AWS.DynamoDB.DocumentClient,
      useValue: new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        endpoint: config.aws.dynamoDB.endpoint,
        region: config.aws.region,
        convertEmptyValues: true,
      }),
    },
  ],
})
export class DeploymentModule {}
