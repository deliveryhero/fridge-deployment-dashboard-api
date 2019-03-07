import {suite, test} from 'mocha-typescript';
import {DynamoDBHelper} from '../helper/DynamoDBHelper';
import Axios, {AxiosInstance} from 'axios';
import * as assert from 'assert';
import {Deployment} from '../../src/model/Deployment';
import {ListEnvironmentsResponse} from '../../src/model/http/ListEnvironmentsResponse';
import {ListDeploymentsResponse} from '../../src/model/http/ListDeploymentsResponse';

interface IDeploymentFixture {
  deployment: Deployment;
  expectedDeployments: object[];
  expectedEnvs: object[];
  expectedListEnvsResponse: ListEnvironmentsResponse;
  expectedListDeploymentsResponse: ListDeploymentsResponse;
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
    await this.insertDeployments(deploymentFixture);
    const count = await this.dynamoDBHelper.countAllDeployments();
    const actualDeployments = await this.dynamoDBHelper.getDeployment(deploymentFixture.deployment.teamName,
        deploymentFixture.deployment.environment);
    const actualEnvs = await this.dynamoDBHelper.getEnv(deploymentFixture.deployment.teamName);
    assert.strictEqual(count, 2);
    assert.deepStrictEqual(actualDeployments, deploymentFixture.expectedDeployments);
    assert.deepStrictEqual(actualEnvs, deploymentFixture.expectedEnvs);
  }

  @test
  async 'list all environment for a team'() {
    const deploymentFixture: IDeploymentFixture = require(`./fixtures/valid/deployment-all-fields.json`);
    await this.insertDeployments(deploymentFixture);
    const actualEnvsResponse =
        await this.getResponse<ListDeploymentsResponse>(`${deploymentFixture.deployment.teamName}`);
    assert.deepStrictEqual(actualEnvsResponse, deploymentFixture.expectedListEnvsResponse);
  }

  @test
  async 'list all deployments'() {
    const deploymentFixture: IDeploymentFixture = require(`./fixtures/valid/deployment-all-fields.json`);
    await this.insertDeployments(deploymentFixture);
    const path = `${deploymentFixture.deployment.teamName}/${deploymentFixture.deployment.environment}`;
    const actualDeploymentResponse = await this.getResponse<ListDeploymentsResponse>(path);
    assert.deepStrictEqual(actualDeploymentResponse, deploymentFixture.expectedListDeploymentsResponse);
  }

  private async insertDeployments(deploymentFixture: IDeploymentFixture): Promise<void> {
    await this.httpClient.post(
        this.ENDPOINT,
        deploymentFixture.deployment
    );
  }

  private async getResponse<T>(path: string): Promise<T> {
    const response = await this.httpClient.get<T>(`${this.ENDPOINT}/${path}`);
    return response.data;
  }

}
