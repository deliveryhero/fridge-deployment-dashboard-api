import {suite, test} from 'mocha-typescript';
import * as assert from 'assert';
import {ClassTransformer} from 'class-transformer';
import {Validator} from 'class-validator';
import {Deployment} from '../../../src/model/Deployment';

@suite
export class DeploymentSpec {

  private classTransformer: ClassTransformer;
  private classValidator: Validator;

  constructor() {
    this.classTransformer = new ClassTransformer();
    this.classValidator = new Validator();
  }

  @test 'empty Deployments'() {
    this.assertDeploymentFixture({}, 6);
  }

  @test 'valid deployments with all fields'() {
    this.assertDeploymentFixtureByFileName('valid/deployment-all-fields.json', 0);
  }

  @test 'valid deployments with only required fields'() {
    this.assertDeploymentFixtureByFileName('valid/deployment-mandatory-fields.json', 0);
  }

  @test 'invalid deployments without one required fields'() {
    this.assertDeploymentFixtureByFileName('invalid/deployment-without-mandatory.json', 2);
  }

  private assertDeploymentFixtureByFileName(fileName: string, expectedError: number = 0): void {
    const fixture = require(`./fixture/${fileName}`);
    this.assertDeploymentFixture(fixture, expectedError);
  }

  private assertDeploymentFixture(deploymentFixture: object, expectedError: number = 0): void {
    const model = this.classTransformer.plainToClass<Deployment, Object>(Deployment, deploymentFixture);
    const errors = this.classValidator.validateSync(model);
    assert.strictEqual(errors.length, expectedError);
  }
}
