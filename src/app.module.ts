import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeploymentModule } from './deployment/deployment.module';

@Module({
  imports: [DeploymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
