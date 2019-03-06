import {Module} from '@nestjs/common';
import {DeploymentModule} from './deployment/deployment.module';

@Module({
  imports: [DeploymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
