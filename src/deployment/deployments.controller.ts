import {Controller, Get, Post} from '@nestjs/common';

@Controller('/v1/deployments')
export class DeploymentsController {
  @Post()
  addDeployment() {
    return 'This action adds a deployment';
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
