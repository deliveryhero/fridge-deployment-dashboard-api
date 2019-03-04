import {Injectable} from '@nestjs/common';
import {IDeploymentsRepository} from '../IDeploymentsRepository';
import {Deployment} from '../../model/Deployment';

@Injectable()
export class DynamoDBDeploymentsRepository implements IDeploymentsRepository {
  async addDeployment(deployment: Deployment): Promise<void> {
    // TODO: Add deployment
    return undefined;
  }

  async listApplications(teamName: string, environmentName: string): Promise<string[]> {
    // TODO: list applications for team under one environments
    return undefined;
  }

  listDeployments(teamName: string, environmentName: string, applicationName: string): Promise<Deployment[]> {
    // TODO: list Deployments for one application
    return undefined;
  }

  listEnvironments(teamName: string): Promise<string[]> {
    // TODO: list Environments which team has
    return undefined;
  }

}
