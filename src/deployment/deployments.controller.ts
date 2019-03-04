import {Controller, Post} from '@nestjs/common';

@Controller('/v1/deployments')
export class DeploymentsController {
  @Post()
  addDeployment() {
    return 'This action returns all cats';
  }
}
