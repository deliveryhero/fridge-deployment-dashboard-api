import {Controller, Get, HttpCode, HttpStatus, Inject, Post, Req} from '@nestjs/common';
import {IDeploymentsRepository} from '../repository/IDeploymentsRepository';

@Controller('/v1/deployments')
export class DeploymentsController {
  constructor(
      @Inject('IDeploymentsRepository') private readonly repository: IDeploymentsRepository
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addDeployment(@Req() request) {
    return this.repository.addDeployment(request.body as any);
  }

  @Get('/:teamName')
  getEnvironments() {
    return 'This action returns all environments';
  }

  @Get('/:teamName/:environmentName')
  getDeployments() {
    return 'This action returns all deployments for a team and environment';
  }
}
