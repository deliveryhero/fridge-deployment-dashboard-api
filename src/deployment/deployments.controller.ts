import {Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Req} from '@nestjs/common';
import {IDeploymentsRepository} from '../repository/IDeploymentsRepository';
import {Environment, ListEnvironmentsResponse} from '../model/http/ListEnvironmentsResponse';
import {ListDeploymentsResponse} from '../model/http/ListDeploymentsResponse';

@Controller('/v1/deployments')
export class DeploymentsController {
  constructor(
      @Inject('IDeploymentsRepository') private readonly repository: IDeploymentsRepository
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addDeployment(@Req() request) {
    return this.repository.addDeployment(request.body as any);
  }

  @Get('/:teamName')
  async getEnvironments(@Param() param): Promise<ListEnvironmentsResponse> {
    const envs = await this.repository.listEnvironments(param.teamName);
    const response = new ListEnvironmentsResponse();
    response.environments = envs.map(env => {
      const environment = new Environment();
      environment.environment_name = env;
      return environment;
    });
    return response;
  }

  @Get('/:teamName/:environmentName')
  async getDeployments(@Param() param): Promise<ListDeploymentsResponse> {
    const deployments = await this.repository.listDeployments(param.teamName, param.environmentName);
    const response = new ListDeploymentsResponse();
    deployments.forEach(deployment => {
      const applicationName = deployment.applicationName;
      if (!response[applicationName]) {
        response[applicationName] = [];
      }
      response[applicationName].push(deployment);
    });
    return response;
  }
}
