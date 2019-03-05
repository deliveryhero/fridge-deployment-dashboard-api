import {Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';

@Controller('/v1/deployments')
export class DeploymentsController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
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
