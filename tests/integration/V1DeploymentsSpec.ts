import {suite, test} from 'mocha-typescript';
import {DynamoDBHelper} from '../helper/DynamoDBHelper';
import Axios, {AxiosInstance} from 'axios';
import * as assert from 'assert';
import {Deployment} from '../../src/model/Deployment';

interface IDeploymentFixture {
  deployment: Deployment;
}

@suite
export class V1DeploymentsSpec {

  private readonly BASE_HOST = 'http://localhost:4000';
  private readonly dynamoDBHelper: DynamoDBHelper;
  private readonly httpClient: AxiosInstance;
  private readonly ENDPOINT: string = '/v1/deployments';

  constructor() {
    this.dynamoDBHelper = new DynamoDBHelper();
    this.httpClient = Axios.create({baseURL: this.BASE_HOST});
  }

  async before() {
    await this.dynamoDBHelper.deleteDeploymentTable();
    await this.dynamoDBHelper.createDeploymentTable();
  }

  @test
  async 'add new deployment'() {
    const deploymentFixture: IDeploymentFixture = require(`./fixtures/valid/deployment-all-fields.json`);
    await this.httpClient.post(
        this.ENDPOINT,
        deploymentFixture.deployment
    );
    const count = await this.dynamoDBHelper.countAllDeployments();
    assert.strictEqual(count, 1);
  }
}
