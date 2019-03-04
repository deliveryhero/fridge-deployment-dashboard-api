import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DeploymentModule} from './deployment/deployment.module';
import {DynamoDBDeploymentsRepository} from './repository/dynamodb/DynamoDBDeploymentsRepository';

@Module({
  imports: [DeploymentModule],
  controllers: [AppController],
  providers: [AppService, DynamoDBDeploymentsRepository],
})
export class AppModule {
}
