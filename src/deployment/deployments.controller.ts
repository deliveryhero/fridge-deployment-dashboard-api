import {Controller, Get, HttpCode, HttpStatus, Post, Req} from '@nestjs/common';
import {DynamoDBDeploymentsRepository} from '../repository/dynamodb/DynamoDBDeploymentsRepository';

@Controller('/v1/deployments')
export class DeploymentsController {
  constructor(
    private readonly repository: DynamoDBDeploymentsRepository
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addDeployment(@Req() request) {
    return this.repository.addDeployment(request.body as any);// @todo No validation, no request DTO etc
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
